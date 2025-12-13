document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Збираємо дані
    const name = document.getElementById('contactName').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    // 2. Створюємо об'єкт повідомлення
    const newMessage = {
        id: Date.now(),
        name: name,
        subject: subject,
        message: message,
        date: new Date().toISOString()
    };

    // 3. Отримуємо старі повідомлення з бази (або створюємо пустий масив)
    const messages = JSON.parse(localStorage.getItem('site_messages') || '[]');

    // 4. Додаємо нове
    messages.push(newMessage);
    localStorage.setItem('site_messages', JSON.stringify(messages));

    // 5. Успіх
    alert('Дякуємо! Ваше повідомлення відправлено.');
    
    // Очищаємо форму
    document.getElementById('contactForm').reset();
});