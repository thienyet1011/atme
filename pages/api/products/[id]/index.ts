import moment from 'moment';

import getHandler from '../../middleware';
import {getValueAsNumber, getValueAsString} from "../../../../utils";

import Product from '../../../../db/model/Product';

export const getProductById = async (id: number) => {
  const product = await Product.getProductById(id);
  return product;
};

export default getHandler()
  .get(async (req, res) => {
    const id: number = getValueAsNumber(req.query.id) || 0;
    const product = await getProductById(id);

    res.status(200).json(product);
  })
  .post(async (req, res) => {
    // const title: string = getValueAsString(req.body.title);
    // const alt: string = getValueAsString(req.body.alt);
    // const image: string = "";
    // const price: number = getValueAsNumber(req.body.price);
    // const discount: number = getValueAsNumber(req.body.discount);
    // const feature: number = getValueAsNumber(req.body.feature);
    // const categoryId: number = getValueAsNumber(req.body.categoryId);
    // const showPrice: number = getValueAsNumber(req.body.showPrice);
    // const keywords: string = getValueAsString(req.body.keywords);
    // const description: string = getValueAsString(req.body.description);
    // const parent: number = getValueAsNumber(req.body.parent);
    // const status: number = getValueAsNumber(req.body.status);
    // const quantity: number = getValueAsNumber(req.body.quantity);
    // const specifications: string = getValueAsString(req.body.specifications);
    // const createdBy: string = req.username;
    // const createdDate: string = moment().format('YYYY-MM-DD');

    // const lastID = await Product.add(title, alt, image, price, discount, feature, categoryId, showPrice, 
    //   keywords, description, parent, status, quantity, specifications, createdBy, createdDate);

    res.status(201).json({
      payload: {
        success: true,
        status: 200,
      },
    });
  })
  .put(async (req, res) => {
    // const id: number = getValueAsNumber(req.query.id);
    // const title: string = getValueAsString(req.body.title);
    // const alt: string = getValueAsString(req.body.alt);
    // const image: string = "";
    // const price: number = getValueAsNumber(req.body.price);
    // const discount: number = getValueAsNumber(req.body.discount);
    // const feature: number = getValueAsNumber(req.body.feature);
    // const categoryId: number = getValueAsNumber(req.body.categoryId);
    // const showPrice: number = getValueAsNumber(req.body.showPrice);
    // const keywords: string = getValueAsString(req.body.keywords);
    // const description: string = getValueAsString(req.body.description);
    // const parent: number = getValueAsNumber(req.body.parent);
    // const status: number = getValueAsNumber(req.body.status);
    // const quantity: number = getValueAsNumber(req.body.quantity);
    // const specifications: string = getValueAsString(req.body.specifications);
    // const modifiedBy: string = req.username;
    // const modifiedDate: string = moment().format('YYYY-MM-DD');

    // const success = await Product.update(id, title, alt, image, price, discount, feature, categoryId, 
    //   showPrice, keywords, description, parent, status, quantity, specifications, modifiedBy, modifiedDate);

    res.status(201).json({
      payload: {
        success: true,
        status: 200,
      },
    });
  })
  .delete(async (req, res) => {
    // const id: number = getValueAsNumber(req.query.id);
    // const modifiedBy: string = req.username;
    // const modifiedDate: string = moment().format('YYYY-MM-DD');

    // const success = await Product.remove(id, 9, modifiedBy, modifiedDate);
    res.status(201).json({
      payload: {
        success: true,
        status: 200,
      },
    });
  });