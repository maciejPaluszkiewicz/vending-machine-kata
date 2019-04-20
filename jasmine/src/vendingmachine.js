
class VendingMachine {

    constructor() {
        this.products = {
            cola: {
                price: 1.00,
                amount: 5
            },
            chips: {
                price: 0.50,
                amount: 3
            },
            candy: {
                price: 0.65,
                amount: 12
            }
        };

        this.coins = {
            nickel: {
                value: 0.05,
                amount: 0
            },
            dime: {
                value: 0.10,
                amount: 0
            },
            quarter: {
                value: 0.25,
                amount: 4
            }
        };

        this.currentCoins = {
            nickel: 0,
            dime: 0,
            quarter: 0
        };

        this.messages = {
            insertCoin: "INSERT COIN",
            currentAmount: "CURRENT AMOUNT ",
            thankYou: "THANK YOU",
            exactChangeOnly: "EXACT CHANGE ONLY",
            soldOut: "SOLD OUT",
            priceOnDisplay: "PRICE: ",
            insertRealCoin: "INSERT REAL COIN"
        };

        this.currentMessage = this.messages.insertCoin;

        this.observers = [];
    }

    addToCurrentCoins(coin) {
        this.currentCoins[coin] += 1;
    }

    checkIfSoldOut(product) {
        return this.products[product].amount === 0
    }

    sumCurrentCoinsValue() {
        let nickelCoins = this.coins.nickel.value * this.currentCoins.nickel;
        let dimeCoins = this.coins.dime.value * this.currentCoins.dime;
        let quarterCoins = this.coins.quarter.value * this.currentCoins.quarter;
        return nickelCoins + dimeCoins + quarterCoins;
    }

    decreasePurchasedProductAmount(product) {
        this.products[product].amount -= 1;
    }

    addCurrentCoinsToBoxes() {
        this.coins.nickel.amount += this.currentCoins.nickel;
        this.coins.dime.amount += this.currentCoins.dime;
        this.coins.quarter.amount += this.currentCoins.quarter;
        this.currentCoins.nickel = 0;
        this.currentCoins.dime = 0;
        this.currentCoins.quarter = 0;
    }

    returnChange(coinsToReturn) {
        this.coins.nickel.amount -= coinsToReturn.nickel;
        this.coins.dime.amount -= coinsToReturn.dime;
        this.coins.quarter.amount -= coinsToReturn.quarter;
    }

    calculateChange(productValue, moneyInserted) {
        //debugger
        let moneyToReturn = moneyInserted * 100 - productValue * 100;

        const _updateChange = (coinType) => {
            let coinValue = this.coins[coinType].value * 100;
            let coinsToReturn = (moneyToReturn - (moneyToReturn % coinValue)) / coinValue;
            let availableCoinsForChange = this.coins[coinType].amount - coinsToReturn;
            if (availableCoinsForChange < 0) coinsToReturn = this.coins[coinType].amount;

            moneyToReturn -= coinsToReturn * coinValue;
            return coinsToReturn;
        }

        let quartersToReturn = _updateChange("quarter");
        let dimesToReturn = _updateChange("dime");
        let nickelsToReturn = _updateChange("nickel");

        if (moneyToReturn > 0) return {};
        return { nickel: nickelsToReturn, dime: dimesToReturn, quarter: quartersToReturn }
    }

    checkCoinByWeight(coinWeight) {
        if (coinWeight > 2.8 && coinWeight < 3.2) return "dime";
        if (coinWeight > 4.8 && coinWeight < 5.2) return "nickel";
        if (coinWeight > 5.8 && coinWeight < 6.2) return "quarter";
        return "";
    }

    giveBackCoin() {
        //TODO
    }

    giveBackAllCoins() {
        this.currentCoins.nickel = 0;
        this.currentCoins.dime = 0;
        this.currentCoins.quarter = 0;
    }

    checkAmountWithPrice(price) {
        return price <= this.sumCurrentCoinsValue();
    }

    //---------------------------
    // Design Pattern Observer
    //---------------------------


    setMessage(message) {
        this.currentMessage = message;
        for (let observer of this.observers) {
            observer.update();

        }
    }

    subscribe(observer) {
        this.observers.push(observer);
    }



    //----------------------------
    // PUBLIC API+
    //----------------------------

    insertCoin(coinWeight) {
        let currentCoin = this.checkCoinByWeight(coinWeight);
        if (currentCoin) {
            this.addToCurrentCoins(currentCoin);
            this.setMessage(this.messages.currentAmount + this.sumCurrentCoinsValue().toFixed(2));
        } else {
            let previousMessage = this.currentMessage;
            this.setMessage(this.messages.insertRealCoin);
            setTimeout(() => {
                this.setMessage(previousMessage);
            }, 2000)
            this.giveBackCoin();
        }
    }

    giveBackMyMoney() {
        this.giveBackAllCoins();
        this.setMessage(this.messages.insertCoin);
    }

    selectProduct(product) {
        // debugger
        let soldOut = this.checkIfSoldOut(product);
        if (soldOut) {
            this.setMessage(this.messages.soldOut);
            setTimeout(() => {
                this.setMessage(this.messages.currentAmount + this.sumCurrentCoinsValue().toFixed(2));
            }, 3000)
            return;
        }
        let canHandleCost = this.checkAmountWithPrice(this.products[product].price)
        if (!canHandleCost) {
            this.setMessage(this.messages.priceOnDisplay + this.products[product].price.toFixed(2));
            setTimeout(() => {
                let coinsInMachine = this.sumCurrentCoinsValue()
                if (coinsInMachine > 0) {
                    this.setMessage(this.messages.currentAmount + coinsInMachine.toFixed(2));
                } else {
                    this.setMessage(this.messages.insertCoin);
                }
            }, 3000);
        }
        else {
            let theChange = this.calculateChange(this.products[product].price, this.sumCurrentCoinsValue());
            if (theChange.dime === undefined) {
                this.setMessage(this.messages.exactChangeOnly);
                setTimeout(() => {
                    this.setMessage(this.messages.currentAmount + this.sumCurrentCoinsValue().toFixed(2));
                }, 3000);
            } else {
                this.returnChange(theChange);
                this.decreasePurchasedProductAmount(product);
                this.addCurrentCoinsToBoxes();
                this.setMessage(this.messages.thankYou);
                setTimeout(() => {
                    this.setMessage(this.messages.insertCoin);
                }, 3000)
            }
        }
    }

    //----------------------------

};
