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
            c.fill();
            c.stroke();
        }
    }
}

let head = new Node(canvas.width/2, 150); // Global head

// Head
const newHead = () => {
    head.r = 0;
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

const popNode = () => {
    let r = 1;
    const animate = () => {
        let id = requestAnimationFrame(animate);
        console.log(r)
        if (r <= 20) {
            document.getElementById('btn-pop').disabled = true;
            r += 0.9;
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

            if (stack.elements.length > 0)
                document.getElementById('btn-pop').disabled = false;

            c.fillStyle = "#000"
        }
    }
    animate();
}