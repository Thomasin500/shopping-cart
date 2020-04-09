import React from "react";
import OrderDetails from "../components/OrderDetails";
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('Order Details', () => {

    it('renders an empty Order Details Page', done => {

        const wrapper = mount(
            <Router>
                <OrderDetails.WrappedComponent match={{ params: { order_id: 1 }}} />
            </Router>
        );

        expect(wrapper.find('OrderDetails').state().orderItems).toEqual([]);

        done();
    });

    
    it('renders an Order Details page with items', done => {

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
        mock.onGet('http://localhost:8000/orders/1').reply(200, data);

        const getSpy = jest.spyOn(axios, 'get');

        const wrapper = mount(
            <Router>
                <OrderDetails.WrappedComponent match={{ params: { order_id: 1 } }} />
            </Router>
        );

        expect(wrapper.find('OrderDetails').state().orderItems).toEqual([]);

        expect(getSpy).toBeCalled();

        //results is an array of all calls to the mocked function
        const getPromise = getSpy.mock.results.pop().value;

        return getPromise.then((postResponse) => {

            const currentState = wrapper.find('OrderDetails').state();

            expect(currentState.orderItems).toEqual(data);
            mock.restore();
            done();

        }); 
    });
});
