package com.fastfood.service;

import com.fastfood.dto.OrderHistoryDto;
import com.fastfood.dto.ToTalQuantity;
import com.fastfood.entity.order.OrderHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderHistoryService {
    void insertOrderHistory(Integer quantity, Long foodId, Long orderId);

    List<OrderHistoryDto> getListOrderHistory(Long userId);

    void removeOrderHistory(Long idFood, Long orderId);

    OrderHistory getOrderHistory(Long foodId, Long orderId);

    void updateOrderHistory(Integer quantity, Long foodId, Long orderId);

    ToTalQuantity getToTalQuantity(Long userId);

    Page<OrderHistoryDto> getHistory(String startDay, String endDay, Long userId, Pageable pageable);
}
