// хранит ссылку на элемент внутри дома
// ищет и возвращает ссылку на первый встретившийся элемент , querySelectorALL - что-то вроде массива всех элементов (если ничего нет - вернет пустой массив)
//. в начале означает что метод принимает класс
//если без . - то это элемент
const detailsImageElement = document.querySelector(".details-image");

const detailsTitleElement = document.querySelector(".details-title");

const thumbnailsAnchors = document.querySelectorAll(".thumbnails-ancor");

const detailsSectionElement = document.querySelector(".details-section");

const mainSection = document.querySelector("main");

const HIDDEN = "hidden";

const POINT_CLASS = "is-point";



// всем анкорам установить свво что если на него нажать - будет вызнавана какая-то функция

for (let i = 0; i < thumbnailsAnchors.length; i++) {
    // получает 2 ссва:
    // 1 имя ивента (идентификация по строкам)
    // 2 функция - она может быть анонимной или нет, здесь анонимная, и она видит все что есть в цикле
    thumbnailsAnchors[i].addEventListener("click", function () {
        setDetails(thumbnailsAnchors[i]);
    });
}

function setDetails(anchor) {
    showDetails();
    //здесь мы поменяли разметку
    detailsImageElement.src = anchor.getAttribute("data-details-image");

    //здесь мы помесяли содержимое?
    detailsTitleElement.innerHTML = anchor.getAttribute("data-details-text");


}

function showDetails() {
    mainSection.classList.remove(HIDDEN);
    detailsSectionElement.classList.add(POINT_CLASS);
    // изменить свойство вместо 5 секунд поставить 0, чтобы потом опять назначилось 5 секунд для появления фигуры
    setTimeout(function() {
        detailsSectionElement.classList.remove(POINT_CLASS);
    })
    
}

function hideDetails() {
    mainSection.classList.add(HIDDEN);
}








