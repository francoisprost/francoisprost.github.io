document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function() {
    handleNavbarShrink();
};

function handleNavbarShrink() {
    const navbar = document.querySelector('.navbar');
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Fonction pour changer la langue
function toggleLangMenu() {
    document.getElementById("langDropdown").classList.toggle("show");
}

// Fermer le menu ou les modales si on clique ailleurs
window.onclick = function(event) {
    if (!event.target.matches('.lang-dropbtn') && !event.target.closest('.lang-dropbtn')) {
        var dropdowns = document.getElementsByClassName("lang-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }

    // Gestion fermeture modales au clic extérieur
    if (event.target.classList.contains('modal')) {
        closeModalWithAnimation(event.target);
    }

    // Gestion fermeture menu mobile au clic extérieur
    const mobileMenu = document.querySelector('.right-align');
    const mobileToggle = document.querySelector('.menu-toggle');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
            mobileToggle.classList.remove('is-active');
            mobileMenu.classList.remove('active');
        }
    }
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.body.classList.add("no-scroll");
}

function closeModal(modalId) {
    closeModalWithAnimation(document.getElementById(modalId));
}

function closeModalWithAnimation(modal) {
    modal.classList.add('hide');
    setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove('hide');
        document.body.classList.remove("no-scroll");
    }, 300);
}

function switchLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang); // Sauvegarde le choix
    document.getElementById("langDropdown").classList.remove("show");
}

// Initialisation au chargement de la page
const savedLang = localStorage.getItem('lang') || 'en';
document.documentElement.lang = savedLang;

// Animation d'apparition au scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

// Gestion des filtres de compétences
const filterBtns = document.querySelectorAll('.filter-btn');
const skillCards = document.querySelectorAll('.skill-card');
let filterTimeout;

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Gestion de la classe active
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        clearTimeout(filterTimeout);

        // 1. Identifier s'il y a des éléments à cacher pour gérer le délai
        let hasItemsToHide = false;

        skillCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const shouldBeVisible = (filterValue === 'all' || category === filterValue);

            if (!shouldBeVisible && card.style.display !== 'none') {
                hasItemsToHide = true;
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
            }
        });

        // 2. Appliquer les changements après le délai (si nécessaire)
        const delay = hasItemsToHide ? 400 : 0;

        filterTimeout = setTimeout(() => {
            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldBeVisible = (filterValue === 'all' || category === filterValue);

                if (shouldBeVisible) {
                    if (card.style.display === 'none') {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                    }
                    // Force reflow
                    void card.offsetWidth;
                    
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.display = 'none';
                }
            });
        }, delay);
    });
});

// Animation des barres de compétences au scroll
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-bar');
            if (progressBar) {
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
            }
            skillsObserver.unobserve(entry.target); // On n'anime qu'une seule fois
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach((card) => {
    skillsObserver.observe(card);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.right-align');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.right-align > a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('is-active');
            navMenu.classList.remove('active');
        });
    });
}