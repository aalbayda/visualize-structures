// Initialize canvas
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth-200;
canvas.height = window.innerHeight;
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
            c.fill();
            c.stroke();
        }
    }
}

/* GLOBAL */
// Head and tail
let head, tail;

// New node + animation
const newNode = (x, y) => {
    let node = new Node(x, y);
    node.r = 0;
    const animateNode = () => {
        let id = requestAnimationFrame(animateNode);
        if (node.r <= 20) { // Animation loop
            disablePush(true);
            disablePop(true);
            node.update();
        }
        else {  
            cancelAnimationFrame(id);

            // Draw pointer in the middle        
            c.beginPath();
            c.fillStyle = "#000000";
            c.arc(node.x, node.y, 5, 0, Math.PI*2, false);
            c.fill();
        }
    }
    animateNode();
    console.log(node)
    return node;
}

// New pointer + animation + arrowhead
const newArrowhead = (p, direction) => {
    c.fillStyle = "#000"
    let x, y;
    // Right arrowhead
    if (direction == "left") { // QI
        x = y = 5;
    }
    else if (direction == "right") { // QIII
        x = y = -5;
    }
    else if (direction == "down") { // QII
        x = -5; y = 5;
    }
    else if (direction == "up") { // QIV
        x = 5; y = -5;
    }
    c.beginPath();
    c.moveTo(p.x2, p.y2);
    c.lineTo(p.x2+x*Math.cos(45), p.y2+y*Math.sin(45)); 
    c.stroke();
    c.closePath();
    // Left arrowhead
    if (direction == "left") { // QIV
        x = 5; y = -5;
    }
    else if (direction == "right") { // QII
        x = -5; y = 5;
    }
    else if (direction == "down") { // QI
        x = y = 5;
    }
    else if (direction == "up") { // QIII
        x = y = -5;
    }
    c.beginPath();
    c.moveTo(p.x2, p.y2);
    c.lineTo(p.x2+x*Math.cos(45), p.y2+y*Math.sin(45)); 
    c.stroke();
    c.closePath();
}
const newPointer = (x1, y1, x2, y2, direction) => {
    let p = new Pointer(x1, y1, x2, y2, direction);
    const animatePointer = () => {
        let id = requestAnimationFrame(animatePointer);
        if (direction == "left" || direction == "right") {
            let length = (direction=="left"?-31:31);
            if (p.x2+length >= x2) {
                p.update();
            }
            else {
                newArrowhead(p, direction);
                cancelAnimationFrame(id);
            }
        }
        else {
            let length = (direction=="down"?-31:31);
            if (p.y2+length >= x2) {
                p.update();
            }
            else {
                newArrowhead(p, direction);
                cancelAnimationFrame(id);
            }
        }
    }
    animatePointer();
}


// ADT title
const setTitle = (structType) => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.font = "30px Helvetica, Arial, sans-serif";
    c.fillText(structType, canvas.width/2, 80);
} 
setTitle("Stack");

// const popNode = () => {
//     let r = 1;
//     const animate = () => {
//         let id = requestAnimationFrame(animate);
//         console.log(r)
//         if (r <= 20) {
//             document.getElementById('btn-pop').disabled = true;
//             r += 0.9;
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

//             if (stack.elements.length > 0)
//                 document.getElementById('btn-pop').disabled = false;

//             c.fillStyle = "#000"
//         }
//     }
//     animate();
// }