import java.util.Scanner;

public class ReverseStringExample {

    public static String reverseString(String str) {
        String reversed = "";

        for (int i = str.length() - 1; i >= 0; i--) {
            reversed += str.charAt(i);
        }

        return reversed;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Read input ONLY
        String str = sc.nextLine();

        // Print ONLY the result
        System.out.println(reverseString(str));

        sc.close();
    }
}
