import {Size} from './size';
import {Category} from './category';

export interface Food {
  id?:number;
  name?:string;
  img?:string;
  size?:Size;
  category?:Category;
  price?:number;
}
