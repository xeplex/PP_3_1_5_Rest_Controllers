document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('new_username').value = '';
    document.getElementById('new_email').value = '';
    document.getElementById('new_age').value = '';
    document.getElementById('new_password').value = '';
    document.getElementById('new_role').selectedIndex = -1;
});

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
            getUsers();
            document.getElementById('new_username').value = '';
            document.getElementById('new_email').value = '';
            document.getElementById('new_age').value = '';
            document.getElementById('new_password').value = '';
            document.getElementById('new_role').selectedIndex = -1;
        } else {
            console.error('Ошибка при добавлении пользователя:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
});