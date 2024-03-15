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
    scrollFunction()
  };
  
  function growShrinkLogo() {
    var Logo = document.getElementById("logo")
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
      Logo.style.width = '30px';
    } else {
      Logo.style.width = '60px';
    }
  }

  function scrollFunction() {
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
      document.getElementById("nom").style.fontSize = "16px";
    } else {
      document.getElementById("nom").style.fontSize = "30px";
    }
  }