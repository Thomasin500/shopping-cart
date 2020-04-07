import React from "react";
import Cart from "../components/Cart";
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });

//TODO make sure to test the actual cart functions
//change Quantity, gettotal Price, removeFrom Cart etc....

describe('Cart', () => {

    //TODO not finding total ID or something like that
    it('renders an empty Cart', done => {

        const wrapper = mount(<Cart />);

        expect(wrapper.state().items).toEqual([]);

        expect(wrapper.find('#empty-cart-container')).toBeTruthy();

        expect(wrapper.find('#empty-cart-container').html())
            .toContain('Welcome to your Shopping Cart! Please add items to see your order here');

        done();
    });

    
    it('renders a cart of items', done => {

        var mock = new MockAdapter(axios);

        const data = [
            {
                name: 'Item One',
                quantity: 1,
                price: 1.00
            },
            {
                name: 'Item Two',
                quantity: 2,
                price: 2.50
            },
            {
                name: 'Item Three',
                quantity: 3,
                price: 4.50
            }
        ];
        //total = 19.50

        mock.onGet('http://localhost:3001/cart').reply(200, data);

        const getSpy = jest.spyOn(axios, 'get');

        const wrapper = mount(<Cart />);

        expect(wrapper.state().items).toEqual([]);

        expect(getSpy).toBeCalled();

        //results is an array of all calls to the mocked function
        const getPromise = getSpy.mock.results.pop().value;

        return getPromise.then((postResponse) => {

            const currentState = wrapper.state();

            //TODO here I should probably actually test the existance of the cartItems components and not just the state

            expect(currentState.items).toEqual(data);

            console.log(123)

            //TODO kinda weird, but it still finds the empty cart div AFTER the state has numerous items in it
            //console.log(wrapper.find('#empty-cart-container').debug());
            //TODO for some reason I cannot find either #shopping-cart OR #cart-total
            /*console.log(123)
            console.log(wrapper.find('#shopping-cart'));
            console.log(wrapper.find('#shopping-cart').debug());
            console.log(wrapper.find('#cart-total'));
            console.log(wrapper.find('#cart-total').debug());
            console.log(wrapper.find('#cart-total').html());
            console.log(wrapper.find('#empty-cart-container').html())
            console.log(456)

            //expect(wrapper.find('#cart-total').html())
            //    .toContain('Welcome to your Shopping Cart! Please add items to see your order here');

            //expect(currentState.items.includes((postResponse.data.items))).toBe(true);

        */
            mock.restore();
            done();

        });
    }); 
});
