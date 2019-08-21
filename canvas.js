// Initialize canvas
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-200;
let c = canvas.getContext('2d');

/* CLASSES */
// Pointer
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
                this.x2 += 10;
            else if (this.direction == "left")
                this.x2 -= 10;
            else if (this.direction == "up")
                this.y2 -= 10;
            else if (this.direction == "down")
                this.y2 += 10;
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

// Node
class Node { // circular head node
    constructor(x, y, data) {
        this.x = x;
        this.y = y;
        this.data = data;
        this.r = 0; // Radius
        this.update = () => {
            this.r += 5;
            this.draw();
        }
        this.moveUp = () => {
            this.y -=5;
            this.draw();
        }
        this.moveDown = () => {
            this.y += 5;
            this.draw();
        }
        this.moveLeft = () => {
            this.x -= 5;
            this.draw();
        }
        this.moveRight = () => {
            this.x += 5;
            this.draw();
        }
        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
            c.fillStyle = "#729454"
            c.fill();
            c.stroke();
            c.closePath();

            // Draw pointer in the middle        
            c.beginPath();
            c.arc(this.x, this.y, 5, 0, Math.PI*2, false);
            c.fillStyle = "#000";
            c.fill();
        }
    }
}

/* GLOBAL */
// Head and tail
let head, tail;

// New node + animation
const newNode = (x, y, data) => {
    let node = new Node(x, y, data);
    node.r = 0;
    const animateNode = () => {
        let id = requestAnimationFrame(animateNode);
        if (node.r < 20) { // Animation loop
            disablePush(true);
            disablePop(true);
            node.update();
        }
        else {  
            cancelAnimationFrame(id);
        }
    }
    animateNode();
    console.log(node)
    return node;
}

// New pointer + animation + arrowhead
const newArrowhead = (p, direction) => {
    c.strokeStyle = "#000"
    // Right arrowhead
    c.beginPath();
    c.moveTo(p.x2, p.y2);
    if (direction == "left")
        c.lineTo(p.x2+5*Math.cos(45), p.y2+5*Math.sin(45)); 
    else if (direction == "right")
        c.lineTo(p.x2-5*Math.cos(45), p.y2-5*Math.sin(45)); 
    else if (direction == "down")
        c.lineTo(p.x2+5*Math.cos(45), p.y2-5*Math.sin(45)); 
    else if (direction == "up")
        c.lineTo(p.x2-5*Math.cos(45), p.y2+5*Math.sin(45));   
    c.stroke();
    c.closePath();

    // Left arrowhead
    c.beginPath();
    c.moveTo(p.x2, p.y2);
    if (direction == "left")
        c.lineTo(p.x2+5*Math.cos(45), p.y2-5*Math.sin(45)); 
    else if (direction == "right")
        c.lineTo(p.x2-5*Math.cos(45), p.y2+5*Math.sin(45)); 
    else if (direction == "down")
        c.lineTo(p.x2-5*Math.cos(45), p.y2-5*Math.sin(45)); 
    else if (direction == "up")
        c.lineTo(p.x2+5*Math.cos(45), p.y2+5*Math.sin(45));   
        c.stroke();
    c.closePath();
}
const newPointer = (x1, y1, x2, y2, direction) => {
    let p = new Pointer(x1, y1, x2, y2, direction);
    const animatePointer = () => {
        let id = requestAnimationFrame(animatePointer);
        if (direction == "left" || direction == "right") {
            let length = (direction=="left"?-31:31);
            if (direction == "left" && p.x2+length >= x2)
                p.update();
            else if (direction == "right" && p.x2+length <= x2)
                p.update();
            else {
                cancelAnimationFrame(id);
                newArrowhead(p, direction);  
            }
        }
        else if (direction == "up" || direction == "down") {
            let length = (direction=="down"?31:-31);
            if (direction == "down" && p.y2+length <= y2)
                p.update();
            else if (direction == "up" && p.y2+length >= y2)
                p.update();
            else {
                cancelAnimationFrame(id);
                newArrowhead(p, direction);
            }
        }
    }
    animatePointer();
}

// Move node
const moveNode = (node, direction) => {
    let x = node.x;
    let y = node.y;
    console.log(direction)
    const animateNode = () => {
        let id = requestAnimationFrame(animateNode);
        if (direction == "left") {
            if (node.x > x-100) {
                c.clearRect(node.x, node.y, canvas.width, canvas.height);
                c.clearRect(node.x, node.y, -canvas.width, canvas.height);
                c.clearRect(node.x, node.y, canvas.width, -30);
                c.clearRect(node.x, node.y, -canvas.width, -30);
                node.moveLeft();
            }
            else {
                cancelAnimationFrame(id);
            }
        }
        else if (direction == "right") {
            if (node.x < x + 100) {
                c.clearRect(node.x, node.y, 30, canvas.height);
                c.clearRect(node.x, node.y, -30, canvas.height);
                c.clearRect(node.x, node.y, 30, -30);
                c.clearRect(node.x, node.y, -30, -30);
                node.moveRight();
            }
            else {
                cancelAnimationFrame(id);
            }
        }
        else if (direction == "down") {
            if (node.y < y + 100) {
                c.clearRect(node.x, node.y, 30, canvas.height);
                c.clearRect(node.x, node.y, -30, canvas.height);
                c.clearRect(node.x, node.y, 30, -30);
                c.clearRect(node.x, node.y, -30, -30);
                node.moveDown();
            }
            else {
                cancelAnimationFrame(id);
            }
        }
        else if (direction == "up") {
            if (node.y > y - 100) {
                c.clearRect(node.x, node.y, 30, canvas.height);
                c.clearRect(node.x, node.y, -30, canvas.height);
                c.clearRect(node.x, node.y, 30, -30);
                c.clearRect(node.x, node.y, -30, -30);
                node.moveUp();
            }
            else {
                cancelAnimationFrame(id);
            }
        }
    }
    animateNode();
}


// Animation for node about to be removed
const animateDelete = (node) => {
    let r = 0;
    const animate = () => {
        let id = requestAnimationFrame(animate);
        if (r <= node.r) {
            r += 1;
            c.beginPath();
            c.fillStyle = "#FF0000";
            c.arc(node.x, node.y, r, 0, 2*Math.PI, false);
            c.fill();
        }
        else cancelAnimationFrame(id);
    }
    animate();
}


// ADT title
const setTitle = (structType) => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.font = "30px Helvetica, Arial, sans-serif";
    c.fillStyle = "#000"
    c.fillText(structType, 100, 60);
    c.font = "18px Helvetica"
} 
setTitle("Stack");

const label = (node, data) => {
    // Label
    c.font = "16px Helvetica";
    c.fillStyle = "#000";
    c.fillText(`int data = ${data};`, node.x-30, node.y-40); 
}

const label2 = (node, data) => {
    // Label
    c.font = "16px Helvetica";
    c.fillStyle = "#000";
    c.fillText(`int data = ${data};`, node.x+40, node.y);
}
