package com.fastfood.repository;

import com.fastfood.entity.account.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;
@Repository
@Transactional
public interface IUserRepository extends JpaRepository<User,Long> {
    @Query(value = "select * from user where username = :username", nativeQuery = true)
    Optional<User> findByUsername(@Param("username") String username);

    @Query(value = "select * from user where username = :username",nativeQuery = true)
    User userLogin(@Param("username") String username);

    @Query(value = "select * from user where id_user=:id",nativeQuery = true)
    User getUserById(@Param("id") Long id);
}
