package com.fastfood.controller;

import com.fastfood.dto.OrderHistoryDto;
import com.fastfood.dto.ToTalQuantity;
import com.fastfood.entity.account.User;
import com.fastfood.entity.order.OrderHistory;
import com.fastfood.service.IOrderHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/cart")
@RestController
@CrossOrigin("*")
public class OrderHistoryController {
    @Autowired
    private IOrderHistoryService iOrderHistoryService;

    @GetMapping("/insert")
    public ResponseEntity<OrderHistory> insertOrderHistory(@RequestParam Integer quantity,@RequestParam Long foodId,@RequestParam Long orderId){
        if (quantity==null||foodId==null||orderId==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iOrderHistoryService.insertOrderHistory(quantity,foodId,orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/update")
    public ResponseEntity<OrderHistory> updateOrderHistory(@RequestParam Integer quantity,@RequestParam Long foodId,@RequestParam Long orderId){
        if (quantity==null||foodId==null||orderId==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iOrderHistoryService.updateOrderHistory(quantity,foodId,orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<OrderHistory> getOrderHistory(@RequestParam Long foodId,@RequestParam Long orderId){
        if (foodId==null||orderId==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        OrderHistory orderHistory= iOrderHistoryService.getOrderHistory(foodId,orderId);

        return new ResponseEntity<>(orderHistory,HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<OrderHistoryDto>> getListOrderHistory(@RequestParam Long userId){
        List<OrderHistoryDto> orderHistoryDtos=iOrderHistoryService.getListOrderHistory(userId);
        if (orderHistoryDtos.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(orderHistoryDtos,HttpStatus.OK);
    }

    @GetMapping("/remove")
    public ResponseEntity<?> removeOrderHistory(@RequestParam Long idFood){
        if (idFood==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        iOrderHistoryService.removeOrderHistory(idFood);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/quantity")
    public ResponseEntity<ToTalQuantity> getToTalQuantity(@RequestParam Long userId){
        ToTalQuantity toTalQuantity=iOrderHistoryService.getToTalQuantity(userId);
        if (toTalQuantity==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(toTalQuantity,HttpStatus.OK);
    }

}
