#include <stdio.h>
#include <stdlib.h>

typedef struct CircularQueue {
    int *items;
    int front;
    int rear;
    int capacity;
} CircularQueue;

void init(CircularQueue* queue, int capacity) {
    queue->capacity = capacity;
    queue->items = (int*)malloc(queue->capacity * sizeof(int));
    queue->front = 0;
    queue->rear = 0;
}

int isFull(CircularQueue* queue) {
    return (queue->rear + 1) % queue->capacity == queue->front;
}

int isEmpty(CircularQueue* queue) {
    return queue->front == queue->rear;
}

void enqueue(CircularQueue* queue, int value) {
    if (isFull(queue)) {
        printf("Queue is full!\n");
        return;
    }
    queue->items[queue->rear] = value;
    queue->rear = (queue->rear + 1) % queue->capacity;
    printf("Enqueued %d\n", value);
}

int dequeue(CircularQueue* queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty!\n");
        return -1;
    }
    int dequeuedItem = queue->items[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    return dequeuedItem;
}

void display(CircularQueue* queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty.\n");
        return;
    }
    printf("Queue elements: ");
    int i = queue->front;
    while (i != queue->rear) {
        printf("%d ", queue->items[i]);
        i = (i + 1) % queue->capacity;
    }
    printf("\n");
}

int main() {
    CircularQueue myQueue;
    init(&myQueue, 5);
    enqueue(&myQueue, 10);
    enqueue(&myQueue, 20);
    enqueue(&myQueue, 30);
    display(&myQueue);
    printf("Dequeued element is %d\n", dequeue(&myQueue));
    display(&myQueue);
    free(myQueue.items);
    return 0;
}