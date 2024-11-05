#include<stdio.h>
#include<stdlib.h>

typedef struct {
    int *items;
    int top;
    int bottom;
    int capacity;
} CircularStack;

void init(CircularStack* stack, int capacity) {
    stack->capacity = capacity;
    stack->items = (int*)malloc(stack->capacity * sizeof(int));
    stack->top = -1;
    stack->bottom = 0;
}

void resizeStack(CircularStack* stack) {
    stack->capacity *= 2;
    stack->items = (int*)realloc(stack->items, stack->capacity * sizeof(int));
}

int isFull(CircularStack* stack) {
    return (stack->top + 1) % stack->capacity == stack->bottom;
}

int isEmpty(CircularStack* stack) {
    return stack->top == -1;
}

void push(CircularStack* stack, int value) {
    if (isFull(stack)) {
        resizeStack(stack);
    }

    if (stack->top == -1) {
        stack->top = stack->bottom = 0;
    } else {
        stack->top = (stack->top + 1) % stack->capacity;
    }

    stack->items[stack->top] = value;
}

int pop(CircularStack* stack) {
    if (isEmpty(stack)) {
        return -1;
    }

    int value = stack->items[stack->top];

    if (stack->top == stack->bottom) {
        stack->top = -1;
        stack->bottom = 0;
    } else {
        stack->top = (stack->top - 1 + stack->capacity) % stack->capacity;
    }

    return value;
}

int peek(CircularStack* stack) {
    return isEmpty(stack) ? -1 : stack->items[stack->top];
}

void display(CircularStack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty!\n");
    } else {
        printf("Stack elements: ");
        int i = stack->bottom;
        do {
            printf("%d ", stack->items[i]);
            i = (i + 1) % stack->capacity;
        } while (i != (stack->top + 1) % stack->capacity);
        printf("\n");
    }
}

int main() {
    CircularStack cStack;
    init(&cStack, 3);
    push(&cStack, 1);
    push(&cStack, 2);
    push(&cStack, 3);
    display(&cStack);
    printf("Popped element: %d\n", pop(&cStack));
    push(&cStack, 4);
    display(&cStack);
    free(cStack.items);
    return 0;
}