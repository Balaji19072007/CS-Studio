#include <stdio.h>

int main() {
    // Write your solution here
    int n,sum=1;
    scanf("%d",&n);
    for(int i=1;i<=n;i++){
        sum*=i;
    }
    printf("Factorial of %d is %d",n,sum);
    return 0;
}