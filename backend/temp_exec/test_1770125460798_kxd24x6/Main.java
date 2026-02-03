import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        
        // 1. Add 5 elements
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);
        numbers.add(50);
        
        // 2. Remove the element at index 2 (which is 30)
        numbers.remove(2);
        
        // 3. Print the final list
        System.out.println("Final list: " + numbers);
    }
}