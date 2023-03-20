package com.fastfood.dto.request;

import javax.validation.constraints.NotBlank;

public class ChangePasswordForm {
    private String username;
    @NotBlank(message = "Mật khẩu cũ không được để trống")
    private String password;
    @NotBlank(message = "Mật khẩu mới không được để trống")
    private String newPassword;
    @NotBlank(message = "Mật khẩu xác nhận không được để trống")
    private String confirmPassword;

    public ChangePasswordForm() {
    }

    public ChangePasswordForm(String username, String password, String newPassword, String confirmPassword) {
        this.username = username;
        this.password = password;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
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

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

}
