package com.company;

public class Main {

    public static void main(String[] args) {
//        Cho 1 chuỗi, lấy ra số lần xuất hiện của các ký tự có trong chuỗi.
//        Ví dụ: "aabacsdc" : 3a,1b,2c,1d,1s
        String str="aabacsdc";
        String[]st=str.split("");
        for (int i = 0; i < st.length; i++) {
            int count=1;
            for (int j = i+1; j <st.length; j++) {
                if (st[i].equals(st[j])){
                    count++;
                    st[j]="";
                }
            }
            if (st[i]!=""){
                System.out.println(count+st[i]);
            }
        }
    }
}
