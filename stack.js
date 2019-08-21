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
            return this.elements.length == 0; // in this implementation, we push head into the stack
        };
    }
}

let stack;
const newStack = () => {
    // Update code snippet
    textNewStack();
    // New stack
    stack = new Stack();
    // Restart canvas;
    c.clearRect(0, 0, canvas.width, canvas.height);
    setTitle("Stack");
    head = newNode(canvas.width/2-100, 50);
    // Label
    c.fillStyle = "#000"
    c.font = "16px Helvetica";
    c.fillText("Head (top)", head.x-120, head.y);
    // Re-enable push
    setTimeout(()=>{
        disablePush(false);
    }, 600)
}

const push = () => {
    // Initialize
    let data = Math.round((Math.random()*100)+1); // Random data inside new node
    let node; // Node, pointer from previous node
    textPush(data); // Update code snippet

    if (stack.isEmpty()) {
        node = newNode(head.x+100, head.y, data);
        label2(node, data);
        stack.push(node);
        let p = newPointer(head.x, head.y, node.x, node.y, "right");
    }
    else {
        // If stack is not empty, move everything down first
        for (let i = stack.elements.length-1; i >= 0; i--) {
            moveNode(stack.elements[i], "down");
            c.clearRect(stack.elements[i].x+40, stack.elements[i].y-30, canvas.width, canvas.height);
            setTimeout (() => {
                label2(stack.elements[i], stack.elements[i].data);
            }, 300)
        }

        // Create new node and push in our actual js stack
        setTimeout(() => {
            node = newNode(head.x+100, head.y, data);
            label2(node, node.data);
            stack.push(node);

            for (let i = stack.elements.length-2; i >= 0; i--) {
                let p = newPointer(stack.elements[i+1].x, stack.elements[i+1].y, stack.elements[i].x, stack.elements[i].y, "down");
            }
        }, 600)
    }

    // Re-enable push
    setTimeout(()=>{
        if (stack.elements[0].y+100 < canvas.height) disablePush(false);
        disablePop(false);
    }, 650);
}

const pop = () =>{
    disablePop(true);
    textPop(); // Update code snippet
    if (stack.elements.length == 1) {
        // Show node deletion
        animateDelete(stack.peek());
        setTimeout(() => {
            c.clearRect(0, 0, canvas.width, canvas.height);
            // Re-do text
            setTitle("Stack");
            c.fillStyle = "#000"
            c.font = "16px Helvetica";
            c.fillText("Head (top)", head.x-120, head.y);
            head.draw();
        }, 400);
        stack.pop();
    }   
    else {
        // Temp node to track head
        let temp = newNode(stack.peek().x+100, stack.peek().y);
        let pTemp = newPointer(temp.x, temp.y, stack.peek().x, stack.peek().y, "left");
        c.fillStyle = "#000"
        c.font = "16px Helvetica";
        c.fillText("temp", temp.x, temp.y+40);

        c.clearRect(stack.peek().x+40, stack.peek().y-30, canvas.width, 30);
        animateDelete(temp);
        animateDelete(stack.peek());

        setTimeout(() => {
            // Delete first nodes
            c.clearRect(stack.peek().x-25, stack.peek().y-40, canvas.width, canvas.height);
            stack.pop()
            // Move nodes back up
            for (let i = stack.elements.length-1; i >= 0; i--){
                moveNode(stack.elements[i], "up");
                setTimeout (() => {
                    label2(stack.elements[i], stack.elements[i].data);
                }, 300)
            }
            // Redraw pointers
            setTimeout(() => {
                for (let i = stack.elements.length-2; i >= 0; i--) {
                    let p = newPointer(stack.elements[i+1].x, stack.elements[i+1].y, stack.elements[i].x, stack.elements[i].y, "down");
                }
                // Re-enable pop
                if (!stack.isEmpty()) disablePop(false);
                disablePush(false)
            }, 550)
        }, 500);
    }
}