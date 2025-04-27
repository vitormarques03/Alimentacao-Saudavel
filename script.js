
const meals = {
  'Café da manhã': ['Panquecas', 'Torradas com ovos', 'Café preto', 'Frutas'],
  'Almoço': ['Arroz e feijão', 'Feijoada', 'Frango grelhado', 'Salada'],
  'Jantar': ['Sopa de legumes', 'Pizza', 'Lasanha', 'Salada de frutas']
};

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username && password) {
    navigateTo('meal-selection');
  } else {
    alert('Preencha todos os campos!');
  }
}

function navigateToMeals(mealType) {
  document.getElementById('meal-name').innerText = 'Pratos para ' + mealType;
  const mealList = document.getElementById('meal-list');
  mealList.innerHTML = '';
  meals[mealType].forEach(meal => {
    const div = document.createElement('div');
    div.innerText = meal;
    mealList.appendChild(div);
  });
  navigateTo('meal-detail');
}

function goToCheckout() {
  navigateTo('checkout-screen');
}

function finishOrder() {
  const address = document.getElementById('address').value;
  const payment = document.getElementById('payment-method').value;
  if (address && payment) {
    alert('Pedido realizado com sucesso!');
    location.reload();
  } else {
    alert('Preencha todos os campos!');
  }
}

function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');
}
