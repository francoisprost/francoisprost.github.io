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

// Fermer le menu si on clique ailleurs
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