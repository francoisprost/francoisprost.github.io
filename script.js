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
    growShrinkLogo()
  };
  
  function growShrinkLogo() {
    var Logo = document.getElementById("logo")
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
      Logo.style.width = '30px';
    } else {
      Logo.style.width = '60px';
    }
  }