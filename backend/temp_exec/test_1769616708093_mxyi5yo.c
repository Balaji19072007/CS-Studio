#include <stdio.h>

int main() {
    char source[100], destination[100];
    int i = 0;
    scanf("%s", source);
    while (source[i] != '\0') {
        destination[i] = source[i];
        i++;
    }
    destination[i] = '\0';
    printf("Source string: %s\n", source);
    printf("Destination string: %s\n", destination);

    return 0;
}
