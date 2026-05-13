let translations = {};
let currentLang = localStorage.getItem('language') || 'en';

// Load translations
async function loadTranslations() {
    try {
        const response = await fetch('js/translations.json');
        translations = await response.json();
        setLanguage(currentLang);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Set language and update UI
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update HTML language attribute
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Language button click handlers
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    const navItems = document.querySelectorAll('.nav-item');
    const burgerMenu = document.getElementById('burgerMenu');
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobileOverlay');

    // Burger Menu Toggle
    const toggleMenu = () => {
        burgerMenu.classList.toggle('active');
        sidebar.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    };

    burgerMenu.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking nav item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            sidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active navigation based on scroll
    const handleNavigation = () => {
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const sections = document.querySelectorAll('section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            if (item.getAttribute('href').slice(1) === currentSection) {
                item.classList.add('active');
            }
        });
    };
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            navItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    window.addEventListener('scroll', handleNavigation);
    handleNavigation();

    // Load translations after DOM is ready
    loadTranslations();
});

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

document.getElementById('age-value').textContent = calculateAge('2003-01-09');

// Lightbox
document.querySelectorAll('.project-card[data-image]').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const img = card.getAttribute('data-image');
        document.getElementById('lightboxImg').src = img;
        document.getElementById('lightbox').classList.add('active');
    });
});

document.getElementById('lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('active');
});

document.querySelector('.profile-pic-zoom').addEventListener('click', function() {
    document.getElementById('lightboxImg').src = this.getAttribute('data-image');
    document.getElementById('lightbox').classList.add('active');
});
