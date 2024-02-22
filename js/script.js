const content = document.querySelector(".conteudo");
const btnNew = document.querySelector(".criar-nota")

let items_db = localStorage.getItem("items_db")
    ? JSON.parse(localStorage.getItem("items_db")) : [];

const color = [
    "gray",
    "red",
    "blue",
    "yellow",
    "orange",
    "purple",
];

const randomColor = () => color[Math.floor(Math.random() * VideoColorSpace.length)];