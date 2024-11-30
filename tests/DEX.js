const { expect } = require("chai");

describe("DEX", () => {
    let tokenSupply = "100";
    let token;
    let owner;
    let addr1;
    let addr2;

    before(async () => {
        [owner, addr1, addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("MyToken");
        token = await Token.deploy(tokenSupply);

        const DEX = await ethers.getContractFactory("DEX");
        dex = await DEX.deploy(token.address, price)
    });

    describe("Sell", () => {
        it("Should fail if contract is not approved", async () => {
            await expect(dex.sell()).to.be.reverted;
        });

        it("Should allow DEX to transfer tokens", async () => {
            await token.approve(dex.address, 100);
        });

        it("Should not allow non-owner to call sell()", async () => {
            await expect(dex.connect(addr1).sell()).to.be.reverted;
        });

        it("Sell should transfer tokens from owner to contract", async () => {
            await expect(dex.sell()).to.changeTokenBalances(token, [owner.address, dex.address],
            [-100, 100]);
        });
    });

    describe("Getters", () => {
        it("Should return correct token balance", async () => {
            expect(await dex.getTokenBalance()).to.equal(100);
        });
        
        it("Should return correct token price", async () => {
            expect(await dex.getPrice(10)).to.equal(price * 10);
        });
    });

    describe("Buy", () => {
        it("User can buy tokens", async () => {
            await expect(dex.connect(addr1).buy(10, { value: 1000 }))
        })
    });

    describe("Withdraw tokens", () => {});
    describe("Withdraw funds", () => {});

});