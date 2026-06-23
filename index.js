import readline from "readline";
import { produtos } from "./produtos.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(texto) {
    return new Promise((resolve) => {
        rl.question(texto, resolve);
    });
}

function listarProdutos() {
    console.log("\n===== PRODUTOS CADASTRADOS =====");

    produtos.forEach((produto) => {
        console.log(
            `${produto.id} - ${produto.nome} | R$ ${produto.preco} | Quantidade: ${produto.quantidade}`
        );
    });
}

async function adicionarProduto() {
    const id = Number(await perguntar("Digite o ID do produto: "));
    const nome = await perguntar("Digite o nome do produto: ");
    const preco = Number(await perguntar("Digite o preço do produto: "));
    const quantidade = Number(await perguntar("Digite a quantidade: "));

    produtos.push({
        id: id,
        nome: nome,
        preco: preco,
        quantidade: quantidade
    });

    console.log("\nProduto adicionado com sucesso!");
}

async function buscarProdutoPorNome() {
    const nome = await perguntar("Digite o nome do produto: ");

    const produtoEncontrado = produtos.find((produto) => {
        return produto.nome === nome;
    });

    if (produtoEncontrado) {
        console.log("\nProduto encontrado:");
        console.log(produtoEncontrado);
    } else {
        console.log("\nProduto não encontrado.");
    }
}

async function removerProdutoPorId() {
    const id = Number(await perguntar("Digite o ID do produto: "));

    const index = produtos.findIndex((produto) => {
        return produto.id === id;
    });

    if (index !== -1) {
        produtos.splice(index, 1);
        console.log("\nProduto removido com sucesso!");
    } else {
        console.log("\nProduto não encontrado.");
    }
}

function calcularValorTotalEstoque() {
    const total = produtos.reduce((soma, produto) => {
        return soma + produto.preco * produto.quantidade;
    }, 0);

    console.log(`\nValor total do estoque: R$ ${total}`);
}

async function menu() {
    let opcao = "";

    while (opcao !== "0") {
        console.log("\n===== MENU DE PRODUTOS =====");
        console.log("1 - Listar produtos");
        console.log("2 - Adicionar produto");
        console.log("3 - Buscar produto por nome");
        console.log("4 - Remover produto por ID");
        console.log("5 - Calcular valor total do estoque");
        console.log("0 - Sair");

        opcao = await perguntar("Escolha uma opção: ");

        if (opcao === "1") {
            listarProdutos();
        } else if (opcao === "2") {
            await adicionarProduto();
        } else if (opcao === "3") {
            await buscarProdutoPorNome();
        } else if (opcao === "4") {
            await removerProdutoPorId();
        } else if (opcao === "5") {
            calcularValorTotalEstoque();
        } else if (opcao === "0") {
            console.log("\nSaindo...");
        } else {
            console.log("\nOpção inválida.");
        }
    }

    rl.close();
}

menu();