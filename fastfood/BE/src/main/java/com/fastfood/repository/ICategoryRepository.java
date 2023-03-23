package com.fastfood.repository;

import com.fastfood.entity.food.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICategoryRepository extends JpaRepository<Category,Integer> {
    @Query(value = "select * from category ",nativeQuery = true)
    List<Category> getListCategory();
}
