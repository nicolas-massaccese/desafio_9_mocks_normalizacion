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

const { normalize, schema, denormalize } = require('normalizr')
// const print = require('./print')
// NORMALIZAR
const rawData = require('./chat.js');


const schemaText = new schema.Entity('texts');

const schemaAuthor = new schema.Entity('messages' , {idAttribute: schemaText.id});

// const schemaMessage = new schema.Entity('messages', {
//     author:schemaAuthor,
//     text: schemaText,
// });

// const chat = new schema.Entity('chats', {
//     messages:{author, text},
// });

    
// const text = new schema.Entity('texts',{

// });


// const text = new schema.Entity('texts');
// const author = new schema.Entity('authors', {
//     name: name,
//     surname: surname,
//     age: age,
//     nicname,
//     avatar: avatar
// });

const normalizedData = normalize(rawData, schemaAuthor);

console.log(JSON.stringify(normalizedData, null, 2));

// console.log('NORMALIZADA');
// print.examine(normalizedData);

// DENORMALIZAR

const denormalizedData = denormalize(normalizedData.result, schemaAuthor, normalizedData.entities);

console.log(JSON.stringify(denormalizedData, null, 2));

// console.log('DENORMALIZADA');
// print.examine(denormalizedData);


