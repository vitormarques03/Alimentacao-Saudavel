const produtos = [
  {
    nome: "Salada Tropical",
    preco: 20,
    imagem:
      "https://img.freepik.com/fotos-gratis/salada-fresca-com-legumes_144627-16242.jpg"
  },
  {
    nome: "Frango Grelhado",
    preco: 35,
    imagem:
      "https://img.freepik.com/fotos-gratis/frango-grelhado-saboroso-com-legumes-grelhados_2829-14231.jpg"
  },
  {
    nome: "Tapioca",
    preco: 10,
    imagem:
      "https://img.freepik.com/fotos-gratis/deliciosa-tapioca-recheada-com-coco-e-morango_23-2147828182.jpg"
  },
  {
    nome: "Suco Natural",
    preco: 8,
    imagem:
      "https://img.freepik.com/fotos-gratis/suco-natural-de-laranja-com-gelo_2829-5465.jpg"
  },
  {
    nome: "Frutas Frescas",
    preco: 15,
    imagem:
      "https://img.freepik.com/fotos-gratis/prato-com-frutas_144627-16829.jpg"
  }
];

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function esconderTodas() {
  document
    .querySelectorAll(".tela")
    .forEach((tela) => tela.classList.add("hidden"));
}

function mostrarCadastro() {
  esconderTodas();
  document.getElementById("tela-cadastro").classList.remove("hidden");
}

function mostrarLogin() {
  esconderTodas();
  document.getElementById("tela-login").classList.remove("hidden");
}

function mostrarEscolha() {
  esconderTodas();
  document.getElementById("tela-escolha").classList.remove("hidden");
  montarCardapio();
}

function mostrarCarrinho() {
  esconderTodas();
  document.getElementById("tela-carrinho").classList.remove("hidden");
  atualizarCarrinho();
}

function mostrarEspera() {
  esconderTodas();
  document.getElementById("tela-espera").classList.remove("hidden");
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  mostrarEscolha();
});

document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Cadastro realizado! Faça login.");
    mostrarLogin();
  });

function montarCardapio() {
  const cardapio = document.getElementById("cardapio");
  cardapio.innerHTML = "";
  produtos.forEach((produto) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <img src="${produto.imagem}">
      <h4>${produto.nome}</h4>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick='adicionarCarrinho(${JSON.stringify(
        produto
      )})'>Adicionar</button>
    `;
    cardapio.appendChild(div);
  });
}

function adicionarCarrinho(produto) {
  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Adicionado ao carrinho!");
}

function atualizarCarrinho() {
  const itens = document.getElementById("itensCarrinho");
  const total = document.getElementById("total");
  itens.innerHTML = "";
  let soma = 0;
  carrinho.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(
      2
    )} <button onclick="removerItem(${index})">Remover</button>`;
    itens.appendChild(div);
    soma += item.preco;
  });
  total.innerText = `Total: R$ ${soma.toFixed(2)}`;
}

function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

function finalizarPedido() {
  const endereco = document.getElementById("endereco").value.trim();
  const pagamento = document.getElementById("pagamento").value;

  if (endereco && pagamento) {
    alert(
      `✅ Pedido realizado com sucesso!\n\n📍 Endereço: ${endereco}\n💳 Forma de pagamento: ${pagamento}`
    );
    localStorage.clear();
    carrinho = [];
    mostrarEspera();
  } else {
    alert("⚠️ Por favor, preencha o endereço e a forma de pagamento!");
  }
}

function inicializarAutocomplete() {
  const input = document.getElementById("endereco");
  const autocomplete = new google.maps.places.Autocomplete(input, {
    types: ["geocode"],
    componentRestrictions: { country: "br" }
  });

  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      const mapa = document.getElementById("mapa");
      mapa.src = `https://maps.google.com/maps?q=${place.geometry.location.lat()},${place.geometry.location.lng()}&output=embed`;
    }
  });
}

window.onload = function () {
  if (typeof google !== "undefined") {
    inicializarAutocomplete();
  }
};
function confirmarCarrinho() {
  esconderTodas();
  document.getElementById("tela-endereco").classList.remove("hidden");
}

function finalizarPedido() {
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const bairro = document.getElementById("bairro").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const pagamento = document.getElementById("pagamento").value;

  if (rua && numero && bairro && cidade && estado && cep && pagamento) {
    alert(
      `✅ Pedido realizado com sucesso!\n\n📍 Endereço: ${rua}, ${numero} - ${bairro} - ${cidade}/${estado}, CEP: ${cep}\n💳 Forma de pagamento: ${pagamento}`
    );
    localStorage.clear();
    carrinho = [];
    mostrarEspera();
  } else {
    alert(
      "⚠️ Por favor, preencha todos os campos do endereço e a forma de pagamento!"
    );
  }
}
