import { menuArray } from "./data.js";
const itemsList = document.querySelector(".items-list");
const orderList = document.querySelector(".order-list");
const orderBtn = document.querySelector(".order-btn");
const form = document.querySelector("#payment");
const name = document.querySelector("#name");
const card = document.querySelector("#card");
const cvv = document.querySelector("#cvv");
const bye = document.querySelector(".bye-section");
let orderedItemsList = [];

//Creating and adding the Menu to the page
function renderMenu() {
  let menuHtml = "";
  menuArray.forEach((menuItem) => {
    menuHtml += `
      <li class="items-container" id="items-container">
      <img class="emoji" draggable="false" src="${menuItem.emoji}">
      <div class="item-text-container">
        <p class="item-name" id="item-name">${menuItem.name}</p>
        <p class="item-ingredients">${menuItem.ingredients}</p>
        <p class="full-price">$<span id="item-price">${menuItem.price}</span></p>
      </div>
      <button class="add-btn" data-add="${menuItem.id}">+</button>
    </li>
      `;
  });
  itemsList.innerHTML = menuHtml;
}

//Adding to the order list
function addToOrder(itemId) {
  document.querySelector(".order-section").classList.remove("hidden");
  bye.classList.add("hidden");
  const orderedItemObject = menuArray.filter((orderedItem) => {
    return orderedItem.id === Number(itemId);
  })[0];
  orderedItemsList.push(orderedItemObject);
  createOrder();
}

function createOrder() {
  let orderHtml = "";
  let total = 0;
  orderedItemsList.forEach((order, index) => {
    orderHtml += `
      <li class="order-item">
                <p class="item-name">${order.name}</p>
                <button class="clear-btn remove-item" data-remove="${index}">remove</button>
                <p class="order full-price">
                  $<span id="item-price" class="item-price">${order.price}</span>
                </p>
              </li>
      `;
    total += order.price;
  });
  document.querySelector("#total-price").innerHTML = total;
  orderList.innerHTML = orderHtml;
}

//Remove Order from list

function removeOrder(removeId) {
  orderedItemsList.splice(removeId, 1);
  if (orderedItemsList.length === 0) {
    document.querySelector(".order-section").classList.add("hidden");
  }
  createOrder();
}

renderMenu();

//Payment valudation
function showSuccess(input) {
  input.classList.add("success");
}

function showError(input, message) {
  input.classList.add("error");
  input.nextElementSibling.innerHTML = message;
  input.nextElementSibling.classList.add("error");
}

//Getting the name
function getName() {
  let person = name.value;
}

//Eventlisteners
document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    addToOrder(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeOrder(e.target.dataset.remove);
  }
});

orderBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (name.value === "") {
    showError(name, "Please enter your name");
  } else {
    showSuccess(name);
    name.nextElementSibling.classList.remove("error");
  }
  if (card.value === "") {
    showError(card, "Please enter only your card number");
  } else if (isNaN(card.value)) {
    showError(card, "Please only add numbers");
  } else {
    showSuccess(card);
    card.nextElementSibling.classList.remove("error");
  }
  if (cvv.value === "") {
    showError(cvv, "Please enter your CVV");
  } else if (isNaN(cvv.value)) {
    showError(cvv, "Please only add numbers");
  } else {
    showSuccess(cvv);
    cvv.nextElementSibling.classList.remove("error");
  }

  if (
    name.classList == "name success" &&
    card.classList == "card success" &&
    cvv.classList == "cvv success"
  ) {
    form.classList.add("hidden");

    bye.classList.remove("hidden");
    name.value = "";
    card.value = "";
    cvv.value = "";
    name.classList.remove("success");
    card.classList.remove("success");
    cvv.classList.remove("success");
    document.querySelector(".order-section").classList.add("hidden");
    orderedItemsList = [];
  }
});
