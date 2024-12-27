document.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-button')) {
        const user = JSON.parse(event.target.dataset.user);
        populateEditModal(user);
    }
});

function populateEditModal(user) {
    document.getElementById('editUserId').value = user.id;
    document.getElementById('editId').value = user.id;
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editAge').value = user.age;
    document.getElementById('editPassword').value = '';
    const rolesSelect = document.getElementById('editRole');
    Array.from(rolesSelect.options).forEach(option => {
        option.selected = user.roles.some(role => role.name === option.text);
    });
    const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    editUserModal.show();
}

document.getElementById('editUserModal').querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const userId = document.getElementById('editUserId').value;

    const updatedUser = {
        id: document.getElementById('editId').value,
        username: document.getElementById('editUsername').value,
        email: document.getElementById('editEmail').value,
        age: document.getElementById('editAge').value,
        roles: Array.from(document.getElementById('editRole').selectedOptions).map(option => option.value)
    };
    const password = document.getElementById('editPassword').value;
    if (password) {
        updatedUser.password = password;
    }

    try {
        const response = await fetch(`${url}${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            getUsers();
            const editUserModal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
            editUserModal.hide();
        } else {
            console.error('Ошибка при редактировании пользователя:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
});