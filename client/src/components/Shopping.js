import React, { Component } from "react";
import axios from "axios";
import formatCurrency from "../helpers/formatters"
import '../css/Shopping.css';

class Shopping extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/shopping', {}).then((response) => {
            this.setState({ items: response.data });
        });
    }

    addItemToCart = (item, index) => {
        axios.post(`http://localhost:8000/shopping/additemtocart/${item.id}`)
            .then((response) => {
                console.log(`Added ${item.name} to your shopping cart!`);
                //TODO some sort of notification
                const updatedItems = this.state.items.slice();
                updatedItems[index].added = true;
                this.setState({ items: updatedItems });
            });
    }

    render() {

        const { items } = this.state;

        return (
            <div>
                <h2>Wares for Sale</h2>

                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>

                        {Array.isArray(items) && items.map((item, index) => {

                            const actions = item.added ? 'Added!' : (<button onClick={() => this.addItemToCart(item, index)}> Add To Cart </button>)

                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td align="center">
                                        <div className="shopping-item-desc">{item.description}</div>
                                    </td>
                                    <td align="center"> {formatCurrency(item.price)}</td>
                                    <td align="center">
                                        <span className="shopping-item-actions">{actions}</span>                             
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>             
            </div>
        );
    }
}

export default Shopping;