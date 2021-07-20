import getHandler from '../middleware';

import Category from '../../../db/model/Category';
import { CategoryModel } from '../../../model/Category';

export const getCategories = async () => {
  var categories: CategoryModel[] = await Category.getCategories();
  categories = await Promise.all(categories.map(async (category: CategoryModel) => {
    const subCategories: CategoryModel[] = await Category.getSubCategories(category.id);
    category.children = subCategories;
    
    return category;
  }));

  return categories;
}

export default async function handler(req, res) {
  switch(req.method) {
    case "GET":
      const categories = await getCategories();
      return res.status(200).json({
        payload: {
          success: true,
          status: 200,
          categories, 
        },
      });
    default:
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

// export default getHandler()
//   .get(async (req, res) => {
//     const categories = await getCategories();
//     res.status(200).json({
//       payload: {
//         success: true,
//         status: 200,
//         categories, 
//       },
//     });
//   })