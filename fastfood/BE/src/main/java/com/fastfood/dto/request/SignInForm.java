package com.fastfood.dto.request;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class SignInForm {
    @Pattern(regexp = "^[a-zA-Z0-9]+$",message = "Tên đăng nhập không đúng định dạng")
    @Size(min = 5,max = 10,message = "Tên đăng nhập không đúng định dạng")
    private String username;
    @Pattern(regexp = "^[a-zA-Z0-9]+$",message = "Mật khẩu không đúng định dạng")
    @Size(min = 5,max = 10, message = "Mật khẩu không đúng định dạng")
    private String password;

    public SignInForm() {
    }
    public SignInForm(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
