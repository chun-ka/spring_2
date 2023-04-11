import java.util.Scanner;

public class A274 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("nhập số cần đảo ngược");
        int num = Integer.parseInt(sc.nextLine());
        String string = "";
        int a = 0;
        while (num >= 10) {
            a = num % 10;
            num = num / 10;
            string+=a;
            if (num<10){
                string+=num;
            }
        }
        System.out.println(string);
    }
}
