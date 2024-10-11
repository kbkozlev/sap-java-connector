// Handle form submission
document.getElementById('sap-input-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get values from input fields
    const server = document.getElementById('server').value.trim();
    const inum = document.getElementById('inum').value.trim();

    // Get the mode selected (simple or advanced)
    const mode = document.getElementById('mode').value.trim();

    let localString = '';

    if (server) {
        localString += `/H/${server}`;
    }

    if (inum) {
        localString += `/S/32${inum}`;
    }

    if (mode === 'advanced') {
        const client = document.getElementById('client').value.trim();
        const uname = document.getElementById('uname').value.trim();
        const language = document.getElementById('language').value.trim();
        let transaction = document.getElementById('transaction').value.trim();

        if (client) {
            localString += `&clnt=${client}`;
        }

        if (uname) {
            localString += `&user=${uname}`;
        }

        if (language) {
            localString += `&lang=${language}`;
        }

        if (transaction) {
            if (transaction.startsWith("/n")) {
                transaction = transaction.slice(2);
            }
            localString += `&tran=${transaction}`;
        }
    }

    // Display the final connection string only with non-empty parts
    document.getElementById('outputContent').innerText = localString ? `conn=${localString}` : 'No valid connection data provided';
});

// Toggle advanced fields based on selected mode
document.addEventListener('DOMContentLoaded', function () {
    const modeSelect = document.getElementById('mode');
    const advancedFields = document.getElementById('advancedFields');

    // Add event listener to toggle advanced fields
    modeSelect.addEventListener('change', function () {
        if (this.value === 'advanced') {
            advancedFields.classList.remove('hidden');
        } else {
            advancedFields.classList.add('hidden');
        }
    });
});

document.getElementById('client').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 3); // Allow only digits and limit to 3
});

document.getElementById('inum').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 2); // Allow only digits and limit to 2
});

