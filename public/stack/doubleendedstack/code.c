#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *items;
    int top1;  // Top pointer for Stack 1 (left side)
    int top2;  // Top pointer for Stack 2 (right side)
    int capacity;
} DoubleEndedStack;

void init(DoubleEndedStack* stack, int capacity) {
    stack->capacity = capacity;
    stack->items = (int*)malloc(capacity * sizeof(int));
    stack->top1 = -1;
    stack->top2 = capacity;
}

int isFull(DoubleEndedStack* stack) {
    return stack->top1 + 1 == stack->top2;
}

int isEmptyStack1(DoubleEndedStack* stack) {
    return stack->top1 == -1;
}

int isEmptyStack2(DoubleEndedStack* stack) {
    return stack->top2 == stack->capacity;
}

void push1(DoubleEndedStack* stack, int value) {
    if (isFull(stack)) {
        printf("Stack Overflow on Stack 1\n");
        return;
    }
    stack->items[++stack->top1] = value;
    printf("Pushed %d onto Stack 1\n", value);
}

void push2(DoubleEndedStack* stack, int value) {
    if (isFull(stack)) {
        printf("Stack Overflow on Stack 2\n");
        return;
    }
    stack->items[--stack->top2] = value;
    printf("Pushed %d onto Stack 2\n", value);
}

int pop1(DoubleEndedStack* stack) {
    if (isEmptyStack1(stack)) {
        printf("Stack 1 is empty\n");
        return -1;
    }
    return stack->items[stack->top1--];
}

int pop2(DoubleEndedStack* stack) {
    if (isEmptyStack2(stack)) {
        printf("Stack 2 is empty\n");
        return -1;
    }
    return stack->items[stack->top2++];
}

void displayStack1(DoubleEndedStack* stack) {
    if (isEmptyStack1(stack)) {
        printf("Stack 1 is empty\n");
    } else {
        printf("Stack 1: ");
        for (int i = 0; i <= stack->top1; i++) {
            printf("%d ", stack->items[i]);
        }
        printf("\n");
    }
}

void displayStack2(DoubleEndedStack* stack) {
    if (isEmptyStack2(stack)) {
        printf("Stack 2 is empty\n");
    } else {
        printf("Stack 2: ");
        for (int i = stack->capacity - 1; i >= stack->top2; i--) {
            printf("%d ", stack->items[i]);
        }
        printf("\n");
    }
}

int main() {
    DoubleEndedStack stack;
    init(&stack, 10);
    push1(&stack, 5);
    push1(&stack, 10);
    push1(&stack, 15);
    push2(&stack, 20);
    push2(&stack, 25);
    push2(&stack, 30);
    displayStack1(&stack);
    displayStack2(&stack);
    printf("Popped from Stack 1: %d\n", pop1(&stack));
    printf("Popped from Stack 2: %d\n", pop2(&stack));
    displayStack1(&stack);
    displayStack2(&stack);
    free(stack.items);
    return 0;
}