// Importing
import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// 
dotenv.config();
const api=process.env.API_URL;
const connstring=process.env.CONNECTION_STRING;

const app=express();
// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('tiny'));
// Routing
app.get('/', (req, res) => {
    res.sendFile('Index.html', {root: 'public/templates'});
});
app.get('/shop', (req, res) => {
    res.sendFile('shop.html', {root: 'public/templates'});
});
app.get('/single-product', (req, res) => {
    res.sendFile('sproduct.html', {root: 'public/templates'});
});
app.get('/about', (req, res) => {
    res.sendFile('about.html', {root: 'public/templates'});
});
app.get('/contact', (req, res) => {
    res.sendFile('contact.html', {root: 'public/templates'});
});
app.get('/account', (req, res) => {
    res.sendFile('account.html', {root: 'public/templates'});
});
app.get('/success', (req, res) => {
    res.sendFile('success.html', {root: 'public/templates'});
});
app.get('/cancel', (req, res) => {
    res.sendFile('cancel.html', {root: 'public/templates'});
});
app.get (`${api}/products`, (req, res) => {
    const products = {
        id:1,
        "product-title":"Hawaian T-Shirt",
        "product-price":"$19.99",
        "ImageSrc":"https://via.placeholder.com/150",
    }
    res.send(products);
});
app.post (`${api}/products`, (req, res) => {
    const newproduct=req.body

    console.log(newproduct);
    res.send(newproduct);
});

// Stripe Payments
let stripeGateway=Stripe(process.env.STRIPE_SECRET_KEY);
let DOMAIN=process.env.DOMAIN;

app.post('/stripe-checkout', async (req, res) => {
    const lineItems=req.body.items.map((item) => {
        const unitAmount=parseInt(item.price.replace(/[^0-9.-]+/g,'')*100);
        console.log('item-price:', item.price);
        console.log('unitAmount:', unitAmount);
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                    images: [item.imageSrc],
                },
                unit_amount: unitAmount,
            },
            quantity: item.quantity,
        };
    });
    console.log('lineItems:', lineItems);

    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
        line_items: lineItems,
        billing_address_collection: 'required',
    });
    res.json(session.url);
});

mongoose.connect(connstring,{dbName:'EcommerceDB'})
.then(() => {
    console.log('Database connection is ready');  
})
.catch((err) => {
    console.log(err);
});
// App logging
app.listen(3000, () => {

    console.log('Server is running on port 3000');
});