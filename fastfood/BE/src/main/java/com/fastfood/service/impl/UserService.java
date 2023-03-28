package com.fastfood.service.impl;

import com.fastfood.entity.account.User;
import com.fastfood.repository.IUserRepository;
import com.fastfood.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository iUserRepository;


    @Override
    public User getUserById(Long id) {
        return iUserRepository.getUserById(id);
    }


    @Override
    public User updateUser(User user) {
        return iUserRepository.save(user);
    }
}
