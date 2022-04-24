
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

                if (data.token === 'QpwL5tke4Pnpja7X4') {
                    openModal('dv-modal2');
                    getmoedas();
                }
            })

        })
    }
}

window.onload = init;

function getmoedas() {

    
    //bnt = document.querySelector('.btn');
    //bnt.addEventListener("click", );
    let nameusd = document.querySelector('.name-usd');
    let altausd = document.querySelector('.alta-usd');
    let baixausd = document.querySelector('.baixa-usd');

    let nameeur = document.querySelector('.name-eur');
    let altaeur = document.querySelector('.alta-eur');
    let baixaeur = document.querySelector('.baixa-eur');

    let namebtc = document.querySelector('.name-btc');
    let altabtc = document.querySelector('.alta-btc');
    let baixabtc = document.querySelector('.baixa-btc');

    (async () => {
        let json = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
        
        nameusd.innerHTML = json.data.USDBRL.name;
        altausd.innerHTML = json.data.USDBRL.high;
        baixausd.innerHTML = json.data.USDBRL.low;

        nameeur.innerHTML = json.data.EURBRL.name;
        altaeur.innerHTML = json.data.EURBRL.high;
        baixaeur.innerHTML = json.data.EURBRL.low;

        namebtc.innerHTML = json.data.BTCBRL.name;
        altabtc.innerHTML = json.data.BTCBRL.high;
        baixabtc.innerHTML = json.data.BTCBRL.low;
    })();
}

function showHide(id) {
    let conteudo = document.querySelector(id);
    conteudo.classList.toggle('ativo');
}