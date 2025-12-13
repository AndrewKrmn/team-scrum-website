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
// --- ЛОГІКА ВХОДУ (LOGIN) ---
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Отримуємо всіх користувачів
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Хешуємо введений пароль, щоб порівняти з тим, що в базі
    const hashedPassword = btoa(password);

    // Шукаємо користувача
    const user = users.find(u => u.email === email && u.password === hashedPassword);

    if (user) {
        // Якщо знайшли — створюємо "сесію"
        const sessionData = {
            userId: user.id,
            username: user.username,
            email: user.email,
            loginTime: new Date().toISOString()
        };

        // Якщо галочка "Запам'ятати мене" стоїть — пишемо в localStorage (назавжди)
        // Якщо ні — в sessionStorage (до закриття вкладки)
        if (remember) {
            localStorage.setItem('currentUser', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
        }

        alert('Вхід успішний! Ласкаво просимо, ' + user.username);
        window.location.href = 'profile.html'; // Перекидаємо на профіль (поки буде 404)
    } else {
        alert('Невірний email або пароль');
    }
});