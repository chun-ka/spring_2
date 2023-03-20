package com.fastfood.service.impl;

import com.fastfood.entity.account.Role;
import com.fastfood.repository.IRoleRepository;
import com.fastfood.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository iRoleRepository;
    @Override
    public Optional<Role> roleAdmin() {
        return iRoleRepository.roleAdmin();
    }

    @Override
    public Optional<Role> roleCustomer() {
        return iRoleRepository.roleCustomer();
    }
}
