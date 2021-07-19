import { ProductModel } from "../../model/Product";
import { connect } from '../index';

async function getProducts(page: number = 1) {
    const db = await connect();

    const rowsPerPage = parseInt(process.env.ROWS_PER_PAGE);
    const offset = (page - 1) * rowsPerPage;

    const params = {
        '@parent': 0,
        '@deleteFlag': 0,
    };

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    const productsPromise = db.all<ProductModel[]>(`
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId  
            AND (@parent IS NULL OR @parent = Product.parent)
            AND Category.deleteFlag = @deleteFlag 
            AND Product.deleteFlag = @deleteFlag 
        LIMIT @rowsPerPage OFFSET @offset
    `, {
        ...params,
        '@rowsPerPage': rowsPerPage,
        '@offset': offset,
    });

    const totalRowsPromise = db.get<{Count: number}>(`
        SELECT COUNT(Product.id) AS Count FROM Category, Product 
        WHERE Category.id = Product.CategoryId  
            AND (@parent IS NULL OR @parent = Product.parent)
            AND Category.deleteFlag = @deleteFlag 
            AND Product.deleteFlag = @deleteFlag 
    `, {
        ...params,
    });

    const [products, totalRows] = await Promise.all([productsPromise, totalRowsPromise]);

    db.close();
  
    return {products, totalPages: Math.ceil(totalRows.Count / rowsPerPage)};
};

async function getProductsFeature(page: number = 1) {
    const db = await connect();

    const rowsPerPage = parseInt(process.env.ROWS_PER_PAGE);
    const offset = (page - 1) * rowsPerPage;

    const params = {
        '@feature': 1,
        '@parent': 0,
        '@deleteFlag': 0,
    };

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    const productsPromise = db.all<ProductModel[]>(`
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId  
            AND (@feature IS NULL OR @feature = Product.feature)
            AND (@parent IS NULL OR @parent = Product.parent)
            AND Category.deleteFlag = @deleteFlag 
            AND Product.deleteFlag = @deleteFlag 
        LIMIT @rowsPerPage OFFSET @offset
    `, {
        ...params,
        '@rowsPerPage': rowsPerPage,
        '@offset': offset,
    });

    const totalRowsPromise = db.get<{Count: number}>(`
        SELECT COUNT(Product.id) AS Count FROM Category, Product 
        WHERE Category.id = Product.CategoryId  
            AND (@feature IS NULL OR @feature = Product.feature)
            AND (@parent IS NULL OR @parent = Product.parent)
            AND Category.deleteFlag = @deleteFlag 
            AND Product.deleteFlag = @deleteFlag 
    `, {
        ...params,
    });

    const [products, totalRows] = await Promise.all([productsPromise, totalRowsPromise]);

    db.close();
  
    return {products, totalPages: Math.ceil(totalRows.Count / rowsPerPage)};
};

async function getProductsByCategoryId(categoryId: number) {
    const db = await connect();

    const params = {
        '@categoryId': categoryId,
        '@parent': 0,
        '@deleteFlag': 0,
    };

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    const productsPromise = db.all<ProductModel[]>(`
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId
            AND (@categoryId IS NULL OR @categoryId = Product.categoryId)
            AND (@parent IS NULL OR @parent = Product.parent)
            AND Category.deleteFlag = @deleteFlag 
            AND Product.deleteFlag = @deleteFlag 
    `, params);

    const [products] = await Promise.all([productsPromise]);

    db.close();
  
    return products;
};

async function getProductsPageByCategoryId(categoryId: number, page: number = 1) {
    const db = await connect();

    const rowsPerPage = parseInt(process.env.ROWS_PER_PAGE);
    const offset = (page - 1) * rowsPerPage;

    const params = {
        '@categoryId': categoryId,
        '@parent': 0,
        '@deleteFlag': 0,
    };

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    const productsPromise = db.all<ProductModel[]>(`
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId
            AND (@categoryId IS NULL OR @categoryId = Product.categoryId)
            AND (@parent IS NULL OR @parent = Product.parent)
            AND Category.deleteFlag = @deleteFlag 
            AND Product.deleteFlag = @deleteFlag 
            LIMIT @rowsPerPage OFFSET @offset
    `, {
        ...params,
        '@rowsPerPage': rowsPerPage,
        '@offset': offset,
    });

    const totalRowsPromise = db.get<{Count: number}>(`
        SELECT COUNT(Product.id) AS Count FROM Category, Product 
        WHERE Category.id = Product.CategoryId
            AND (@categoryId IS NULL OR @categoryId = Product.categoryId)
            AND (@parent IS NULL OR @parent = Product.parent)
            AND Category.deleteFlag = @deleteFlag 
            AND Product.deleteFlag = @deleteFlag 
    `, {
        ...params,
    });

    const [products, totalRows] = await Promise.all([productsPromise, totalRowsPromise]);

    db.close();
  
    return {products, totalPages: Math.ceil(totalRows.Count / rowsPerPage)};
};

async function getSimilarProductsByCategoryId(categoryId: number, productId: number) {
    const db = await connect();

    const params = {
        '@categoryId': categoryId,
        '@productId': productId,
        '@parent': 0,
        '@deleteFlag': 0,
    };

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    const productsPromise = db.all<ProductModel[]>(`
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId
            AND (@categoryId IS NULL OR @categoryId = Product.categoryId)
            AND (@productId IS NULL OR @productId != Product.id)
            AND (@parent IS NULL OR @parent = Product.parent)
            AND Category.deleteFlag = @deleteFlag 
            AND Product.deleteFlag = @deleteFlag 
    `, params);

    const [products] = await Promise.all([productsPromise]);

    db.close();
  
    return products;
};

async function getSubProducts(categoryId: number, parent: number) {
    const db = await connect();

    const params = {
        '@categoryId': categoryId,
        '@parent': parent,
        '@deleteFlag': 0,
    };

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description`;

    const productsPromise = db.all<ProductModel[]>(`
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId
            AND (@categoryId IS NULL OR @categoryId = Product.categoryId)
            AND (@parent IS NULL OR @parent = Product.parent)
            AND Category.deleteFlag = @deleteFlag 
            AND Product.deleteFlag = @deleteFlag
    `, {
        ...params,
    });

    const [products] = await Promise.all([productsPromise]);

    db.close();
  
    return products;
};

async function getProductById(id: number) {
    const db = await connect();

    const params = {
        '@id': id,
        '@deleteFlag': 0,
    };

    const columns = `Product.id, Product.title, Product.alt, Product.image, Product.price, 
        Product.discount, Product.feature, Category.id AS categoryId, Category.alt AS categoryAlt,
        Product.showPrice, Product.keywords, Product.description, Product.status, Product.quantity,
        Product.specifications`;

    const productPromise = db.get<ProductModel>(`
        SELECT ${columns} FROM Category, Product 
        WHERE Category.id = Product.CategoryId 
            AND Product.id = @id  
            AND Category.deleteFlag = @deleteFlag 
            AND Product.deleteFlag = @deleteFlag
    `, {
        ...params,
    });

    const [product] = await Promise.all([productPromise]);

    db.close();
  
    return product;
};

async function add(title: string, alt: string, image: string, price: number, discount: number, feature: number, 
    categoryId: number, showPrice: number, keywords: string, description: string, 
    parent: number, status: number, quanity: number, specifications: string, createdBy: string, createdDate: string) {
    const db = await connect();

    try {
        const stmt = `INSERT INTO Product (title, alt, image, price, discount, feature, categoryId, showPrice, keywords, 
                description, parent, status, quantity, specifications, createdBy, createdDate, deleteFlag) 
            VALUES (@title, @alt, @image, @price, @discount, @feature, @categoryId, @showPrice, @keywords, 
                @description, @parent, @status, @quantity, @specifications, @createdBy, @createdDate, @deleteFlag)`;

        const params ={
            '@title': title,
            '@alt': alt,
            '@image': image,
            '@price': price,
            '@discount': discount,
            '@feature': feature,
            '@categoryId': categoryId,
            '@showPrice': showPrice,
            '@keywords': keywords,
            '@description': description,
            '@parent': parent,
            '@status': status,
            '@quantity': quanity,
            '@specifications': specifications,
            '@createdBy': createdBy,
            '@createdDate': createdDate,
            '@deleteFlag': 0
        };

        const {lastID} = await db.run(stmt, params);
        return lastID;
    }
    finally {
        db.close();
    }
};

async function update(id: number,title: string, alt: string, image: string, price: number, discount: number, 
    feature: number, categoryId: number, showPrice: number, keywords: string, description: string, 
    parent: number, status: number, quanity: number, specifications: string, modifiedBy: string, modifiedDate: string) {
    var success = false;
    const db = await connect();

    try {
        const stmt = `UPDATE Product 
            SET title = @title, alt = @alt, image = @image, price = @price, discount = @discount, feature = @feature, 
                categoryId = @categoryId, showPrice = @showPrice, keywords = @keywords, description = @description, 
                parent = @parent, status = @status, quantity = @quantity, specifications = @specifications, 
                modifiedBy = @modifiedBy, modifiedDate = @modifiedDate) 
            WHERE id = @id`;

        const params ={
            '@id': id,
            '@title': title,
            '@alt': alt,
            '@image': image,
            '@price': price,
            '@discount': discount,
            '@feature': feature,
            '@categoryId': categoryId,
            '@showPrice': showPrice,
            '@keywords': keywords,
            '@description': description,
            '@parent': parent,
            '@status': status,
            '@quantity': quanity,
            '@specifications': specifications,
            '@modifiedBy': modifiedBy,
            '@modifiedDate': modifiedDate,
        };

        db.run(stmt, params, (err) => {
            if (!err) { success = true; }
        });
    }
    finally {
        db.close();
    }
  
    return success;
};

async function remove(id: number, deleteFlag: number, modifiedBy: string, modifiedDate: string) {
    var success = false;
    const db = await connect();

    try {
        const stmt = `UPDATE Product 
            SET deleteFlag = @deleteFlag, modifiedBy = @modifiedBy, modifiedDate = @modifiedDate) 
            WHERE id = @id`;

        const params ={
            '@id': id,
            '@deleteFlag': deleteFlag,
            '@modifiedBy': modifiedBy,
            '@modifiedDate': modifiedDate,
        };

        db.run(stmt, params, (err) => {
            if (!err) { success = true; }
        });
    }
    finally {
        db.close();
    }
  
    return success;
};

export default {
  getProducts,
  getProductsFeature,
  getProductsByCategoryId,
  getProductsPageByCategoryId,
  getSimilarProductsByCategoryId, 
  getSubProducts,
  getProductById,
  add,
  update,
  remove,
};
