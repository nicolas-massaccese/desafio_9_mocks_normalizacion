/* { 
    author: {
        id: 'mail del usuario', 
        nombre: 'nombre del usuario', 
        apellido: 'apellido del usuario', 
        edad: 'edad del usuario', 
        alias: 'alias del usuario',
        avatar: 'url avatar (foto, logo) del usuario'
    },
    text: 'mensaje del usuario'
}
*/

const { normalize, schema, desnormalize } = require('normalizr')

// NORMALIZAR
const rawData = require('./messages.js',{
    message: message,
});

const text = new schema.Entity('texts');
const author = new schema.Entity('authors', {
    name: name,
    surname: surname,
    age: age,
    nicname,
    avatar: avatar
});

const normalizedData = normalize(rawData, author);

console.log(JSON.stringify(normalizedData, null, 2));


// DESNORMALIZAR

const desnormalizedData = desnormalize(normalizedData.result, author, normalizedData.entities);

console.log(JSON.stringify(desnormalizedData, null, 2));
