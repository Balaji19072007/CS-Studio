import java.util.HashMap;

public class HashMapDemo {
    public static void main(String[] args) {

        // Create a HashMap
        HashMap<String, Integer> scores = new HashMap<>();

        // Add entries to the HashMap
        scores.put("Alice", 85);
        scores.put("Bob", 92);
        scores.put("Charlie", 78);

        // Retrieve value for a key
        int bobScore = scores.get("Bob");

        // Print retrieved value
        System.out.println("Score of Bob: " + bobScore);

        // Print the full HashMap
        System.out.println("Full HashMap: " + scores);
    }
}
