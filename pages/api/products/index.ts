import getHandler from '../middleware';

import Product from '../../../db/model/Product';
import { getValueAsNumber } from '../../../utils';

export const getProducts = async (page: number = 1) => {
  const {products, totalPages} = await Product.getProducts(page);
  return {products, totalPages};
}

export default getHandler()
  .get(async (req, res) => {
    const page = getValueAsNumber(req.query.page) || 1;
    const {products, totalPages} = await getProducts(page);
    
    console.log('page: ', page);    
    console.log('totalPages: ', totalPages);    

    res.status(200).json({
      payload: {
        success: true,
        status: 200,
        products, 
        totalPages,
      },
    });
  })