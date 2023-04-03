package com.fastfood.repository;

import com.fastfood.entity.food.Category;
import com.fastfood.entity.food.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
@Transactional
public interface IFoodRepository extends JpaRepository<Food, Long> {
    @Query(value = "select * from food where promotion != 0 and flag_food=true ",
            countQuery = "select * from food where promotion != 0 and flag_food=true ", nativeQuery = true)
    Page<Food> getListFoodPromotion(Pageable pageable);

    @Query(value = "select * from food f join order_history oh on f.id_food=oh.food_id_food join orders o on " +
            " o.id_orders =oh.orders_id_orders where (f.flag_food=true and oh.flag_order_history=true and " +
            " o.status=false ) order by oh.quantity desc",
            countQuery = "select * from food f join order_history oh on f.id_food=oh.food_id_food join orders o on " +
                    " o.id_orders =oh.orders_id_orders where (f.flag_food=true and oh.flag_order_history=true and " +
                    " o.status=false ) order by oh.quantity desc", nativeQuery = true)
    Page<Food> getListFoodFamous(Pageable pageable);

    @Query(value = "select * from food where category_id_category=1 and flag_food=true", nativeQuery = true)
    List<Food> getListFoodCombo();

    @Query(value = "select * from food f  where f.flag_food=true and f.category_id_category like concat ('%',:categoryId,'%')", nativeQuery = true)
    List<Food> getListFoodByCategory(@Param("categoryId") String categoryId);

    @Query(value = "select * from food f join category c on c.id_category=f.category_id_category where (c.name like concat ('%',:name,'%') or f.name like concat ('%',:name,'%')) and f.flag_food=true", nativeQuery = true)
    List<Food> getListFoodBySearch(@Param("name") String name);

    @Query(value = "select * from food f  where f.flag_food=true and f.category_id_category like concat ('%',:categoryId,'%')",
            countQuery = "select * from food f  where f.flag_food=true and f.category_id_category like concat ('%',:categoryId,'%')",nativeQuery = true)
    Page<Food> getPageFood(@Param("categoryId") String categoryId, Pageable pageable);

    @Modifying
    @Query(value = "update food set flag_food=false where id_food= :idFood",nativeQuery = true)
    void deleteFood(@Param("idFood") Long idFood);
}
