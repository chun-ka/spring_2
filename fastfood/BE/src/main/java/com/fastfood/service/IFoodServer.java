package com.fastfood.service;

import com.fastfood.entity.food.Category;
import com.fastfood.entity.food.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IFoodServer {
    Page<Food> getListFoodPromotion(Pageable pageable);

    Page<Food> getListFoodFamous(Pageable pageable);

    List<Food> getListFoodCombo();

    List<Food> getListFoodByCategory(String categoryId);

    List<Food> getListFoodBySearch(String name);

    Page<Food> getPageFood(String categoryId, Pageable pageable);

    Food save(Food food);

    Food findFoodById(Long idFood);

    void deleteFood(Long idFood);

}
