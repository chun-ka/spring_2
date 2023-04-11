public class A285 {
    public static void main(String[] args) {
        int[] nums = {1, 4, 6, 8, 6, 8, 9, 9,10,20,4,5,14};
        int max1 = nums[0];
        int max2 = 0;
        int max3=Integer.MIN_VALUE;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > max1) {
                max3 = max2;
                max2 = max1;
                max1 = nums[i];
            } else {
               if (nums[i]>max2){
                   if (nums[i]!=max1){
                       max3=max2;
                       max2=nums[i];
                   }
               }else {
                   if (nums[i]>max3 && nums[i]!=max2){
                       max3=nums[i];
                   }
               }
            }
        }
        System.out.println(max3);
    }

}

