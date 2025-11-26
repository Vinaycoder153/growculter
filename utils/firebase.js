/**
 * Utilities: Firebase Integration
 * Wrapper for Firebase Authentication and Realtime Database
 */

let firebaseAuth;
let firebaseDB;

const FirebaseService = {
    /**
     * Initialize Firebase services
     * Should be called after Firebase SDK loads
     */
    init: function() {
        try {
            firebase.initializeApp(APP_CONFIG.firebase);
            firebaseAuth = firebase.auth();
            firebaseDB = firebase.database();
            console.log("✓ Firebase initialized successfully");
            return true;
        } catch (error) {
            console.error("✗ Firebase initialization failed:", error.message);
            return false;
        }
    },

    /**
     * Authenticate user with email and password
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<object>} User object with profile data
     */
    loginWithEmail: async function(email, password) {
        try {
            const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
            const user = result.user;

            // Fetch user profile from Realtime DB
            const snapshot = await firebaseDB.ref(`users/${user.uid}`).once('value');
            const profile = snapshot.val() || {};

            return {
                id: user.uid,
                username: email.split('@')[0],
                email: user.email,
                name: profile.name || 'User',
                role: profile.role || 'user'
            };
        } catch (error) {
            throw new Error(error.message || "Authentication failed");
        }
    },

    /**
     * Sign out current user
     * @returns {Promise<void>}
     */
    logout: async function() {
        try {
            await firebaseAuth.signOut();
            console.log("✓ User logged out");
        } catch (error) {
            throw new Error(error.message || "Logout failed");
        }
    },

    /**
     * Get current authenticated user
     * @returns {object|null} Firebase user object or null
     */
    getCurrentUser: function() {
        return firebaseAuth?.currentUser || null;
    },

    /**
     * Listen to auth state changes
     * @param {function} callback - Called with (user) on auth state change
     * @returns {function} Unsubscribe function
     */
    onAuthStateChanged: function(callback) {
        return firebaseAuth.onAuthStateChanged(callback);
    },

    /**
     * Fetch user profile from database
     * @param {string} uid - User UID
     * @returns {Promise<object>} User profile
     */
    getUserProfile: async function(uid) {
        try {
            const snapshot = await firebaseDB.ref(`users/${uid}`).once('value');
            return snapshot.val() || {};
        } catch (error) {
            console.error("Error fetching user profile:", error);
            return {};
        }
    },

    /**
     * Update user profile
     * @param {string} uid - User UID
     * @param {object} data - Profile data to update
     * @returns {Promise<void>}
     */
    updateUserProfile: async function(uid, data) {
        try {
            await firebaseDB.ref(`users/${uid}`).update(data);
            console.log("✓ Profile updated");
        } catch (error) {
            throw new Error(error.message || "Profile update failed");
        }
    },

    /**
     * Save entry to database
     * @param {string} uid - User UID
     * @param {object} entry - Entry data
     * @returns {Promise<string>} Entry ID
     */
    saveEntry: async function(uid, entry) {
        try {
            const ref = firebaseDB.ref(`entries/${uid}`).push();
            await ref.set({
                ...entry,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            return ref.key;
        } catch (error) {
            throw new Error(error.message || "Failed to save entry");
        }
    },

    /**
     * Get user's entries
     * @param {string} uid - User UID
     * @returns {Promise<array>} Array of entries
     */
    getEntries: async function(uid) {
        try {
            const snapshot = await firebaseDB.ref(`entries/${uid}`).once('value');
            const data = snapshot.val() || {};
            return Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
        } catch (error) {
            console.error("Error fetching entries:", error);
            return [];
        }
    },

    /**
     * Delete entry from database
     * @param {string} uid - User UID
     * @param {string} entryId - Entry ID
     * @returns {Promise<void>}
     */
    deleteEntry: async function(uid, entryId) {
        try {
            await firebaseDB.ref(`entries/${uid}/${entryId}`).remove();
            console.log("✓ Entry deleted");
        } catch (error) {
            throw new Error(error.message || "Failed to delete entry");
        }
    }
};
