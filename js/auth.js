// Функція реєстрації
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Отримуємо дані з форми
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // 1. Валідація: Чи співпадають паролі?
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Паролі не співпадають');
        return;
    }

    // Отримуємо базу користувачів з localStorage (або створюємо порожню)
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // 2. Валідація: Чи існує вже такий email?
    if (users.some(u => u.email === email)) {
        showError('email', 'Користувач з таким email вже існує');
        return;
    }

    // Хешування пароля (імітація для безпеки)
    const hashedPassword = btoa(password);

    // Створюємо об'єкт нового користувача
    const newUser = {
        id: Date.now(),
        username: username,
        email: email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };

    // Зберігаємо в "базу даних" (localStorage)
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Успіх!
    alert('Реєстрація успішна! Тепер ви можете увійти.');
    window.location.href = 'login.html'; // Перенаправляємо на логін (якого ще немає, буде 404, це ок)
});

// Допоміжна функція для показу помилок під полем
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorSpan = field.nextElementSibling;
    
    errorSpan.textContent = message;
    field.classList.add('error');

    // Прибираємо помилку через 3 секунди
    setTimeout(() => {
        errorSpan.textContent = '';
        field.classList.remove('error');
    }, 3000);
}