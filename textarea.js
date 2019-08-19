const textNewQueue = () => {
document.querySelector('textarea').innerHTML = 
`typedef struct Node {
    int data;
    struct Node* next;
} NODE;

typedef struct Queue {
    NODE* head, tail;
    int length, maxlength;
} QUEUE;

QUEUE* queue = (QUEUE*)malloc(sizeof(QUEUE));
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
    
    enqueue(queue, ${data});
    `;
}