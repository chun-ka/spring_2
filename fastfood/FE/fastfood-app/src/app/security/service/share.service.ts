import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {OrderService} from '../../order/order.service';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private data = new BehaviorSubject<any>({
    quantity: 0
  });

  private dataOrderId = new BehaviorSubject<any>({
    id: 0
  });


  getData = this.data.asObservable();
  getDataOrderId = this.dataOrderId.asObservable();

  constructor() {
  }

  changeData(data: any) {
    this.data.next(data);
  }

  changeDataOrderId(data: any) {
    this.dataOrderId.next(data);
  }


}
