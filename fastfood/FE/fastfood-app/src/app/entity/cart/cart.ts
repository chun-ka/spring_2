import {User} from '../user/user';
import {Food} from '../food/food';
import {Order} from '../order/order';

export interface Cart {
  id?:number;
  quantity?:number;
  food?:Food;
  order?:Order;
}
