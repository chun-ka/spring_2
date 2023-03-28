package com.fastfood.service.impl;

import com.fastfood.entity.order.Orders;
import com.fastfood.repository.IOrderRepository;
import com.fastfood.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {
    @Autowired
    private IOrderRepository iOrderRepository;
    @Override
    public void insertUser(Long userId) {
        iOrderRepository.insertUser(userId);
    }

    @Override
    public List<Orders> getListOrder() {
        return iOrderRepository.getListOrder();
    }

    @Override
    public Orders getCartOrder() {
        return iOrderRepository.getCartOrder();
    }
}
