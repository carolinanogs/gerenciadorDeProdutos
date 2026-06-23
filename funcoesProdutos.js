export function listarProdutos(array){
    return array
}

export function adicionarProduto(array, produto){
    array.push(produto)
    return array
}

export function removerProdutoPorId(array, id){
    for(let i =0; i<array.length; i++){
        if(array[i] === produto){
            array.splice(i, 1)
            return array
        }
    }
    return array
}

export function buscarProdutoPorNome(array, nome){
    for(let i =0; i<array.length; i++){
        if(array[i].nome === nome){
            return nome
        }
    }
    return null
}