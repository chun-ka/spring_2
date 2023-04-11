public class A278 {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            String result="";
            for (int j = 0; j <= i; j++) {
                result+="  ";
            }
            for (int j = i; j < 5; j++) {
                result+="  * ";
            }
            System.out.println(result);
        }
    }
}
