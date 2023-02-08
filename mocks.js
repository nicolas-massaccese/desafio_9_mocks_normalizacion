const express = require('express');
const app = express();
const PORT = 3000;

const { faker } = require('@faker-js/faker');

faker.locale = 'en';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// SERVIDOR DE PRUEBAS --------------------------------------------------------------------------

// version array -------
// const pickRandomElementFromArray = (array) => array[Math.trunc(Math.random() * array.length)];

// app.get('/api/products-test', (_, res) => {

//     const names = ['Alpha', 'Amelia', 'Fels', 'Dunquerke', '1000FT-Wallet'];
//     const descriptions = ['Mochila', 'Mochila', 'Cartera', 'Bolso', 'Billetera'];
//     const prices = [15000, 12000, 5000, 20000, 2500];
//     const photos = ['http', 'http', 'http', 'http', 'http'];
//     const stocks = [6, 7, 8, 3, 4];

//     const products = Array.from({ length: 5 }).map(() => ({
//         name: pickRandomElementFromArray(names),
//         description: pickRandomElementFromArray(descriptions),
//         price: pickRandomElementFromArray(prices),
//         photo: pickRandomElementFromArray(photos),
//         stock: pickRandomElementFromArray(stocks),        
//     })); 
//     res.json(products);
// });
// // version objeto -------
// const pickRandomElementFromArray = (array) => array[Math.trunc(Math.random() * array.length)];

// app.get('/api/products-test', (_, res) => {

//     const names = ['Alpha', 'Amelia', 'Fels', 'Dunquerke', '1000FT-Wallet'];
//     const descriptions = ['Mochila', 'Mochila', 'Cartera', 'Bolso', 'Billetera'];
//     const prices = [15000, 12000, 5000, 20000, 2500];
//     const photos = ['http', 'http', 'http', 'http', 'http'];
//     const stocks = [6, 7, 8, 3, 4];

//     res.json({
//         name: pickRandomElementFromArray(names),
//         description: pickRandomElementFromArray(descriptions),
//         price: pickRandomElementFromArray(prices),
//         photo: pickRandomElementFromArray(photos),
//         stock: pickRandomElementFromArray(stocks),
//     })

// });


// CON FAKER SERVIDOR DE PRUEBAS --------------------------------------------------------------------------

// version array -------
app.get('/api/products-test', (req, res) => {
    const { cant } = req.query;

    const products = Array.from({ length: cant ?? 5 }).map(() => ({
        name: faker.name.firstName(),
        description: faker.commerce.product(),
        price: faker.finance.amount(),
        photo: faker.image.cats(),
        stock: faker.datatype.number(),        
    })); 
    res.json(products);
});


app.listen(PORT, () => console.log(`Listening in port ${PORT} `));


