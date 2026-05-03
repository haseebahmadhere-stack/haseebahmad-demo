/* ============================================
   HASEEB AHMAD - PORTFOLIO WEBSITE
   JavaScript: Animations, Chatbot, Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Typing Effect ----------
    const typedName = document.getElementById('typed-name');
    const nameText = 'Haseeb Ahmad';
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;

    function typeEffect() {
        if (!isDeleting) {
            typedName.textContent = nameText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === nameText.length) {
                typingSpeed = 2500;
                isDeleting = true;
            } else {
                typingSpeed = 120;
            }
        } else {
            typedName.textContent = nameText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                typingSpeed = 500;
            } else {
                typingSpeed = 60;
            }
        }
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    // ---------- Particle Background ----------
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        const colors = [
            'rgba(139, 92, 246, 0.5)',
            'rgba(6, 182, 212, 0.4)',
            'rgba(59, 130, 246, 0.4)',
            'rgba(168, 85, 247, 0.3)'
        ];
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }

    // ---------- Sticky Navbar ----------
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---------- Mobile Hamburger Menu ----------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ---------- Active Nav Link on Scroll ----------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ---------- Scroll Animations ----------
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(el => scrollObserver.observe(el));

    // ---------- Skill Progress Bars ----------
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ---------- Scroll To Top Button ----------
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- Contact Form ----------
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const message = document.getElementById('form-message').value;

        if (name && email && message) {
            alert('Thank you, ' + name + '! Your message has been sent successfully.');
            contactForm.reset();
        }
    });

    // ---------- Chatbot ----------
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', sender + '-message');
        const p = document.createElement('p');
        if (sender === 'user') {
            p.textContent = text;
        } else {
            p.innerHTML = text;
        }
        messageDiv.appendChild(p);
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(userMsg) {
        const msg = userMsg.toLowerCase().trim();

        // Greeting patterns
        if (msg.match(/^(hi|hello|hey|greetings|howdy|sup|what's up)/)) {
            return "Hello! I'm Haseeb's AI assistant. You can ask me about his skills, projects, education, or contact info!";
        }

        // Identity
        if (msg.includes('who are you') || msg.includes('your name') || msg.includes('who is haseeb')) {
            return "I'm the AI assistant for <strong>Haseeb Ahmad</strong>, a BS Artificial Intelligence student (2nd semester) at Superior University, Gold Campus Lahore. He's passionate about AI, Machine Learning, and building intelligent applications!";
        }

        // Skills
        if (msg.includes('skill') || msg.includes('tech') || msg.includes('language') || msg.includes('what can')) {
            return "Haseeb's current skills include: <strong>HTML, CSS, JavaScript, C++</strong>, and <strong>Python</strong> (currently improving). He's also exploring AI skills like Machine Learning, Deep Learning, Data Science, NLP, and Computer Vision!";
        }

        // Projects
        if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio') || msg.includes('case stud')) {
            return "Haseeb has built: <br>1. <strong>Universal CGPA Calculator</strong> - Efficiently calculates CGPA for students with a clean UI.<br>2. <strong>Task Manager App</strong> - Helps students manage tasks and deadlines for better productivity.";
        }

        // Education
        if (msg.includes('education') || msg.includes('university') || msg.includes('study') || msg.includes('degree') || msg.includes('semester')) {
            return "Haseeb is pursuing a <strong>BS in Artificial Intelligence</strong> (2nd Semester) at <strong>Superior University, Gold Campus Lahore</strong>, Pakistan.";
        }

        // Contact
        if (msg.includes('contact') || msg.includes('email') || msg.includes('reach') || msg.includes('connect')) {
            return "You can reach Haseeb at:<br>📧 <strong>haseebahmadhere@gmail.com</strong><br>🔗 <a href='https://github.com/haseebahmadhere-stack' target='_blank' style='color: #06b6d4;'>GitHub</a><br>🔗 <a href='https://www.linkedin.com/in/haseeb-ahmad-38b15b379/' target='_blank' style='color: #06b6d4;'>LinkedIn</a>";
        }

        // Location
        if (msg.includes('location') || msg.includes('where') || msg.includes('city') || msg.includes('country')) {
            return "Haseeb is based in <strong>Lahore, Pakistan</strong>.";
        }

        // AI / Future
        if (msg.includes('ai') || msg.includes('artificial intelligence') || msg.includes('future') || msg.includes('machine learning') || msg.includes('research')) {
            return "Haseeb is deeply interested in AI and its future applications including: AI-powered automation, smart education systems, ML in real-world applications, AI in healthcare, and intelligent assistants!";
        }

        // Resume
        if (msg.includes('resume') || msg.includes('cv') || msg.includes('download')) {
            return "You can download Haseeb's resume by clicking the <strong>Download Resume</strong> button in the Resume section, or <a href='resume.pdf' download style='color: #06b6d4;'>click here</a>!";
        }

        // Thanks
        if (msg.match(/^(thanks|thank you|thx|ty)/)) {
            return "You're welcome! Feel free to ask anything else about Haseeb. 😊";
        }

        // Help
        if (msg.includes('help') || msg.includes('what can i ask')) {
            return "You can ask me about:<br>• Who is Haseeb?<br>• Skills & Technologies<br>• Projects<br>• Education<br>• Contact Info<br>• Location<br>• AI & Research Interests<br>• Resume";
        }

        // Default
        return "I'm not sure about that, but I'd love to help! Try asking about Haseeb's <strong>skills</strong>, <strong>projects</strong>, <strong>education</strong>, or <strong>contact info</strong>. Type <strong>help</strong> to see all topics!";
    }

    function handleSend() {
        const userText = chatbotInput.value.trim();
        if (!userText) return;

        addMessage(userText, 'user');
        chatbotInput.value = '';

        // Simulate typing delay
        setTimeout(() => {
            const response = getBotResponse(userText);
            addMessage(response, 'bot');
        }, 600);
    }

    chatbotSend.addEventListener('click', handleSend);
    chatbotInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // ---------- Parallax Effect on Mouse Move ----------
    const hero = document.querySelector('.hero');
    const cube = document.querySelector('.cube');

    if (hero && cube) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            cube.style.transform = 'rotateX(' + (y * 30) + 'deg) rotateY(' + (x * 30) + 'deg)';
        });

        hero.addEventListener('mouseleave', () => {
            cube.style.transform = '';
        });
    }

});
