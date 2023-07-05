import { Order } from "../model/order";

const { default: axios } = require("axios")

module.exports.getOrders = async function (): Promise<Order[]>{
    try {
        const respose = await axios.get('http://localhost:8080/api/orders')
        return respose.data;
    } catch(e){
        throw new Error('Could not get orders');
    }
}

module.exports.getOrderById = async function (id: number): Promise<Order> {
    try {
        const respose = await axios.get('http://localhost:8080/api/orders/' + id)
        return respose.data;
    } catch(e){
        throw new Error('Could not get order');
    }
}

module.exports.createOrder = async function (order: Order): Promise<number> {
    // const error: string = orderValidator.validateorder(order);

    // if(error){
    //     throw new Error(error);
    // }
    try {
        const respose = await axios.post('http://localhost:8080/api/orders/', order)
        return respose.data;
    } catch(e){
        throw new Error('Could not create order');
    }

    
}