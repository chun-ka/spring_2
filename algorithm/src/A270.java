public class A270 {
    public static void main(String[] args) {
        String str="ssdfdsgdher";
        String temp;
        String[] strings=str.split("");
        for (int i = 1; i < strings.length; i++) {
            for (int j = 0; j <=i; j++) {
                if ((int)(strings[i].charAt(0))<=(int)(strings[j].charAt(0))){
                    temp=strings[i];
                    strings[i]=strings[j];
                    strings[j]=temp;
                }
            }
        }
        for (int i = 0; i < strings.length; i++) {
            System.out.print(strings[i]);
        }
    }
}
