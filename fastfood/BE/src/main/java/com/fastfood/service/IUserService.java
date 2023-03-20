package com.fastfood.service;

import com.fastfood.dto.request.UpdateUserForm;
import com.fastfood.entity.account.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> findAll();

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    void save(User user);

    Optional<User> findByUsername(String username);

    void changePassword(String password,String username);

    void updateUser(UpdateUserForm updateUserForm);

    User userLogin(String username);
}
