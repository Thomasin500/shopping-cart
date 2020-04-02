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

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/shopping', {}).then((response) => {
            console.log("FRONT END RESPONSE");
            console.log(response.data);
            this.setState({ items: response.data });
        });
    }

    render() {

        const { items } = this.state;

        return (
            <div>
                <h2>Shopping for Things to Buy</h2>

                {callServer()}


                <div>

                    {items.map((item, index) => (
                        <ShoppingItem key={item.id} item={item} />
                    ))}
                </div >
               
            </div>
        );
    }
}

export default Shopping;