package com.fastfood.service;

import com.fastfood.entity.account.User;


public interface IUserService {

    User getUserById(Long id);

    User updateUser(User user);
}
