const express = require('express');
const bodyParser = require('body-parser');
const Intasend = require('intasend'); // Replace with actual Intasend library import
const { Order, Cart } = require('./models'); // Replace with actual path to your models

const app = express();
app.use(bodyParser.json());

const intasend = new Intasend({
    apiKey: 'YOUR_INTASEND_API_KEY', // Replace with your Intasend API key
});

app.post('/orders', async (req, res) => {
    const { user_id, cart_items } = req.body;

    if (!user_id || !cart_items || !Array.isArray(cart_items)) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Process cart items (example of how you might handle it)
        // Save order and associated cart items
        const order = await Order.create({
            user_id,
            items: cart_items,
            // Additional order fields can be added here
        });

        // Optionally, clear the user's cart if necessary
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
        // Create payment request (replace with actual Intasend API call)
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
