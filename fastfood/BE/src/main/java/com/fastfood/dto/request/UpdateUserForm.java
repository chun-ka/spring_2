package com.fastfood.dto.request;

import com.fastfood.entity.account.User;
import org.springframework.validation.Errors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Objects;

public class UpdateUserForm {
    @NotBlank(message = "Vui lòng không bỏ trống họ và tên.")
    @Size(min = 5,max = 20,message = "Độ dài của kí tự không hợp lệ.")
    private String name;
    private String username;
    @NotBlank(message = "Vui lòng nhập số điện thoại.")
    @Pattern(regexp = "[0]\\d{9,10}",message = "Số điện thoại không đúng định dạng.")
    private String phoneNumber;
    @NotBlank(message = "Vui lòng nhập địa chỉ email.")
    @Pattern(regexp = "^\\w+@gmail.com$",message = "Email không đúng định dạng.")
    private String email;
    @NotBlank(message = "Vui lòng không bỏ trống địa chỉ.")
    private String address;
    private Integer age;
    @NotNull(message = "Vui lòng chọn giới tính.")
    private Boolean gender;
    @NotBlank(message = "Vui lòng không bỏ trống ngày sinh.")
    private String dateOfBirth;
    @NotBlank(message = "Vui lòng không bỏ trống ảnh đại diện.")
    private String avatar;

    public UpdateUserForm() {
    }

    public UpdateUserForm(String name, String username, String phoneNumber, String email, String address, Integer age, Boolean gender, String dateOfBirth, String avatar) {
        this.name = name;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.age = age;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.avatar = avatar;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
        this.gender = gender;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
   public void validate(List<User> list, UpdateUserForm updateUserForm, Errors error) {
       for (int i = 0; i < list.size(); i++) {
           if (Objects.equals(list.get(i).getUsername(), updateUserForm.getUsername())) {
               continue;
           }
           if (Objects.equals(list.get(i).getEmail(), updateUserForm.getEmail())) {
               error.rejectValue("email","email","Email " + updateUserForm.getEmail() + " đã được sử dụng vui lòng nhập email khác" );

           }
           if (Objects.equals(list.get(i).getPhoneNumber(), updateUserForm.getPhoneNumber())) {
               error.rejectValue("phoneNumber","phoneNumber","Số điện thoại " + updateUserForm.getPhoneNumber() + " đã được sử dụng vui lòng nhập số điện thoại khác" );

           }
       }
   }
    @Override
    public String toString() {
        return "UpdateUserForm{" +
                "name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", avatar='" + avatar + '\'' +
                '}';
    }
}
