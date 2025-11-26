/**
 * Database Layer
 * Abstraction for local storage and Firebase sync
 */

class Database {
    constructor() {
        this.data = null;
        this.dbKey = APP_CONFIG.storage.dbKey;
    }

    /**
     * Initialize database from localStorage
     */
    init() {
        const stored = localStorage.getItem(this.dbKey);
        if (stored) {
            this.data = JSON.parse(stored);
            console.log("✓ Database loaded from localStorage");
        } else {
            this.data = this.getSeedData();
            this.save();
            console.log("✓ Database initialized with seed data");
        }
    }

    /**
     * Get seed/default data structure
     * @returns {object} Seed data
     */
    getSeedData() {
        return {
            users: [
                { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', name: 'Admin User' },
                { id: 2, username: 'middleman', email: 'middleman@example.com', role: 'middleman', name: 'Mr. Agent' },
                { id: 3, username: 'user', email: 'user@example.com', role: 'user', name: 'John Doe' }
            ],
            entries: [
                { id: 101, userId: 3, middlemanId: 2, title: 'Website Design', client: 'Acme Corp', start: '2023-10-01T09:00', end: '2023-10-01T17:00', amountAgreed: 5000000, amountReceived: 2500000, status: 'pending', commissionPct: 10, notes: 'Half paid upfront' }
            ]
        };
    }

    /**
     * Save current data to localStorage
     */
    save() {
        localStorage.setItem(this.dbKey, JSON.stringify(this.data));
    }

    /**
     * Reset database to seed data
     */
    reset() {
        this.data = this.getSeedData();
        this.save();
        console.log("✓ Database reset to seed data");
    }

    /**
     * Login with email and password (local fallback)
     * @param {string} email - User email
     * @param {string} password - Password
     * @returns {Promise<object>} User object
     */
    loginLocal = async (email, password) => {
        await new Promise(r => setTimeout(r, 300)); // Simulate network delay
        const user = this.data.users.find(u => u.email === email);
        if (user) {
            const { password, ...safeUser } = user;
            return safeUser;
        }
        throw new Error("Invalid credentials");
    }

    /**
     * Get entries filtered by user role
     * @param {object} user - User object with role and id
     * @returns {array} Filtered entries
     */
    getEntries(user) {
        if (user.role === 'admin') return this.data.entries;
        if (user.role === 'middleman') return this.data.entries.filter(e => e.middlemanId === user.id);
        return this.data.entries.filter(e => e.userId === user.id);
    }

    /**
     * Save or update an entry
     * @param {object} entry - Entry object
     */
    saveEntry(entry) {
        if (entry.id) {
            const idx = this.data.entries.findIndex(e => e.id === entry.id);
            if (idx !== -1) this.data.entries[idx] = entry;
        } else {
            entry.id = Date.now();
            this.data.entries.push(entry);
        }
        this.save();
    }

    /**
     * Delete an entry by ID
     * @param {number} id - Entry ID
     */
    deleteEntry(id) {
        this.data.entries = this.data.entries.filter(e => e.id !== id);
        this.save();
    }

    /**
     * Get all users (without passwords)
     * @returns {array} User objects
     */
    getUsers() {
        return this.data.users.map(u => {
            const { password, ...safe } = u;
            return safe;
        });
    }
}

// Create singleton instance
const DB = new Database();
