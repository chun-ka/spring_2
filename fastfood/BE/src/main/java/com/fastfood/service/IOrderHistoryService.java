package com.fastfood.service;

import com.fastfood.dto.OrderHistoryDto;

import java.util.List;

public interface IOrderHistoryService {
    void insertOrderHistory(Integer quantity, Long foodId, Long orderId);

    List<OrderHistoryDto> getListOrderHistory(Long userId);

    void removeOrderHistory(Long idFood);
}
