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
        this.getRear = () => {
            return this.elements[0];
        };
        this.getFront = () => {
            return this.elements[this.elements.length-1];
        }
        this.isEmpty = () => {
            return this.elements.length == 0; 
        };
    }
}

// New queue
let queue;
const newQueue = () => {
    // Update code snippet
    textNewQueue();
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
    // Re-enable push
    setTimeout(()=>{
        disablePush(false);
    }, 600)
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
                c.fillText("Tail (rear)", tail.x-30, tail.y+40);  
                pTail = newPointer(tail.x, tail.y, node.x, node.y, "up");
            }, 551)
        }
    }, 550)

    // Re-enable push
    setTimeout(()=>{
        if (node.x-100 > 0) disablePush(false);
        disablePop(false);
    }, 800);

    label(node,data);

    // Enqueue in our actual javascript queue
    queue.enqueue(node);
}

const dequeue = () => {
    disablePop(true);
    textDequeue();
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
        // Temp node to track head
        let temp = newNode(queue.getFront().x, queue.getFront().y+100);
        let pTemp = newPointer(temp.x, temp.y, queue.getFront().x, queue.getFront().y, "up");
        c.fillStyle = "#000"
        c.font = "16px Helvetica";
        c.fillText("temp", temp.x, temp.y+40);

        setTimeout(() => {
            animateDelete(temp);
            animateDelete(queue.getFront());
            setTimeout(() => {
                c.clearRect(0, 0, canvas.width, canvas.height);
                setTitle("Queue");
                head.draw();
                tail.draw();
                queue.dequeue();
                for (let i = queue.elements.length-1; i >= 0; i--) {
                    let node = queue.elements[i];
                    node.draw();
                    moveNode(node, "right");

                    // Re-draw pointers
                    let prev = (i==queue.elements.length-1)?head:queue.elements[i+1];
                    setTimeout(() => {
                        label(node, node.data); //Re-label
                        p = newPointer(prev.x, prev.y, node.x, node.y, "left");     
                    }, 500);
                }

                moveNode(tail, "right");
                setTimeout(() => {
                    p = newPointer(tail.x, tail.y, queue.getRear().x, queue.getRear().y, "up");
                }, 502)
            }, 501);
        }, 500)


    }

    setTimeout(() => {    
        // Move tail right
        if (queue.isEmpty()) moveNode(tail, "right");

        // Re-label head
        c.fillStyle = "#000"
        setTimeout(() => {
             // Re-do tail (since it gets cleared when node moves right)
            c.fillStyle = "#000"
            c.font = "16px Helvetica";
            c.fillText("Head (front)", head.x+30, head.y-20);
            c.font = "16px Helvetica";
            c.fillText("Tail (rear)", tail.x-30, tail.y+40);

            // Re-enable pop
            if (!queue.isEmpty()) disablePop(false);

            disablePush(false); // Since newNode() disables push
        }, 900)

    }, 500);
}