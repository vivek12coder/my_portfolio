// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Dynamic Footer Year
document.querySelector('#year').textContent = new Date().getFullYear();

// Matrix Background Effect
const matrixCanvas = document.getElementById('matrix-bg');
const matrixCtx = matrixCanvas.getContext('2d');

function resizeMatrixCanvas() {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
}

resizeMatrixCanvas();
window.addEventListener('resize', resizeMatrixCanvas);

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const fontSize = 14;
const columns = matrixCanvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    matrixCtx.fillStyle = '#00ddeb';
    matrixCtx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

// Particle Effect for Navbar
const navCanvas = document.getElementById('particles-nav');
const navCtx = navCanvas.getContext('2d');

function resizeNavCanvas() {
    navCanvas.width = window.innerWidth;
    navCanvas.height = document.querySelector('nav').offsetHeight;
}

resizeNavCanvas();
window.addEventListener('resize', resizeNavCanvas);

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
        this.glow = Math.random() * 10 + 5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
        if (this.glow > 0) this.glow -= 0.2;
    }

    draw() {
        navCtx.fillStyle = this.color;
        navCtx.shadowBlur = this.glow;
        navCtx.shadowColor = this.color;
        navCtx.beginPath();
        navCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        navCtx.fill();
        navCtx.shadowBlur = 0;
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animateParticles() {
    navCtx.clearRect(0, 0, navCanvas.width, navCanvas.height);
    handleParticles();
    requestAnimationFrame(animateParticles);
}

document.querySelectorAll('.nav-link, .nav-profile-img').forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(
                rect.left + Math.random() * rect.width,
                rect.top - window.scrollY + Math.random() * rect.height
            ));
        }
    });
});

animateParticles();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Form Submission with Feedback
const form = document.querySelector('#contactForm');
const formFeedback = document.getElementById('formFeedback');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formFeedback.textContent = 'Sending...';
    formFeedback.className = 'form-feedback';

    const formData = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        const result = await response.json();
        if (response.ok) {
            formFeedback.textContent = 'Message sent successfully!';
            formFeedback.className = 'form-feedback success';
            form.reset();
            setTimeout(() => {
                formFeedback.textContent = '';
            }, 5000);
        } else {
            throw new Error(result.message || 'Failed to send message');
        }
    } catch (error) {
        formFeedback.textContent = `Error: ${error.message}. Please check your form details or try again later.`;
        formFeedback.className = 'form-feedback error';
        setTimeout(() => {
            formFeedback.textContent = '';
        }, 5000);
    }
});

// Cursor Trail Effect
const trails = [];
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
    document.body.appendChild(trail);

    trails.push(trail);
    if (trails.length > 20) {
        const oldTrail = trails.shift();
        oldTrail.remove();
    }

    setTimeout(() => {
        trail.style.opacity = '0';
        setTimeout(() => trail.remove(), 500);
    }, 300);
});

// Navbar Scroll Shadow
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
