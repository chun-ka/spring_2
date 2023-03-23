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

    @Query(value = "select * from food join order_history on food.id_food=order_history.food_id_food  where flag_food=true order by order_history.quantity desc",
            countQuery = "select * from food join order_history on food.id_food=order_history.food_id_food where flag_food=true  order by order_history.quantity desc", nativeQuery = true)
    Page<Food> getListFoodFamous(Pageable pageable);

    @Query(value = "select * from food where category_id_category=1 and flag_food=true", nativeQuery = true)
    List<Food> getListFoodCombo();

    @Query(value = "select * from food f  where f.flag_food=true and f.category_id_category= :categoryId", nativeQuery = true)
    List<Food> getListFood(@Param("categoryId") int categoryId);

    @Query(value = "select * from food f where (f.name like concat ('%',:name,'%') and f.flag_food=true)", nativeQuery = true)
    List<Food> getListFoodBySearch(@Param("name") String name);
}
