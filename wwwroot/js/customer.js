const apiUrl = "/api/CustomersApi";

let table;

$(document).ready(function () {
    // Initialize DataTable
    table = $('#customerTable').DataTable({
        ajax: {
            url: apiUrl,
            dataSrc: '' // because API returns an array
        },
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'email' },
            { data: 'phone' },
            {
                data: null,
                render: function (data) {
                    return `
                        <button class="btn btn-sm btn-warning" onclick="openEditModal(${data.id}, '${data.name}', '${data.email}', '${data.phone}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="openDeleteModal(${data.id}, '${data.name}')">Delete</button>
                    `;
                }
            }
        ],
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50],
        responsive: true
    });
});

// Function to reload DataTable
function reloadTable() {
    table.ajax.reload(null, false); // reload without resetting pagination
}

// ------------------ CREATE ------------------
function openCreateModal() {
    $("#createError").addClass("d-none");
    $("#createName").val("");
    $("#createEmail").val("");
    $("#createPhone").val("");
    $("#createNameError, #createEmailError, #createPhoneError").text('');
    new bootstrap.Modal(document.getElementById("createModal")).show();
}

async function createCustomer() {
    const name = $("#createName").val().trim();
    const email = $("#createEmail").val().trim();
    const phone = $("#createPhone").val().trim();

    // Clear previous errors
    $("#createNameError, #createEmailError, #createPhoneError").text('');

    let isValid = true;

    if (!name) {
        $("#createNameError").text("Name is required");
        isValid = false;
    }

    if (!email) {
        $("#createEmailError").text("Email is required");
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $("#createEmailError").text("Invalid email format");
        isValid = false;
    }

    if (!phone) {
        $("#createPhoneError").text("Phone is required");
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        $("#createPhoneError").text("Invalid phone number");
        isValid = false;
    }

    if (!isValid) return;

    const customer = { name, email, phone };

    const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });

    if (!res.ok) {
        alert("Failed to create customer");
        return;
    }

    bootstrap.Modal.getInstance(document.getElementById("createModal")).hide();
    reloadTable(); // <-- use reloadTable instead of loadCustomers
}

// ------------------ EDIT ------------------
function openEditModal(id, name, email, phone) {
    $("#editError").addClass("d-none");
    $("#editId").val(id);
    $("#editName").val(name);
    $("#editEmail").val(email);
    $("#editPhone").val(phone);
    $("#editNameError, #editEmailError, #editPhoneError").text('');
    new bootstrap.Modal(document.getElementById("editModal")).show();
}

async function updateCustomer() {
    const id = $("#editId").val();
    const name = $("#editName").val().trim();
    const email = $("#editEmail").val().trim();
    const phone = $("#editPhone").val().trim();

    $("#editNameError, #editEmailError, #editPhoneError").text('');

    let isValid = true;

    if (!name) {
        $("#editNameError").text("Name is required");
        isValid = false;
    }

    if (!email) {
        $("#editEmailError").text("Email is required");
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $("#editEmailError").text("Invalid email format");
        isValid = false;
    }

    if (!phone) {
        $("#editPhoneError").text("Phone is required");
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        $("#editPhoneError").text("Invalid phone number");
        isValid = false;
    }

    if (!isValid) return;

    const customer = { id, name, email, phone };

    const res = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    });

    if (!res.ok) {
        $("#editError").removeClass("d-none").text("Failed to update customer.");
        return;
    }

    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
    reloadTable(); // <-- use reloadTable instead of loadCustomers
}

// ------------------ DELETE ------------------
function openDeleteModal(id, name) {
    $("#deleteId").val(id);
    $("#deleteName").text(name);
    new bootstrap.Modal(document.getElementById("deleteModal")).show();
}

async function confirmDelete() {
    const id = $("#deleteId").val();

    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (!res.ok) {
        alert("Failed to delete customer.");
        return;
    }

    bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
    reloadTable();
}
