const express = require ('express');
const request = require ('request-promise');

const app = express();
const PORT = process.env.PORT || 8000;

const apiKey = '28917c109c988310f6e127b9a527ea58';
const baseURL = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my API');
})


//Get Product Details 
app.get('/products/:productId', async (req, res) => {
    const {productId} = req.params;

    try {
        const response = await request(`${baseURL}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error);
    }
})


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});