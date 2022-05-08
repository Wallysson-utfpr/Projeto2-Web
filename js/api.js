
const init = () => {
    const inputEmail = document.querySelector('input[type = "email"]');
    const inputPassword = document.querySelector('input[type = "password"]');
    const submitButton = document.querySelector('.login-submit');
    
    document.querySelector(".login-submit").disabled = true;

    inputPassword.addEventListener("keyup", function (){
    var avisoSenha = document.querySelector("ul1"),

    palavra = inputPassword.value;
    avisoSenha.innerHTML = "";
    if (palavra.length < 4) {
        var li = document.createElement("li");
        li.innerHTML = "Senha precisa ser maior do que três caracteres!";
        avisoSenha.appendChild(li).style.color = "red";
    }
    else{
        var li = document.createElement("li");
        li.innerHTML = "Senha OK";
        avisoSenha.appendChild(li).style.color = "green";
        document.querySelector(".login-submit").disabled = false;
    
        if (submitButton) {
            submitButton.addEventListener('click', (event) => {
                event.preventDefault();
                fetch('https://reqres.in/api/login', {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: inputEmail.value,
                        password: inputPassword.value,
                    })
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log(data);
                    localStorage.setItem("token", data.token);
                    if (localStorage.token !== "undefined") {
                        openModal('dv-modal2');
                    }
                })
            })
        }
    }
});
    

    
}

window.onload = init;

function getmoedas() {

    let nameescolha = document.querySelector('.name-escolha');
    let altaescolha = document.querySelector('.alta-escolha');
    let baixaescolha = document.querySelector('.baixa-escolha');


    (async () => {

        let escolhatxt = document.querySelector('.escolha');
        var teste = escolhatxt.value;
        var teste2 = teste;
        var lista = document.querySelector("ul");
        //input = document.querySelector("#teste");
        (async () => {

            // chamada da api para obter a lista completa de moedas
            let listamoedas = await axios.get('https://economia.awesomeapi.com.br/json/available');

            // teste para validar se a combinação de moedas escolhidas faz parte das
            // moedas presentes na api
            if (!listamoedas.data[teste]) {
                var li = document.createElement("li");
                li.innerHTML = "Ops! Moeda inexistente";
                lista.appendChild(li).style.color = "yellow";
            } else {
                // chamada da api para obter a cotação das moedas selecionadas
                let json = await axios.get('https://economia.awesomeapi.com.br/last/' + teste);

                teste2 = teste.replace("-", "");

                nameescolha.innerHTML = json.data[teste2].name;
                altaescolha.innerHTML = json.data[teste2].high;
                baixaescolha.innerHTML = json.data[teste2].low;
            }
        })();

    })();
}


function showHide(id) {

    let conteudo = document.querySelector(id);
    conteudo.classList.toggle('ativo');

}

function logout() {
    localStorage.setItem("token", "undefined");
}

function recarregar() {

    if (localStorage.token !== "undefined") {
        openModal('dv-modal2');

    }

}

// função de verificação dos dados entrados (formato e comprimento).
function verificatxt() {

    var lista = document.querySelector("ul"),
        input = document.querySelector("#teste");

    input.addEventListener("keyup", function () {
        var palavra = input.value;
        lista.innerHTML = "";
        if (palavra.length < 1) {
            var li = document.createElement("li");
            li.innerHTML = "Não pode ser vazio...";
            lista.appendChild(li).style.color = "red";

        } else if (palavra.length >= 1 && palavra.length <= 6) {
            var li = document.createElement("li");
            li.innerHTML = "Tá quase lá..";
            lista.appendChild(li).style.color = "yellow";

            var li = document.createElement("li");
            li.innerHTML = "Formato esperado {XXX-XXX}";
            lista.appendChild(li).style.color = "yellow";

        } else if (palavra.length > 7) {
            var li = document.createElement("li");
            li.innerHTML = "Ops! Tem mais digito que o permitido";
            lista.appendChild(li).style.color = "yellow";

            var li = document.createElement("li");
            li.innerHTML = "O formato esperado {XXX-XXX}";
            lista.appendChild(li).style.color = "yellow";

        } else if (palavra.length == 7) {
            var li = document.createElement("li");
            li.innerHTML = "Tamanho OK!";
            lista.appendChild(li).style.color = "green";

            var li = document.createElement("li");
            li.innerHTML = "Formato ok " + palavra;
            lista.appendChild(li).style.color = "green";
        }
    });
}