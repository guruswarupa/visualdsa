#include <stdio.h>
#include <stdlib.h>

typedef struct PriorityQueue {
    int *items;
    int *priority;
    int capacity;
    int size;
} PriorityQueue;

void init(PriorityQueue* pq, int capacity) {
    pq->capacity = capacity;
    pq->size = 0;
    pq->items = (int*)malloc(capacity * sizeof(int));
    pq->priority = (int*)malloc(capacity * sizeof(int));
}

int isFull(PriorityQueue* pq) {
    return pq->size == pq->capacity;
}

int isEmpty(PriorityQueue* pq) {
    return pq->size == 0;
}

void enqueue(PriorityQueue* pq, int value, int priority) {
    if (isFull(pq)) {
        printf("Priority Queue is full!\n");
        return;
    }
    int i;
    for (i = pq->size - 1; (i >= 0 && priority > pq->priority[i]); i--) {
        pq->items[i + 1] = pq->items[i];
        pq->priority[i + 1] = pq->priority[i];
    }
    pq->items[i + 1] = value;
    pq->priority[i + 1] = priority;
    pq->size++;
    printf("Enqueued %d with priority %d\n", value, priority);
}

int dequeue(PriorityQueue* pq) {
    if (isEmpty(pq)) {
        printf("Priority Queue is empty!\n");
        return -1;
    }
    return pq->items[--pq->size];
}

void display(PriorityQueue* pq) {
    if (isEmpty(pq)) {
        printf("Priority Queue is empty.\n");
        return;
    }
    printf("Priority Queue elements:\n");
    for (int i = 0; i < pq->size; i++) {
        printf("Value: %d, Priority: %d\n", pq->items[i], pq->priority[i]);
    }
}

int main() {
    PriorityQueue pq;
    init(&pq, 5);
    enqueue(&pq, 10, 2);
    enqueue(&pq, 20, 1);
    enqueue(&pq, 30, 3);
    display(&pq);
    printf("Dequeued element is %d\n", dequeue(&pq));
    display(&pq);
    free(pq.items);
    free(pq.priority);
    return 0;
}