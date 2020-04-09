import React from "react";
import Cart from "../components/Cart";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

configure({ adapter: new Adapter() });

describe('Cart', () => {

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

        mock.onGet('http://localhost:8000/cart').reply(200, data);

        const getSpy = jest.spyOn(axios, 'get');

        const wrapper = mount(<Cart />);

        expect(wrapper.state().items).toEqual([]);

        expect(getSpy).toBeCalled();

        //results is an array of all calls to the mocked function
        const getPromise = getSpy.mock.results.pop().value;

        return getPromise.then((postResponse) => {

            const currentState = wrapper.state();

            expect(currentState.items).toEqual(data);

            mock.restore();
            done();

        });
    }); 
});
