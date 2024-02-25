
const conteudo = document.querySelector(".conteudo");
const addNota = document.querySelector(".criarNota");

let items_db = localStorage.getItem("items_db")
    ? JSON.parse(localStorage.getItem("items_db"))
    : [];

const cores = [
    "red",
    "blue",
    "yellow",
    "green",
    "orange",
    "purple",
];

const corRandom = () => cores[Math.floor(Math.random() * cores.length)];

function carregaItem() {
    conteudo.innerHTML = "";
    verifyNulls();

    items_db.forEach((item) => {
        addHTML(item);
    });
    addEvents();
}

addNota.onclick = () => {
    addHTML();

    addEvents();
};

function addHTML(item) {
    const nav = document.createElement("nav");

    nav.innerHTML = `<nav class="item" style="background-color: ${item?.cores || corRandom()
        }">
    <span class="remove">X</span>
    <textarea>${item?.text || ""}</textarea>`;

    conteudo.appendChild(nav);
}

function addEvents() {
    const notas = document.querySelectorAll(".item textarea");
    const remove = document.querySelectorAll(".item .remove");

    notas.forEach((item, i) => {
        item.oninput = () => {
            items_db[i] = {
                text: item.value,
                cores: items_db[i]?.cores || item.parentElement.style.backgroundColor,
            };

            localStorage.setItem("items_db", JSON.stringify(items_db));
        };
    });

    remove.forEach((item, i) => {
        item.onclick = () => {
            conteudo.children[i].remove();
            if (items_db[i]) {
                items_db.splice(i, 1);
                localStorage.setItem("items_db", JSON.stringify(items_db));
            }
            addEvents();
        };
    });
}

function verifyNulls() {
    items_db = items_db.filter((item) => item);
    localStorage.setItem("item_db", JSON.stringify(items_db));
}

carregaItem();