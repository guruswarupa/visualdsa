#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    int priority;
    struct Node* next;
    struct Node* prev;
} Node;

typedef struct DoubleEndedPriorityQueue {
    Node* front;
    Node* rear;
    int size;
} DoubleEndedPriorityQueue;

void init(DoubleEndedPriorityQueue* depq) {
    depq->front = NULL;
    depq->rear = NULL;
    depq->size = 0;
}

int isEmpty(DoubleEndedPriorityQueue* depq) {
    return depq->size == 0;
}

void insertFront(DoubleEndedPriorityQueue* depq, int value, int priority) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->value = value;
    newNode->priority = priority;
    newNode->next = depq->front;
    newNode->prev = NULL;

    if (isEmpty(depq)) {
        depq->rear = newNode;
    } else {
        depq->front->prev = newNode;
    }
    depq->front = newNode;
    depq->size++;
    printf("Inserted %d with priority %d at the front\n", value, priority);
}

void insertRear(DoubleEndedPriorityQueue* depq, int value, int priority) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->value = value;
    newNode->priority = priority;
    newNode->next = NULL;
    newNode->prev = depq->rear;

    if (isEmpty(depq)) {
        depq->front = newNode;
    } else {
        depq->rear->next = newNode;
    }
    depq->rear = newNode;
    depq->size++;
    printf("Inserted %d with priority %d at the rear\n", value, priority);
}

int deleteFront(DoubleEndedPriorityQueue* depq) {
    if (isEmpty(depq)) {
        printf("Double-Ended Priority Queue is empty!\n");
        return -1;
    }
    Node* temp = depq->front;
    int item = temp->value;

    depq->front = depq->front->next;
    if (depq->front != NULL) {
        depq->front->prev = NULL;
    } else {
        depq->rear = NULL; // If the queue is now empty
    }
    free(temp);
    depq->size--;
    return item;
}

int deleteRear(DoubleEndedPriorityQueue* depq) {
    if (isEmpty(depq)) {
        printf("Double-Ended Priority Queue is empty!\n");
        return -1;
    }
    Node* temp = depq->rear;
    int item = temp->value;

    depq->rear = depq->rear->prev;
    if (depq->rear != NULL) {
        depq->rear->next = NULL;
    } else {
        depq->front = NULL; // If the queue is now empty
    }
    free(temp);
    depq->size--;
    return item;
}

int deleteHighestPriority(DoubleEndedPriorityQueue* depq) {
    if (isEmpty(depq)) {
        printf("Double-Ended Priority Queue is empty!\n");
        return -1;
    }
    
    Node* current = depq->front;
    Node* highest = current;

    // Find the node with the highest priority
    while (current != NULL) {
        if (current->priority > highest->priority) {
            highest = current;
        }
        current = current->next;
    }

    // Remove the highest priority node
    if (highest->prev != NULL) {
        highest->prev->next = highest->next;
    } else {
        depq->front = highest->next; // Move front if it's the first node
    }
    if (highest->next != NULL) {
        highest->next->prev = highest->prev;
    } else {
        depq->rear = highest->prev; // Move rear if it's the last node
    }
    int item = highest->value;
    free(highest);
    depq->size--;
    return item;
}

void display(DoubleEndedPriorityQueue* depq) {
    if (isEmpty(depq)) {
        printf("Double-Ended Priority Queue is empty.\n");
        return;
    }
    printf("Double-Ended Priority Queue elements:\n");
    Node* current = depq->front;
    while (current != NULL) {
        printf("Value: %d, Priority: %d\n", current->value, current->priority);
        current = current->next;
    }
}

int main() {
    DoubleEndedPriorityQueue depq;
    init(&depq);
    insertFront(&depq, 10, 1);
    insertRear(&depq, 20, 2);
    insertRear(&depq, 30, 3);
    insertFront(&depq, 5, 4);
    display(&depq);
    printf("Deleted from front: %d\n", deleteFront(&depq));
    printf("Deleted from rear: %d\n", deleteRear(&depq));
    printf("Deleted highest priority: %d\n", deleteHighestPriority(&depq));
    display(&depq);
    return 0;
}