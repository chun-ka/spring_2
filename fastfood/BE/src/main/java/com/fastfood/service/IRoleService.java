package com.fastfood.service;

import com.fastfood.entity.account.Role;

import java.util.Optional;

public interface IRoleService {
    Optional<Role> roleAdmin();

    Optional<Role> roleCustomer();
}
