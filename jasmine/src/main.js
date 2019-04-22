
const vendingMachine = new VendingMachine();

const messageArray = [];

const displayObserver = {
    update: function () {
        document.querySelector("#message").innerHTML = vendingMachine.currentMessage;
    }
}
const dispatchObserver = {
    update: function (element) {
        let dispatchDOMelement = document.querySelector(".dispatcher");
        dispatchDOMelement.classList.add(`dispatch-${element}`);
        setTimeout(() => {
            dispatchDOMelement.classList.remove(`dispatch-${element}`);
        }, 2000);
    }
}

vendingMachine.subscribeForMessages(displayObserver);
vendingMachine.subscribeForDispatch(dispatchObserver);

document.querySelector("#nickel").addEventListener("click", function () { animateCoin(5) });
document.querySelector("#dime").addEventListener("click", function () { animateCoin(3) });
document.querySelector("#quarter").addEventListener("click", function () { animateCoin(6) });
document.querySelector("#cap").addEventListener("click", function () { animateCoin(100) });
document.querySelector("#cola").addEventListener("click", function () { vendingMachine.selectProduct("cola") });
document.querySelector("#chips").addEventListener("click", function () { vendingMachine.selectProduct("chips") });
document.querySelector("#candy").addEventListener("click", function () { vendingMachine.selectProduct("candy") });
document.querySelector("#returnMoney").addEventListener("click", function () { vendingMachine.giveBackMyMoney() });

document.querySelector("#nickel").addEventListener("mouseenter", function () { showInfoMessage("This is Nickel coin.") })
document.querySelector("#dime").addEventListener("mouseenter", function () { showInfoMessage("This is Dime coin.") });
document.querySelector("#quarter").addEventListener("mouseenter", function () { showInfoMessage("This is Quarter coin.") });
document.querySelector("#cap").addEventListener("mouseenter", function () { showInfoMessage("This is Nuka Cola bottlecap.") });
document.querySelector("#cola").addEventListener("mouseenter", function () { showInfoMessage("This is Nuka Cola.") });
document.querySelector("#chips").addEventListener("mouseenter", function () { showInfoMessage("This is bad idea to eat.") });
document.querySelector("#candy").addEventListener("mouseenter", function () { showInfoMessage("This is bonus to INT stat.") });
document.querySelector("#returnMoney").addEventListener("mouseenter", function () { showInfoMessage("This is big red button.") });

document.querySelector(".display").addEventListener("mouseenter", function () { showInfoMessage("This is display of machine.") });
document.querySelector(".targetNCMachine").addEventListener("mouseenter", function () {
    let number = Math.floor(Math.random() * 100);
    if (number > 60) {
        showInfoMessage("This is pre-war technology.");
    } else if (number > 30) {
        showInfoMessage("This is Nuka Cola machine.");
    } else {
        showInfoMessage("Still working. Amazing.");
    }
});

function animateCoin(weight) {
    let coinName = "#" + vendingMachine.checkCoinByWeight(weight);
    if (coinName === "#") coinName = "#cap";
    let coinDOMelement = document.querySelector(coinName);
    coinDOMelement.classList.add("coinMoving");
    setTimeout(() => {
        coinDOMelement.classList.remove("coinMoving");
        vendingMachine.insertCoin(weight);
    }, 1500);
}

function showInfoMessage(infoMessage) {
    if (messageArray.length === 3) {
        messageArray.shift();
    }
    messageArray.push(infoMessage);
    updateMessenger();
}

function updateMessenger() {
    document.querySelector("#infoMessage").innerHTML = messageArray.join("<br>");
}

