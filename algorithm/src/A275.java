public class A275 {
    public static void main(String[] args) {
        int[] arr={1,10,8,100,5};
        int max=arr[0];
        int min=arr[0];
        int sum=0;
        for (int i = 1; i < arr.length; i++) {
            sum+=arr[i];
            if (max<=arr[i]){
                max=arr[i];
            }
            if (min>=arr[i]){
                min=arr[i];
            }
        }
        System.out.println("Tổng 4 số lớn nhất:"+ (sum-min+arr[0])+","+min);
        System.out.println("Tổng 4 số nhỏ nhất:"+ (sum-max+arr[0])+","+max);
    }
}
