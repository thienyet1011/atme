import getHandler from '../middleware';

import Category from '../../../db/model/Category';
import { CategoryModel } from '../../../model/Category';

export const getCategories = async () => {
  // var categories: CategoryModel[] = await Category.getCategories();
  // categories = await Promise.all(categories.map(async (category: CategoryModel) => {
  //   const subCategories: CategoryModel[] = await Category.getSubCategories(category.id);
  //   category.children = subCategories;
    
  //   return category;
  // }));

  return [{
    id: 1,
    title: 'Mạch điện',
    alt: 'mach_dien',
    image: '/categories/EU_PSU_WHITE-800x800.jpg',
    keywords: '',
    description: '',
    parent: 0,
    children: [],
  }];
}

export default getHandler()
  .get(async (req, res) => {
    const categories = await getCategories();
    res.status(200).json({
      payload: {
        success: true,
        status: 200,
        categories, 
      },
    });
  })