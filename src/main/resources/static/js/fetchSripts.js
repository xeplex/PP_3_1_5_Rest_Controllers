document.addEventListener('DOMContentLoaded', function () {
    getUsers();
});

// URL для API
const url = 'http://localhost:8080/api/users/';

// Получение списка пользователей
async function getUsers() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            const users = await response.json();
            const rows = document.querySelector("tbody");
            rows.innerHTML = '';
            users.forEach(user => rows.appendChild(createRow(user)));
        } else {
            console.error('Ошибка при загрузке пользователей:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
}

// Создание строки таблицы для пользователя
function createRow(user) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.roles.map(role => role.name).join(', ')}</td>
        <td>
            <button type="button" class="btn btn-primary edit-button" data-user='${JSON.stringify(user)}'>
                EDIT
            </button>
        </td>
        <td>
            <button type="button" class="btn btn-danger delete-button" data-user-id="${user.id}">
                DELETE
            </button>
        </td>
    `;
    return row;
}

// Добавление нового пользователя
document.querySelector('.add-user-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const newUser  = {
        username: document.getElementById('new_username').value,
        email: document.getElementById('new_email').value,
        age: document.getElementById('new_age').value,
        password: document.getElementById('new_password').value,
        roles: Array.from(document.getElementById('new_role').selectedOptions).map(option => option.value)
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            getUsers(); // Обновить список пользователей
            document.querySelector('.add-user-form').reset(); // Сбросить форму
        } else {
            console.error('Ошибка при добавлении пользователя:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
});

// Обработчик событий для кнопок редактирования
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-button')) {
        const user = JSON.parse(event.target.dataset.user);
        populateEditModal(user);
    }
});

// Заполнение модального окна редактирования
function populateEditModal(user) {
    document.getElementById('editUserId').value = user.id;
    document.getElementById('editUsername').value = user.username;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editAge').value = user.age;
    // Установка ролей в модальном окне (если необходимо)
    const rolesSelect = document.getElementById('editRole');
    Array.from(rolesSelect.options).forEach(option => {
        option.selected = user.roles.some(role => role.name === option.text);
    });

    const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    editUserModal.show();
}

// Обработка формы редактирования
document.getElementById('editUserModal').querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const userId = document.getElementById('editUserId').value;
    const updatedUser  = {
        username: document.getElementById('editUsername').value,
        email: document.getElementById('editEmail').value,
        age: document.getElementById('editAge').value,
        roles: Array.from(document.getElementById('editRole').selectedOptions).map(option => option.value)
    };

    try {
        const response = await fetch(`${url}${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser )
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

// Обработка удаления пользователя
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const userId = event.target.dataset.userId;
        document.getElementById('deleteUserId').value = userId;
        const deleteUserModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
        deleteUserModal.show();
    }
});

// Подтверждение удаления пользователя
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