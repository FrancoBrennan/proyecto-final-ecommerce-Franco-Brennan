var header = document.getElementById('Header')

window.addEventListener("scroll", function(){
    var scrollY = window.scrollY;
    if(scrollY>0){
        header.style.backgroundColor = '#201f1f';

    }
    else{
        header.style.backgroundColor = 'transparent';
    }

})