document.addEventListener('DOMContentLoaded', function () {
    getUsers();
});

const url = 'http://localhost:8080/api/users/';

async function getUsers() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {"Accept": "application/json"}
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
            <button type="button" class="btn btn-danger delete-button" data-user='${JSON.stringify(user)}'>
                DELETE
            </button>
        </td>
    `;
    return row;
}

$(document).ready(async function (){
    const response = await fetch('/api/current');
    const user = await response.json();

    $('#currentUser').text(user.username);
    $('#roles').text(user.roles.map(role => role.authority).join(', '));

    const userRow = `
            <tr>
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${user.roles.map(role => role.authority).join(', ')}</td>
            </tr>`;
    $('#userTableBody').append(userRow);
});