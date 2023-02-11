const express = require('express');
const app = express();
const PORT = 3000;
const httpServer = require('http').createServer(app);
const io = require('socket.io') (httpServer, {cors: {origin:"*"}})


app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

const { engine } = require('express-handlebars');

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);

// const { selectProduct } = require('./SQL-Querys/selectProduct.js');
// let product = selectProduct('ALL');

let product = [];

// const { selectMessages } = require('./Lite-Querys/selectMessages.js');
// let chat = selectMessages('ALL');
let chat = [];

app.get('/', (req, res) => {
    res.render('productslist', { root: __dirname + 'public'});
});

io.on('connection', (socket) => {
    console.log(`New connection id: ${socket.id}`);
    socket.emit('products', product);
    socket.emit('chat', chat);

    socket.on('newMessage', (msg) => {
        chat.push(msg);
        socket.emit('chat', chat);
    });

    socket.on('addProduct', (prod) => {
        product.push(prod);
        socket.emit('products', product);
    });
});

// CON FAKER SERVIDOR DE PRUEBAS --------------------------------------------------------------------------

const { faker } = require('@faker-js/faker');

faker.locale = 'en';

app.get('/api/products-test', (req, res) => {
    const { cant } = req.query;
    
    const products = Array.from({ length: cant ?? 5 }).map(() => ({
        name: faker.name.firstName(),
        description: faker.commerce.product(),
        price: faker.finance.amount(),
        photo: faker.image.cats(),
        stock: faker.datatype.number(),        
    })); 
    let dataHtml = `<div class="container">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">name</th>
                <th scope="col">description</th>
                <th scope="col">price</th>
                <th scope="col">photo</th>
                <th scope="col">stock</th>
            </tr>
        </thead>
        <tbody>`;

    let dataCierre = `</tbody>
                    </table>
                    </div>`

    products.forEach(data => {
        dataHtml +=`      
                    <tr>
                        <td>${data.name}</th>
                        <td>${data.description}</td>
                        <td>${data.price}</td>
                        <td>${data.stock}</td>
                        <td><img height="60p" src="${data.photo}" alt="${data.name}"></td>
                    </tr>`
    });
    res.send(`${dataHtml}${dataCierre}`);
});




const { options } = require('./dbOptions/mariadb.js');
const { selectProductII } = require('./SQL-Querys/selectProduct.js');
const knex = require('knex')(options);

selectProduct = async (idProd) => {
    let prodFound = [];
    if (idProd == 'ALL') {
    await knex.from('products').select('*')
    .then((rows) => {
        prodFound = rows;
    })
    .catch((err) => { console.log(err); throw err })
    .finally(() => { knex.destroy(); });
    } else {
        await knex.from('proucts').select('*').where('id_prod', '=', `${idProd}`)
        .then((rows) => {
            prodFound = rows;
        })
        .catch((err) => { console.log(err); throw err })
        .finally(() => { knex.destroy(); });
    }
    return prodFound;
};
function A123(){
    let result = "No hay resultado";
        result = selectProductII()
        .then()
    return result;
};

console.log(A123());

httpServer.listen(PORT, ()=>{
    console.log(`Server listening in port: ${PORT}`);
});

// app.post('/', (req, res) => {
//     const newID = products.length + 1;
    
//     const productToAdd = req.body;
//     const newProduct = {'id':newID, ...productToAdd};
//     products.push(newProduct);
//     res.redirect('/');  
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Listening in port ${PORT}`));


