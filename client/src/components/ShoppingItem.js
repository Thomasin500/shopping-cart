import React from "react";
import axios from "axios";
import formatCurrency from "../helpers/formatters"

function ShoppingItem(props) {

    //each item should have an individual price, quantity, total price, name, description, etc
    //TODO ability to edit quantity

    function addItemToCart(item) {   
        axios.post(`http://localhost:3001/shopping/additemtocart/${item.id}`)
            .then((response) => {
                console.log(`Added ${item.name} to your shopping cart!`);
            //TODO some sort of notification
        });
    }

    return (
        <div>
            name: { props.item.name }
            price: { formatCurrency(props.item.price) }
            <button onClick={() => addItemToCart(props.item)}> Click me </button>
        </div>
    );
    
}

export default ShoppingItem;