public class A263 {
    static boolean checkFibonaci(int check) {
        int num1 = 0;
        int num2 = 1;
        for (int i = 0; i < check; i++) {
            int num3 = num1 + num2;
            if (check == num3) {
                return true;
            }
            num1 = num2;
            num2 = num3;
        }
        return false;
    }

    public static void main(String[] args) {
        int num=0;
        while (num<100){
            if (checkFibonaci(num)){
                System.out.println(num);
            }
            num++;
        }
    }
}
