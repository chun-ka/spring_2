public class A264 {
    public static boolean checkPrime(int num){
        if (num<2){
            return false;
        }
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num%i==0){
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        char a= 'A';
        System.out.println(checkPrime(4));
        System.out.println((int)a);
        System.out.println((int) 'A');
    }
}
