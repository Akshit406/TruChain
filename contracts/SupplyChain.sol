// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./roles/Manufacturer.sol";
import "./roles/Distributor.sol";
import "./roles/Retailer.sol";
import "./roles/Consumer.sol";

contract SupplyChain is Manufacturer, Distributor, Retailer, Consumer {
    enum State { Created, Shipped, Stocked, Purchased }

    struct Product {
        uint256 id;
        string name;
        address[] manufacturers;
        address[] distributors;
        address[] retailers;
        address[] consumers;
        State state;
    }

    uint256 public productCounter;
    mapping(uint256 => Product) public products;

    event ProductAdded(uint256 id, string name, address manufacturer);
    event ProductShipped(uint256 id, address distributor);
    event ProductStocked(uint256 id, address retailer);
    event ProductPurchased(uint256 id, address consumer);

    constructor() {
        // Admin.sol constructor sets the deployer as default admin
    }

    function addProduct(string memory _name) public onlyManufacturer {
        productCounter++;

        address[] memory manufacturersArray = new address[](1); // Declare and initialize the array
        manufacturersArray[0] = msg.sender; // Assign the current manufacturer

        products[productCounter] = Product({
            id: productCounter,
            name: _name,
            manufacturers: manufacturersArray, // Use the declared array
            distributors: new address[](0), // Initialize empty arrays
            retailers: new address[](0),
            consumers: new address[](0),
            state: State.Created
        });

        emit ProductAdded(productCounter, _name, msg.sender);
    }

    function shipProduct(uint256 _id) public onlyDistributor {
        require(products[_id].state == State.Created, "Product not in Created state");

        products[_id].distributors.push(msg.sender);
        products[_id].state = State.Shipped;

        emit ProductShipped(_id, msg.sender);
    }

    function stockProduct(uint256 _id) public onlyRetailer {
        require(products[_id].state == State.Shipped, "Product not in Shipped state");

        products[_id].retailers.push(msg.sender);
        products[_id].state = State.Stocked;

        emit ProductStocked(_id, msg.sender);
    }

    function purchaseProduct(uint256 _id) public onlyConsumer {
        require(products[_id].state == State.Stocked, "Product not in Stocked state");

        products[_id].consumers.push(msg.sender);
        products[_id].state = State.Purchased;

        emit ProductPurchased(_id, msg.sender);
    }

    function getProduct(uint256 _id) public view returns (
        uint256 id,
        string memory name,
        State state,
        address[] memory manufacturers,
        address[] memory distributors,
        address[] memory retailers,
        address[] memory consumers
    ) {
        Product memory p = products[_id];
        return (
            p.id,
            p.name,
            p.state,
            p.manufacturers,
            p.distributors,
            p.retailers,
            p.consumers
        );
    }
}
