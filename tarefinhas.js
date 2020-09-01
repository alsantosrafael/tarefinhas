const form = document.querySelector("form");
const inputTarefa = document.querySelector(".tarefa");
const btnMarcaTudo = document.querySelector(".marcatudo");

const listaToDo = document.querySelector(".to-do-list");
const listaDone = document.querySelector(".done-list");
const contDeTarefas = document.querySelector(".contador");
let contador = 0;

//botoes
const botoes = document.querySelectorAll(".btns > .btn")
const btnFiltroTodas = document.querySelector(".selectAll");
const btnFiltroAFazer = document.querySelector(".toDo");
const btnFiltroFeitas = document.querySelector(".done");
const limparCompletadas = document.querySelector(".clear")

//Funções

const addContador = () => {
    contador = listaToDo.querySelectorAll("li").length;
    contDeTarefas.innerText = (contador === 0) ? 'sem tarefas a fazer' : contador + ' tarefa(s) a fazer';
}

const trocarFiltro = (event) => {
    const botao = event.target;
    for(bt of botoes) {
        if(bt.classList.contains('ativo')) {
            bt.classList.remove('ativo')
        }
    }
    botao.classList.add('ativo')

    if(btnFiltroTodas.classList.contains('ativo')) {
        listaToDo.style.display = 'flex';
        listaDone.style.display = 'flex'; //TO TENTANDO USAR SET ATTRIBUTE E NAO CONSIGO
    } else if(btnFiltroAFazer.classList.contains('ativo')) {
        listaToDo.style.display = 'flex';
        listaDone.style.display = 'none'
    } else if(btnFiltroFeitas.classList.contains('ativo')) {
        listaToDo.style.display = 'none'
        listaDone.style.display = 'flex';

    }
} 

//Ações
//Submit funciona como o enter
form.addEventListener("submit", event => {
    event.preventDefault(); //Evitando que a página recarregue

    const tarefa = document.createElement('li');//Criei meu li
    const checkBox = document.createElement("input");//Criei meu checkbox
    checkBox.setAttribute("type", "checkbox");//Coloquei o tipo como checkbox
    const texto = document.createElement("span");//criando trecho
    texto.innerText = inputTarefa.value;

    //criando botao de deletar tarefa
    const botaoDeDeletar = document.createElement("button");//criando botao
    botaoDeDeletar.classList.add("remove");//Criei classe nesse botão
    botaoDeDeletar.innerText = "Deletar";
    botaoDeDeletar.addEventListener('click', event => {
        const btn = event.target;
        const botaoDeDeletar = btn.closest('li')
        botaoDeDeletar.remove();
        addContador();

    })

    tarefa.append(checkBox); //adicionando ao elemento do html tarefa
    tarefa.append(texto);
    tarefa.append(botaoDeDeletar);
    listaToDo.append(tarefa);//adicionando tarefa a listaToDo

    checkBox.addEventListener('input', () => {
        checkBox.checked ? listaDone.append(tarefa) : listaToDo.append(tarefa);
        addContador();
        //eRRO AQUI
        if(document.querySelectorAll(".to-do-list > li").length === 0 && document.querySelectorAll(".done-list > li").length !== 0) {
            btnMarcaTudo.checked = true;
        } else {
            btnMarcaTudo.checked = false;
        }

    })
    addContador();
    inputTarefa.value = "";//Limpando caixa de input após enter

})

for (botao of botoes) {
    botao.addEventListener("click", trocarFiltro)
}

limparCompletadas.addEventListener('click', () => {
    const feitas = listaDone.querySelectorAll("li")
    for(feita of feitas) {
        feita.remove();
    }
})
    
btnMarcaTudo.addEventListener("input", () => {
   const tarefinhas = document.querySelectorAll("li > input");

   for(tarefinha of tarefinhas) {
       if(btnMarcaTudo.checked) {
           tarefinha.checked = true;
           listaDone.append(tarefinha.closest('li'))

       } else {
           tarefinha.checked = false;
           listaToDo.append(tarefinha.closest('li'))
           
       }
   }
   addContador();
})