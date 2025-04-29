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
          "https://www.google.com/imgres?q=P%C3%A3o%20integral&imgurl=https%3A%2F%2Fspecialepaes.com%2Fwp-content%2Fuploads%2F2020%2F01%2Fpao-integral-saudavel-blog-speciale-fortaleza.jpg&imgrefurl=https%3A%2F%2Fspecialepaes.com%2Fdicas-de-saude%2F7-motivos-para-comer-pao-integral-speciale%2F&docid=1XpJNsQLKB9xWM&tbnid=tVY542keI6_HBM&vet=12ahUKEwiBsfzsk_yMAxW2jpUCHRLSFkEQM3oFCIEBEAA..i&w=1000&h=768&hcb=2&ved=2ahUKEwiBsfzsk_yMAxW2jpUCHRLSFkEQM3oFCIEBEAA"
      },
      {
        nome: "Iogurte Natural",
        preco: 12,
        imagem:
          "https://www.google.com/imgres?q=iogurte%20natural&imgurl=https%3A%2F%2Fminhasreceitinhas.com.br%2Fwp-content%2Fuploads%2F2022%2F11%2FIogurte-natural-caseiro-sabor-na-mesa-1200x847.jpg&imgrefurl=https%3A%2F%2Fminhasreceitinhas.com.br%2Freceita%2Fiogurte-natural-caseiro%2F&docid=1Y248trZxC9yiM&tbnid=u3XA6UHjQnJ5DM&vet=12ahUKEwjn4LP7k_yMAxUAqpUCHbFQJdsQM3oECEUQAA..i&w=1200&h=847&hcb=2&ved=2ahUKEwjn4LP7k_yMAxUAqpUCHbFQJdsQM3oECEUQAA"
      },
      {
        nome: "Vitamina de Frutas",
        preco: 10,
        imagem:
          "https://www.google.com/imgres?q=vitamina%20de%20frutas&imgurl=https%3A%2F%2Fvitat.com.br%2Freceitas%2Fimages%2Frecipeshandler.jpg%3Fid%3D7203%26tipo%3Dr%26default%3Ds%26ims%3Dfit-in%2F414x275%2Ffilters%3Aquality(60)&imgrefurl=https%3A%2F%2Fvitat.com.br%2Freceitas%2F7203-vitamina-de-frutas-vermelhas&docid=69KvqEfCsiewnM&tbnid=x7bmY8Uldd6QLM&vet=12ahUKEwjMs46ElPyMAxXEppUCHf8DHh4QM3oECH8QAA..i&w=393&h=275&hcb=2&ved=2ahUKEwjMs46ElPyMAxXEppUCHf8DHh4QM3oECH8QAA"
      }
    ];
  } else if (refeicaoAtual === "almoco") {
    listaProdutos = [
      {
        nome: "Frango Grelhado",
        preco: 35,
        imagem:
          "https://www.google.com/imgres?q=frango%20grelhado&imgurl=https%3A%2F%2Fimg.cybercook.com.br%2Fimagens%2Freceitas%2F340%2Ffile-de-frango-grelhado-2.jpeg&imgrefurl=https%3A%2F%2Fcybercook.com.br%2Freceitas%2Faves%2Ffile-de-frango-grelhado-85340&docid=2kKqCFsuOskQrM&tbnid=lkI101LkTFi8LM&vet=12ahUKEwiuw-uZlPyMAxWlp5UCHQZRFQQQM3oECBsQAA..i&w=2000&h=1344&hcb=2&ved=2ahUKEwiuw-uZlPyMAxWlp5UCHQZRFQQQM3oECBsQAAg"
      },
      {
        nome: "Salada de Frutas",
        preco: 20,
        imagem:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tudogostoso.com.br%2Freceita%2F787-salada-de-frutas-gostosa.html&psig=AOvVaw2qB_NZ6GXwGpbeJhwyRVoF&ust=1745978867351000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCombCU_IwDFQAAAAAdAAAAABAE"
      },
      {
        nome: "Tapioca",
        preco: 10,
        imagem:
          "hhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.daterrinhaalimentos.com%2Fproduto%2Ftapioca-fortificada%2Ftapioca-fortificada-betacaroteno-240g&psig=AOvVaw0AKYQOcKBhMmc2NagTOMFV&ust=1745978908077000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNj8hcOU_IwDFQAAAAAdAAAAABAE"
      }
    ];
  } else if (refeicaoAtual === "jantar") {
    listaProdutos = [
      {
        nome: "Sopa de Legumes",
        preco: 18,
        imagem:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.receitasnestle.com.br%2Freceitas%2Fsopa-de-legumes&psig=AOvVaw0dyYyXOpaP0sJWTKdH9Pnk&ust=1745978926239000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiTuc2U_IwDFQAAAAAdAAAAABAE"
      },
      {
        nome: "Omelete Saudável",
        preco: 16,
        imagem:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Freceitasmondial.com.br%2Fblog%2Fcomo-fazer-a-omelete-perfeita%2F&psig=AOvVaw3A1KCtw_bhCp1tduXG45zg&ust=1745978948908000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJCx7dWU_IwDFQAAAAAdAAAAABAE"
      },
      {
        nome: "Wrap Integral",
        preco: 22,
        imagem:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kitchenaid.com.br%2Fblog%2Freceitas%2Freceitas-salgadas%2Fwrap-integral&psig=AOvVaw3tk9fx3dWiTe4dl6qt-x_m&ust=1745978967365000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDj0OCU_IwDFQAAAAAdAAAAABAE"
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
