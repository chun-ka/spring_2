package com.fastfood.repository;

import com.fastfood.dto.OrderHistoryDto;
import com.fastfood.entity.order.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface IOrderHistoryRepository extends JpaRepository<OrderHistory,Long> {

    @Modifying
    @Query(value = "INSERT INTO order_history (`quantity`, `food_id_food`, `orders_id_orders`) VALUES (:quantity,:foodId ,:orderId);",nativeQuery = true)

    void insertOrderHistory(@Param("quantity") Integer quantity,@Param("foodId") Long foodId,@Param(("orderId")) Long orderId);
    @Query(value = "select f.id_food as id,f.name as name,f.img as img,count(oh.quantity) as quantity,f.price as price,f.promotion as priceSale from user u " +
            "join orders o on u.id_user=o.user_id_user " +
            "join order_history oh on o.id_orders=oh.orders_id_orders " +
            "join food f on f.id_food=oh.food_id_food where o.status=true and u.id_user=:userId and oh.flag_order_history=true group by f.id_food",nativeQuery = true)
    List<OrderHistoryDto> getListOrderHistory(@Param("userId") Long userId);

    @Modifying
    @Query(value = "update order_history set flag_order_history=0 where food_id_food=:idFood",nativeQuery = true)
    void removeOrderHistory(@Param("idFood") Long idFood);
}
