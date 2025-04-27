const meals = {
  'Café da manhã': [
    { name: 'Panquecas', price: 'R$ 15,00', image: 'https://example.com/panquecas.jpg' },
    { name: 'Torradas com ovos', price: 'R$ 12,00', image: 'https://example.com/torradas.jpg' },
    { name: 'Café preto', price: 'R$ 5,00', image: 'https://example.com/cafe.jpg' },
    { name: 'Frutas', price: 'R$ 8,00', image: 'https://example.com/frutas.jpg' }
  ],
  'Almoço': [
    { name: 'Arroz e feijão', price: 'R$ 20,00', image: 'https://example.com/arrozfeijao.jpg' },
    { name: 'Feijoada', price: 'R$ 25,00', image: 'https://example.com/feijoada.jpg' },
    { name: 'Frango grelhado', price: 'R$ 22,00', image: 'https://example.com/frango.jpg' },
    { name: 'Salada', price: 'R$ 15,00', image: 'https://example.com/salada.jpg' }
  ],
  'Jantar': [
    { name: 'Sopa de legumes', price: 'R$ 18,00', image: 'https://example.com/sopa.jpg' },
    { name: 'Pizza', price: 'R$ 30,00', image: 'https://example.com/pizza.jpg' },
    { name: 'Lasanha', price: 'R$ 28,00', image: 'https://example.com/lasanha.jpg' },
    { name: 'Salada de frutas', price: 'R$ 12,00', image: 'https://example.com/saladafrutas.jpg' }
  ]
};

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username && password) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('meal-selection').style.display = 'flex';
  } else {
    alert('Por favor, preencha ambos os campos!');
  }
}

function navigateToMeals(mealName) {
  document.getElementById('meal-selection').style.display = 'none';
  const mealDetail = document.getElementById('meal-detail');
  document.getElementById('meal-name').innerText = `Pratos de ${mealName}`;
  document.getElementById('meal-type').innerText = mealName;
  const mealList = document.getElementById('meal-list');
  mealList.innerHTML = '';
  meals[mealName].forEach((meal) => {
    const mealItem = document.createElement('div');
    mealItem.classList.add('meal-item');
    mealItem.innerHTML = `
      <img class="meal-image" src="${meal.image}" alt="${meal.name}">
      <div>${meal.name} <span class="meal-price">(${meal.price})</span></div>
      <input class="meal-quantity" type="number" value="1" min="1" />
    `;
    mealItem.onclick = () => showMealDetail(meal.name);
    mealList.appendChild(mealItem);
  });
  mealDetail.style.display = 'flex';
}

function showMealDetail(meal) {
  alert(`Você escolheu: ${meal}`);
}

function goBack() {
  document.getElementById('meal-selection').style.display = 'flex';
  document.getElementById('meal-detail').style.display = 'none';
}
