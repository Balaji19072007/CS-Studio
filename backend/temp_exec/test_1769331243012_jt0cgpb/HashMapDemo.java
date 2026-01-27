import java.util.HashMap;

public class HashMapDemo {
    public static void main(String[] args) {

        // Create HashMap
        HashMap<String, Integer> map = new HashMap<>();

        // Add entries
        map.put("Alice", 95);
        map.put("Bob", 88);
        map.put("Charlie", 79);

        // Retrieve Alice's score
        int aliceScore = map.get("Alice");

        // Print output exactly as required
        System.out.println("Alice's score: " + aliceScore);
        System.out.println("Full Map: " + map);
    }
}
