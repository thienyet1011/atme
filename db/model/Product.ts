import { Connection } from "mysql2";

import { connect, query } from "../index";

import { ProductModel } from "../../model/Product";

async function getProducts(page: number = 1) {
  var products: ProductModel[] = [];
  var totalPages: number = 0;

  try {
    const connection: Connection = await connect();

    const rowsPerPage = parseInt(process.env.ROWS_PER_PAGE);
    const offset = (page - 1) * rowsPerPage;

    const params = [0, 0, 0];

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    var results = await query(
      connection,
      `
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId  
            AND Product.parent = ?
            AND Category.deleteFlag = ?
            AND Product.deleteFlag = ?
        LIMIT ? OFFSET ?
    `,
      [...params, rowsPerPage, offset]
    );

    products = <ProductModel[]>JSON.parse(JSON.stringify(results));

    results = await query(
      connection,
      `
        SELECT COUNT(Product.id) AS Count FROM Category, Product 
        WHERE Category.id = Product.CategoryId  
            AND Product.parent = ?
            AND Category.deleteFlag = ? 
            AND Product.deleteFlag = ? 
    `,
      params
    );

    const totalRows = <{Count: number}>JSON.parse(JSON.stringify(results));
    totalPages = Math.ceil(totalRows[0].Count / rowsPerPage);

    connection.end();
    connection.destroy();
  } catch (err) {
    console.log("Error: ", err.message);
  }

  return { products, totalPages };
}

async function getProductsFeature(page: number = 1) {
  var products: ProductModel[] = [];
  var totalPages: number = 0;

  try {
    const connection: Connection = await connect();

    const rowsPerPage = parseInt(process.env.ROWS_PER_PAGE);
    const offset = (page - 1) * rowsPerPage;

    const params = [1, 0, 0, 0];

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    var results = await query(
      connection,
      `
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId  
            AND Product.feature = ?
            AND Product.parent = ?
            AND Category.deleteFlag = ? 
            AND Product.deleteFlag = ? 
        LIMIT ? OFFSET ?
    `,
      [...params, rowsPerPage, offset]
    );

    products = <ProductModel[]>JSON.parse(JSON.stringify(results));

    results = await query(
      connection,
      `
        SELECT COUNT(Product.id) AS Count FROM Category, Product 
        WHERE Category.id = Product.CategoryId  
            AND Product.feature = ?
            AND Product.parent = ?
            AND Category.deleteFlag = ? 
            AND Product.deleteFlag = ? 
    `,
      params
    );

    const totalRows = <{Count: number}>JSON.parse(JSON.stringify(results));
    totalPages = Math.ceil(totalRows[0].Count / rowsPerPage);

    connection.end();
    connection.destroy();
  } catch (err) {
    console.log("Error: ", err.message);
  }

  return { products, totalPages };
}

async function getProductsByCategoryId(categoryId: number) {
  var products: ProductModel[] = [];

  try {
    const connection: Connection = await connect();

    const params = [categoryId, 0, 0, 0];

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    const results = await query(
      connection,
      `
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId
            AND Product.categoryId = ?
            AND Product.parent = ?
            AND Category.deleteFlag = ? 
            AND Product.deleteFlag = ? 
    `,
      params
    );

    products = <ProductModel[]>JSON.parse(JSON.stringify(results));

    connection.end();
    connection.destroy();
  } catch (err) {
    console.log("Error: ", err.message);
  }

  return products;
}

async function getProductsPageByCategoryId(
  categoryId: number,
  page: number = 1
) {
  var products: ProductModel[] = [];
  var totalPages: number = 0;

  try {
    const connection: Connection = await connect();

    const rowsPerPage = parseInt(process.env.ROWS_PER_PAGE);
    const offset = (page - 1) * rowsPerPage;

    const params = [categoryId, 0, 0, 0];

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    var results = await query(
      connection,
      `
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId
            AND Product.categoryId = ? 
            AND Product.parent = ? 
            AND Category.deleteFlag = ? 
            AND Product.deleteFlag = ? 
            LIMIT ? OFFSET ?
    `,
      [...params, rowsPerPage, offset]
    );
    
    products = <ProductModel[]>JSON.parse(JSON.stringify(results));

    results = await query(
      connection,
      `
        SELECT COUNT(Product.id) AS Count FROM Category, Product 
        WHERE Category.id = Product.CategoryId
            AND Product.categoryId = ? 
            AND Product.parent = ? 
            AND Category.deleteFlag = ? 
            AND Product.deleteFlag = ? 
    `,
      params
    );

    const totalRows = <{Count: number}>JSON.parse(JSON.stringify(results));
    totalPages = Math.ceil(totalRows[0].Count / rowsPerPage);

    connection.end();
    connection.destroy();
  } catch (err) {
    console.log("Error: ", err.message);
  }

  return { products, totalPages };
}

async function getSimilarProductsByCategoryId(
  categoryId: number,
  productId: number
) {
  var products: ProductModel[] = [];

  try {
    const connection: Connection = await connect();

    const params = [categoryId, productId, 0, 0, 0];

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    const results = await query(
      connection,
      `
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId
            AND Product.categoryId = ?
            AND Product.id != ? 
            AND Product.parent = ?
            AND Category.deleteFlag = ? 
            AND Product.deleteFlag = ? 
    `,
      params
    );

    products = <ProductModel[]>JSON.parse(JSON.stringify(results));

    connection.end();
    connection.destroy();
  } catch (err) {
    console.log("Error: ", err.message);
  }

  return products;
}

async function getSubProducts(categoryId: number, parent: number) {
  var products: ProductModel[] = [];

  try {
    const connection: Connection = await connect();

    const params = [categoryId, parent, 0, 0];

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    const results = await query(
      connection,
      `
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId
            AND Product.categoryId = ? 
            AND Product.parent = ? 
            AND Category.deleteFlag = ? 
            AND Product.deleteFlag = ?
    `,
      params
    );

    products = <ProductModel[]>JSON.parse(JSON.stringify(results));
    
    connection.end();
    connection.destroy();
  } catch (err) {
    console.log("Error: ", err.message);
  }

  return products;
}

async function getProductById(id: number) {
  var product: ProductModel = null;

  try {
    const connection: Connection = await connect();

    const params = [id, 0, 0];

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description, Product.status, Product.quantity,
        Product.specifications`;

    const results = await query(
      connection,
      `
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId 
            AND Product.id = ?  
            AND Category.deleteFlag = ? 
            AND Product.deleteFlag = ?
    `,
      params
    );

    product = results.length > 0 ? <ProductModel>JSON.parse(JSON.stringify(results[0])) : null;
    connection.end();
    connection.destroy();
  } catch (err) {
    console.log("Error: ", err.message);
  }

  return product;
}

// async function add(
//   title: string,
//   alt: string,
//   image: string,
//   price: number,
//   discount: number,
//   feature: number,
//   categoryId: number,
//   showPrice: number,
//   keywords: string,
//   description: string,
//   parent: number,
//   status: number,
//   quanity: number,
//   specifications: string,
//   createdBy: string,
//   createdDate: string
// ) {
//   var success = false;

//   try {
//     const connection: Connection = await connect();

//     const stmt = `INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, keywords, 
//                 description, parent, status, quantity, specifications, createdBy, createdDate, deleteFlag) 
//             VALUES (@title, @alt, @image, @price, @discount, @feature, @categoryId, @showPrice, @keywords, 
//                 @description, @parent, @status, @quantity, @specifications, @createdBy, @createdDate, @deleteFlag)`;

//     const params = {
//       "@title": title,
//       "@alt": alt,
//       "@image": image,
//       "@price": price,
//       "@discount": discount,
//       "@feature": feature,
//       "@categoryId": categoryId,
//       "@showPrice": showPrice,
//       "@keywords": keywords,
//       "@description": description,
//       "@parent": parent,
//       "@status": status,
//       "@quantity": quanity,
//       "@specifications": specifications,
//       "@createdBy": createdBy,
//       "@createdDate": createdDate,
//       "@deleteFlag": 0,
//     };

//     const results = await query(connection, stmt, params);
//     success = results > 0;

//     connection.end();
//   } catch (err) {
//     console.log("Error: ", err.message);
//   }

//   return success;
// }

// async function update(
//   id: number,
//   title: string,
//   alt: string,
//   image: string,
//   price: number,
//   discount: number,
//   feature: number,
//   categoryId: number,
//   showPrice: number,
//   keywords: string,
//   description: string,
//   parent: number,
//   status: number,
//   quanity: number,
//   specifications: string,
//   modifiedBy: string,
//   modifiedDate: string
// ) {
//   var success = false;

//   try {
//     const connection: Connection = await connect();

//     const stmt = `UPDATE Product 
//             SET title = @title, alt = @alt, image = @image, price = @price, discount = @discount, feature = @feature, 
//                 categoryId = @categoryId, showPrice = @showPrice, keywords = @keywords, description = @description, 
//                 parent = @parent, status = @status, quantity = @quantity, specifications = @specifications, 
//                 modifiedBy = @modifiedBy, modifiedDate = @modifiedDate) 
//             WHERE id = @id`;

//     const params = {
//       "@id": id,
//       "@title": title,
//       "@alt": alt,
//       "@image": image,
//       "@price": price,
//       "@discount": discount,
//       "@feature": feature,
//       "@categoryId": categoryId,
//       "@showPrice": showPrice,
//       "@keywords": keywords,
//       "@description": description,
//       "@parent": parent,
//       "@status": status,
//       "@quantity": quanity,
//       "@specifications": specifications,
//       "@modifiedBy": modifiedBy,
//       "@modifiedDate": modifiedDate,
//     };

//     const results = await query(connection, stmt, params);
//     success = results > 0;

//     connection.end();
//   } catch (err) {
//     console.log("Error: ", err.message);
//   }

//   return success;
// }

// async function remove(
//   id: number,
//   deleteFlag: number,
//   modifiedBy: string,
//   modifiedDate: string
// ) {
//   var success = false;

//   try {
//     const connection: Connection = await connect();

//     const stmt = `UPDATE Product 
//             SET deleteFlag = @deleteFlag, modifiedBy = @modifiedBy, modifiedDate = @modifiedDate) 
//             WHERE id = @id`;

//     const params = {
//       "@id": id,
//       "@deleteFlag": deleteFlag,
//       "@modifiedBy": modifiedBy,
//       "@modifiedDate": modifiedDate,
//     };

//     const results = await query(connection, stmt, params);
//     success = results > 0;

//     connection.end();
//   } catch (err) {
//     console.log("Error: ", err.message);
//   }

//   return success;
// }

export default {
  getProducts,
  getProductsFeature,
  getProductsByCategoryId,
  getProductsPageByCategoryId,
  getSimilarProductsByCategoryId,
  getSubProducts,
  getProductById,
//   add,
//   update,
//   remove,
};
