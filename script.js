document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 12px rgba(31, 27, 25, 0.08)';
        }
    });

    const donateButtons = document.querySelectorAll('.btn-donate');
    const donationMessage = document.getElementById('donationMessage');

    donateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            donateButtons.forEach(btn => {
                btn.style.background = 'transparent';
                btn.style.color = 'var(--bg-white)';
            });
            button.style.background = 'var(--bg-white)';
            button.style.color = 'var(--primary-color)';

            const amount = button.getAttribute('data-amount');
            if (amount) {
                donationMessage.textContent = `Merci. Vous avez selectionne un don de ${amount}€.`;
            } else if (button.classList.contains('custom-donate')) {
                donationMessage.textContent = 'Merci. Indiquez votre montant libre en nous contactant.';
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formMessage.textContent = 'Merci de remplir tous les champs.';
                formMessage.style.color = '#b03030';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Merci de saisir une adresse email valide.';
                formMessage.style.color = '#b03030';
                return;
            }

            formMessage.textContent = 'Message recu. Nous revenons vers vous rapidement.';
            formMessage.className = 'form-message success-msg';
            contactForm.reset();

            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        });
    }

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.card, .icon-box, .xanthe-item, .timeline-item, .impact-card, .testimonial, .media-placeholder, .media-image, .contact-card, .cta-container, .budget-card, .budget-bar, .budget-total, .insta-card'
    );
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Stagger effect for cards inside sections
    document.querySelectorAll('.grid-4, .grid-3, .budget-grid, .impact-grid').forEach(grid => {
        [...grid.children].forEach((child, idx) => {
            child.style.transitionDelay = `${idx * 80}ms`;
        });
    });

});
