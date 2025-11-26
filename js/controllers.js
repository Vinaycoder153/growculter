/**
 * Page Controllers
 * Business logic for each page view
 */

const Controllers = {
    /**
     * Dashboard/Home view with statistics
     */
    dashboard: function(container) {
        const entries = DB.getEntries(app.currentUser);

        let totalAgreed = 0;
        let totalReceived = 0;
        let commission = 0;

        entries.forEach(e => {
            totalAgreed += e.amountAgreed;
            totalReceived += e.amountReceived;
            if (e.commissionPct > 0) {
                commission += MathUtils.calcPct(e.amountReceived, e.commissionPct);
            }
        });

        const due = totalAgreed - totalReceived;

        container.innerHTML = `
            <div class="stats-grid">
                <div class="card stat-card">
                    <div class="text-muted" data-i18n="totalEarned">Total Earned</div>
                    <div class="stat-value text-success">${MathUtils.formatMoney(totalReceived)}</div>
                </div>
                <div class="card stat-card">
                    <div class="text-muted" data-i18n="totalDue">Outstanding Due</div>
                    <div class="stat-value text-danger">${MathUtils.formatMoney(due)}</div>
                </div>
                <div class="card stat-card">
                    <div class="text-muted" data-i18n="commissionPaid">Commission Paid</div>
                    <div class="stat-value text-warning">${MathUtils.formatMoney(commission)}</div>
                </div>
            </div>
            <div class="card">
                <h3 class="text-lg mb-4" data-i18n="entriesList">Recent Activity</h3>
                ${UIComponents.entryTable(entries.slice(0, 5))}
            </div>
        `;
    },

    /**
     * Work Entries management view
     */
    entries: function(container) {
        const entries = DB.getEntries(app.currentUser);

        container.innerHTML = `
            <div class="flex justify-between items-center mb-4 header-actions">
                <div class="flex gap-2">
                    <button class="btn btn-primary" onclick="UIModals.entry()">
                        <i class="fa-solid fa-plus"></i> <span data-i18n="newEntry">New</span>
                    </button>
                    <button class="btn btn-outline" onclick="UIModals.calculator()">
                        <i class="fa-solid fa-calculator"></i> <span data-i18n="calcTool">Calc</span>
                    </button>
                </div>
                <div class="flex gap-2">
                    <button class="btn btn-outline" onclick="appUtils.exportCSV()">
                        <i class="fa-solid fa-file-csv"></i> CSV
                    </button>
                    <button class="btn btn-outline" onclick="window.print()">
                        <i class="fa-solid fa-print"></i> PDF
                    </button>
                </div>
            </div>
            <div class="card">
                ${UIComponents.entryTable(entries, true)}
            </div>
        `;
    },

    /**
     * User Management view (admin only)
     */
    users: function(container) {
        if (app.currentUser.role !== 'admin') {
            container.innerHTML = '<div class="card"><p class="text-danger">Access Denied</p></div>';
            return;
        }

        const users = DB.getUsers();
        container.innerHTML = `
            <div class="card">
                <h3 class="text-lg mb-4" data-i18n="navUsers">User Management</h3>
                <table class="w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(u => `
                            <tr>
                                <td>${u.id}</td>
                                <td>${u.email}</td>
                                <td>${u.name}</td>
                                <td><span class="status-badge status-done">${u.role}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    },

    /**
     * Settings/Preferences view
     */
    settings: function(container) {
        container.innerHTML = `
            <div class="card">
                <h3 class="text-lg mb-4" data-i18n="navSettings">Settings</h3>
                <div class="input-group">
                    <label>Data Management</label>
                    <p class="text-sm text-muted mb-2">Reset database to initial seed data. Warning: Clears all your changes.</p>
                    <button class="btn btn-danger" onclick="if(confirm(I18n.t('deleteConfirm'))) { DB.reset(); location.reload(); }">
                        Reset Data
                    </button>
                </div>
            </div>
        `;
    }
};
