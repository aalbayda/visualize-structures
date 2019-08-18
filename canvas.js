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
            c.fillStyle = "#EEE"
            c.fill();
            c.stroke();
        }
    }
}

let head = new Node(canvas.width/2, 200); // Global head

// Head
const newHead = () => {
    const animateHead = () => {
        requestAnimationFrame(animateHead);
        if (head.r <= 20) {
            head.update();
        }
        else {          
            c.beginPath();
            c.fillStyle = "#000000";
            c.arc(head.x, head.y, 5, 0, Math.PI*2, false);
            c.fill();
            document.getElementById('btn-push').disabled = false;         
        }
        // c.font = "12px Helvetica";
        // c.fillText("Head", head.x-100, head.y-50);
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
            return this.elements.pop;
        };
        this.peek = () => {
            return this.elements[this.elements.length-1];
        };
        this.isEmpty = () => {
            return this.elements.length == 0;
        };
    }
}

let stack = new Stack();

const newStack = () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    setTitle("Stack");
    newHead();
    document.querySelector('textarea').innerHTML = `
typedef struct Node {
    int data;
    struct* next;
} NODE;

NODE* head = (NODE*)malloc(sizeof(NODE));
head->next = NULL;
    `;
}
const push = (e) => {
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
push(head, 5);
`
    }
    else {
        stack.peek()
    }
    const animatePointer = () => {
        requestAnimationFrame(animatePointer);
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
            return;
        }
    }
    const animateNode = () => {
        requestAnimationFrame(animateNode);
        if (node.r <= 20) {
            node.update();
        }
        else {
            c.beginPath();
            c.fillStyle = "#000000";
            c.arc(head.x, head.y, 5, 0, Math.PI*2, false);
            c.fill();
            // Pointer to NULL
            c.beginPath();
            c.fillStyle = "#000000";
            c.arc(node.x, node.y, 5, 0, Math.PI*2, false);
            c.fill();

            // Pointer to arrow
            p = new Pointer(head.x, head.y, node.x, node.y-15, "down");
            animatePointer();
            
            // Disable pop
            document.getElementById('btn-pop').disabled = false;
        }
        // c.font = "12px Arial";
        // c.fillText(`int data = ${e};`, node.x-100, node.y-50);
        stack.push(node);
    }
    animateNode();

    
}

const pop = () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
}