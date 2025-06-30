const SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain", (accounts) => {
  const admin = accounts[0];
  const manufacturer = accounts[1];
  const distributor = accounts[2];
  const retailer = accounts[3];
  const consumer = accounts[4];

  let instance;

  before(async () => {
    instance = await SupplyChain.deployed();

    // Grant roles via admin
    await instance.addManufacturer(manufacturer, { from: admin });
    await instance.addDistributor(distributor, { from: admin });
    await instance.addRetailer(retailer, { from: admin });
    await instance.addConsumer(consumer, { from: admin });
  });

  it("should allow manufacturer to add product", async () => {
    await instance.addProduct("Apple", { from: manufacturer });

    const product = await instance.getProduct(1);
    assert.equal(product.name, "Apple", "Product name mismatch");
    assert.equal(product.state.toString(), "0", "Incorrect state (should be Created)");
  });

  it("should allow distributor to ship the product", async () => {
    await instance.shipProduct(1, { from: distributor });

    const product = await instance.getProduct(1);
    assert.equal(product.state.toString(), "1", "Incorrect state (should be Shipped)");
  });

  it("should allow retailer to stock the product", async () => {
    await instance.stockProduct(1, { from: retailer });

    const product = await instance.getProduct(1);
    assert.equal(product.state.toString(), "2", "Incorrect state (should be Stocked)");
  });

  it("should allow consumer to purchase the product", async () => {
    await instance.purchaseProduct(1, { from: consumer });

    const product = await instance.getProduct(1);
    assert.equal(product.state.toString(), "3", "Incorrect state (should be Purchased)");
  });
});
