#include <stdio.h>

int main() { setvbuf(stdout, NULL, _IONBF, 0);
    int num1, num2;
    int sum, product;

    scanf("%d", &num1);
    scanf("%d", &num2);

    sum = num1 + num2;
    product = num1 * num2;

    printf("Sum: %d\n", sum);
    printf("Product: %d", product);

    return 0;
}