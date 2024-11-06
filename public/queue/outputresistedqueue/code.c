#include <stdio.h>
#include <stdlib.h>

typedef struct OutputRestrictedDeque {
    int *items;
    int front;
    int rear;
    int capacity;
} OutputRestrictedDeque;

void init(OutputRestrictedDeque* deque, int capacity) {
    deque->capacity = capacity;
    deque->items = (int*)malloc(capacity * sizeof(int));
    deque->front = -1;
    deque->rear = 0;
}

int isFull(OutputRestrictedDeque* deque) {
    return (deque->rear + 1) % deque->capacity == deque->front;
}

int isEmpty(OutputRestrictedDeque* deque) {
    return deque->front == -1;
}

void insertFront(OutputRestrictedDeque* deque, int value) {
    if (isFull(deque)) {
        printf("Deque is full!\n");
        return;
    }
    if (isEmpty(deque)) {
        deque->front = 0;
        deque->rear = 0;
    } else {
        deque->front = (deque->front - 1 + deque->capacity) % deque->capacity;
    }
    deque->items[deque->front] = value;
    printf("Inserted %d at the front\n", value);
}

int deleteRear(OutputRestrictedDeque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty!\n");
        return -1;
    }
    int item = deque->items[deque->rear];
    if (deque->front == deque->rear) {
        deque->front = -1;
        deque->rear = 0;
    } else {
        deque->rear = (deque->rear - 1 + deque->capacity) % deque->capacity;
    }
    return item;
}

void display(OutputRestrictedDeque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty.\n");
        return;
    }
    printf("Deque elements: ");
    int i = deque->front;
    while (1) {
        printf("%d ", deque->items[i]);
        if (i == deque->rear) break;
        i = (i + 1) % deque->capacity;
    }
    printf("\n");
}

int main() {
    OutputRestrictedDeque myDeque;
    init(&myDeque, 5);
    insertFront(&myDeque, 10);
    insertFront(&myDeque, 20);
    display(&myDeque);
    printf("Deleted from rear: %d\n", deleteRear(&myDeque));
    display(&myDeque);
    free(myDeque.items);
    return 0;
}