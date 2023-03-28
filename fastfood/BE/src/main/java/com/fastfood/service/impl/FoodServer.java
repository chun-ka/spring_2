package com.fastfood.service.impl;

import com.fastfood.entity.food.Category;
import com.fastfood.entity.food.Food;
import com.fastfood.repository.IFoodRepository;
import com.fastfood.service.IFoodServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodServer implements IFoodServer {
    @Autowired
    private IFoodRepository iFoodRepository;
    @Override
    public Page<Food> getListFoodPromotion(Pageable pageable) {
        return iFoodRepository.getListFoodPromotion(pageable);
    }

    @Override
    public Page<Food> getListFoodFamous(Pageable pageable) {
        return iFoodRepository.getListFoodFamous(pageable);
    }

    @Override
    public List<Food> getListFoodCombo() {
        return iFoodRepository.getListFoodCombo();
    }

    @Override
    public List<Food> getListFoodByCategory(String categoryId) {
        return iFoodRepository.getListFoodByCategory(categoryId);
    }

    @Override
    public List<Food> getListFoodBySearch(String name) {
        return iFoodRepository.getListFoodBySearch(name);
    }

    @Override
    public Page<Food> getPageFood(String categoryId, Pageable pageable) {
        return iFoodRepository.getPageFood(categoryId,pageable);
    }

    @Override
    public Food save(Food food) {
        return iFoodRepository.save(food);
    }

    @Override
    public Food findFoodById(Long idFood) {
        return iFoodRepository.findById(idFood).get();
    }

    @Override
    public void deleteFood(Long idFood) {
        iFoodRepository.deleteFood(idFood);
    }


}
