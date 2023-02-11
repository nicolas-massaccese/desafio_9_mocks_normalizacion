const util = require('util');

const chat = require('./chat');

module.exports = {
    examine: (data) => {
        //console.log(util.inspect(data, false, 4, true));

        console.log(`objeto original:${JSON.stringify(chat).length} bytes`);
        console.log(`objeto normalizado:${JSON.stringify(data).length} bytes`);
    }
};
