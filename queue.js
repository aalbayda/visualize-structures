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
let tail = new Node(head.x-100, head.y+100)
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
    newHead();
    newTail();
    document.querySelector('textarea').innerHTML = 
`typedef struct Node {
    int data;
    struct* next;
} NODE;

NODE* head = (NODE*)malloc(sizeof(NODE));
NODE* tail = (NODE*)malloc(sizeof(NODE));
head = tail = NULL;
    `;
}

const enqueue = (e) => {
    let prev = queue.isEmpty()?head:queue.getFront();
    let data = Math.round((Math.random()*100)+1);
    let node, p, p1;
    console.log(queue.isEmpty())
    if (queue.isEmpty()) {
        node = new Node(head.x, head.y+100);
        document.getElementById('btn-push').disabled = false;
        document.querySelector('textarea').innerHTML = `
void enqueue(NODE* head, int data) {
    NODE* newNode =  (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    head = tail = newNode;
}
enqueue(head, ${data});
`
    }
    else {
        //node = new Node(queue.getFront().x, queue.getFront().y+100);
//         document.querySelector('textarea').innerHTML = `
// void push(NODE* head, int data) {
//     NODE* newNode =  (NODE*)malloc(sizeof(NODE));
//     newNode->data = data;
//     newNode->next = head;
//     head = newNode;
// }
// push(head, ${data});
// `
    }
    const animatePointer = () => {
        let id = requestAnimationFrame(animatePointer);
        if (p.y2 <= node.y-15) {
            console.log(p.y2)
            p.update();
            p1.update();
        }
        else {
            // Arrowheads from head pointer
            c.beginPath();
            c.moveTo(p.x2, p.y2);
            c.lineTo(p.x2+5*Math.cos(45), p.y2-5*Math.sin(45)); // Right arrowhead
            c.stroke();
            c.closePath();
            c.beginPath();
            c.moveTo(p.x2, p.y2);
            c.lineTo(p.x2-5*Math.cos(45), p.y2-5*Math.sin(45)); // Left arrowhead
            c.stroke();
            c.closePath();

            // Arrowheads from tail pointer
            c.beginPath();
            c.moveTo(p1.x2, p1.y2);
            c.lineTo(p1.x2-5*Math.cos(45), p1.y2-5*Math.sin(45)); // Right arrowhead
            c.stroke();
            c.closePath();
            c.beginPath();
            c.moveTo(p1.x2, p1.y2);
            c.lineTo(p1.x2-5*Math.cos(45), p1.y2+5*Math.sin(45)); // Left arrowhead
            c.stroke();
            c.closePath();

            // Enable pop
            document.getElementById('btn-pop').disabled = false;
            cancelAnimationFrame(id);
        }
    }

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
            p = new Pointer(queue.getFront().x, queue.getFront().y, node.x, node.y-15, "down"); // Pointer from head
            p1 = new Pointer(tail.x, tail.y, node.x-15, node.y, "right"); // Pointer from tail
            animatePointer();

            // Label
            c.font = "16px Helvetica";
            c.fillText(`int data = ${data};`, node.x+30, node.y-20);
            cancelAnimationFrame(id);
            queue.enqueue(node);
            document.getElementById('btn-push').disabled = false;
            if (queue.elements.length == 8)
                document.getElementById('btn-push').disabled = true;
        }
        
    }
    c.clearRect(head.x, head.y+50, canvas.width, canvas.height);
    c.clearRect(head.x, head.y+50, -canvas.width, canvas.height);
    newTail()
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