var btnP = document.querySelector('#prevPicture');
var btnN = document.querySelector('#nextPicture');
var list = document.querySelectorAll('li');

var index = 0;

btnN.addEventListener('click', function(event) {
    // event.preventDefault();
        list[index].classList.remove('visible');

    if (list[index] === list[list.length-1]) {
        index = 0;
    } else {
        index++;
    }

    list[index].classList.add('visible');
});

btnP.addEventListener('click', function(event) {
    // event.preventDefault();
    list[index].classList.remove('visible');

    if (list[index] === list[0]) {
        index = list.length-1;
    
    } else {
        index--;
    }
    list[index].classList.add('visible');
});