var header = document.getElementById('Header');

window.addEventListener("scroll", function() {
    var scrollY = window.scrollY;
    var screenWidth = window.innerWidth;

    if (screenWidth >= 992) { // Verifica el ancho de la pantalla
        if (scrollY > 0) {
            header.style.backgroundColor = '#201f1f';
        } else {
            header.style.backgroundColor = 'transparent';
        }
    } 
});