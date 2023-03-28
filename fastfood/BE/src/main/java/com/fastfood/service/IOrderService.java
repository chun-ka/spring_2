package com.fastfood.service;

import com.fastfood.entity.order.Orders;

import java.util.List;

public interface IOrderService {
    void insertUser(Long userId);

    List<Orders> getListOrder();

    Orders getCartOrder();
}
