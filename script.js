const produtos = {
  cafe: [
    {
      nome: "Pão Integral",
      preco: 8,
      imagem: "https://img.freepik.com/fotos-gratis/pao-integral-com-graos.jpg"
    },
    {
      nome: "Iogurte Natural",
      preco: 12,
      imagem:
        "https://img.freepik.com/fotos-gratis/iogurte-natural-com-frutas.jpg"
    },
    {
      nome: "Vitamina de Frutas",
      preco: 10,
      imagem:
        "https://img.freepik.com/fotos-gratis/bebida-vitaminada-com-frutas.jpg"
    }
  ],
  almoco: [
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
    }
  ],
  jantar: [
    {
      nome: "Sopa de Legumes",
      preco: 18,
      imagem:
        "https://img.freepik.com/fotos-gratis/sopa-de-legumes-caseira_23-2147828190.jpg"
    },
    {
      nome: "Omelete Saudável",
      preco: 16,
      imagem:
        "https://img.freepik.com/fotos-gratis/omelete-saudavel-com-legumes.jpg"
    },
    {
      nome: "Wrap Integral",
      preco: 22,
      imagem:
        "https://img.freepik.com/fotos-gratis/wrap-integral-com-frango-e-salada.jpg"
    }
  ]
};

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let refeicaoSelecionada = "";

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

function mostrarEscolhaRefeicao() {
  esconderTodas();
  document.getElementById("tela-refeicao").classList.remove("hidden");
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

function mostrarAguardando() {
  esconderTodas();
  document.getElementById("tela-aguardando").classList.remove("hidden");
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  mostrarEscolhaRefeicao();
});

document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Cadastro realizado! Faça login.");
    mostrarLogin();
  });

function escolherRefeicao(tipo) {
  refeicaoSelecionada = tipo;
  mostrarEscolha();
}

function montarCardapio() {
  const cardapio = document.getElementById("cardapio");
  cardapio.innerHTML = "";
  produtos[refeicaoSelecionada].forEach((produto, index) => {
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
      `✅ Pedido realizado com sucesso!\n📍 Endereço: ${endereco}\n💳 Pagamento: ${pagamento}`
    );
    localStorage.clear();
    mostrarAguardando();
  } else {
    alert("⚠️ Por favor, preencha todos os campos obrigatórios!");
  }
}
let refeicaoAtual = "";

function selecionarRefeicao(refeicao) {
  refeicaoAtual = refeicao;
  mostrarEscolha();
  montarCardapio();
}

function montarCardapio() {
  const cardapio = document.getElementById("cardapio");
  cardapio.innerHTML = "";

  let listaProdutos = [];

  if (refeicaoAtual === "cafe") {
    listaProdutos = [
      {
        nome: "Pão Integral",
        preco: 8,
        imagem:
          "imagens/pao.jpg"
      },
      {
        nome: "Iogurte Natural",
        preco: 12,
        imagem:
          "https://www.imagens/iogurte.jpg"
      },
      {
        nome: "Vitamina de Frutas",
        preco: 10,
        imagem:
          "imagens/vitamina.jpg"
      }
    ];
  } else if (refeicaoAtual === "almoco") {
    listaProdutos = [
      {
        nome: "Frango Grelhado",
        preco: 35,
        imagem:
          "imagens/frango.jpg"
      },
      {
        nome: "Salada de Frutas",
        preco: 20,
        imagem:
          "imagens/salada.jpg"
      },
      {
        nome: "Tapioca",
        preco: 10,
        imagem:
          "imagens/tapioca.jpg"
      }
    ];
  } else if (refeicaoAtual === "jantar") {
    listaProdutos = [
      {
        nome: "Sopa de Legumes",
        preco: 18,
        imagem:
          "imagens/sopa.jpg"
      },
      {
        nome: "Omelete Saudável",
        preco: 16,
        imagem:
          "imagens/omelete.jpg"
      },
      {
        nome: "Wrap Integral",
        preco: 22,
        imagem:
          "imagens/wrap.jpg"
      }
    ];
  }

  listaProdutos.forEach((produto, index) => {
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
function mostrarEscolhaRefeicao() {
  esconderTodas();
  document.getElementById("tela-refeicao").classList.remove("hidden");
}
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
function mostrarEspera() {
  esconderTodas();
  document.getElementById("tela-aguardando").classList.remove("hidden");
}
