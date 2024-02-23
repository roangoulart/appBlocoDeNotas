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

const cor = () => color[Math.floor(Math.random() * VideoColorSpace.length)];

function carregaItem() {
    content.innerHTML = "";
    verifyNulls();

    items_db.forEach((item) => {
        addHTML(item);
    });
}

btnNew.onclick = () => {
    addHTML();
}

function addHTML(item) {
    const nav = document.createElement("nav");

    nav.innerHTML = `<nav class="item" style="background-color: ${item?.color || cor()}">
    <span class="remove">X</span>
    <textarea>$(item?.text || "")</textarea>
    </nav>`;

    content.appendChild(nav);
}

function addEvents() {
    const notas = document.querySelectorAll(".item textarea");
    const remove = document.querySelectorAll(".item .remove");

    notas.forEach((item) => {
        item.oninput = () => {
            items_db[i] = {
                text: item.value,
                color: items_db[i]?.color || item.parentElement.style.background,
            };

            localStorage.setItem("items_db", JSON.stringify(items_db));
        };
    });

    remove.forEach((item, i) => {
        item.onclick = () => {
            content.children[i].remove();
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

loadItems();