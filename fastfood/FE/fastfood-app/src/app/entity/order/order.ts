import {User} from '../user/user';

export interface Order {
  idOrders?:number;
  name?:string;
  deliveryAddress?:string;
  phone?:string;
  date?:string;
  user?:User;
}
