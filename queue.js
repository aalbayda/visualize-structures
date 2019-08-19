/* QUEUES */
class Queue {
    constructor() {
        this.elements = [];
        this.enqueue = (e) => {
            this.elements.unshift(e);
        };
        this.dequeue = () => {
            return this.elements.pop();
        };
        this.getFront = () => {
            return this.elements[0];
        };
        this.getRear = () => {
            return this.elements[this.elements.length-1];
        }
        this.isEmpty = () => {
            return this.elements.length == 1;
        };
    }
}

// Tail
let tail = new Node(200, canvas.height/2)
const newTail = () => {
    tail.r = 0;
    const animateHead = () => {
        let id = requestAnimationFrame(animateHead);
        if (tail.r <= 20) {
            tail.update();
        }
        else {          
            c.beginPath();
            c.fillStyle = "#000000";
            c.arc(tail.x, tail.y, 5, 0, Math.PI*2, false);
            c.fill();
            document.getElementById('btn-push').disabled = false;  
            c.font = "16px Helvetica";
            c.fillText("Tail (rear)", tail.x-100, tail.y-20);
            cancelAnimationFrame(id);
        }
    }
    animateHead();
}

let queue;
const newQueue = () => {
    queue = new Queue();
    queue.enqueue(head);
    c.clearRect(0, 0, canvas.width, canvas.height);
    setTitle("Queue");
    newHead(canvas.width-200, canvas.height/2);
    newTail(); 
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

const enqueue = (e) => {
    let data = Math.round((Math.random()*100)+1);
    let node, p;
    console.log(queue.isEmpty())
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
    if (queue.isEmpty()) {
        node = new Node(head.x-100, head.y);
        document.getElementById('btn-push').disabled = false;
    }
    else {
        node = new Node(queue.getFront().x-100, queue.getFront().y);
    }
    const animatePointer = () => {
        let id = requestAnimationFrame(animatePointer);
        if (p.x2-15 > node.x) {
            console.log(p.x2)
            p.update();
        }
        else {
            c.beginPath();
            c.moveTo(p.x2, p.y2);
            c.lineTo(p.x2+5*Math.cos(45), p.y2+5*Math.sin(45)); // Right arrowhead
            c.stroke();
            c.closePath();
            c.beginPath();
            c.moveTo(p.x2, p.y2);
            c.lineTo(p.x2+5*Math.cos(45), p.y2-5*Math.sin(45)); // Left arrowhead
            c.stroke();
            c.closePath();

            // Enable pop
            document.getElementById('btn-pop').disabled = false;
            cancelAnimationFrame(id);
        }
    }
    let prev = (!queue.isEmpty()?queue.getFront():head);
    const animateNode = () => {
        let id = requestAnimationFrame(animateNode);
        if (node.r <= 20) {
            node.update();
            document.getElementById('btn-push').disabled = true;
        }
        else {
            c.beginPath();
            c.fillStyle = "#000000";
            c.arc(node.x, node.y, 5, 0, Math.PI*2, false);
            c.fill();
            // Pointer to NULL
            c.beginPath();
            c.fillStyle = "#000000";
            c.arc(node.x, node.y, 5, 0, Math.PI*2, false);
            c.fill();

            // Pointer to arrow
            p = new Pointer(prev.x, prev.y, node.x-15, node.y, "left");
            

            animatePointer();

            // Label
            c.font = "14px Helvetica";
            c.fillText(`int data = ${data};`, node.x-30, node.y-40);
            cancelAnimationFrame(id);
            queue.enqueue(node);
            document.getElementById('btn-push').disabled = false;
            if (queue.elements.length == 9)
                document.getElementById('btn-push').disabled = true;
        }
        
    }
    c.clearRect(prev.x, prev.y+50, canvas.width, canvas.height);
    c.clearRect(prev.x, prev.y+50, -canvas.width, canvas.height);
    
    animateNode();
}
const dequeueNode = () => {
    let r = 1;
    let prev = (queue.isEmpty()?head:queue.getFront());
    const animate = () => {
        let id = requestAnimationFrame(animate);
        console.log(r)
        if (r <= 20) {
            document.getElementById('btn-pop').disabled = true;
            r += 0.9;
            c.beginPath();
            c.arc(prev.x, prev.y, r, 0, Math.PI*2, false);
            c.fillStyle = "#FF0000";
            c.fill();
        }
        else {
            // Erase
            cancelAnimationFrame(id);
            console.log(prev.y==head.y)
            c.clearRect(prev.x, prev.y, canvas.width, canvas.height);
            c.clearRect(prev.x, prev.y, -canvas.width, canvas.height);
            c.clearRect(prev.x, prev.y, -canvas.width, -45);
            c.clearRect(prev.x, prev.y, canvas.width, -45);

            // Arrowhead from head
            let fromX = prev.x, fromY = prev.y;
            c.beginPath();
            c.moveTo(fromX, fromY-45);
            c.lineTo(fromX+5*Math.cos(45), (fromY-45)-5*Math.sin(45)); // Right arrowhead
            c.stroke();
            c.closePath();
            c.beginPath();
            c.moveTo(fromX, fromY-45);
            c.lineTo(fromX-5*Math.cos(45), (fromY-45)-5*Math.sin(45)); // Left arrowhead
            c.stroke();
            c.closePath();

            
            // Arrowhead from tail
            // c.beginPath();
            // c.moveTo(tail.x+45, tail.y);
            // c.lineTo((tail.x+45)-5*Math.cos(45), tail.y-5*Math.sin(45)); // Right arrowhead
            // c.stroke();
            // c.closePath();
            // c.beginPath();
            // c.moveTo(tail.x+45, tail.y-45);
            // c.lineTo((tail.x+45)-5*Math.cos(45), tail.y+5*Math.sin(45)); // Left arrowhead
            // c.stroke();
            // c.closePath();

            // "NULL"
            c.fillText("NULL", fromX-10, fromY-30);

            newTail();
            queue.dequeue();

            if (!queue.isEmpty())
                document.getElementById('btn-pop').disabled = false;

            c.fillStyle = "#000"
        }
    }
    animate();
}

const dequeue = () => {
    dequeueNode();
    document.querySelector('textarea').innerHTML = 
`int dequeue(NODE** head) {
    STACK* temp = *head; 
    *head = (*head)->next; 
    int data = temp->data; 
    free(temp); 
    return data; 
} 
pop(&head);
`
    if (queue.isEmpty())
        document.getElementById('btn-push').disabled = false;
}