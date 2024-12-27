document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const userId = event.target.dataset.userId;
        const user = JSON.parse(event.target.dataset.user);
        populateDeleteModal(user);
    }
});

function populateDeleteModal(user) {
    document.getElementById('deleteUserId').value = user.id;
    document.getElementById('deleteId').value = user.id;
    document.getElementById('deleteUsername').value = user.username;
    document.getElementById('deleteEmail').value = user.email;
    document.getElementById('deleteAge').value = user.age;

    const rolesSelect = document.getElementById('deleteRole');
    Array.from(rolesSelect.options).forEach(option => {
        option.selected = user.roles.some(role => role.name === option.text);
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