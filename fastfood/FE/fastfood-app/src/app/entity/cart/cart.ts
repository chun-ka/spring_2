import {User} from '../user/user';
import {Food} from '../food/food';

export interface Cart {
  id?:number;
  quantity?:number;
  customer?:User;
  food?:Food;
  date?:string;
  name?:string;
  image?:string;
}
