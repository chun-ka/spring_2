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
    public ResponseEntity<Page<Food>> getListFoodPromotion(@PageableDefault(size = 2) Pageable pageable){
        Page<Food> foodList=iFoodServer.getListFoodPromotion(pageable);
        if (foodList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }

    @GetMapping("/famous")
    public ResponseEntity<Page<Food>> getListFoodFamous(@PageableDefault(size = 2) Pageable pageable){
        Page<Food> foodList=iFoodServer.getListFoodFamous(pageable);
        if (foodList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getListCategory(){
        List<Category> categories=iCategoryService.getListCategory();
        if (categories.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/combo")
    public ResponseEntity<List<Food>> getListFoodCombo(){
        List<Food> foodCombo=iFoodServer.getListFoodCombo();
        if (foodCombo.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodCombo, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Food>> getListFood(@RequestParam("categoryId") int categoryId){
        List<Food> foodList=iFoodServer.getListFood(categoryId);
        if (foodList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Food>> getListFoodBySearch(@RequestParam("name") String name){
        List<Food> foodList=iFoodServer.getListFoodBySearch(name);
        if (foodList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(foodList, HttpStatus.OK);
    }

}
