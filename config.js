/**
 * Application Configuration
 * Centralized settings for Firebase, locales, and app defaults
 */

const APP_CONFIG = {
    // Firebase Configuration
    firebase: {
        apiKey: "AIzaSyCAtAPyouHyaBPJdv02M9dipOU4ZunbuQM",
        authDomain: "ganesha-bc91a.firebaseapp.com",
        databaseURL: "https://ganesha-bc91a-default-rtdb.firebaseio.com",
        projectId: "ganesha-bc91a",
        storageBucket: "ganesha-bc91a.firebasestorage.app",
        messagingSenderId: "766383565356",
        appId: "1:766383565356:web:21479e986035f99e817f89",
        measurementId: "G-H5KNBX1Q4K"
    },

    // App Settings
    app: {
        name: "WorkTracker",
        version: "1.0.0",
        defaultTheme: "light",
        defaultLanguage: "en"
    },

    // Storage Keys
    storage: {
        sessionKey: "wt_session",
        dbKey: "worktracker_db_v1"
    },

    // API Endpoints
    endpoints: {
        users: "users",
        entries: "entries",
        settings: "settings"
    }
};

// Supported Languages
const SUPPORTED_LANGUAGES = {
    en: "English",
    kn: "ಕನ್ನಡ",
    hi: "हिंदी",
    ta: "தமிழ்"
};
