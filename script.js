const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.add('scrolled'); 
        header.classList.remove('scrolled');
    }
});

const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.querySelector('.nav-menu');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('open');
    navMenu.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerBtn.classList.remove('open');
        navMenu.classList.remove('active');
    });
});









document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    
    const formData = {
        name: document.getElementById('name-input').value,
        email: document.getElementById('email-input').value,
        message: document.getElementById('message-input').value
    };

    const button = e.target.querySelector('button');
    button.textContent = 'Надсилання...';
    button.disabled = true;

    try {
        const response = await fetch('https://my-portfolio-nine-nu-23.vercel.app/api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Повідомлення надіслано успішно!');
            e.target.reset(); 
        } else {
            alert('Щось пішло не так. Спробуйте пізніше.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Помилка з\'єднання з сервером.');
    } finally {
        button.textContent = 'Надіслати повідомлення';
        button.disabled = false;
    }
});

