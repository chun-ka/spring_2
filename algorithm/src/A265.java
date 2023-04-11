import java.util.Scanner;

public class A265 {
//    public static void main(String[] args) {
//        Scanner scanner = new Scanner (System.in);
//        System.out.print("Nhập số thập phân: ");
//        int decimal = scanner.nextInt ();
//        String octal = "";
//        while (decimal > 0) {
//            octal = decimal % 8 + octal;
//            decimal = decimal / 8;}
//        System.out.println("Số bát phân: " + octal);
//
//    }

    public static void main(String[] args) {
        String ta = "abc";
        ta = ta.concat("b");
        String tb = "c";
        ta = ta.concat(tb);
        ta.replace('c', 'd');
        ta = ta.concat(tb);
        System.out.println(ta);
    }
}
