/**
 * Utilities: Internationalization (i18n)
 * Multi-language support for English, Kannada, Hindi, Tamil
 */

const Locales = {
    en: {
        appName: "WorkTracker",
        username: "Username",
        password: "Password",
        login: "Login",
        navHome: "Overview",
        navEntries: "Work Entries",
        navUsers: "Users",
        navSettings: "Settings",
        logout: "Logout",
        totalEarned: "Total Earned",
        totalDue: "Outstanding Due",
        commissionPaid: "Commission Paid",
        entriesList: "Work Entries List",
        newEntry: "New Entry",
        exportCSV: "Export CSV",
        printPDF: "Print Report",
        calcTool: "Time Calculator",
        title: "Job Title",
        client: "Client",
        status: "Status",
        amount: "Amount",
        actions: "Actions",
        statusDone: "Done",
        statusPending: "In Progress",
        save: "Save",
        cancel: "Cancel",
        calc: "Calculate",
        desc: "Description",
        rate: "Hourly Rate / Fixed",
        hours: "Hours",
        notes: "Notes",
        error: "Error",
        success: "Success",
        deleteConfirm: "Are you sure?",
        middleman: "Middleman",
        received: "Received",
        edit: "Edit",
        delete: "Delete"
    },
    kn: {
        appName: "ವರ್ಕ್ ಟ್ರ್ಯಾಕರ್",
        username: "ಬಳಕೆದಾರ ಹೆಸರು",
        password: "ಗುಪ್ತಪದ",
        login: "ಲಾಗಿನ್",
        navHome: "ಅವಲೋಕನ",
        navEntries: "ಕೆಲಸದ ನಮೂದುಗಳು",
        navUsers: "ಬಳಕೆದಾರರು",
        navSettings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
        logout: "ಲಾಗ್ ಔಟ್",
        totalEarned: "ಗಳಿಸಿದ ಒಟ್ಟು ಮೊತ್ತ",
        totalDue: "ಬಾಕಿ ಉಳಿದಿದೆ",
        commissionPaid: "ಕಮಿಷನ್ ಪಾವತಿಸಲಾಗಿದೆ",
        entriesList: "ಕೆಲಸದ ಪಟ್ಟಿ",
        newEntry: "ಹೊಸ ನಮೂದು",
        exportCSV: "CSV ರಫ್ತು",
        printPDF: "ವರದಿ ಮುದ್ರಿಸಿ",
        calcTool: "ಸಮಯ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
        title: "ಕೆಲಸದ ಶೀರ್ಷಿಕೆ",
        client: "ಗ್ರಾಹಕ",
        status: "ಸ್ಥಿತಿ",
        amount: "ಮೊತ್ತ",
        actions: "ಕ್ರಿಯೆಗಳು",
        statusDone: "ಮುಗಿದಿದೆ",
        statusPending: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
        save: "ಉಳಿಸಿ",
        cancel: "ರದ್ದುಮಾಡಿ",
        calc: "ಲೆಕ್ಕಾಚಾರ",
        desc: "ವಿವರಣೆ",
        rate: "ದರ",
        hours: "ಗಂಟೆಗಳು",
        notes: "ಟಿಪ್ಪಣಿಗಳು",
        middleman: "ಮಧ್ಯವರ್ತಿ",
        received: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
        edit: "ತಿದ್ದಲು",
        delete: "ಅಳಿಸು"
    },
    hi: {
        appName: "वर्क ट्रैकर",
        username: "उपयोगकर्ता नाम",
        password: "पासवर्ड",
        login: "लॉग इन",
        navHome: "अवलोकन",
        navEntries: "कार्य प्रविष्टियाँ",
        navUsers: "उपयोगकर्ता",
        navSettings: "समायोजन",
        logout: "लॉग आउट",
        totalEarned: "कुल कमाई",
        totalDue: "बकाया राशि",
        commissionPaid: "कमीशन भुगतान",
        entriesList: "कार्य सूची",
        newEntry: "नई प्रविष्टि",
        exportCSV: "CSV निर्यात",
        printPDF: "प्रिंट रिपोर्ट",
        calcTool: "समय कैलकुलेटर",
        title: "शीर्षक",
        client: "ग्राहक",
        status: "स्थिति",
        amount: "राशि",
        actions: "क्रियाएं",
        statusDone: "पूर्ण",
        statusPending: "प्रगति में",
        save: "सहेजें",
        cancel: "रद्द करें",
        calc: "गणना",
        desc: "विवरण",
        rate: "दर",
        hours: "घंटे",
        notes: "नोट्स",
        middleman: "बिचौलिया",
        received: "प्राप्त किया",
        edit: "संपादन करें",
        delete: "हटाएं"
    },
    ta: {
        appName: "வொர்க் டிராக்கர்",
        username: "பயனர் பெயர்",
        password: "கடவுச்சொல்",
        login: "உள்நுழைய",
        navHome: "கண்ணோட்டம்",
        navEntries: "வேலை உள்ளீடுகள்",
        navUsers: "பயனர்கள்",
        navSettings: "அமைப்புகள்",
        logout: "வெளியேறு",
        totalEarned: "மொத்த வருவாய்",
        totalDue: "நிலுவையில் உள்ளது",
        commissionPaid: "கமிஷன் வழங்கப்பட்டது",
        entriesList: "வேலை பட்டியல்",
        newEntry: "புதிய பதிவு",
        exportCSV: "CSV ஏற்றுமதி",
        printPDF: "அறிக்கை அச்சிடு",
        calcTool: "நேர கால்குலேட்டர்",
        title: "தலைப்பு",
        client: "வாடிக்கையாளர்",
        status: "நிலை",
        amount: "தொகை",
        actions: "செயல்கள்",
        statusDone: "முடிந்தது",
        statusPending: "செயலில்",
        save: "சேமி",
        cancel: "ரத்துசெய்",
        calc: "கணக்கிடு",
        desc: "விளக்கம்",
        rate: "விகிதம்",
        hours: "மணிநேரம்",
        notes: "குறிப்புகள்",
        middleman: "இடைத்தரகர்",
        received: "பெறப்பட்டது",
        edit: "திருத்து",
        delete: "நீக்கு"
    }
};

const I18n = {
    currentLang: APP_CONFIG.app.defaultLanguage,

    /**
     * Translate a key to current language
     * @param {string} key - Translation key
     * @returns {string} Translated text or key if not found
     */
    t: function(key) {
        return Locales[this.currentLang]?.[key] || key;
    },

    /**
     * Set current language and trigger UI update
     * @param {string} lang - Language code
     */
    setLang: function(lang) {
        if (!Locales[lang]) return;
        this.currentLang = lang;
        document.documentElement.lang = lang;
        app?.ui?.translatePage?.();
    },

    /**
     * Get all locales for a key across languages
     * @param {string} key - Translation key
     * @returns {object} Map of language to translation
     */
    getAll: function(key) {
        return Object.entries(Locales).reduce((acc, [lang, dict]) => {
            acc[lang] = dict[key] || key;
            return acc;
        }, {});
    }
};
