import {User} from '../user/user';

export interface Order {
  id?:number;
  name?:string;
  deliveryAddress?:string;
  phone?:string;
  date?:string;
  totalOrder?:number;
  customer?:User;
}
