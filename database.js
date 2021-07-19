const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function setup() {
    const db = await open({
        filename: './atme.sqlite',
        driver: sqlite3.Database,
    });

    await db.migrate({
        force: 'last', 
        migrationsPath: './migrations/'
    });

    const categories = await db.all('SELECT * FROM Category');
    const products = await db.all('SELECT * FROM Product');

    console.log('Categories: ', JSON.stringify(categories, null, 2));
    console.log('Products: ', JSON.stringify(products, null, 2));
}

setup();