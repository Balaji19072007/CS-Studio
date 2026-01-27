public class StarPattern {
    public static void main(String[] args) {

        int n = 4; // middle width / height control

        // Upper half (including middle line)
        for (int i = 1; i <= n; i++) {
            // spaces
            for (int s = n - i; s > 0; s--) {
                System.out.print(" ");
            }
            // stars
            for (int j = 1; j <= (2 * i - 1); j++) {
                System.out.print("*");
            }
            System.out.println();
        }

        // Lower half
        for (int i = n - 1; i >= 1; i--) {
            // spaces
            for (int s = n - i; s > 0; s--) {
                System.out.print(" ");
            }
            // stars
            for (int j = 1; j <= (2 * i - 1); j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
