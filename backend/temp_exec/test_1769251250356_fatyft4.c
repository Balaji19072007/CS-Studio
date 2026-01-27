#include <stdio.h>

int main() {
    // Write your solution here
    int num;
    scanf("%d",&num);
    if(num % 2 == 0){
        printf("The number %d is Even.",num);
    }
    else{
        printf("The number %d is odd.",num);
    }
    return 0;
}