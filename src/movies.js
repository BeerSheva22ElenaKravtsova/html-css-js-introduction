import moviesObj from "./movies.json" assert {type: 'json'};

// хранит ссылку на элемент внутри дома
// ищет и возвращает ссылку на первый встретившийся элемент , querySelectorALL - что-то вроде массива всех элементов (если ничего нет - вернет пустой массив)
//. в начале означает что метод принимает класс
//если без . - то это элемент
const detailsContainer = document.getElementById("detailsContainer");

const detailsImageElement = document.querySelector(".details-image");

const detailsTitleElement = document.querySelector(".details-title");

const detailsSectionElement = document.querySelector(".details-section");

const mainSection = document.querySelector("main");

const HIDDEN = "hidden";

const POINT_CLASS = "is-point";

const wordsLimit = 2;

const httpPrefixElement = moviesObj.httpPrefix;
const thumbnailsList = document.getElementById("thumbnailsList");

function setThumbnailsItem() {
    let res = [];
    res.length = moviesObj.results.length;
    return [...res]
        .map((v, index) => `
        <li class="thumbnails-item">
          <a href="#" class="thumbnails-ancor" data-details-image="${httpPrefixElement.concat(moviesObj.results[index].backdrop_path)}"
            data-details-text="${moviesObj.results[index].overview.slice(0,100)}">
            <img src="${httpPrefixElement.concat(moviesObj.results[index].poster_path)}" class="thumbnails-image">
            <span class="thumbnails-title">${moviesObj.results[index].title}</span>
          </a>
        </li>`)
        .join("");
}

thumbnailsList.innerHTML = setThumbnailsItem();

const thumbnailsAnchors = document.querySelectorAll(".thumbnails-ancor");

const thumbnailsItems = document.querySelectorAll(".thumbnails-item");

const thumbnailsTitles = document.querySelectorAll(".thumbnails-title");


// всем анкорам установить свво что если на него нажать - будет вызнавана какая-то функция

// for (let i = 0; i < thumbnailsAnchors.length; i++) {
//     // получает 2 ссва:
//     // 1 имя ивента (идентификация по строкам)
//     // 2 функция - она может быть анонимной или нет, здесь анонимная, и она видит все что есть в цикле
//     thumbnailsAnchors[i].addEventListener("click", function () {
//         setDetails(thumbnailsAnchors[i]);
//     });
// }

thumbnailsAnchors.forEach(anchor => anchor.addEventListener("click",
    setDetails.bind(undefined, anchor)));//передаем функциональный объект и передаем туда привязку 

    // thumbnailsTitles.forEach(t => {
    //     const titleText = t.textContent;
    //     const words = titleText.split(' ').slice(0, wordsLimit);
    //     t.textContent = words.join(' ') + '...';
    // });

function setDetails(anchor) {
    showDetails();
    //здесь мы поменяли разметку
    detailsImageElement.src = anchor.getAttribute("data-details-image");
    //здесь мы помесяли содержимое?
    detailsTitleElement.innerHTML = anchor.getAttribute("data-details-text");
    detailsSectionElement.classList.add(POINT_CLASS);
    // изменить свойство вместо 5 секунд поставить 0, чтобы потом опять назначилось 5 секунд для появления фигуры
    setTimeout(function () {
        detailsSectionElement.classList.remove(POINT_CLASS);
    })
}

function showDetails() {
    mainSection.classList.remove(HIDDEN);
}

function hideDetails() {
    mainSection.classList.add(HIDDEN);
}

const hideButton = document.querySelector(".hide-button");
hideButton.addEventListener("click", hideDetails);