#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *items;
    int *tops;    // Array to store the top index of each stack
    int numStacks;
    int capacityPerStack;
} ParallelStack;

void init(ParallelStack* stack, int numStacks, int capacityPerStack) {
    stack->numStacks = numStacks;
    stack->capacityPerStack = capacityPerStack;
    stack->items = (int*)malloc(numStacks * capacityPerStack * sizeof(int));
    stack->tops = (int*)malloc(numStacks * sizeof(int));
    for (int i = 0; i < numStacks; i++) {
        stack->tops[i] = -1;
    }
}

int isFull(ParallelStack* stack, int stackNum) {
    return stack->tops[stackNum] == stack->capacityPerStack - 1;
}

int isEmpty(ParallelStack* stack, int stackNum) {
    return stack->tops[stackNum] == -1;
}

void push(ParallelStack* stack, int stackNum, int value) {
    if (isFull(stack, stackNum)) {
        printf("Stack Overflow on Stack %d\n", stackNum + 1);
        return;
    }
    stack->items[stackNum * stack->capacityPerStack + ++stack->tops[stackNum]] = value;
    printf("Pushed %d onto Stack %d\n", value, stackNum + 1);
}

int pop(ParallelStack* stack, int stackNum) {
    if (isEmpty(stack, stackNum)) {
        printf("Stack %d is empty\n", stackNum + 1);
        return -1;
    }
    return stack->items[stackNum * stack->capacityPerStack + stack->tops[stackNum]--];
}

void display(ParallelStack* stack, int stackNum) {
    if (isEmpty(stack, stackNum)) {
        printf("Stack %d is empty\n", stackNum + 1);
    } else {
        printf("Stack %d: ", stackNum + 1);
        for (int i = 0; i <= stack->tops[stackNum]; i++) {
            printf("%d ", stack->items[stackNum * stack->capacityPerStack + i]);
        }
        printf("\n");
    }
}

int main() {
    int numStacks = 3;
    int capacityPerStack = 5;
    ParallelStack stack;
    init(&stack, numStacks, capacityPerStack);
    push(&stack, 0, 10);
    push(&stack, 0, 20);
    push(&stack, 1, 30);
    push(&stack, 1, 40);
    push(&stack, 2, 50);
    display(&stack, 0);
    display(&stack, 1);
    display(&stack, 2);
    printf("Popped from Stack 1: %d\n", pop(&stack, 0));
    printf("Popped from Stack 2: %d\n", pop(&stack, 1));
    display(&stack, 0);
    display(&stack, 1);
    display(&stack, 2);
    free(stack.items);
    free(stack.tops);
    return 0;
}