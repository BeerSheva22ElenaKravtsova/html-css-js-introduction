const images = [
    "./Images/Monet1.jpeg",
    "./Images/Monet2.jpeg",
    "./Images/Monet3.jpeg",
    "./Images/Monet4.jpeg"
];

let index = 0;

buttonNext.onclick = function () {
    index++;
    if (index >= images.length) {
        index = 0;
    }
    picture.src = images[index];
}

buttonPrev.onclick = function () {
    index--;
    if (index < 0) {
        index = images.length - 1;
    }
    picture.src = images[index];
}

