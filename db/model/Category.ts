import { Connection } from "mysql2";

import { connect, query } from "../index";
import { CategoryModel } from "../../model/Category";

async function getCategories() {
  var categories: CategoryModel[] = [];

  try {
    const connection: Connection = await connect();
    const params = [0, 0];

    const columns = `Category.id, Category.title, Category.alt, Category.image, 
            Category.keywords, Category.description`;

    const results = await query(
      connection,
      `
            SELECT ${columns} FROM Category 
            WHERE parent = ? AND deleteFlag = ? 
        `,
      params
    );

    categories = <CategoryModel[]>JSON.parse(JSON.stringify(results));

    connection.end();
    connection.destroy();
  } catch (err) {
    console.log("Error: ", err.message);
  }

  return categories;
}

async function getSubCategories(parent?: number) {
  var categories: CategoryModel[] = [];

  try {
    const connection: Connection = await connect();

    const params = [parent, 0];

    const columns = `Category.id, Category.title, Category.alt, Category.image, 
        Category.keywords, Category.description`;

    const results = await query(
      connection,
      `
        SELECT ${columns} FROM Category 
        WHERE parent = ? AND deleteFlag = ? 
    `,
      params
    );

    categories = <CategoryModel[]>JSON.parse(JSON.stringify(results));
    
    connection.end();
    connection.destroy();
  } catch (err) {
    console.log("Error: ", err.message);
  }

  return categories;
}

async function getCategoryById(id: number) {
  var category: CategoryModel = null;

  try {
    const connection: Connection = await connect();

    const params = [id, 0];

    const columns = `Category.id, Category.title, Category.alt, Category.image, 
        Category.keywords, Category.description`;

    const results = await query(
      connection,
      `
        SELECT ${columns} FROM Category 
        WHERE id = ? AND deleteFlag = 0 
    `,
      params
    );

    category = results.length > 0 ? <CategoryModel>JSON.parse(JSON.stringify(results[0])) : null;
    connection.end();
    connection.destroy();
  } catch (err) {
    console.log("Error: ", err.message);
  }

  return category;
}

// async function add(
//   title: string,
//   alt: string,
//   image: string,
//   keywords: string,
//   description: string,
//   parent: number,
//   createdBy: string,
//   createdDate: string
// ) {
//   var success = false;

//   try {
//     const connection: Connection = await connect();

//     const stmt = `INSERT INTO Category (title, alt, image, keywords, description, parent, createdBy, createdDate, deleteFlag) 
//             VALUES (:title, :alt, :image, :keywords, :description, :parent, :createdBy, :createdDate, :deleteFlag)`;

//     const params = {
//       ":title": title,
//       ":alt": alt,
//       ":image": image,
//       ":keywords": keywords,
//       ":description": description,
//       ":parent": parent,
//       ":createdBy": createdBy,
//       ":createdDate": createdDate,
//       ":deleteFlag": 0,
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
//   keywords: string,
//   description: string,
//   parent: number,
//   modifiedBy: string,
//   modifiedDate: string
// ) {
//   var success = false;

//   try {
//     const connection: Connection = await connect();

//     const stmt = `UPDATE Category 
//             SET title = :title, alt = :alt, image = :image, keywords = :keywords, description = :description, 
//                 parent = :parent, modifiedBy = :modifiedBy, modifiedDate = :modifiedDate) 
//             WHERE id = :id`;

//     const params = {
//       ":id": id,
//       ":title": title,
//       ":alt": alt,
//       ":image": image,
//       ":keywords": keywords,
//       ":description": description,
//       ":parent": parent,
//       ":modifiedBy": modifiedBy,
//       ":modifiedDate": modifiedDate,
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

//     const stmt = `UPDATE Category 
//             SET deleteFlag = :deleteFlag, modifiedBy = :modifiedBy, modifiedDate = :modifiedDate) 
//             WHERE id = :id`;

//     const params = {
//       ":id": id,
//       ":deleteFlag": deleteFlag,
//       ":modifiedBy": modifiedBy,
//       ":modifiedDate": modifiedDate,
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
  getCategories,
  getSubCategories,
  getCategoryById,
//   add,
//   update,
//   remove,
};
