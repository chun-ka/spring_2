package com.fastfood.service.impl;

import com.fastfood.dto.OrderHistoryDto;
import com.fastfood.dto.ToTalQuantity;
import com.fastfood.entity.order.OrderHistory;
import com.fastfood.repository.IOrderHistoryRepository;
import com.fastfood.service.IOrderHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderHistoryService implements IOrderHistoryService {

    @Autowired
    private IOrderHistoryRepository iOrderHistoryRepository;
    @Override
    public void insertOrderHistory(Integer quantity, Long foodId, Long orderId) {
        iOrderHistoryRepository.insertOrderHistory(quantity,foodId,orderId);
    }

    @Override
    public List<OrderHistoryDto> getListOrderHistory(Long userId) {
        return iOrderHistoryRepository.getListOrderHistory(userId);
    }

    @Override
    public void removeOrderHistory(Long idFood, Long orderId) {
        iOrderHistoryRepository.removeOrderHistory(idFood,orderId);
    }

    @Override
    public OrderHistory getOrderHistory(Long foodId, Long orderId) {
        return iOrderHistoryRepository.getOrderHistory(foodId,orderId);
    }

    @Override
    public void updateOrderHistory(Integer quantity, Long foodId, Long orderId) {
        iOrderHistoryRepository.updateOrderHistory(quantity,foodId,orderId);
    }

    @Override
    public ToTalQuantity getToTalQuantity(Long userId) {
        return iOrderHistoryRepository.getToTalQuantity(userId);
    }

    @Override
    public Page<OrderHistoryDto> getHistory(String startDay, String endDay, Long userId, Pageable pageable) {
        return iOrderHistoryRepository.getHistory(startDay,endDay,userId,pageable);
    }
}
