package com.fastfood.repository;

import com.fastfood.entity.order.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface IOrderRepository extends JpaRepository<Orders,Long> {
    @Modifying
    @Query(value = "INSERT INTO orders (`user_id_user`) VALUES (:userId)",nativeQuery = true)
    void insertUser(@Param("userId") Long userId);

    @Query(value = "select * from orders",nativeQuery = true)
    List<Orders> getListOrder();

    @Query(value = "select * from orders where orders.status=true",nativeQuery = true)
    Orders getCartOrder();
}
