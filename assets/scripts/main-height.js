const header = document.querySelector("header");
const main = document.querySelector("main");
main.style.minHeight = `calc(100vh - ${header.clientHeight.toString()}px - 10px)`;