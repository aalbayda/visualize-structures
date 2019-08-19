/* QUEUES */
// Constructor
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
            return this.elements[this.elements.length-1];
        };
        this.getRear = () => {
            return this.elements[0];
        }
        this.isEmpty = () => {
            return this.elements.length == 0; 
        };
    }
}

// New queue
let queue;
const newQueue = () => {
    // New queue
    queue = new Queue();
    // Restart canvas
    c.clearRect(0, 0, canvas.width, canvas.height);
    setTitle("Queue");
    // Create head and tail nodes
    head = newNode(canvas.width-200, 200);
    tail = newNode(head.x, head.y+100);
    // Label
    c.fillStyle = "#000"
    c.font = "16px Helvetica";
    c.fillText("Head (front)", head.x+30, head.y-20);
    c.font = "16px Helvetica";
    c.fillText("Tail (rear)", tail.x-100, tail.y-20);
    // Update code snippet
    textNewQueue();
    // Re-enable push
    setTimeout(()=>{
        disablePush(false);
        disablePop(false);
    }, 500)
}

const enqueue = (e) => {
    // Initialize
    let data = Math.round((Math.random()*100)+1); // Random data inside new node
    let node, p, pTail; // Node, pointer from previous node, and pointer from tail
    textEnqueue(data); // Update code snippet
    
    // New node
    if (queue.isEmpty()) {
        node = newNode(head.x-100, head.y); // If queue is empty, start from head
    }
    else {
        node = newNode(queue.getRear().x-100, queue.getRear().y); // If queue is not empty, start from tail
    }
    
    // New pointer from previous node
    let prev = queue.isEmpty()?head:queue.getRear();
    setTimeout(() => {
        p = newPointer(prev.x, prev.y, node.x, node.y, "left");     
    }, 500);

    // New pointer from tail
    setTimeout(() => {
        if (!queue.isEmpty()) {
            c.clearRect(tail.x, tail.y, canvas.width, canvas.height);
            c.clearRect(tail.x, tail.y, -canvas.width, canvas.height);
            c.clearRect(tail.x, tail.y, canvas.width, -70);
            c.clearRect(tail.x, tail.y, -canvas.width, -70);
            moveNode(tail, "left");
            c.font = "16px Helvetica";
            c.fillStyle = "#000"
            // New text and new pointer
            setTimeout(() => {
                c.fillText("Tail (rear)", tail.x+40, tail.y);  
                pTail = newPointer(tail.x, tail.y, node.x, node.y, "up");
            }, 500)
        }
    }, 550)

    // Re-enable push
    setTimeout(()=>{if (node.x-100 > 0) disablePush(false)}, 600);

    // Label
    c.font = "14px Helvetica";
    c.fillStyle = "#000";
    c.fillText(`int data = ${data};`, node.x-30, node.y-40); 

    // Enqueue in our actual (backend) queue
    queue.enqueue(node);
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