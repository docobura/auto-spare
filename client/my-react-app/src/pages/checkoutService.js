const express = require('express');
const bodyParser = require('body-parser');
const Intasend = require('intasend'); // Replace with actual Intasend library import
const { Order, Cart } = require('./models'); // Replace with actual path to your models

const app = express();
app.use(bodyParser.json());

const intasend = new Intasend({
    apiKey: 'ISSecretKey_live_1b9aa9e8-c3a9-4d07-99f2-56577a609ff5',
});

app.post('/orders', async (req, res) => {
    const { user_id, cart_items } = req.body;

    if (!user_id || !cart_items || !Array.isArray(cart_items)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const order = await Order.create({
            user_id,
            items: cart_items,
       });

        await Cart.deleteMany({ user_id });

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/create-checkout', async (req, res) => {
    const { phone_number, email, amount } = req.body;

    if (!phone_number || !email || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const paymentResponse = await intasend.createPayment({
            phone_number,
            email,
            amount
        });

        const paymentUrl = paymentResponse.payment_url; // Extract payment URL from response

        res.json({ payment_url: paymentUrl });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
