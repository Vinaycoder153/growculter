/**
 * Router
 * Single Page Application routing and view management
 */

const Router = {
    currentRoute: null,

    /**
     * Navigate to a route
     * @param {string} route - Route name: login, home, entries, users, settings
     */
    navigate: function(route) {
        this.currentRoute = route;
        const appEl = document.getElementById('app');

        // Handle login route
        if (route === 'login') {
            const tpl = document.getElementById('tpl-auth').content.cloneNode(true);
            appEl.innerHTML = '';
            appEl.appendChild(tpl);
            document.getElementById('login-form').onsubmit = AuthHandler.login;
            app.ui.translatePage();
            return;
        }

        // Require authentication for dashboard routes
        if (!app.currentUser) {
            this.navigate('login');
            return;
        }

        // Ensure dashboard layout exists
        if (!document.querySelector('.dashboard-layout')) {
            const tpl = document.getElementById('tpl-dashboard').content.cloneNode(true);
            appEl.innerHTML = '';
            appEl.appendChild(tpl);
            const modalTpl = document.getElementById('tpl-modal').content.cloneNode(true);
            appEl.appendChild(modalTpl);
        }

        this._updateHeaderState();
        this._renderRoute(route);
        app.ui.translatePage();
        this._closeMenuOnMobile();
    },

    /**
     * Update header and navigation state
     * @private
     */
    _updateHeaderState: function() {
        const userDisplay = document.getElementById('user-display-name');
        const langSelect = document.getElementById('lang-select');

        if (userDisplay) userDisplay.innerText = app.currentUser.name;
        if (langSelect) langSelect.value = I18n.currentLang;

        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

        const navs = { home: 0, entries: 1, users: 2, settings: 3 };
        const navEls = document.querySelectorAll('.nav-item');
        if (navEls[navs[this.currentRoute]]) {
            navEls[navs[this.currentRoute]].classList.add('active');
        }

        // Hide admin-only menu items
        if (app.currentUser.role !== 'admin') {
            document.querySelectorAll('.role-admin').forEach(el => el.style.display = 'none');
        }
    },

    /**
     * Render the appropriate view for the route
     * @private
     */
    _renderRoute: function(route) {
        const container = document.getElementById('view-container');
        container.innerHTML = '';

        if (route === 'home') Controllers.dashboard(container);
        else if (route === 'entries') Controllers.entries(container);
        else if (route === 'users') Controllers.users(container);
        else if (route === 'settings') Controllers.settings(container);
    },

    /**
     * Close mobile sidebar after navigation
     * @private
     */
    _closeMenuOnMobile: function() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('mobile-open');
    }
};
