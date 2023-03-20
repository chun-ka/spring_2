package com.fastfood.repository;


import com.fastfood.entity.account.Role;
import com.fastfood.entity.account.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface IRoleRepository extends JpaRepository<Role,Integer> {

    Optional<Role> findByName(RoleName name);

    /**
     * Function: get ROLE ADMIN
     **/
    @Query(value = "select r.* from role r where r.name = 'ROLE_ADMIN'",nativeQuery = true)
    Optional<Role>  roleAdmin();


    /**
     * Function: get ROLE CUSTOMER
     **/
    @Query(value = "select r.* from role r where r.name = 'ROLE_CUSTOMER'",nativeQuery = true)
    Optional<Role> roleCustomer();


}
