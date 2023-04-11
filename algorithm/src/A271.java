import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class A271 {
    public static void main(String[] args) {
        int[] arr1={1,4,6,8,10,11,14};
        int[] arr2={3,4,6,8,10,12,15};
        List<Integer> result=new ArrayList<>();
        Map<Integer,Integer> map= new TreeMap();
        for (int i = 0; i < arr1.length; i++) {
            map.put(arr1[i],1);
        }
        System.out.println(map);
        for (int i = 0; i < arr2.length; i++) {
            if (map.containsKey(arr2[i])){
                map.remove(arr2[i]);
                result.add(arr2[i]);
            }
        }
        System.out.println(result);
    }
}
