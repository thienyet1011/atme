import { CategoryModel } from '../../model/Category';
import { connect } from '../index';

async function getCategories() {
    const db = await connect();

    const params = {
        '@parent': 0,
        '@deleteFlag': 0,
    };

    const columns = `Category.id, Category.title, Category.alt, Category.image, 
        Category.keywords, Category.description`;

    const categoriesPromise = db.all<CategoryModel[]>(`
        SELECT ${columns} FROM Category 
        WHERE (@parent IS NULL OR @parent = parent)
            AND deleteFlag = @deleteFlag 
    `, {
        ...params,
    });

    const [categories] = await Promise.all([categoriesPromise]);

    db.close();
  
    return categories;
};

async function getSubCategories(parent?: number) {
    const db = await connect();

    const params = {
        '@parent': parent,
        '@deleteFlag': 0,
    };

    const columns = `Category.id, Category.title, Category.alt, Category.image, 
        Category.keywords, Category.description`;

    const categoriesPromise = db.all<CategoryModel[]>(`
        SELECT ${columns} FROM Category 
        WHERE (@parent IS NULL OR @parent = parent)
            AND deleteFlag = @deleteFlag 
    `, {
        ...params,
    });

    const [categories] = await Promise.all([categoriesPromise]);

    db.close();
  
    return categories;
};

async function getCategoryById(id: number) {
    const db = await connect();

    const params = {
        '@id': id,
        '@deleteFlag': 0,
    };

    const columns = `Category.id, Category.title, Category.alt, Category.image, 
        Category.keywords, Category.description`;

    const categoryPromise = db.get<CategoryModel>(`
        SELECT ${columns} FROM Category 
        WHERE id = @id AND deleteFlag = @deleteFlag 
    `, {
        ...params,
    });

    const [category] = await Promise.all([categoryPromise]);

    db.close();
  
    return category;
};

async function add(title: string, alt: string, image: string, keywords: string, description: string, 
    parent: number, createdBy: string, createdDate: string) {
    const db = await connect();

    try {
        const stmt = `INSERT INTO Category (title, alt, image, keywords, description, parent, createdBy, createdDate, deleteFlag) 
            VALUES (@title, @alt, @image, @keywords, @description, @parent, @createdBy, @createdDate, @deleteFlag)`;

        const params ={
            '@title': title,
            '@alt': alt,
            '@image': image,
            '@keywords': keywords,
            '@description': description,
            '@parent': parent,
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

async function update(id: number, title: string, alt: string, image: string, keywords: string, description: string, 
    parent: number, modifiedBy: string, modifiedDate: string) {
    var success = false;
    const db = await connect();

    try {
        const stmt = `UPDATE Category 
            SET title = @title, alt = @alt, image = @image, keywords = @keywords, description = @description, 
                parent = @parent, modifiedBy = @modifiedBy, modifiedDate = @modifiedDate) 
            WHERE id = @id`;

        const params ={
            '@id': id,
            '@title': title,
            '@alt': alt,
            '@image': image,
            '@keywords': keywords,
            '@description': description,
            '@parent': parent,
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
        const stmt = `UPDATE Category 
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

export default {getCategories, getSubCategories, getCategoryById, add, update, remove};
