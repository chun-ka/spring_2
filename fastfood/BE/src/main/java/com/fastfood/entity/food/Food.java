package com.fastfood.entity.food;

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
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFood;
    private String name;
    private String img;
    private int price;
    @ManyToOne
    private Category category;
    @ManyToOne
    private Size size;
    private int promotion;

    @Column(columnDefinition = "bit default 1")
    private boolean flagFood=true;
}
