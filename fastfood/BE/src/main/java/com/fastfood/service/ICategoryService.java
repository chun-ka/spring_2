package com.fastfood.service;

import com.fastfood.entity.food.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getListCategory();

    Category create(Category category);

    Category findFoodById(Integer idCategory);

    void save(Category editCategory);

    void deleteCategory(int idCategory);
}
