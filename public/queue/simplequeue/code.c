#include <stdio.h>
#include <stdlib.h>

typedef struct Queue {
    int *items;
    int front;
    int rear;
    int capacity;
} Queue;

void init(Queue* queue, int capacity) {
    queue->capacity = capacity;
    queue->items = (int*)malloc(queue->capacity * sizeof(int));
    queue->front = -1;
    queue->rear = -1;
}

void resizeQueue(Queue* queue) {
    queue->capacity *= 2;
    queue->items = (int*)realloc(queue->items, queue->capacity * sizeof(int));
}

int isFull(Queue* queue) {
    return queue->rear == queue->capacity - 1;
}

int isEmpty(Queue* queue) {
    return queue->front == queue->rear - 1;
}

void enqueue(Queue* queue, int value) {
    if (isFull(queue)) {
        resizeQueue(queue);
    }
    if (queue->front == -1)
        queue->front = 0;
    queue->items[++queue->rear] = value;
    printf("Enqueued %d\n", value);
}

int dequeue(Queue* queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty\n");
        return -1;
    } else {
        int dequeuedItem = queue->items[queue->front++];
        if (queue->front > queue->rear) {
            queue->front = -1;
            queue->rear = -1;
        }
        return dequeuedItem;
    }
}

void display(Queue* queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty.\n");
    } else {
        printf("Queue elements: ");
        for (int i = queue->front; i <= queue->rear; i++) {
            printf("%d ", queue->items[i]);
        }
        printf("\n");
    }
}

int main() {
    Queue myQueue;
    init(&myQueue, 2);  
    enqueue(&myQueue, 10);
    enqueue(&myQueue, 20);
    enqueue(&myQueue, 30);  
    enqueue(&myQueue, 40);
    display(&myQueue);
    printf("Dequeued element is %d\n", dequeue(&myQueue));
    display(&myQueue); 
    free(myQueue.items);
    return 0;
}