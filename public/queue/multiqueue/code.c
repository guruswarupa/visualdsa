#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *items;
    int front;
    int rear;
    int capacity;
} Queue;

typedef struct {
    Queue *queues;
    int num_queues;
} MultiQueue;

void initQueue(Queue *q, int capacity) {
    q->capacity = capacity;
    q->front = 0;
    q->rear = 0;
    q->items = (int *)malloc(capacity * sizeof(int));
}

void initMultiQueue(MultiQueue *mq, int num_queues, int initial_capacity) {
    mq->num_queues = num_queues;
    mq->queues = (Queue *)malloc(num_queues * sizeof(Queue));
    for (int i = 0; i < num_queues; i++) {
        initQueue(&mq->queues[i], initial_capacity);
    }
}

void resizeQueue(Queue *q) {
    q->capacity *= 2;
    q->items = (int *)realloc(q->items, q->capacity * sizeof(int));
}

int isFull(Queue *q) {
    return (q->rear + 1) % q->capacity == q->front;
}

int isEmpty(Queue *q) {
    return q->front == q->rear;
}

void enqueue(MultiQueue *mq, int queueIndex, int value) {
    if (queueIndex < 0 || queueIndex >= mq->num_queues) {
        printf("Invalid queue index.\n");
        return;
    }
    Queue *q = &mq->queues[queueIndex];
    if (isFull(q)) {
        resizeQueue(q);
    }
    q->items[q->rear] = value;
    q->rear = (q->rear + 1) % q->capacity;
    printf("Enqueued %d to queue %d\n", value, queueIndex);
}

int dequeue(MultiQueue *mq, int queueIndex) {
    if (queueIndex < 0 || queueIndex >= mq->num_queues) {
        printf("Invalid queue index.\n");
        return -1;
    }
    Queue *q = &mq->queues[queueIndex];
    if (isEmpty(q)) {
        printf("Queue %d is empty.\n", queueIndex);
        return -1;
    }
    int value = q->items[q->front];
    q->front = (q->front + 1) % q->capacity;
    printf("Dequeued %d from queue %d\n", value, queueIndex);
    return value;
}

void display(MultiQueue *mq) {
    for (int i = 0; i < mq->num_queues; i++) {
        printf("Queue %d: ", i);
        Queue *q = &mq->queues[i];
        for (int j = q->front; j < q->rear; j++) {
            printf("%d ", q->items[j % q->capacity]);
        }
        printf("\n");
    }
}

void freeMultiQueue(MultiQueue *mq) {
    for (int i = 0; i < mq->num_queues; i++) {
        free(mq->queues[i].items);
    }
    free(mq->queues);
}

int main() {
    MultiQueue mq;
    initMultiQueue(&mq, 3, 2);  // 3 queues with initial capacity of 2

    enqueue(&mq, 0, 10);
    enqueue(&mq, 0, 20);
    enqueue(&mq, 1, 30);
    enqueue(&mq, 2, 40);

    display(&mq);

    dequeue(&mq, 0);
    display(&mq);

    freeMultiQueue(&mq);
    return 0;
}