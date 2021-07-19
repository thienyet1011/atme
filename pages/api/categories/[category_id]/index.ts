import moment from 'moment';

import getHandler from '../../middleware';
import {getValueAsNumber, getValueAsString} from "../../../../utils";

import Category from '../../../../db/model/Category';

export const getCategoryById = async (id: number) => {
  const category = await Category.getCategoryById(id);
  return category;
};

export default getHandler()
  .get(async (req, res) => {
    const id: number = getValueAsNumber(req.query.id) || 0;
    const category = await getCategoryById(id);

    res.status(200).json(category);
  })
  .post(async (req, res) => {
    const title: string = getValueAsString(req.body.title);
    const alt: string = getValueAsString(req.body.alt);
    const image: string = "";
    const keywords: string = getValueAsString(req.body.keywords);
    const description: string = getValueAsString(req.body.description);
    const parent: number = getValueAsNumber(req.body.parent);
    const createdBy: string = req.username;
    const createdDate: string = moment().format('YYYY-MM-DD');

    const lastID = await Category.add(title, alt, image, keywords, description, parent, 
        createdBy, createdDate);

    res.status(201).json({ ...req.body, id: lastID });
  })
  .put(async (req, res) => {
    const id: number = getValueAsNumber(req.query.id);
    const title: string = getValueAsString(req.body.title);
    const alt: string = getValueAsString(req.body.alt);
    const image: string = "";
    const keywords: string = getValueAsString(req.body.keywords);
    const description: string = getValueAsString(req.body.description);
    const parent: number = getValueAsNumber(req.body.parent);
    const modifiedBy: string = req.username;
    const modifiedDate: string = moment().format('YYYY-MM-DD');

    const success = await Category.update(id, title, alt, image, keywords, description, parent, 
        modifiedBy, modifiedDate);

    res.status(201).json({ ...req.body, success });
  })
  .delete(async (req, res) => {
    const id: number = getValueAsNumber(req.query.id);
    const modifiedBy: string = req.username;
    const modifiedDate: string = moment().format('YYYY-MM-DD');

    const success = await Category.remove(id, 9, modifiedBy, modifiedDate);
    res.status(201).json({ success });
  });