// Wait for DOM to load before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // Rotating content
    const numbers = [
        "200+",
        "24/7",
        "100%"
    ];

    const texts = [
        "Qualified Doctors & Medical Specialist",
        "Fast & Reliable Healthcare Services",
        "Trusted Local Medical Professionals"
    ];

    let currentIndex = 0;
    const rotatingNumber = document.querySelector('.rotating-number');
    const rotatingText = document.querySelector('.rotating-text');

    function rotateContent() {
        currentIndex = (currentIndex + 1) % texts.length;

        rotatingNumber.style.animation = 'none';
        rotatingText.style.animation = 'none';

        setTimeout(() => {
            rotatingNumber.textContent = numbers[currentIndex];
            rotatingText.textContent = texts[currentIndex];
            rotatingNumber.style.animation = 'fadeInOut 9s infinite';
            rotatingText.style.animation = 'fadeInOut 9s infinite';
        }, 50);
    }

    setInterval(rotateContent, 3000);

    // Tab switching
    const registerTab = document.getElementById('registerTab');
    const loginTab = document.getElementById('loginTab');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const switchToLogin = document.getElementById('switchToLogin');
    const switchToRegister = document.getElementById('switchToRegister');

    function showRegister() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }

    function showLogin() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    }

    registerTab.addEventListener('click', showRegister);
    loginTab.addEventListener('click', showLogin);
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showLogin();
    });
    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        showRegister();
    });

    // Phone input
    const phoneInputs = document.querySelectorAll('.phone-input');

    phoneInputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            const cursorPosition = this.selectionStart;
            
            if ((e.key === 'Backspace' && cursorPosition <= 3) || 
                (e.key === 'Delete' && cursorPosition < 3)) {
                e.preventDefault();
            }
            
            if ((e.key === 'Backspace' || e.key === 'Delete') && this.selectionStart < 3) {
                e.preventDefault();
            }
        });

        input.addEventListener('input', function() {
            if (!this.value.startsWith('+63')) {
                const numbers = this.value.replace(/\D/g, '').replace(/^63/, '');
                this.value = '+63' + numbers;
            }
            
            if (this.value.length < 3) {
                this.value = '+63';
            }
        });

        input.addEventListener('focus', function() {
            if (this.value === '' || this.value === '+63') {
                this.value = '+63';
            }
            setTimeout(() => {
                if (this.selectionStart < 3) {
                    this.setSelectionRange(3, 3);
                }
            }, 0);
        });

        input.addEventListener('click', function() {
            if (this.selectionStart < 3) {
                this.setSelectionRange(3, 3);
            }
        });

        input.addEventListener('select', function() {
            if (this.selectionStart < 3) {
                this.setSelectionRange(3, this.selectionEnd);
            }
        });
    });
});