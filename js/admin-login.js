// Admin Login JS extracted from admin-login.html

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
        element.classList.add('show');
    }
}

function showSuccess(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = message;
        element.classList.add('show');
    }
}

function clearAllMessages() {
    const errors = document.querySelectorAll('.error-msg');
    const successes = document.querySelectorAll('.success-msg');
    errors.forEach(e => e.classList.remove('show'));
    successes.forEach(s => s.classList.remove('show'));
}

function handleLogin(event) {
    event.preventDefault();
    clearAllMessages();
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    if (!username || !password) {
        showError('adminError', 'Please fill in all fields.');
        return;
    }
    handleAdminLogin(username, password);
}

function handleAdminLogin(username, password) {
    const storedAdmin = JSON.parse(localStorage.getItem('adminCredentials')) || {
        username: 'admin',
        password: 'developer',
        email: 'admin@logbook.com'
    };
    if (username.toLowerCase() !== storedAdmin.username.toLowerCase() || password !== storedAdmin.password) {
        showError('adminError', 'Invalid username or password.');
        return;
    }
    localStorage.setItem('currentUser', JSON.stringify({
        username: username,
        email: storedAdmin.email || 'admin@logbook.com',
        role: 'admin'
    }));
    showSuccess('adminSuccess', 'Login successful! Redirecting...');
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 500);
}

window.addEventListener('DOMContentLoaded', function () {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.role === 'admin') {
            window.location.href = 'dashboard.html';
        } else if (user.role === 'student') {
            window.location.href = 'user dashboard.html';
        }
    }
});
