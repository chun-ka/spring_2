package com.fastfood.dto;

public interface OrderHistoryDto {

    Long getId();
    String getName();
    String getImg();
    int getQuantity();
    int getPrice();
    int getPriceSale();
    String getPurchaseDate();
}
