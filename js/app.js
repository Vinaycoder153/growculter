/**
 * Main Application Core
 * Orchestrates initialization, state management, and UI updates
 */

const app = {
    currentUser: null,
    initialized: false,

    /**
     * Initialize application
     */
    init: function() {
        console.log("🚀 Initializing WorkTracker...");

        // Initialize services
        DB.init();
        const firebaseReady = FirebaseService.init();

        // Restore session
        if (AuthHandler.restoreSession()) {
            this.router.navigate('home');
        } else {
            this.router.navigate('login');
        }

        this.initialized = true;
        console.log("✓ Application ready");
    },

    // Sub-modules
    router: Router,
    ui: UIManager
};

/**
 * UI Manager
 * Handles modal, toast, translation, and theme operations
 */
const UIManager = {
    /**
     * Show toast notification
     * @param {string} msg - Message text
     * @param {string} type - 'success' or 'error'
     */
    toast: function(msg, type = 'success') {
        const t = document.createElement('div');
        t.className = 'toast';
        t.style.borderLeft = '4px solid ' + (type === 'success' ? 'var(--success)' : 'var(--danger)');
        t.innerText = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    },

    /**
     * Translate all i18n elements on page
     */
    translatePage: function() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerText = I18n.t(key);
        });
    },

    /**
     * Toggle light/dark theme
     */
    toggleTheme: function() {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme') || 'light';
        html.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
        localStorage.setItem('wt_theme', current === 'light' ? 'dark' : 'light');
    },

    /**
     * Open modal with title and body HTML
     * @param {string} title - Modal title
     * @param {string} bodyHtml - Modal content HTML
     */
    openModal: function(title, bodyHtml) {
        const overlay = document.getElementById('modal-overlay');
        if (!overlay) return;
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-body').innerHTML = bodyHtml;
        overlay.classList.remove('hidden');
    },

    /**
     * Close modal
     */
    closeModal: function() {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) overlay.classList.add('hidden');
    }
};

// Start app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
