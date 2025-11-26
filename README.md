# WorkTracker - Time & Money Management App

A modern, modular web application for tracking work entries, payments, and commissions with multi-language support and Firebase authentication.

## 🎯 Features

✅ **Firebase Authentication** - Secure email/password login  
✅ **Multi-Language Support** - English, Kannada, Hindi, Tamil  
✅ **Dark/Light Theme** - Toggle theme preference  
✅ **Work Entry Management** - Create, edit, delete entries  
✅ **Commission Tracking** - Automatic commission calculation  
✅ **Time Calculator** - Quick duration and payment calculation  
✅ **CSV Export** - Export entries for reporting  
✅ **Print Support** - Print-optimized layout  
✅ **Role-Based Access** - Admin, Middleman, User roles  
✅ **Responsive Design** - Works on desktop and mobile  

---

## 📁 Project Structure

```
ganesh-festival/
├── index.html              # Main HTML (templates + entry point)
├── styles.css              # All application styles
├── config.js               # Firebase & app configuration
│
├── utils/
│   ├── math.js             # Math utilities (cents, currency, duration)
│   ├── i18n.js             # Internationalization engine
│   └── firebase.js         # Firebase wrapper service
│
├── db/
│   └── database.js         # Database abstraction layer
│
├── js/
│   ├── app.js              # Main app initialization & UIManager
│   ├── auth.js             # Authentication handler
│   ├── router.js           # Single page routing
│   ├── controllers.js      # Page controllers (views)
│   └── ui.js               # UI components, modals, utilities
│
└── README.md              # This file
```

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (Firebase required)

### Installation

1. **Clone or download the project**
   ```bash
   cd ganesh-festival
   ```

2. **Open in browser**
   ```bash
   # Option 1: Double-click index.html
   # Option 2: Use a local server
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Firebase Setup** (Optional - for real authentication)
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create users in Authentication section
   - Set user profiles in Realtime Database at `users/{uid}`

4. **Demo Credentials** (Fallback - uses localStorage)
   - Use any email in login form
   - Password: `password123`

---

## 🔐 Authentication

### Firebase (Primary)
The app attempts to authenticate via Firebase first. To use:

1. Create users in [Firebase Console](https://console.firebase.google.com/project/ganesha-bc91a/authentication)
2. Add user profiles to Realtime Database:
   ```json
   "users": {
     "userId123": {
       "name": "John Doe",
       "role": "user"
     }
   }
   ```

### Local Fallback
If Firebase is unavailable, the app falls back to localStorage with seed data:
- **Email**: `admin@example.com`, `user@example.com`, `middleman@example.com`
- **Password**: `password123`

---

## 📚 Module Guide

### `config.js`
Centralized configuration for Firebase, storage keys, endpoints, and supported languages.

```javascript
const APP_CONFIG = {
    firebase: { /* Firebase config */ },
    app: { name, version, theme, language },
    storage: { sessionKey, dbKey },
    endpoints: { users, entries, settings }
};
```

### `utils/math.js`
Handles precise floating-point arithmetic using integer cents:
- `toCents()` / `fromCents()` - Convert between formats
- `calcPct()` - Calculate percentage amounts
- `formatMoney()` - Format as INR currency
- `getDuration()` - Calculate hours between timestamps

### `utils/i18n.js`
Manages translations and language switching:
- `I18n.t(key)` - Get translation
- `I18n.setLang(lang)` - Change language
- Supports: English, Kannada, Hindi, Tamil

### `utils/firebase.js`
Firebase wrapper with methods:
- `init()` - Initialize Firebase
- `loginWithEmail()` - Authenticate user
- `logout()` - Sign out
- `saveEntry()` / `getEntries()` - Work entry operations

### `db/database.js`
Local database abstraction:
- `init()` - Load from localStorage
- `getEntries(user)` - Filter by role
- `saveEntry()` / `deleteEntry()` - CRUD operations
- `reset()` - Reset to seed data

### `js/auth.js`
Authentication handler:
- `login()` - Process login form
- `logout()` - Sign out and redirect
- `restoreSession()` - Restore from storage

### `js/router.js`
Single-page routing:
- `navigate(route)` - Route to page
- Supports: `login`, `home`, `entries`, `users`, `settings`

### `js/controllers.js`
Page logic and rendering:
- `dashboard()` - Overview with statistics
- `entries()` - Work entries list
- `users()` - User management (admin)
- `settings()` - App settings

### `js/ui.js`
UI components and utilities:
- `UIComponents.entryTable()` - Render entry table
- `UIModals.entry()` / `calculator()` - Modal forms
- `appUtils.exportCSV()` / `deleteEntry()` - Utilities

### `js/app.js`
Main application orchestrator:
- `app.init()` - Bootstrap app
- `UIManager` - Toast, theme, translations, modals

---

## 💾 Data Storage

### localStorage
Stores:
- `wt_session` - Current user session
- `worktracker_db_v1` - All app data (entries, users)
- `wt_theme` - Current theme preference

### Firebase Realtime Database
Structure:
```
ganesha-bc91a (Project)
├── users/
│   └── {uid}/
│       ├── name: string
│       └── role: "admin" | "middleman" | "user"
└── entries/
    └── {userId}/
        └── {entryId}/
            ├── title, client, amount, status, ...
            └── createdAt, updatedAt
```

---

## 🎨 Customization

### Change Theme Colors
Edit `styles.css`:
```css
:root {
    --primary: #2563eb;      /* Change primary color */
    --success: #10b981;      /* Change success color */
    --danger: #ef4444;       /* Change danger color */
    /* ... more variables ... */
}
```

### Add New Language
1. Add translations to `utils/i18n.js`:
   ```javascript
   const Locales = {
       es: {
           appName: "Rastreador de Trabajo",
           // ... translations ...
       }
   };
   ```

2. Add to language selector in `index.html`:
   ```html
   <option value="es">Español</option>
   ```

### Modify Entry Fields
1. Update entry form in `js/ui.js` (`UIModals.entry()`)
2. Update table columns in `js/ui.js` (`UIComponents.entryTable()`)
3. Update database seed in `db/database.js`

---

## 🔧 Development

### Best Practices

1. **Naming Conventions**
   - Camel case for functions/variables
   - PascalCase for Classes/Constructors
   - Kebab case for CSS classes

2. **Code Organization**
   - One concern per module
   - Minimal dependencies between modules
   - Clear function documentation

3. **Error Handling**
   - Always use try-catch for async operations
   - Show user-friendly error messages
   - Log errors to console for debugging

4. **Performance**
   - Use cents (integers) for monetary calculations
   - Debounce rapid updates
   - Lazy-load data when possible

---

## 🐛 Troubleshooting

### Firebase Not Loading
- Check internet connection
- Verify Firebase SDK URLs in `index.html`
- Check browser console for errors

### Login Fails
- Ensure user exists in Firebase Console
- Verify email format
- Check user profile exists in Realtime DB
- Try fallback: use `admin@example.com` / `password123`

### Data Not Persisting
- Check browser localStorage is enabled
- Check for data quota errors in console
- Try resetting data via Settings page

### Translations Not Showing
- Verify language code in `utils/i18n.js`
- Check `data-i18n` attributes in HTML
- Ensure `I18n.setLang()` is called

---

## 📦 Dependencies

- **Firebase SDK** (v10.7.0) - Authentication & Database
- **FontAwesome** (v6.4.0) - Icons
- **Google Fonts** - Noto Sans

All loaded via CDN - no build process required!

---

## 📄 License

This project is part of the Ganesh Festival application suite.

---

## 🤝 Contributing

1. Keep modules focused and single-purpose
2. Add JSDoc comments for functions
3. Test on desktop and mobile
4. Update README if adding features

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Review Firebase project settings
3. Check data structure in Realtime DB
4. Clear localStorage and restart app

---

**Happy Tracking! 🎯**
#   g r o w c u l t e r  
 