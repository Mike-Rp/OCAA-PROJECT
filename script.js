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

    // If redirected with ?login=1 or ?show=login, open Login tab
    const params = new URLSearchParams(window.location.search);
    const shouldShowLogin = params.get('login') === '1' || params.get('show') === 'login';
    if (shouldShowLogin) {
        showLogin();
    }

    // Show feedback for registration outcomes
    const err = params.get('err');
    const ok = params.get('ok');
    if (ok === '1' && shouldShowLogin) {
        setTimeout(() => alert('Registration successful. Please log in.'), 100);
    } else if (err) {
        const messages = {
            required: 'All fields are required.',
            nomatch: 'Passwords do not match.',
            invalid_phone: 'Invalid phone number. Use +63 followed by digits.',
            duplicate: 'Phone number is already registered.',
            insert: 'Registration failed due to a database error.'
        };
        const msg = messages[err] || 'Something went wrong.';
        setTimeout(() => alert(msg), 100);
    }

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


function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    const isPassword = input.type === 'password';
    
    input.type = isPassword ? 'text' : 'password';
    
   
    icon.innerHTML = isPassword ? 
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>` :
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>`;
}

function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    const isPassword = input.type === 'password';
    
    input.type = isPassword ? 'text' : 'password';
    
    // Toggle between eye and eye-off icons
    icon.innerHTML = isPassword ? 
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>` :
        `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>`;
}


