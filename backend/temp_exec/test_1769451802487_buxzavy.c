#include <stdio.h>

int main() {
    // Write your solution here
    int a,b,c;
    scanf("%d %d %d",&a,b,c);
    if(a >= b && a >= c ){
        printf("The maximum number is: %d",a);
    }
    else if(b >= a && b >= c){
        printf("The maximum number is: %d",b);
    }
    else{
        printf("The maximum number is: %d",c);
    }
    return 0;
}