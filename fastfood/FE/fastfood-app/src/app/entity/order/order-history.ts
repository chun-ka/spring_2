import {Food} from '../food/food';
import {Order} from './order';

export interface OrderHistory {
  id?:number;
  quantity?:number;
  food?:Food;
  order?:Order;
  price?:number;
  date?:string;
}
