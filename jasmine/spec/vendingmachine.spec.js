describe("Vending Machine", () => {
    let vendingMachine;

    beforeEach(() => {
        vendingMachine = new VendingMachine();
    });

    it("Should return name of nickel coin by its weight", () => {
        //given
        let coinWeight = 4.9;
        //when
        let currentCoin = vendingMachine.checkCoinByWeight(coinWeight);
        //then
        expect(currentCoin).toEqual("nickel");
    });

    it("Should return name of dime coin by its weight", () => {
        //given
        let coinWeight = 3.1;
        //when
        let currentCoin = vendingMachine.checkCoinByWeight(coinWeight);
        //then
        expect(currentCoin).toEqual("dime");
    });

    it("Should return name of quarter coin by its weight", () => {
        //given
        let coinWeight = 6.1111111;
        //when
        let currentCoin = vendingMachine.checkCoinByWeight(coinWeight);
        //then
        expect(currentCoin).toEqual("quarter");
    });

    it("Should return false for not recognized coin", () => {
        //given
        let coinWeight = 100;
        //when
        let currentCoin = vendingMachine.checkCoinByWeight(coinWeight);
        //then
        expect(currentCoin).toBeFalsy();
    });

    it("Should add inserted coin to Current Coins", () => {
        //given

        //when
        vendingMachine.addToCurrentCoins("nickel");
        vendingMachine.addToCurrentCoins("dime");
        vendingMachine.addToCurrentCoins("nickel");
        vendingMachine.addToCurrentCoins("quarter");
        //then
        expect(vendingMachine.currentCoins.nickel).toEqual(2);
        expect(vendingMachine.currentCoins.dime).toEqual(1);
        expect(vendingMachine.currentCoins.quarter).toEqual(1);
    })

    it("Should return proper flag if product is Sold Out", () => {
        //given
        vendingMachine.products.cola.amount = 0;
        vendingMachine.products.chips.amount = 1;
        //when
        let soldOutProduct = vendingMachine.checkIfSoldOut("cola");
        let notSoldOutProduct = vendingMachine.checkIfSoldOut("chips");
        //then
        expect(soldOutProduct).toBeTruthy();
        expect(notSoldOutProduct).toBeFalsy();
    });

    it("Should return true if sum of coins amount is equal price", () => {
        //given
        let colaPrice = vendingMachine.products.cola.price;
        vendingMachine.addToCurrentCoins("quarter");
        vendingMachine.addToCurrentCoins("quarter");
        vendingMachine.addToCurrentCoins("quarter");
        vendingMachine.addToCurrentCoins("dime");
        vendingMachine.addToCurrentCoins("dime");
        vendingMachine.addToCurrentCoins("nickel");
        //when
        let sumOfCoinsAmount = vendingMachine.sumCurrentCoinsValue();
        //then
        expect(sumOfCoinsAmount).toEqual(colaPrice);
    });

    it("Should delete one of products from amount in machine at completing purchase", () => {
        //given
        let elementToDistribute = "chips";
        let startingAmountOfChips = vendingMachine.products.chips.amount;
        //when
        vendingMachine.decreasePurchasedProductAmount(elementToDistribute);
        //then
        expect(vendingMachine.products.chips.amount).toEqual(startingAmountOfChips - 1);
    });

    it("Should add current coins to proper boxes", () => {
        //given
        vendingMachine.currentCoins = { nickel: 1, dime: 1, quarter: 2 };
        vendingMachine.coins.nickel.amount = 10;
        vendingMachine.coins.dime.amount = 10;
        vendingMachine.coins.quarter.amount = 10;
        //when
        vendingMachine.addCurrentCoinsToBoxes();
        //then
        expect(vendingMachine.currentCoins.nickel).toEqual(0);
        expect(vendingMachine.currentCoins.dime).toEqual(0);
        expect(vendingMachine.currentCoins.quarter).toEqual(0);
        expect(vendingMachine.coins.nickel.amount).toEqual(11);
        expect(vendingMachine.coins.dime.amount).toEqual(11);
        expect(vendingMachine.coins.quarter.amount).toEqual(12);
    })

    it("Should return change at purchase completion", () => {
        //given
        let coinsToReturn = { nickel: 1, dime: 1, quarter: 1 };
        vendingMachine.coins.nickel.amount = 10;
        vendingMachine.coins.dime.amount = 10;
        vendingMachine.coins.quarter.amount = 10;
        //when
        vendingMachine.returnChange(coinsToReturn);
        //then
        expect(vendingMachine.coins.nickel.amount).toEqual(9);
        expect(vendingMachine.coins.dime.amount).toEqual(9);
        expect(vendingMachine.coins.quarter.amount).toEqual(9);
    })

    it("Should return empty object if there is no exact change available", () => {
        //given
        let productValue = 0.55;
        let moneyInserted = 0.60;
        vendingMachine.coins.nickel.amount = 0;
        vendingMachine.coins.dime.amount = 0;
        vendingMachine.coins.quarter.amount = 0;
        //when
        let exactChange = vendingMachine.calculateChange(productValue, moneyInserted);
        //then
        expect(exactChange).toEqual({});
    });

    it("Should return correct amount of coins as change", () => {
        //given
        let productValue = 0.65;
        let moneyInserted = 1.05;
        vendingMachine.coins.nickel.amount = 10;
        vendingMachine.coins.dime.amount = 10;
        vendingMachine.coins.quarter.amount = 10;
        //when
        let exactChange = vendingMachine.calculateChange(productValue, moneyInserted);
        //then
        expect(exactChange.nickel).toEqual(1);
        expect(exactChange.dime).toEqual(1);
        expect(exactChange.quarter).toEqual(1);
    })

    it("Should give back same coins on aborting", () => {
        //given
        vendingMachine.currentCoins = { nickel: 1, dime: 1, quarter: 2 };
        //when
        vendingMachine.giveBackAllCoins();
        //then
        expect(vendingMachine.currentCoins.nickel).toEqual(0);
        expect(vendingMachine.currentCoins.dime).toEqual(0);
        expect(vendingMachine.currentCoins.quarter).toEqual(0);
    })

    it("Should return false if product value is higher than current coins amount", () => {
        //given
        vendingMachine.currentCoins = { nickel: 1, dime: 1, quarter: 2 };
        let price = 100;
        //when
        let possibilityOfPurchase = vendingMachine.checkAmountWithPrice(price);
        //then
        expect(possibilityOfPurchase).toBeFalsy();
    })

    it("Should display current amount of coins on inserting coin", () => {
        //given
        let coinWeight = 6;
        vendingMachine.currentMessage = vendingMachine.messages.insertCoin;
        //when
        vendingMachine.insertCoin(coinWeight);
        //then
        expect(vendingMachine.currentMessage).toEqual("CURRENT AMOUNT 0.25");
    })

    it("Should display insert coin if give back money is pressed", () => {
        //given
        vendingMachine.currentMessage = vendingMachine.messages.soldOut;
        //when
        vendingMachine.giveBackMyMoney();
        //then
        expect(vendingMachine.currentMessage).toEqual("INSERT COIN");
    })

    it("Should display sold out if chosen product is unavailable", () => {
        //given
        let product = "cola";
        vendingMachine.products[product].amount = 0;
        vendingMachine.currentMessage = vendingMachine.messages.insertCoin;
        //when
        vendingMachine.selectProduct(product);
        //then
        expect(vendingMachine.currentMessage).toEqual("SOLD OUT");
    })

    it("Should display insert coin after 3 seconds from sold out message", () => {

        jasmine.clock().install();

        //given
        let product = "cola";
        vendingMachine.products[product].amount = 0;
        vendingMachine.currentCoins.dime = 1;
        //when
        vendingMachine.selectProduct(product);
        //then
        expect(vendingMachine.currentMessage).toEqual("SOLD OUT");

        jasmine.clock().tick(3500);

        expect(vendingMachine.currentMessage).toEqual("CURRENT AMOUNT 0.1");

        jasmine.clock().uninstall()
    })

    it("Should display exact change only if no possibilities to give change", () => {
        //given
        let product = "cola";
        vendingMachine.coins.dime.amount = 0;
        vendingMachine.coins.nickel.amount = 0;
        vendingMachine.coins.quarter.amount = 0;

        vendingMachine.products[product].amount = 1;

        vendingMachine.currentCoins.dime = 3;
        vendingMachine.currentCoins.nickel = 0;
        vendingMachine.currentCoins.quarter = 3;

        //when
        vendingMachine.selectProduct(product);
        //then
        expect(vendingMachine.currentMessage).toEqual("EXACT CHANGE ONLY");
    })

    it("Should display thank you after transaction is done", () => {

        jasmine.clock().install();

        //given
        let product = "candy";
        vendingMachine.coins.dime.amount = 20;
        vendingMachine.coins.nickel.amount = 20;
        vendingMachine.coins.quarter.amount = 20;

        vendingMachine.products[product].amount = 1;

        vendingMachine.currentCoins.dime = 0;
        vendingMachine.currentCoins.nickel = 0;
        vendingMachine.currentCoins.quarter = 3;

        //when
        vendingMachine.selectProduct(product);

        //then
        expect(vendingMachine.currentMessage).toEqual("THANK YOU");

        jasmine.clock().tick(3500);

        expect(vendingMachine.currentMessage).toEqual("INSERT COIN");

        jasmine.clock().uninstall()
    })

});