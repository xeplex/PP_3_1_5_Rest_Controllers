document.addEventListener('DOMContentLoaded', function () {
    var editUserModal = document.getElementById('editUserModal');
    editUserModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget;

        var userId = button.getAttribute('data-user-id');
        var username = button.getAttribute('data-user-username');
        var email = button.getAttribute('data-user-email');
        var age = button.getAttribute('data-user-age');
        var roles = button.getAttribute('data-user-roles');

        var modalBodyInputId = editUserModal.querySelector('#editUserId');
        var modalBodyInputEmail = editUserModal.querySelector('#editEmail');
        var modalBodyInputUsername = editUserModal.querySelector('#editUsername');
        var modalBodyInputAge = editUserModal.querySelector('#editAge');
        var modalBodyInputRoles = editUserModal.querySelector('#editRoles');
        var modalBodyId = editUserModal.querySelector('#editId');

        if (modalBodyInputId) modalBodyInputId.value = userId;
        if (modalBodyId) modalBodyId.value = userId;
        if (modalBodyInputEmail) modalBodyInputEmail.value = email;
        if (modalBodyInputUsername) modalBodyInputUsername.value = username;
        if (modalBodyInputAge) modalBodyInputAge.value = age;
        if (modalBodyInputRoles) modalBodyInputRoles.value = roles;

        var errorMessage = document.getElementById('editErrorMessage');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
});

var deleteUserModal = document.getElementById('deleteUserModal');
deleteUserModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;

    var userId = button.getAttribute('data-user-id');
    var username = button.getAttribute('data-user-username');
    var email = button.getAttribute('data-user-email');
    var age = button.getAttribute('data-user-age');
    var roles = button.getAttribute('data-user-roles');

    var modalBodyInputId = deleteUserModal.querySelector('#deleteUserId');
    var modalBodyInputEmail = deleteUserModal.querySelector('#deleteEmail');
    var modalBodyInputUsername = deleteUserModal.querySelector('#deleteUsername');
    var modalBodyInputAge = deleteUserModal.querySelector('#deleteAge');
    var modalBodyInputRoles = deleteUserModal.querySelector('#deleteRoles');
    var modalBodyId = deleteUserModal.querySelector('#deleteId');

    if (modalBodyInputId) modalBodyInputId.value = userId;
    if (modalBodyId) modalBodyId.value = userId;
    if (modalBodyInputEmail) modalBodyInputEmail.value = email;
    if (modalBodyInputAge) modalBodyInputAge.value = age;
    if (modalBodyInputUsername) modalBodyInputUsername.value = username;
    if (modalBodyInputRoles) modalBodyInputRoles.value = roles;
});
})
;

document.querySelectorAll('.roleLink').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        document.getElementById('adminPanel').style.display = 'none';
        document.getElementById('userPanel').style.display = 'none';

        document.querySelectorAll('.roleLink').forEach(l => {
            l.classList.remove('bg-primary', 'text-white');
            l.classList.add('text-dark');
        });

        if (this.dataset.role === 'Admin') {
            document.getElementById('adminPanel').style.display = 'block';
            document.getElementById('panelTitle').textContent = 'Admin panel';
            this.classList.add('bg-primary', 'text-white');
        } else if (this.dataset.role === 'User') {
            document.getElementById('userPanel').style.display = 'block';
            document.getElementById('panelTitle').textContent = 'User information-page';
            this.classList.add('bg-primary', 'text-white');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('new_username').value = '';
    document.getElementById('new_email').value = '';
    document.getElementById('new_age').value = '';
    document.getElementById('new_password').value = '';
    document.getElementById('new_role').selectedIndex = -1;
});

(function () {
    'use strict';
    const form = document.querySelector('.add-user-form');

    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
})();

document.addEventListener("DOMContentLoaded", function () {
    const activeTab = /*[[${activeTab}]]*/ 'none';
    console.log("Active Tab:", activeTab);
    if (activeTab === 'newUser') {
        console.log("Active Tab:", activeTab);
        const tab = new bootstrap.Tab(document.querySelector('#newUser'));
        tab.show();
    }
});