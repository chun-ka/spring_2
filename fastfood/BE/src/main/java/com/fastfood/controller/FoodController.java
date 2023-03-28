package com.fastfood.controller;

import com.fastfood.entity.food.Category;
import com.fastfood.entity.food.Food;
import com.fastfood.service.ICategoryService;
import com.fastfood.service.IFoodServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/food")
@RestController
@CrossOrigin("*")
public class FoodController {
    @Autowired
    private IFoodServer iFoodServer;
    @Autowired
    private ICategoryService iCategoryService;

    @GetMapping("/promotion")
    public ResponseEntity<Page<Food>> getListFoodPromotion(@PageableDefault(size = 2) Pageable pageable) {
        Page<Food> foodList = iFoodServer.getListFoodPromotion(pageable);
        if (foodList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }

    @GetMapping("/famous")
    public ResponseEntity<Page<Food>> getListFoodFamous(@PageableDefault(size = 2) Pageable pageable) {
        Page<Food> foodList = iFoodServer.getListFoodFamous(pageable);
        if (foodList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getListCategory() {
        List<Category> categories = iCategoryService.getListCategory();
        if (categories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/combo")
    public ResponseEntity<List<Food>> getListFoodCombo() {
        List<Food> foodCombo = iFoodServer.getListFoodCombo();
        if (foodCombo.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodCombo, HttpStatus.OK);
    }

    @GetMapping("/categoryId")
    public ResponseEntity<List<Food>> getListFoodByCategory(@RequestParam(defaultValue = "", value = "categoryId") String categoryId) {
        List<Food> foodList = iFoodServer.getListFoodByCategory(categoryId);
        if (foodList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<Food>> getPageFood(@RequestParam(defaultValue = "", value = "categoryId") String categoryId, @PageableDefault(size = 10) Pageable pageable) {
        Page<Food> foods = iFoodServer.getPageFood(categoryId, pageable);
        if (foods.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> getListFoodBySearch(@RequestParam("name") String name) {
        List<Food> foodList = iFoodServer.getListFoodBySearch(name);
        if (foodList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        if (food == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iFoodServer.save(food);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<Food> editFood(@RequestBody Food editFood) {
        Food food = iFoodServer.findFoodById(editFood.getIdFood());
        if (food == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        editFood.setCategory(food.getCategory());
        iFoodServer.save(editFood);
        return new ResponseEntity<>(editFood, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{idFood}")
    public ResponseEntity<Food> deleteFood(@PathVariable Long idFood) {
        Food food = iFoodServer.findFoodById(idFood);
        if (food == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iFoodServer.deleteFood(idFood);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }


    @PostMapping("/category/create")
    public ResponseEntity<Category> createCreate(@RequestBody Category category) {
        if (category == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iCategoryService.create(category);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PutMapping("/category/edit")
    public ResponseEntity<Category> editCategory(@RequestBody Category editCategory) {
        Category category = iCategoryService.findFoodById(editCategory.getIdCategory());
        if (category == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iCategoryService.save(editCategory);
        return new ResponseEntity<>(editCategory, HttpStatus.OK);
    }

    @DeleteMapping("/category/delete/{idCategory}")
    public ResponseEntity<Category> deleteCategory(@PathVariable int idCategory) {
        Category category = iCategoryService.findFoodById(idCategory);
        if (category == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iCategoryService.deleteCategory(idCategory);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }
}
