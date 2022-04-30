
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

/*
const inite = () => {
    const escolhasubmit = document.querySelector('.escolha-submit');
    escolhasubmit.addEventListener("click", (event) => {
        getmoedas();
    })
}
window.onload = inite;
*/