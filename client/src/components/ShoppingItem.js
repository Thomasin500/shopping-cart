import React from "react";
import axios from "axios";
import formatCurrency from "../helpers/formatters"

function ShoppingItem(props) {

    //each item should have an individual price, quantity, total price, name, description, etc
    //TODO ability to edit quantity

    function addItemToCart(item) {  
        console.log(666)
        axios.post(`http://localhost:8000/shopping/additemtocart/${item.id}`)
            .then((response) => {
                console.log(`Added ${item.name} to your shopping cart!`);
            //TODO some sort of notification
        });
    }

    return (
        <div id="shopping-item">
            name: { props.item.name }
            price: { formatCurrency(props.item.price) }
            <button id="addToCart" onClick={() => addItemToCart(props.item)}> Click me </button>
        </div>
    );
    
}

export default ShoppingItem;