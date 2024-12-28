document.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-button')) {
        const user = JSON.parse(event.target.dataset.user);
        populateEditModal(user);
    }
});

function populateEditModal(user) {
    $('#editUserId').val(user.id);
    $('#editId').val(user.id);
    $('#editUsername').val(user.username);
    $('#editEmail').val(user.email);
    $('#editAge').val(user.age);
    $('#editPassword').val('');
    const rolesSelect = $('#editRole');
    rolesSelect.find('option').each(function () {
        $(this).prop('selected', user.roles.some(role => role.name === $(this).text()));
    });
    const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    editUserModal.show();
}

document.getElementById('editUserModal').querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const userId = document.getElementById('editUserId').value;

    const updatedUser = {
        id: $('#editId').val(),
        username: $('#editUsername').val(),
        email: $('#editEmail').val(),
        age: $('#editAge').val(),
        roles: $('#editRole option:selected').map(function () {
            return $(this).val();
        }).get()
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
            await getUsers();
            $('#editUserModal').modal('hide');
        } else {
            console.error('Ошибка при редактировании пользователя:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
});