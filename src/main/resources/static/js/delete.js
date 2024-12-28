document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const userId = event.target.dataset.userId;
        const user = JSON.parse(event.target.dataset.user);
        populateDeleteModal(user);
    }
});

function populateDeleteModal(user) {
    $('#deleteUserId').val(user.id);
    $('#deleteId').val(user.id);
    $('#deleteUsername').val(user.username);
    $('#deleteEmail').val(user.email);
    $('#deleteAge').val(user.age);
    const rolesSelect = $('#deleteRole');
    rolesSelect.find('option').each(function() {
        $(this).prop('selected', user.roles.some(role => role.name === $(this).text()));
    });
    const deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    deleteUserModal.show();
}

document.getElementById('deleteUserModal').querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const userId = document.getElementById('deleteUserId').value;

    try {
        const response = await fetch(`${url}${userId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            getUsers();
            const deleteUserModal = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
            deleteUserModal.hide();
        } else {
            console.error('Ошибка при удалении пользователя:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
});