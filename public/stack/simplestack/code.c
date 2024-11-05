#include<stdio.h>
#include<stdlib.h>

typedef struct {
    int *items;
    int top;
    int capacity;
} Stack;

void init(Stack* stack, int capacity) {
    stack->capacity = capacity;
    stack->items = (int*)malloc(stack->capacity * sizeof(int));
    stack->top = -1;
}

void resizeStack(Stack* stack) {
    stack->capacity *= 2;
    stack->items = (int*)realloc(stack->items, stack->capacity * sizeof(int));
}

int isFull(Stack* stack) {
    return stack->top == stack->capacity - 1;
}

int isEmpty(Stack* stack) {
    return stack->top == -1;
}

void push(Stack* stack, int value) {
    if (isFull(stack)) {
        resizeStack(stack);
    }
    stack->items[++stack->top] = value;
}

int pop(Stack* stack) {
    return isEmpty(stack) ? -1 : stack->items[stack->top--];
}

int peek(Stack* stack) {
    return isEmpty(stack) ? -1 : stack->items[stack->top];
}

void display(Stack* stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty!\n");
    } else {
        for (int i =0; i <= stack->top; i++) {
            printf("%d ", stack->items[i]);
        }
        printf("\n");
    }
}

int main() {
    Stack Mstack;
    init(&Mstack, 2);
    push(&Mstack, 4);
    push(&Mstack, 3);
    push(&Mstack, 6);
    display(&Mstack);
    printf("Popped element: %d\n", pop(&Mstack));
    display(&Mstack);
    free(Mstack.items);
    return 0;
}