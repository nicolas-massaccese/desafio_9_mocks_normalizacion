const path = require('path');

const DBSOURCE = path.join(__dirname, '../DBlite/mydb.sqlite');
console.log(DBSOURCE);
const options = {
    client: 'sqlite3',
    connection: {
    filname: DBSOURCE,
    },
    useNullAsDefault: true,
};

module.exports = { options };
