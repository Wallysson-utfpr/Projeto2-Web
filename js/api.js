
const init = () => {
    const inputEmail = document.querySelector('input[type = "email"]');
    const inputPassword = document.querySelector('input[type = "password"]');
    const submitButton = document.querySelector('.login-submit');

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

window.onload = init;

function getmoedas() {

    let nameusd = document.querySelector('.name-usd');
    let altausd = document.querySelector('.alta-usd');
    let baixausd = document.querySelector('.baixa-usd');

    let nameeur = document.querySelector('.name-eur');
    let altaeur = document.querySelector('.alta-eur');
    let baixaeur = document.querySelector('.baixa-eur');

    let namebtc = document.querySelector('.name-btc');
    let altabtc = document.querySelector('.alta-btc');
    let baixabtc = document.querySelector('.baixa-btc');

    let nameescolha = document.querySelector('.name-escolha');
    let altaescolha = document.querySelector('.alta-escolha');
    let baixaescolha = document.querySelector('.baixa-escolha');




    (async () => {

        let escolhatxt = document.querySelector('.escolha');
        var teste = escolhatxt.value;
        var teste2 = teste;
        let json = await axios.get('https://economia.awesomeapi.com.br/last/' + teste);


        //let url = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL, ' = escolhatxt;
        //let json = await axios.get(url);
        /*
        nameusd.innerHTML = json.data.USDBRL.name;
        altausd.innerHTML = json.data.USDBRL.high;
        baixausd.innerHTML = json.data.USDBRL.low;

        nameeur.innerHTML = json.data.EURBRL.name;
        altaeur.innerHTML = json.data.EURBRL.high;
        baixaeur.innerHTML = json.data.EURBRL.low;

        namebtc.innerHTML = json.data.BTCBRL.name;
        altabtc.innerHTML = json.data.BTCBRL.high;
        baixabtc.innerHTML = json.data.BTCBRL.low;
        */
        teste2 = teste.replace("-", "");

        nameescolha.innerHTML = json.data[teste2].name;
        altaescolha.innerHTML = json.data[teste2].high;
        baixaescolha.innerHTML = json.data[teste2].low;


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

            } else if (palavra.length >= 1 && palavra.length  <= 6) {
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
                li.innerHTML = "OK!";
                lista.appendChild(li).style.color = "green";

                var li = document.createElement("li");
                li.innerHTML = palavra;
                lista.appendChild(li).style.color = "green";
            }
    });
}