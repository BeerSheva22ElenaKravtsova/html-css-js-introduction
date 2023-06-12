import serviceConfig from "./config/service-config.json" assert{type: 'json'}
import sections from "./config/sections.json" assert{type: 'json'}
import Pages from "./ui/Pages.js"
import DataGrid from "./ui/DataGrid.js"
import ApplicationBar from "./ui/ApplicationBar.js"
import SearchForm from "./ui/SearchForm.js"
import LogInForm from "./ui/LogInForm.js"
import movieService from "./service/MovieServiceRest.js"
import UserService from "./service/UsersServiceRest.js"
import Spinner from "./ui/Spinner.js";
import APIGenerator from "./ui/APIGenerator.js"
import { getData } from "./util/async.js"
 
//constants
let userId = "";
const { baseUrl, language, baseUrlPopular, pictureURL, movieDetails,
    genres, countries, languages, apiKey, sortValues } = serviceConfig;
const genresValue = await getData(genres.concat(apiKey));
const countriesValue = await getData(countries.concat(apiKey));
const languagesValue = await getData(languages.concat(apiKey));
const spinner = new Spinner("spinners-id");
const apiGenerator = new APIGenerator();
let tableSearchResults = "";

const { menuSections, moviesColumns, detailsMoviesColumns } = sections;

const tableActions = [
    { title: "details", id: "details", picture: "../images/info.svg", callbackFn: fillDetailsMoviePage },
    { title: "watchingList", id: "watchingList", picture: "../images/bookmark-border.svg", callbackFn: async (movieId) => await logInButtonsFn(movieId, "watchingList") },
    { title: "favorites", id: "favorites", picture: "../images/favorite.svg", callbackFn: async (movieId) => await logInButtonsFn(movieId, "favoriteList") }
];
const indexesOfLogInAct = getIndexesByTitle(tableActions, ["watchingList", "favorites"]);
const indexesOfMenuLogOut = getIndexesByTitle(menuSections, ["Details", "Search Result", "Watching List", "Favorite List", "Log Out"]);
const indexesOfMenuLogIn = getIndexesByTitle(menuSections, ["Watching List", "Favorite List", "Log Out"]);
const indexOfDetailsPage = getIndexesByTitle(menuSections, ["Details"]);
const indexOfSearchResPage = getIndexesByTitle(menuSections, ["Search Result"]);
const indexOfLogInPage = getIndexesByTitle(menuSections, ["Log In"]);

const pageButtonsActions = [
    { title: "prev", id: "prev", picture: "../images/Left-button.svg", callbackFn: (table) => getPage(table, false) },
    { title: "next", id: "next", picture: "../images/Right-button.svg", callbackFn: getPage }
];

// Menu
const menu = new ApplicationBar("menu-place", menuSections, menuHandler);
menu.hideButtons(true, indexesOfMenuLogOut);

//HomePage
const pagesPopularMovies = new Pages(baseUrlPopular, apiKey);
const tableHomePage = new DataGrid("home-page", moviesColumns, "Home Page", tableActions, pagesPopularMovies, pageButtonsActions, true);

const servicePopularMovies = new movieService(pagesPopularMovies.getURL(), pictureURL);
const dataPopularMovies = await action(servicePopularMovies.getFoundObjects.bind(servicePopularMovies));
tableHomePage.fillData(dataPopularMovies);
tableHomePage.hideButtons(true, indexesOfLogInAct);

//DetailsPage
const tableDetailsMovie = new DataGrid("details-page", detailsMoviesColumns, "Movie Details", [], [], [], false);
async function fillDetailsMoviePage(objId) {
    const pagesDetailsMovie = new Pages(movieDetails.concat(objId).concat(language), apiKey);
    const serviceDetailsMovie = new movieService(pagesDetailsMovie.getURL(), pictureURL);
    const dataDetailsMovie = await action(serviceDetailsMovie.getDetailsPageObjects.bind(serviceDetailsMovie));
    tableDetailsMovie.fillData(dataDetailsMovie);
    menu.setUnhiddenPages(indexOfDetailsPage);
}

//Search Form
const searchForm = new SearchForm("search-page", genresValue, countriesValue, languagesValue, sortValues);
searchForm.addHandler(async (values) => {
    const URL = apiGenerator.generateURL(values, genresValue, countriesValue, languagesValue);
    return await createSearchResultsPage(URL);
});

//Search Results Table
async function createSearchResultsPage(URL) {
    const pages = new Pages(URL, apiKey);
    const service = new movieService(pages.getURL(), pictureURL);
    tableSearchResults = new DataGrid("search-results-page", moviesColumns, "Search Results", tableActions, pages, pageButtonsActions, true);
    const data = await action(service.getFoundObjects.bind(service));
    if (data.length == 0) {
        alert("No movie found");
    }
    tableSearchResults.updateTable(data);
    hideButtons(tableSearchResults, indexesOfLogInAct);
    menu.hideButtons(false, [indexOfSearchResPage]);
    menu.setUnhiddenPages(indexOfSearchResPage);
}

//FavoriteList, WatchingList
const tableWatchingList = new DataGrid("watchList-page", moviesColumns, "Watching List", [tableActions[0]], [], [], true);
const tableFavoriteList = new DataGrid("favoriteList-page", moviesColumns, "Favorite List", [tableActions[0]], [], [], true);
async function fillTableByValues(moviesId, table) {
    if (moviesId) {
        const service = new movieService(movieDetails, pictureURL);
        const data = await action(service.getFoundObjects.bind(service, language.concat(apiKey), moviesId));
        table.updateTable(data);
    }
}

//LogIn
const logInForm = new LogInForm("logIn-page");
const serviceLogIn = new UserService(baseUrl, async () => {
    const user = await serviceLogIn.getUserById(userId);
    fillTableByValues(user.watchingList, tableWatchingList);
    fillTableByValues(user.favoriteList, tableFavoriteList);
}, userId);

async function getPage(table, isNext = true, amount = 1) {
    const pageUrl = await table.pages.getPage(isNext, amount);
    if (pageUrl) {
        const service = new movieService(pageUrl, pictureURL);
        const pageData = await action(service.getFoundObjects.bind(service));
        table.updateTable(pageData);
        hideButtons(table, indexesOfLogInAct);
    }
}

//Functions
async function menuHandler(index) {
    switch (index) {
        case 6: {
            logInForm.addLoginHandler(async (user) => {
                const isFound = await action(serviceLogIn.logIn.bind(serviceLogIn, user));
                if (isFound) {
                    logedIn(true, isFound, `User: ${user.userName}`);
                }
            });
            logInForm.addRegistrationHandler(async (newUser) => {
                const isRegistered = await action(serviceLogIn.registration.bind(serviceLogIn, newUser));
                if (isRegistered) {
                    logedIn(true, isRegistered, `User: ${newUser.userName}`);
                }
            });
            break;
        }
        case 7: {
            logedIn(false, "", "Log in");
            break;
        }
    }
}

function getIndexesByTitle(array, values) {
    return array.reduce((indexes, item, index) => {
        if (values.includes(item.title)) {
            indexes.push(index);
        }
        return indexes;
    }, []);
}

function hideButtons(table, indexes) {
    if (userId) {
        table.hideButtons(false, indexes);
    } else {
        table.hideButtons(true, indexes);
    }
}

function logedIn(setter, user, newName) {
    userId = user.id;
    menu.logInSetName(newName)
    menu.hideButtons(!setter, indexesOfMenuLogIn);
    menu.inActivateButtons(setter, [indexOfLogInPage]);
    tableHomePage.hideButtons(!setter, indexesOfLogInAct);
    if (setter) {
        fillTableByValues(user.watchingList, tableWatchingList);
        fillTableByValues(user.favoriteList, tableFavoriteList);
    } else {
        menu.hideButtons(true, indexOfSearchResPage);
        serviceLogIn.stopPoller();
    }
    tableHomePage.hideButtons(!setter, indexesOfLogInAct);
    if (tableSearchResults) {
        tableSearchResults.hideButtons(!setter, indexesOfLogInAct);
    }
}

async function logInButtonsFn(movieId, actionType) {
    const user = await serviceLogIn.getUserById(userId);
    if (actionType == "watchingList") {
        await addTolist(movieId, user, user.watchingList, actionType);
    }
    else if (actionType == "favoriteList") {
        await addTolist(movieId, user, user.favoriteList, actionType);
    }
}

async function addTolist(movieId, user, list, actionType) {
    if (!list) {
        list = [];
    }
    if (!list.includes(movieId)) {
        list.push(movieId);
        await serviceLogIn.updateUser(userId, user);
        if (actionType == "watchingList") {
            await fillTableByValues(list, tableWatchingList);
        } else if (actionType == "favoriteList") {
            await fillTableByValues(list, tableFavoriteList);
        }
    } else {
        alert("This movie has been already added to your list");
    }
}

async function action(serviceFn) {
    spinner.start();
    try {
        const res = await serviceFn();
        return res;
    }
    catch (error) {
        console.log(error);
        alert(error.code ? 'server responded with ' + code
            : 'server unavaliable');
    } finally {
        spinner.stop();
    }
}