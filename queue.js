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
    }, 500)
}

const enqueue = (e) => {
    // Initialize
    let data = Math.round((Math.random()*100)+1); // Random data inside new node
    let node, p, pTail; // Node, pointer from previous node, and pointer from tail
    textEnqueue(data); // Update code snippet
    
    // New node
    if (queue.isEmpty()) {
        node = newNode(head.x-100, head.y, data); // If queue is empty, start from head
    }
    else {
        node = newNode(queue.getRear().x-100, queue.getRear().y, data); // If queue is not empty, start from tail
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
    setTimeout(()=>{
        if (node.x-100 > 0) disablePush(false);
        disablePop(false);
    }, 600);

    // Label
    c.font = "14px Helvetica";
    c.fillStyle = "#000";
    c.fillText(`int data = ${data};`, node.x-30, node.y-40); 

    // Enqueue in our actual (backend) queue
    queue.enqueue(node);
}

const dequeue = () => {
    if (queue.elements.length == 1) {
        animateDelete(queue.getRear());
        setTimeout(() => {
            c.clearRect(0, 0, head.x+20, canvas.height);
            setTitle("Queue");
            head.draw();
            tail.draw();
        }, 400);
        queue.dequeue();
    }
    else {
        animateDelete(queue.getFront());
        setTimeout(() => {
            c.clearRect(0, 0, canvas.width, canvas.height);
            setTitle("Queue");
            head.draw();
            tail.draw();
            queue.dequeue();
            for (let i = 0; i < queue.elements.length; i++) {
                queue.elements[i].draw();
                moveNode(queue.elements[i], "right");
            }
        }, 400);
    }

    setTimeout(() => {    
        // Move tail right
        moveNode(tail, "right");

        setTimeout(() => {
             // Re-do label
            c.fillStyle = "#000"
            c.font = "16px Helvetica";
            c.fillText("Head (front)", head.x+30, head.y-20);
            c.font = "16px Helvetica";
            c.fillText("Tail (rear)", tail.x-100, tail.y-20);
            
        }, 500)

    }, 500);

    
}