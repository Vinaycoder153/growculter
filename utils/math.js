/**
 * Utilities: Math Operations
 * Precise floating-point arithmetic using cents (integers)
 */

const MathUtils = {
    /**
     * Convert decimal amount to cents (integers)
     * @param {number} amount - Decimal amount (e.g., 100.50)
     * @returns {number} Amount in cents
     */
    toCents: (amount) => Math.round(parseFloat(amount || 0) * 100),

    /**
     * Convert cents back to decimal string
     * @param {number} cents - Amount in cents
     * @returns {string} Formatted to 2 decimal places
     */
    fromCents: (cents) => (cents / 100).toFixed(2),

    /**
     * Multiply cents by multiplier
     * @param {number} cents - Amount in cents
     * @param {number} multiplier - Multiplier value
     * @returns {number} Result in cents
     */
    multiply: (cents, multiplier) => Math.round(cents * multiplier),

    /**
     * Calculate percentage of amount
     * @param {number} cents - Amount in cents
     * @param {number} percent - Percentage value (0-100)
     * @returns {number} Percentage amount in cents
     */
    calcPct: (cents, percent) => Math.round(cents * (percent / 100)),

    /**
     * Format currency using Indian Rupee locale
     * @param {number} cents - Amount in cents
     * @returns {string} Formatted currency string
     */
    formatMoney: (cents) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(cents / 100);
    },

    /**
     * Calculate duration between two timestamps
     * @param {string} startStr - ISO datetime string
     * @param {string} endStr - ISO datetime string
     * @returns {number} Duration in hours (decimal)
     */
    getDuration: (startStr, endStr) => {
        if (!startStr || !endStr) return 0;
        const start = new Date(startStr);
        const end = new Date(endStr);
        const diffMs = end - start;
        return Math.max(0, diffMs / (1000 * 60 * 60));
    }
};
