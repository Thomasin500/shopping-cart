import React, { Component } from "react";
import axios from "axios";
import ShoppingItem from "./ShoppingItem";

function callServer() {
    axios.get('http://localhost:3001/shopping', {
        params: {
            table: 'items',
        },
    }).then((response) => {
        console.log("FRONT END RESPONSE");
        console.log(response.data);
    });
}

class Shopping extends Component {

    render() {
        return (
            <div>
                <h2>Shopping for Things to Buy</h2>

                {callServer()}


                <div>

                    {this.props.items.map((item, index) => (
                        <ShoppingItem key={item.id} item={item} />
                    ))}
                </div >
               
            </div>
        );
    }
}

export default Shopping;