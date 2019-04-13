
    const vendingMachine = new VendingMachine();

    const messageArray = [];

    const displayObserver = {
        update: function(){
            document.querySelector("#message").innerHTML = vendingMachine.currentMessage;
        }
    }

    vendingMachine.subscribe(displayObserver);

    document.querySelector("#nickel").addEventListener("click", function(){animateCoin(5)});
    document.querySelector("#dime").addEventListener("click",function(){animateCoin(3)});
    document.querySelector("#quarter").addEventListener("click",function(){animateCoin(6)});
    document.querySelector("#cap").addEventListener("click",function(){animateCoin(100)});
    document.querySelector("#cola").addEventListener("click",function(){vendingMachine.selectProduct("cola")});
    document.querySelector("#chips").addEventListener("click",function(){vendingMachine.selectProduct("chips")});
    document.querySelector("#candy").addEventListener("click",function(){vendingMachine.selectProduct("candy")});
    document.querySelector("#returnMoney").addEventListener("click",function(){vendingMachine.giveBackMyMoney()});

    document.querySelector("#nickel").addEventListener("mouseover",function(){showInfoMessage("This is Nickel coin.")})
    document.querySelector("#dime").addEventListener("mouseover",function(){showInfoMessage("This is Dime coin.")});
    document.querySelector("#quarter").addEventListener("mouseover",function(){showInfoMessage("This is Quarter coin.")});
    document.querySelector("#cap").addEventListener("mouseover",function(){showInfoMessage("This is Nuka Cola bottlecap.")});
    document.querySelector("#cola").addEventListener("mouseover",function(){showInfoMessage("This is Nuka Cola.")});
    document.querySelector("#chips").addEventListener("mouseover",function(){showInfoMessage("This is bad idea to eat.")});
    document.querySelector("#candy").addEventListener("mouseover",function(){showInfoMessage("This is bonus to INT stat.")});
    document.querySelector("#returnMoney").addEventListener("mouseover",function(){showInfoMessage("This is rusty button.")});

    document.querySelector(".display").addEventListener("mouseover",function(){showInfoMessage("This is display of machine.")});
    // document.querySelector(".vmachine").addEventListener("mouseover",function(){showInfoMessage("Still working. Amazing.")});

    function animateCoin(weight){
        let coinName = "#" + vendingMachine.checkCoinByWeight(weight);
        if(coinName==="#") coinName = "#cap";
        let coinDOMelement = document.querySelector(coinName);
        coinDOMelement.classList.add("coinMoving");
        setTimeout(()=>{
            coinDOMelement.classList.remove("coinMoving");
            vendingMachine.insertCoin(weight);
        }, 1500);
    }

    function showInfoMessage(infoMessage){
        if(messageArray.length === 3){
            messageArray.shift();
        }
        messageArray.push(infoMessage);
        updateMessenger();
    }

    function updateMessenger(){
        document.querySelector("#infoMessage").innerHTML = messageArray.join("<br>");
    }