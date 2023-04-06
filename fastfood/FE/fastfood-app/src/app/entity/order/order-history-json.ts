import {CartDto} from '../../dto/cart-dto';

export interface OrderHistoryJson {
  content: CartDto[];
  pageable: {
    sort: {
      empty: boolean,
      sorted: boolean,
      unsorted: true
    },
    offset: number,
    pageNumber: number,
    pageSize: number,
    paged: true,
    unpaged: boolean
  };
  totalPages: number;
  last: boolean;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: true,
    sorted: boolean,
    unsorted: true
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
