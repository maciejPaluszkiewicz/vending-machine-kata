
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
        vendingMachine.insertCoin(5);
    }
    function dimeListener(){
        vendingMachine.insertCoin(3);
    }
    function quarterListener(){
        vendingMachine.insertCoin(6);
    }
    function capListener(){
        vendingMachine.insertCoin(100);
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

