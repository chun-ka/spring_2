package com.fastfood.service.impl;

import com.fastfood.entity.food.Category;
import com.fastfood.repository.ICategoryRepository;
import com.fastfood.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository iCategoryRepository;
    @Override
    public List<Category> getListCategory() {
        return iCategoryRepository.getListCategory();
    }

    @Override
    public Category create(Category category) {
        return iCategoryRepository.save(category);
    }

    @Override
    public Category findFoodById(Integer idCategory) {
        return iCategoryRepository.findById(idCategory).get();
    }

    @Override
    public void save(Category editCategory) {
        iCategoryRepository.save(editCategory);
    }

    @Override
    public void deleteCategory(int idCategory) {
        iCategoryRepository.deleteCategory(idCategory);
    }
}
