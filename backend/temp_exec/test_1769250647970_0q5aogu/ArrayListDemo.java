import java.util.ArrayList;

public class ArrayListDemo {
    public static void main(String[] args) {

        // Create an ArrayList of Integers
        ArrayList<Integer> numbers = new ArrayList<>();

        // Add 5 elements
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);
        numbers.add(50);

        // Remove element at index 2
        numbers.remove(2);

        // Print the final ArrayList
        System.out.println(numbers);
    }
}
