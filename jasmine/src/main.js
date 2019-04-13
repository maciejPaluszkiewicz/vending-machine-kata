
    const vendingMachine = new VendingMachine();

    const displayObserver = {
        update: function(){
            document.querySelector("#message").innerHTML = vendingMachine.currentMessage;
        }
    }

    vendingMachine.subscribe(displayObserver);

    document.querySelector("#nickel").addEventListener("click",nickelListener)
    document.querySelector("#dime").addEventListener("click",dimeListener);
    document.querySelector("#quarter").addEventListener("click",quarterListener);
    document.querySelector("#cap").addEventListener("click",capListener);
    document.querySelector("#cola").addEventListener("click",colaListener);
    document.querySelector("#chips").addEventListener("click",chipsListener);
    document.querySelector("#candy").addEventListener("click",candyListener);
    document.querySelector("#returnMoney").addEventListener("click",returnMoneyListener);

    function nickelListener(){
        animateCoin(5);
        
    }
    function dimeListener(){
        animateCoin(3);
    }
    function quarterListener(){
        animateCoin(6);
    }
    function capListener(){
        animateCoin(100);
    }
    function colaListener(){
        vendingMachine.selectProduct("cola");
    }
    function chipsListener(){
        vendingMachine.selectProduct("chips");
    }
    function candyListener(){
        vendingMachine.selectProduct("candy");
    }
    function returnMoneyListener(){
        vendingMachine.giveBackMyMoney();
    }

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
