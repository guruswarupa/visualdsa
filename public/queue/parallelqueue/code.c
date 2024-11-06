#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

typedef struct {
    int *items;
    int front;
    int rear;
    int capacity;
    pthread_mutex_t lock;
    pthread_cond_t not_empty;
    pthread_cond_t not_full;
} ParallelQueue;

void initQueue(ParallelQueue *q, int capacity) {
    q->capacity = capacity;
    q->front = 0;
    q->rear = 0;
    q->items = (int *)malloc(capacity * sizeof(int));
    pthread_mutex_init(&q->lock, NULL);
    pthread_cond_init(&q->not_empty, NULL);
    pthread_cond_init(&q->not_full, NULL);
}

void resizeQueue(ParallelQueue *q) {
    q->capacity *= 2;
    q->items = (int *)realloc(q->items, q->capacity * sizeof(int));
}

int isFull(ParallelQueue *q) {
    return (q->rear + 1) % q->capacity == q->front;
}

int isEmpty(ParallelQueue *q) {
    return q->front == q->rear;
}

void enqueue(ParallelQueue *q, int value) {
    pthread_mutex_lock(&q->lock);
    while (isFull(q)) {
        resizeQueue(q);
        pthread_cond_signal(&q->not_full);
    }
    q->items[q->rear] = value;
    q->rear = (q->rear + 1) % q->capacity;
    pthread_cond_signal(&q->not_empty);
    pthread_mutex_unlock(&q->lock);
}

int dequeue(ParallelQueue *q) {
    pthread_mutex_lock(&q->lock);
    while (isEmpty(q)) {
        pthread_cond_wait(&q->not_empty, &q->lock);
    }
    int value = q->items[q->front];
    q->front = (q->front + 1) % q->capacity;
    pthread_cond_signal(&q->not_full);
    pthread_mutex_unlock(&q->lock);
    return value;
}

void* producer(void* arg) {
    ParallelQueue *q = (ParallelQueue *)arg;
    for (int i = 0; i < 5; i++) {
        enqueue(q, i);
        printf("Produced: %d\n", i);
        sleep(1); // Simulate some processing time
    }
    return NULL;
}

void* consumer(void* arg) {
    ParallelQueue *q = (ParallelQueue *)arg;
    for (int i = 0; i < 5; i++) {
        int value = dequeue(q);
        printf("Consumed: %d\n", value);
        sleep(1); // Simulate some processing time
    }
    return NULL;
}

int main() {
    ParallelQueue q;
    initQueue(&q, 2);  // Initial capacity

    pthread_t producers[2], consumers[2];

    for (int i = 0; i < 2; i++) {
        pthread_create(&producers[i], NULL, producer, &q);
    }
    for (int i = 0; i < 2; i++) {
        pthread_create(&consumers[i], NULL, consumer, &q);
    }

    for (int i = 0; i < 2; i++) {
        pthread_join(producers[i], NULL);
    }
    for (int i = 0; i < 2; i++) {
        pthread_join(consumers[i], NULL);
    }

    free(q.items);
    return 0;
}