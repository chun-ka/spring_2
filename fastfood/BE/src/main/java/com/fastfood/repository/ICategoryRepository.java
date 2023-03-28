package com.fastfood.repository;

import com.fastfood.entity.food.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional

public interface ICategoryRepository extends JpaRepository<Category,Integer> {
    @Query(value = "select * from category where flag_category=true ",nativeQuery = true)
    List<Category> getListCategory();

    @Modifying
    @Query(value = "update category set flag_category=false where id_category= :idCategory",nativeQuery = true)
    void deleteCategory(@Param("idCategory") int idCategory);
}
