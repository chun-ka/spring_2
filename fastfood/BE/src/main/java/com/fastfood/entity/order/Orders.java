package com.fastfood.entity.order;

import com.fastfood.entity.account.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String deliveryAddress;
    private String phone;
    private String date;
    @ManyToOne
    private User user;
    @Column(columnDefinition = "bit default 1")
    private boolean status;
}
