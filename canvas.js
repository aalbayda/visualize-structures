// Initialize canvas
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-200;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

// Pointer class
class Pointer {
    constructor(x1, y1, x2, y2, direction) {
        this.direction = direction;
        this.x1 = x1;
        this.y1 = y1;
        if (this.direction == "right" || this.direction == "left") {
            this.x2 = this.x1;
        }
        else {
            this.x2 = x2;
        }
        if (this.direction == "up" || this.direction == "down") {
            
            this.y2 = this.y1;
        }
        else {
            this.y2 = y2;
        }
        console.log("Initial y2 is "+this.y2)
        this.update = () => {
            if (this.direction == "right")
                this.x2 += 3;
            else if (this.direction == "left")
                this.x2 -= 3;
            else if (this.direction == "up")
                this.y2 -= 3;
            else if (this.direction == "down")
                this.y2 += 3;
            this.draw();
        }
        this.draw = () => {
            console.log('drawing '+this)
            c.beginPath();
            c.moveTo(this.x1, this.y1);
            c.lineTo(this.x2, this.y2);
            c.stroke();
            c.closePath();
        }
    }
}

// Node class
class Node { // circular head node
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 0; // Radius
        this.update = () => {
            this.r += 1;
            this.draw();
        }
        this.moveUp = () => {
            this.y -=1;
        }
        this.moveDown = () => {
            this.y += 1;
        }
        this.moveLeft = () => {
            this.x -= 1;
        }
        this.moveRight = () => {
            this.x += 1;
        }
        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
            c.fillStyle = "#729454"
            c.shadowOffsetX = c.shadowOffsetY = 5;
            c.shadowBlur = 6;
            c.fill();
            c.stroke();
        }
    }
}

let head = new Node(canvas.width/2, 150); // Global head

// Head
const newHead = () => {
    const animateHead = () => {
        let id = requestAnimationFrame(animateHead);
        if (head.r <= 20) {
            head.update();
        }
        else {          
            c.beginPath();
            c.fillStyle = "#000000";
            c.arc(head.x, head.y, 5, 0, Math.PI*2, false);
            c.fill();
            document.getElementById('btn-push').disabled = false;  
            c.font = "16px Helvetica";
            c.fillText("Head (top)", head.x-100, head.y-20);
            cancelAnimationFrame(id);
        }
    }
    animateHead();
}

const setTitle = (structType) => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.font = "30px Helvetica, Arial, sans-serif";
    c.fillText(structType, canvas.width/2, 80);
}

// Stack class
class Stack {
    constructor() {
        this.elements = [];
        this.push = (e) => {
            this.elements.push(e);
        };
        this.pop = () => {
            if (this.elements.length == 0)
                return "Underflow";
            return this.elements.pop();
        };
        this.peek = () => {
            return this.elements[this.elements.length-1];
        };
        this.isEmpty = () => {
            return this.elements.length == 0;
        };
    }
}

let stack;
const newStack = () => {
    stack = new Stack();
    stack.push(head);
    c.clearRect(0, 0, canvas.width, canvas.height);
    setTitle("Stack");
    newHead();
    document.querySelector('textarea').innerHTML = `
typedef struct Node {
    int data;
    struct* next;
} NODE;

NODE* head = (NODE*)malloc(sizeof(NODE));
head = NULL;
    `;
}
const push = (e) => {
    let data = Math.round((Math.random()*100)+1);
    console.log(stack.isEmpty())
    let node, p;
    if (stack.isEmpty()) {
        node = new Node(head.x, head.y+100);
        document.getElementById('btn-push').disabled = false;

        document.querySelector('textarea').innerHTML = `
void push(NODE* head, int data) {
    NODE* newNode =  (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->next = head;
    head = newNode;
}
push(head, ${data});
`
    }
    else {
        node = new Node(stack.peek().x, stack.peek().y+100);

        document.querySelector('textarea').innerHTML = `
void push(NODE* head, int data) {
    NODE* newNode =  (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->next = head;
    head = newNode;
}
push(head, ${data});
`
    }
    const animatePointer = () => {
        let id = requestAnimationFrame(animatePointer);
        if (p.y2 <= node.y-15) {
            console.log(p.y2)
            p.update();
        }
        else {
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
            p = new Pointer(stack.peek().x, stack.peek().y, node.x, node.y-15, "down");

            animatePointer();

            // Label
            c.font = "16px Helvetica";
            c.fillText(`int data = ${data};`, node.x-130, node.y-20);
            cancelAnimationFrame(id);
            stack.push(node);
            document.getElementById('btn-push').disabled = false;
            if (stack.elements.length == 8)
                document.getElementById('btn-push').disabled = true;
        }
        
    }
    c.clearRect(stack.peek().x, stack.peek().y+50, canvas.width, canvas.height);
    c.clearRect(stack.peek().x, stack.peek().y+50, -canvas.width, canvas.height);
    animateNode();

    
}

const deleteNode = () => {
    let r = 1;
    const animate = () => {
        let id = requestAnimationFrame(animate);
        console.log(r)
        if (r <= 20) {
            document.getElementById('btn-pop').disabled = true;
            r += 0.5;
            c.beginPath();
            c.arc(stack.peek().x, stack.peek().y, r, 0, Math.PI*2, false);
            c.fillStyle = "#FF0000";
            c.fill();
        }
        else {
            // Erase
            cancelAnimationFrame(id);
            c.clearRect(stack.peek().x, stack.peek().y, canvas.width, canvas.height);
            c.clearRect(stack.peek().x, stack.peek().y, -canvas.width, canvas.height);
            c.clearRect(stack.peek().x, stack.peek().y, -canvas.width, -45);
            c.clearRect(stack.peek().x, stack.peek().y, canvas.width, -45);

            // New arrowheads
            let fromX = stack.peek().x, fromY = stack.peek().y;
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

            // "NULL"
            c.fillText("NULL", fromX-10, fromY-30);

            stack.pop();

            if (stack.elements.length > 1)
                document.getElementById('btn-pop').disabled = false;

            c.fillStyle = "#000"
        }
    }
    animate();
}

const pop = () => {
    deleteNode();
    document.querySelector('textarea').innerHTML = `
int pop(NODE** head) {
    STACK* temp = *head; 
    *head = (*head)->next; 
    int data = temp->data; 
    free(temp); 
    return data; 
} 
pop(&head);
`
    if (stack.elements.length < 8)
        document.getElementById('btn-push').disabled = false;
}

/* QUEUES */

// class Queue {
//     constructor() {
//         this.elements = [];
//         this.enqueue = (e) => {
//             this.elements.unshift(e);
//         };
//         this.dequeue = () => {
//             return this.elements.pop();
//         };
//         this.getFront = () => {
//             return this.elements[0];
//         };
//         this.isEmpty = () => {
//             return this.elements.length == 0;
//         };
//     }
// }

// const enqueue = (e) => {
//     let data = Math.round((Math.random()*100)+1);
//     console.log(queue.isEmpty())
//     let node, p;
//     if (queue.isEmpty()) {
//         node = new Node(head.x, head.y+100);
//         document.getElementById('btn-push').disabled = false;

//         document.querySelector('textarea').innerHTML = `
// void enqueue(NODE* tail, int data) {
//     NODE* newNode =  (NODE*)malloc(sizeof(NODE));
//     newNode->data = data;
//     tail->next = newNode;
//     tail = newNode;
// }
// enqueue(tail, ${data});
// `
//     }
//     else {
//         node = new Node(stack.peek().x, stack.peek().y+100);

//         document.querySelector('textarea').innerHTML = `
// void push(NODE* head, int data) {
//     NODE* newNode =  (NODE*)malloc(sizeof(NODE));
//     newNode->data = data;
//     newNode->next = head;
//     head = newNode;
// }
// push(head, ${data});
// `
//     }
//     const animatePointer = () => {
//         let id = requestAnimationFrame(animatePointer);
//         if (p.y2 <= node.y-15) {
//             console.log(p.y2)
//             p.update();
//         }
//         else {
//             c.beginPath();
//             c.moveTo(p.x2, p.y2);
//             c.lineTo(p.x2+5*Math.cos(45), p.y2-5*Math.sin(45)); // Right arrowhead
//             c.stroke();
//             c.closePath();
//             c.beginPath();
//             c.moveTo(p.x2, p.y2);
//             c.lineTo(p.x2-5*Math.cos(45), p.y2-5*Math.sin(45)); // Left arrowhead
//             c.stroke();
//             c.closePath();

//             // Enable pop
//             document.getElementById('btn-pop').disabled = false;
//             cancelAnimationFrame(id);
//         }
//     }

//     const animateNode = () => {
//         let id = requestAnimationFrame(animateNode);
//         if (node.r <= 20) {
//             node.update();
//             document.getElementById('btn-push').disabled = true;
//         }
//         else {
//             c.beginPath();
//             c.fillStyle = "#000000";
//             c.arc(node.x, node.y, 5, 0, Math.PI*2, false);
//             c.fill();
//             // Pointer to NULL
//             c.beginPath();
//             c.fillStyle = "#000000";
//             c.arc(node.x, node.y, 5, 0, Math.PI*2, false);
//             c.fill();

//             // Pointer to arrow
//             p = new Pointer(stack.peek().x, stack.peek().y, node.x, node.y-15, "down");

//             animatePointer();

//             // Label
//             c.font = "16px Helvetica";
//             c.fillText(`int data = ${data};`, node.x-130, node.y-20);
//             cancelAnimationFrame(id);
//             stack.push(node);
//             document.getElementById('btn-push').disabled = false;
//             if (stack.elements.length == 8)
//                 document.getElementById('btn-push').disabled = true;
//         }
        
//     }
//     c.clearRect(stack.peek().x, stack.peek().y+50, canvas.width, canvas.height);
//     c.clearRect(stack.peek().x, stack.peek().y+50, -canvas.width, canvas.height);
//     animateNode();

    
// }

// const deleteNode = () => {
//     let r = 1;
//     const animate = () => {
//         let id = requestAnimationFrame(animate);
//         console.log(r)
//         if (r <= 20) {
//             document.getElementById('btn-pop').disabled = true;
//             r += 0.5;
//             c.beginPath();
//             c.arc(stack.peek().x, stack.peek().y, r, 0, Math.PI*2, false);
//             c.fillStyle = "#FF0000";
//             c.fill();
//         }
//         else {
//             // Erase
//             cancelAnimationFrame(id);
//             c.clearRect(stack.peek().x, stack.peek().y, canvas.width, canvas.height);
//             c.clearRect(stack.peek().x, stack.peek().y, -canvas.width, canvas.height);
//             c.clearRect(stack.peek().x, stack.peek().y, -canvas.width, -45);
//             c.clearRect(stack.peek().x, stack.peek().y, canvas.width, -45);

//             // New arrowheads
//             let fromX = stack.peek().x, fromY = stack.peek().y;
//             c.beginPath();
//             c.moveTo(fromX, fromY-45);
//             c.lineTo(fromX+5*Math.cos(45), (fromY-45)-5*Math.sin(45)); // Right arrowhead
//             c.stroke();
//             c.closePath();
//             c.beginPath();
//             c.moveTo(fromX, fromY-45);
//             c.lineTo(fromX-5*Math.cos(45), (fromY-45)-5*Math.sin(45)); // Left arrowhead
//             c.stroke();
//             c.closePath();

//             // "NULL"
//             c.fillText("NULL", fromX-10, fromY-30);

//             stack.pop();

//             if (stack.elements.length > 1)
//                 document.getElementById('btn-pop').disabled = false;

//             c.fillStyle = "#000"
//         }
//     }
//     animate();
// }
