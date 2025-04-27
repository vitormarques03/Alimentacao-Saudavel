
cconst meals = {
  'Café da manhã': [
    { name: 'Panquecas', price: 'R$ 15,00' },
    { name: 'Torradas com ovos', price: 'R$ 12,00' },
    { name: 'Café preto', price: 'R$ 5,00' },
    { name: 'Frutas', price: 'R$ 8,00' }
  ],
  'Almoço': [
    { name: 'Arroz e feijão', price: 'R$ 20,00' },
    { name: 'Feijoada', price: 'R$ 25,00' },
    { name: 'Frango grelhado', price: 'R$ 22,00' },
    { name: 'Salada', price: 'R$ 15,00' }
  ],
  'Jantar': [
    { name: 'Sopa de legumes', price: 'R$ 18,00' },
    { name: 'Pizza', price: 'R$ 30,00' },
    { name: 'Lasanha', price: 'R$ 28,00' },
    { name: 'Salada de frutas', price: 'R$ 12,00' }
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
    mealItem.innerHTML = `${meal.name} <span class="meal-price">(${meal.price})</span>`;
    meal
