package com.fastfood.service;

import com.fastfood.entity.account.User;
import com.fastfood.entity.order.Orders;

import java.util.List;

public interface IOrderService {
    void insertUser(Long userId);

    List<Orders> getListOrder();

    Orders getCartOrder( Long userId);

    Orders findById(Long orderId);

    void save(Orders orders);
}
