#include <stdio.h>
#include <stdlib.h>

typedef struct Deque {
    int *items;
    int front;
    int rear;
    int capacity;
} Deque;

void init(Deque* deque, int capacity) {
    deque->capacity = capacity;
    deque->items = (int*)malloc(capacity * sizeof(int));
    deque->front = -1;
    deque->rear = 0;
}

int isFull(Deque* deque) {
    return (deque->front == 0 && deque->rear == deque->capacity - 1) || (deque->front == deque->rear + 1);
}

int isEmpty(Deque* deque) {
    return deque->front == -1;
}

void insertFront(Deque* deque, int value) {
    if (isFull(deque)) {
        printf("Deque is full!\n");
        return;
    }
    if (deque->front == -1) {
        deque->front = 0;
        deque->rear = 0;
    } else if (deque->front == 0) {
        deque->front = deque->capacity - 1;
    } else {
        deque->front--;
    }
    deque->items[deque->front] = value;
    printf("Inserted %d at the front\n", value);
}

void insertRear(Deque* deque, int value) {
    if (isFull(deque)) {
        printf("Deque is full!\n");
        return;
    }
    if (deque->front == -1) {
        deque->front = 0;
        deque->rear = 0;
    } else if (deque->rear == deque->capacity - 1) {
        deque->rear = 0;
    } else {
        deque->rear++;
    }
    deque->items[deque->rear] = value;
    printf("Inserted %d at the rear\n", value);
}

int deleteFront(Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty!\n");
        return -1;
    }
    int item = deque->items[deque->front];
    if (deque->front == deque->rear) {
        deque->front = -1;
        deque->rear = -1;
    } else if (deque->front == deque->capacity - 1) {
        deque->front = 0;
    } else {
        deque->front++;
    }
    return item;
}

int deleteRear(Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty!\n");
        return -1;
    }
    int item = deque->items[deque->rear];
    if (deque->front == deque->rear) {
        deque->front = -1;
        deque->rear = -1;
    } else if (deque->rear == 0) {
        deque->rear = deque->capacity - 1;
    } else {
        deque->rear--;
    }
    return item;
}

void display(Deque* deque) {
    if (isEmpty(deque)) {
        printf("Deque is empty.\n");
        return;
    }
    printf("Deque elements: ");
    if (deque->rear >= deque->front) {
        for (int i = deque->front; i <= deque->rear; i++) {
            printf("%d ", deque->items[i]);
        }
    } else {
        for (int i = deque->front; i < deque->capacity; i++) {
            printf("%d ", deque->items[i]);
        }
        for (int i = 0; i <= deque->rear; i++) {
            printf("%d ", deque->items[i]);
        }
    }
    printf("\n");
}

int main() {
    Deque myDeque;
    init(&myDeque, 5);
    insertRear(&myDeque, 10);
    insertRear(&myDeque, 20);
    insertFront(&myDeque, 30);
    display(&myDeque);
    printf("Deleted from front: %d\n", deleteFront(&myDeque));
    printf("Deleted from rear: %d\n", deleteRear(&myDeque));
    display(&myDeque);
    free(myDeque.items);
    return 0;
}