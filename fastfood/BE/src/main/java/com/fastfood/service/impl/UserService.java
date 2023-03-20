package com.fastfood.service.impl;

import com.fastfood.dto.request.UpdateUserForm;
import com.fastfood.entity.account.User;
import com.fastfood.repository.IUserRepository;
import com.fastfood.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository iUserRepository;
    @Override
    public List<User> findAll() {
        return null;
    }

    @Override
    public boolean existsByUsername(String username) {
        return false;
    }

    @Override
    public boolean existsByEmail(String email) {
        return false;
    }

    @Override
    public void save(User user) {

    }

    @Override
    public Optional<User> findByUsername(String username) {
        return Optional.empty();
    }

    @Override
    public void changePassword(String password, String username) {

    }

    @Override
    public void updateUser(UpdateUserForm updateUserForm) {

    }

    @Override
    public User userLogin(String username) {
        return iUserRepository.userLogin(username);
    }
}
