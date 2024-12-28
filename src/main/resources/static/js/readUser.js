
$(document).ready(async function () {
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