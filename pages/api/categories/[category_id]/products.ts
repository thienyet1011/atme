import getHandler from '../../middleware';

import Product from '../../../../db/model/Product';
import { getValueAsNumber } from '../../../../utils';

export const getSimilarProductsByCategory = async (category_id: number, product_id: number) => {
  const products = await Product.getSimilarProductsByCategoryId(category_id, product_id);
  return products;
}

export const getProductsByCategory = async (category_id: number) => {
  const products = await Product.getProductsByCategoryId(category_id);
  return products;
}

export const getProductsPageByCategory = async (category_id: number, page: number = 1) => {
  const {products, totalPages} = await Product.getProductsPageByCategoryId(category_id, page);
  return {products, totalPages};
}

export default getHandler()
  .get(async (req, res) => {
    const category_id = getValueAsNumber(req.query.category_id) || 1;
    const page = getValueAsNumber(req.query.page) || 1;

    const {products, totalPages} = await getProductsPageByCategory(category_id, page);

    res.status(200).json({
      payload: {
        success: true,
        status: 200,
        products, 
        totalPages,
      },
    });
  })