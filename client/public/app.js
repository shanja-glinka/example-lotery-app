const Fetch = (url, method = 'GET', call = null) => {
    fetch(url, {
        method: method,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        },
    }).then(
        response => response.json()
    ).then(response => {
        call(response);
    });
}

const mainBtn = document.querySelector('#startGame');


Fetch('http://localhost:3001/member/myid', 'GET', (res) => {
    let clientId = '';

    if (typeof res !== 'undefined')
        clientId = res;

    setClientState(clientId);
});


const setClientState = (clientId) => {
    if (clientId == '') {
        mainBtn.style.display = null;
        mainBtn.addEventListener('click', () => {
            newMember();
        });
    } else
        Fetch('http://localhost:3001/member/' + clientId, 'GET', (res) => {
            if (res.isWinner == 1)
                isWinner()
            else isLose();
        });
}


const newMember = () => {
    mainBtn.style.display = 'none';

    Fetch('http://localhost:3001/lottery/try', 'POST', (res) => {
        if (res.isWinner == 1)
            isWinner()
        else isLose();
    });
}


const isWinner = () => {
    lotteryAttempt('You are Winner');
}

const isLose = () => {
    lotteryAttempt('You are not Winner');
}

const lotteryAttempt = (text) => {
    let p = document.createElement('p');
    p.innerText = text;

    document.querySelector('.jumbotron').appendChild(p);
}




function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}