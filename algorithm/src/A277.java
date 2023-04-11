public class A277 {
    public static void main(String[] args) {
//        Cho 1 mảng số. Tìm số lớn thứ 2 trong mảng.
        int[] nums = {1,4,9,2,10,15};
        int max1=nums[0];
        int max2 =Integer.MIN_VALUE;
        for (int i = 1; i <nums.length; i++) {
            if (nums[i]>max1){
                max2=max1;
                max1=nums[i];
            }else if (nums[i]>max2&&nums[i]!=max1){
                max2=nums[i];
            }
        }
        System.out.println(max2);

    }
}
