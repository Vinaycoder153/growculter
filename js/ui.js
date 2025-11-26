/**
 * UI Components and Utilities
 * Modals, toasts, translations, and reusable UI elements
 */

const UIComponents = {
    /**
     * Render entry table
     * @param {array} entries - Array of entry objects
     * @param {boolean} actions - Show edit/delete buttons
     * @returns {string} HTML table string
     */
    entryTable: function(entries, actions = false) {
        if (!entries.length) {
            return '<div class="p-4 text-center text-muted">No records found</div>';
        }

        return `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th data-i18n="title">Title</th>
                            <th data-i18n="client">Client</th>
                            <th data-i18n="amount">Amount</th>
                            <th data-i18n="received">Received</th>
                            <th data-i18n="status">Status</th>
                            ${actions ? '<th data-i18n="actions">Actions</th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${entries.map(e => `
                            <tr>
                                <td>
                                    <div style="font-weight:500">${e.title}</div>
                                    <div class="text-sm text-muted">${new Date(e.start).toLocaleDateString()}</div>
                                </td>
                                <td>${e.client}</td>
                                <td>${MathUtils.formatMoney(e.amountAgreed)}</td>
                                <td class="${e.amountReceived < e.amountAgreed ? 'text-danger' : 'text-success'}">
                                    ${MathUtils.formatMoney(e.amountReceived)}
                                </td>
                                <td>
                                    <span class="status-badge ${e.status === 'done' ? 'status-done' : 'status-pending'}">
                                        ${I18n.t('status' + (e.status.charAt(0).toUpperCase() + e.status.slice(1)))}
                                    </span>
                                </td>
                                ${actions ? `
                                <td>
                                    <button class="btn btn-outline" style="padding:0.25rem 0.5rem" onclick="UIModals.entry(${e.id})" title="Edit">
                                        <i class="fa-solid fa-pen"></i>
                                    </button>
                                    <button class="btn btn-outline text-danger" style="padding:0.25rem 0.5rem" onclick="appUtils.deleteEntry(${e.id})" title="Delete">
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                                ` : ''}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
};

const UIModals = {
    /**
     * Show entry form modal
     * @param {number} id - Entry ID (null for new)
     */
    entry: function(id = null) {
        const entry = id ? DB.data.entries.find(e => e.id === id) : {};
        const isEdit = !!id;
        const users = DB.getUsers().filter(u => u.role === 'middleman');

        const html = `
            <form id="entry-form">
                <input type="hidden" name="id" value="${entry.id || ''}">
                <div class="flex gap-4">
                    <div class="input-group w-full">
                        <label data-i18n="title">Title</label>
                        <input type="text" name="title" aria-label="Title" class="form-control" value="${entry.title || ''}" required>
                    </div>
                    <div class="input-group w-full">
                        <label data-i18n="client">Client</label>
                        <input type="text" name="client" aria-label="Client" class="form-control" value="${entry.client || ''}" required>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="input-group w-full">
                        <label>Start</label>
                        <input type="datetime-local" name="start" aria-label="Start" class="form-control" value="${entry.start || ''}" required>
                    </div>
                    <div class="input-group w-full">
                        <label>End</label>
                        <input type="datetime-local" name="end" aria-label="End" class="form-control" value="${entry.end || ''}">
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="input-group w-full">
                        <label data-i18n="amount">Agreed Amount</label>
                        <input type="number" step="0.01" id="amountInput" aria-label="Agreed Amount" class="form-control" value="${entry.amountAgreed ? MathUtils.fromCents(entry.amountAgreed) : ''}" required>
                    </div>
                    <div class="input-group w-full">
                        <label data-i18n="received">Received Amount</label>
                        <input type="number" step="0.01" id="receivedInput" aria-label="Received Amount" class="form-control" value="${entry.amountReceived ? MathUtils.fromCents(entry.amountReceived) : '0'}">
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="input-group w-full">
                        <label data-i18n="status">Status</label>
                        <select name="status" class="form-control">
                            <option value="pending" ${entry.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="done" ${entry.status === 'done' ? 'selected' : ''}>Done</option>
                        </select>
                    </div>
                    <div class="input-group w-full">
                        <label data-i18n="middleman">Middleman</label>
                        <select name="middlemanId" class="form-control">
                            <option value="">None</option>
                            ${users.map(u => `<option value="${u.id}" ${entry.middlemanId == u.id ? 'selected' : ''}>${u.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="input-group w-full">
                        <label>Commission %</label>
                        <input type="number" name="commissionPct" aria-label="Commission Percent" class="form-control" value="${entry.commissionPct || 0}">
                    </div>
                </div>
                <div class="input-group">
                    <label data-i18n="notes">Notes</label>
                    <textarea name="notes" class="form-control" rows="2">${entry.notes || ''}</textarea>
                </div>
                <div class="flex justify-between mt-4">
                    <button type="button" class="btn btn-outline" onclick="app.ui.closeModal()" data-i18n="cancel">Cancel</button>
                    <button type="submit" class="btn btn-primary" data-i18n="save">Save</button>
                </div>
            </form>
        `;

        app.ui.openModal(isEdit ? 'Edit Entry' : 'New Entry', html);

        document.getElementById('entry-form').onsubmit = function(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const obj = Object.fromEntries(formData.entries());

            obj.id = obj.id ? parseInt(obj.id) : null;
            obj.userId = entry.userId || app.currentUser.id;
            obj.middlemanId = obj.middlemanId ? parseInt(obj.middlemanId) : null;
            obj.amountAgreed = MathUtils.toCents(document.getElementById('amountInput').value);
            obj.amountReceived = MathUtils.toCents(document.getElementById('receivedInput').value);
            obj.commissionPct = parseFloat(obj.commissionPct);

            DB.saveEntry(obj);
            app.ui.closeModal();
            Router.navigate('entries');
            app.ui.toast("Saved successfully");
        };
    },

    /**
     * Show calculator modal
     */
    calculator: function() {
        const html = `
            <div class="card p-4 mb-4" style="background:#f8fafc">
                <div class="input-group">
                    <label>Start Time</label>
                    <input type="time" id="c-start" aria-label="Start Time" class="form-control" onchange="calcLogic()">
                </div>
                <div class="input-group">
                    <label>End Time</label>
                    <input type="time" id="c-end" aria-label="End Time" class="form-control" onchange="calcLogic()">
                </div>
                <div class="input-group">
                    <label>Rate per Hour</label>
                    <input type="number" id="c-rate" aria-label="Rate" class="form-control" placeholder="100.00" oninput="calcLogic()">
                </div>
                <hr class="my-4">
                <div class="flex justify-between items-center">
                    <div>Duration: <span id="c-dur" class="font-bold">0</span> hrs</div>
                    <div>Total: <span id="c-total" class="font-bold text-lg text-success">0.00</span></div>
                </div>
            </div>
        `;
        app.ui.openModal(I18n.t('calcTool'), html);

        window.calcLogic = function() {
            const start = document.getElementById('c-start').value;
            const end = document.getElementById('c-end').value;
            const rate = parseFloat(document.getElementById('c-rate').value) || 0;

            if (start && end) {
                const d1 = new Date("2000-01-01 " + start);
                const d2 = new Date("2000-01-01 " + end);
                let diff = (d2 - d1) / (1000 * 60 * 60);
                if (diff < 0) diff += 24;

                document.getElementById('c-dur').innerText = diff.toFixed(2);
                document.getElementById('c-total').innerText = (diff * rate).toFixed(2);
            }
        };
    }
};

const appUtils = {
    /**
     * Delete an entry with confirmation
     */
    deleteEntry: function(id) {
        if (confirm(I18n.t('deleteConfirm'))) {
            DB.deleteEntry(id);
            Router.navigate('entries');
            app.ui.toast("Deleted");
        }
    },

    /**
     * Export entries to CSV
     */
    exportCSV: function() {
        const entries = DB.getEntries(app.currentUser);

        function esc(v) {
            if (v === null || v === undefined) return '""';
            return '"' + String(v).replace(/"/g, '""') + '"';
        }

        let csv = 'ID,Date,Client,Title,Amount Agreed,Amount Received,Status\n';
        entries.forEach(e => {
            const row = [
                e.id,
                e.start,
                e.client,
                e.title,
                MathUtils.fromCents(e.amountAgreed),
                MathUtils.fromCents(e.amountReceived),
                e.status
            ].map(esc).join(',');
            csv += row + '\n';
        });

        const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'work_entries.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
};
