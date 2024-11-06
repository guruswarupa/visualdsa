#include <stdio.h>
#include <stdlib.h>

typedef struct InputRestrictedDeque {
    int *items;
    int front;
    int rear;
    int capacity;
} InputRestrictedDeque;

void init(InputRestrictedDeque* deque, int capacity) {
    deque->capacity = capacity;
    deque->items = (int*)malloc(capacity * sizeof(int));
    deque->front = -1;
    deque->rear = 0;
}

int isFull(InputRestrictedDeque* deque) {
    return (deque->rear + 1) % deque->capacity == deque->front;
}

int isEmpty(InputRestrictedDeque* deque) {
    return deque->front == -1;
}

void insertRear(InputRestrictedDeque* deque, int value) {
    if (isFull(deque)) {
        printf("Deque is full!\n");
        return;
    }
    if (isEmpty(deque)) {
        deque->front = 0;
        deque->rear = 0;
    } else {
        deque->rear = (deque->rear + 1) % deque->capacity;
    }
    deque->items[deque->rear] = value;
    printf("Inserted %d at the rear\n", value);
}

int deleteFront(InputRestrictedDeque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty!\n");
        return -1;
    }
    int item = deque->items[deque->front];
    if (deque->front == deque->rear) {
        deque->front = -1;
        deque->rear = 0;
    } else {
        deque->front = (deque->front + 1) % deque->capacity;
    }
    return item;
}

void display(InputRestrictedDeque* deque) {
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
    InputRestrictedDeque myDeque;
    init(&myDeque, 5);
    insertRear(&myDeque, 10);
    insertRear(&myDeque, 20);
    display(&myDeque);
    printf("Deleted from front: %d\n", deleteFront(&myDeque));
    display(&myDeque);
    free(myDeque.items);
    return 0;
}