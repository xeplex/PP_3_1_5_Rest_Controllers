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

$(document).ready(async function () {
    const response = await fetch('api/current');
    const user = await response.json();

    $('#currentUser').text(user.username);
    $('#roles').text(user.roles.map(role => role.authority).join(', '));
});