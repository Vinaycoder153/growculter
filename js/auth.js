/**
 * Authentication Handler
 * Manages user login, logout, and session
 */

const AuthHandler = {
    /**
     * Handle login form submission
     * @param {Event} e - Form submission event
     */
    login: async function(e) {
        e.preventDefault();
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Try Firebase first, fallback to local DB
            let user;
            try {
                user = await FirebaseService.loginWithEmail(email, password);
            } catch (firebaseError) {
                console.warn("Firebase login failed, trying local DB:", firebaseError.message);
                user = await DB.loginLocal(email, password);
            }

            app.currentUser = user;
            sessionStorage.setItem(APP_CONFIG.storage.sessionKey, JSON.stringify(user));
            app.ui.toast("Welcome " + user.name, "success");
            app.router.navigate('home');
        } catch (err) {
            app.ui.toast(err.message || "Login failed", "error");
        }
    },

    /**
     * Handle logout
     */
    logout: async function() {
        try {
            // Try Firebase logout if available
            if (firebaseAuth?.currentUser) {
                await FirebaseService.logout();
            }
            app.currentUser = null;
            sessionStorage.removeItem(APP_CONFIG.storage.sessionKey);
            app.router.navigate('login');
            app.ui.toast("Logged out", "success");
        } catch (err) {
            app.ui.toast("Logout failed", "error");
        }
    },

    /**
     * Restore session from storage
     */
    restoreSession: function() {
        const sess = sessionStorage.getItem(APP_CONFIG.storage.sessionKey);
        if (sess) {
            try {
                app.currentUser = JSON.parse(sess);
                return true;
            } catch (e) {
                console.warn("Failed to restore session:", e);
                sessionStorage.removeItem(APP_CONFIG.storage.sessionKey);
            }
        }
        return false;
    }
};
