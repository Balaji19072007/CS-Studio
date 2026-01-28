#include <stdio.h>

int main() {
    char source[100], destination[100];
    int i = 0;

    // Read input string (no spaces)
    scanf("%s", source);

    // Manually copy string using loop
    while (source[i] != '\0') {
        destination[i] = source[i];
        i++;
    }
    destination[i] = '\0';  // Null-terminate destination string

    // Print both strings
    printf("Source string: %s\n", source);
    printf("Destination string: %s\n", destination);

    return 0;
}
