package com.fastfood.controller;

import com.fastfood.entity.account.User;
import com.fastfood.entity.order.Orders;
import com.fastfood.service.IOrderService;
import com.fastfood.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/order")
@RestController
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private IOrderService iOrderService;
    @Autowired
    private IUserService iUserService;

    @GetMapping("/user")
    public ResponseEntity<User> insertUser(@RequestParam Long userId){
        User user=iUserService.getUserById(userId);
        if (userId==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iOrderService.insertUser(userId);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Orders>> getListOrder(){
        List<Orders> ordersList=iOrderService.getListOrder();
        if (ordersList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(ordersList,HttpStatus.OK);
    }

    @GetMapping("/cart")
    public ResponseEntity<Orders> getCartOrder(){
        Orders order=iOrderService.getCartOrder();
        if (order==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(order,HttpStatus.OK);
    }

}
