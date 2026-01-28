#include <stdio.h>

int main() {
    // Write your solution here
    int age;
    scanf("%d",&age);
    if(age>=18){
        printf("Eligible");
    }else{
        printf("Not Eligible");
    }
    return 0;
}