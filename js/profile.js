window.addEventListener('DOMContentLoaded', function() {
    // Ось тут були пропущені значки ||. Тепер все вірно:
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || 'null');

    // Перевірка: якщо ми не увійшли в систему - викидаємо на логін
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Заповнюємо сторінку даними користувача
    const usernameElement = document.getElementById('displayUsername');
    const emailElement = document.getElementById('displayEmail');
    const dateElement = document.getElementById('displayDate');
    const inputNameElement = document.getElementById('newUsername');

    if (usernameElement) usernameElement.textContent = currentUser.username;
    if (emailElement) emailElement.textContent = currentUser.email;
    
    if (dateElement && currentUser.loginTime) {
        const date = new Date(currentUser.loginTime);
        dateElement.textContent = date.toLocaleDateString('uk-UA');
    }

    // Заповнюємо поле для редагування іменем
    if (inputNameElement) inputNameElement.value = currentUser.username;
});

// Логіка виходу (кнопка "Вийти")
function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Логіка зміни імені
const editForm = document.getElementById('editProfileForm');
if (editForm) {
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newName = document.getElementById('newUsername').value;
        
        if(newName) {
            // 1. Оновлюємо поточну сесію
            let currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
            currentUser.username = newName;
            
            // 2. Зберігаємо назад (туди, де воно було)
            if(localStorage.getItem('currentUser')) {
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            }

            // 3. Оновлюємо "Головну базу" всіх юзерів
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            let userIndex = users.findIndex(u => u.id === currentUser.userId);
            if(userIndex !== -1) {
                users[userIndex].username = newName;
                localStorage.setItem('users', JSON.stringify(users));
            }

            alert('Профіль оновлено!');
            location.reload(); 
        }
    });
}