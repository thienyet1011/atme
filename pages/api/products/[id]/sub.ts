import { NextApiResponse } from 'next';

import getHandler, { NextApiRequestExtended } from '../../middleware';
import {getValueAsNumber} from "../../../../utils";

import Product from '../../../../db/model/Product';
import { ProductModel } from '../../../../model/Product';

export const getSubProducts = async (categoryId: number, productId: number) => {
  var products: ProductModel[] = await Product.getSubProducts(categoryId, productId);
  return products;
}

export default getHandler()
  .get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const category_id: number = getValueAsNumber(req.query.category_id);
    const product_id: number = getValueAsNumber(req.query.product_id);

    const products = await getSubProducts(category_id, product_id);
    res.status(200).json(products);
  })