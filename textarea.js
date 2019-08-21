// Stack code snippets
const textNewStack = () => {
document.querySelector('textarea').innerHTML = 
`typedef struct Node {
    int data;
    struct* next;
} NODE;

typedef struct Stack {
    NODE* head;
    int length;
} STACK;

STACK* stack = (STACK*)malloc(sizeof(STACK));
stack->head = NULL;
stack->length = 0;
}`;
}

const textPop = () => {
    document.querySelector('textarea').innerHTML = 
`int pop(STACK* stack) {
    if (stack->length == 1) {
        int data = stack->head->data;
        free(stack->head);
        stack->head = NULL;
        return data;
    }
    NODE* temp = stack->head;
    stack->head = stack->head->next;
    int data = temp->data;
    free(temp);
    return data;
}
pop(stack);`;
}

const textPush = (data) => {
    document.querySelector('textarea').innerHTML = 
`void push(STACK* stack, int data) {
    NODE* newNode =  (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->next = stack->head->next;
    stack->head = newNode;
}
push(queue, ${data});`;
}

// Queue code snippets
const textNewQueue = () => {
document.querySelector('textarea').innerHTML = 
`typedef struct Node {
    int data;
    struct Node* next;
} NODE;

typedef struct Queue {
    NODE* head, tail;
    int length;
} QUEUE;

QUEUE* queue = (QUEUE*)malloc(sizeof(QUEUE));
queue->head = queue->tail = NULL;
queue->length = 0;
`;
}

const textEnqueue = (data) => {
    document.querySelector('textarea').innerHTML = 
`void enqueue(QUEUE* queue, int data) {
    NODE* newNode =  (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->next = NULL;
    queue->tail->next = newNode;
    queue->tail = newNode;
}
enqueue(queue, ${data});`;
}

const textDequeueEmpty = () => {
    document.querySelector('textarea').innerHTML = 
`void dequeue(QUEUE* queue) {
    free(head);
}
dequeue(queue);`;
}

const textDequeue = () => {
    document.querySelector('textarea').innerHTML = 
`void dequeue(QUEUE* queue) {
    if (queue->length == 1) {
        free(queue->head);
        return;
    }
    NODE* temp = queue->head;
    queue->head = queue->head->next;
    free(temp);
}
dequeue(queue);`;
}