package com.fastfood.entity.order;

import com.fastfood.entity.food.Food;
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
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOrderHistory;
    @Column(columnDefinition = "bit default 1")
    private boolean flagOrderHistory;
    private int quantity;
    @ManyToOne
    private Food food;
    @ManyToOne
    private Orders orders;
}
