import java.util.Arrays;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class A273 {
    public static void main(String[] args) {
//        Thuật toán xử lý mảng: loại bỏ giá trị trùng lặp, đếm số xuất hiện của mỗi từ trong mảng.
        Scanner sc =new Scanner (System.in);
        System.out.println("nhập một dãy từ");
        String st=sc.nextLine();
        String[] string=st.split(" ");
        String[] string2=st.split(" ");
        System.out.println(Arrays.toString(string));
        for (int i = 0; i < string.length; i++) {
            int count=0;
            for (int j = 0; j < string2.length; j++) {
                if (string[i].equals(string2[j])){
                    string2[j]="";
                    count++;
                }
            }
            if (count!=0){
                System.out.print(count+string[i]);

            }
        }

    }
}
