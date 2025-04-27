const meals = {
  "Café da manhã": [
    { name: "Panquecas", price: "R$ 15,00" },
    { name: "Torradas com ovos", price: "R$ 12,00" },
    { name: "Café preto", price: "R$ 5,00" },
    { name: "Frutas", price: "R$ 8,00" }
  ],
  Almoço: [
    { name: "Arroz e feijão", price: "R$ 20,00" },
    { name: "Feijoada", price: "R$ 25,00" },
    { name: "Frango grelhado", price: "R$ 22,00" },
    { name: "Salada", price: "R$ 15,00" }
  ],
  Jantar: [
    { name: "Sopa de legumes", price: "R$ 18,00" },
    { name: "Pizza", price: "R$ 30,00" },
    { name: "Lasanha", price: "R$ 28,00" },
    { name: "Salada de frutas", price: "R$ 12,00" }
  ]
};

let selectedItems = [];

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username && password) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("meal-selection").style.display = "flex";
  } else {
    alert("Por favor, preencha ambos os campos!");
  }
}

function navigateToMeals(mealName) {
  document.getElementById("meal-selection").style.display = "none";
  const mealDetail = document.getElementById("meal-detail");
  document.getElementById("meal-name").innerText = `Pratos de ${mealName}`;
  document.getElementById("meal-type").innerText = mealName;
  const mealList = document.getElementById("meal-list");
  mealList.innerHTML = "";
  meals[mealName].forEach((meal, index) => {
    const mealItem = document.createElement("div");
    mealItem.classList.add("meal-item");
    mealItem.innerHTML = `${meal.name} <span class="meal-price">(${meal.price})</span>`;

    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quantity-input");
    quantityInput.type = "number";
    quantityInput.value = 0;
    quantityInput.min = 0;

    mealItem.appendChild(quantityInput);

    mealItem.onclick = () => addMealToSelection(meal, quantityInput);
    mealList.appendChild(mealItem);
  });
  mealDetail.style.display = "flex";
}

function addMealToSelection(meal, quantityInput) {
  const quantity = parseInt(quantityInput.value);
  if (quantity > 0) {
    selectedItems.push({
      meal: meal.name,
      quantity: quantity,
      price: meal.price
    });
  }
}

function goBack() {
  document.getElementById("meal-selection").style.display = "flex";
  document.getElementById("meal-detail").style.display = "none";
}

function goToAddress() {
  if (selectedItems.length === 0) {
    alert("Você não selecionou nenhum item!");
    return;
  }

  document.getElementById("meal-detail").style.display = "none";
  document.getElementById("payment-screen").style.display = "flex";
  displaySelectedItems();
}

function displaySelectedItems() {
  let total = 0;
  let itemsHtml = "";
  selectedItems.forEach((item) => {
    const itemTotal =
      parseInt(item.quantity) * parseFloat(item.price.replace("R$", "").trim());
    total += itemTotal;
    itemsHtml += `<p>${item.meal} x ${item.quantity} = R$ ${itemTotal.toFixed(
      2
    )}</p>`;
  });

  const totalPrice = total.toFixed(2);
  itemsHtml += `<h3>Total: R$ ${totalPrice}</h3>`;
  document.getElementById("meal-list").innerHTML = itemsHtml;
}

function finishOrder() {
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;
  if (address && payment) {
    alert(
      `Pedido finalizado! Endereço: ${address}, Forma de pagamento: ${payment}`
    );
  } else {
    alert("Por favor, preencha todos os campos!");
  }
}
