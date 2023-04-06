import {Size} from './size';
import {Category} from './category';

export interface Food {
  idFood?:number;
  name?:string;
  img?:string;
  size?:Size;
  category?:Category;
  price:number;
  promotion?:any;
  describeFood?:string;
}
