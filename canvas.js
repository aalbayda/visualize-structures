// Initialize canvas
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

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
        this.update = () => {
            if (this.direction == "right")
                this.x2 += 1;
            else if (this.direction == "left")
                this.x2 -= 1;
            else if (this.direction == "up")
                this.y2 += 1;
            else if (this.direction == "down")
                this.y2 -= 1;
            this.draw();
        }
        this.draw = () => {
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
            this.r += .7;
            this.draw();
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

// Head
const newHead = () => {
    c.font = "18px Helvetica";
    let head = new Node(150, 200);
    const animateHead = () => {
        requestAnimationFrame(animateHead);
        if (head.r <= 50) {
            head.update();
        }
        else {
            c.fillText("HEAD", 100, 130);
            c.beginPath();
            c.fillStyle = "#000000";
            c.arc(head.x, head.y, 5, 0, Math.PI*2, false);
            c.fill();         
        }
    }
    animateHead();
}

// Pointer
const newPointer = (x, y) => {
    let p = new Pointer(x, y, 250, 150, "right");
    const animatePointer = () => {
        requestAnimationFrame(animatePointer);
        if (p.x2 <= 250) {
            console.log(p.x2)
            p.update();
        }
        else { // Arrowheads
            c.beginPath();
            c.moveTo(p.x2, p.y2);
            c.lineTo(p.x2-5*Math.cos(45), p.y2+5*Math.sin(45));
            c.stroke();
            c.closePath();
            c.beginPath();
            c.moveTo(p.x2, p.y2);
            c.lineTo(p.x2-5*Math.cos(45), p.y2-5*Math.sin(45));
            c.stroke();
            c.closePath();
        }
    }
    animatePointer();
}

const setTitle = (structType) => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.font = "30px Helvetica";
    c.fillText(structType, canvas.width/2, 100);
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
            return this.items.length == 0;
        };
    }
}

const newStack = () => {
    let stack = new Stack();
    newHead();
    document.querySelector('textarea').innerHTML = `typedef struct Stack {
    int data;
    struct* next;
} STACK;

STACK* head = (STACK*)malloc(sizeof(STACK));
head->next = NULL;
    `;
}