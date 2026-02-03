import java.util.Scanner;

public class ReverseStringExample {

    // Function to reverse a string using an iterative approach
    public static String reverseString(String str) {
        String reversed = "";

        for (int i = str.length() - 1; i >= 0; i--) {
            reversed = reversed + str.charAt(i);
        }

        return reversed;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // User input
        System.out.print("Enter a string: ");
        String str = sc.nextLine();

        // Print reversed string
        System.out.println(reverseString(str));

        sc.close();
    }
}
