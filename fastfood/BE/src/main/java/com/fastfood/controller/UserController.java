package com.fastfood.controller;

import com.fastfood.entity.account.User;
import com.fastfood.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/user")
@RestController
@CrossOrigin("*")
public class UserController {
    @Autowired
    private IUserService iUserService;


    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user=iUserService.getUserById(id);
        if (user==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user){
        User user1=iUserService.getUserById(user.getIdUser());
        if (user1==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        user.setPassword(user1.getPassword());
        user.setRoles(user1.getRoles());
        iUserService.updateUser(user);
        return new ResponseEntity<>(user,HttpStatus.OK);

    }
}
