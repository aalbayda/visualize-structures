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
    stack = new Stack();
    c.clearRect(0, 0, canvas.width, canvas.height);
    setTitle("Stack");
    newHead(canvas.width/2, 150);
    document.querySelector('textarea').innerHTML = 
`typedef struct Node {
    int data;
    struct* next;
} NODE;

NODE* head = (NODE*)malloc(sizeof(NODE));
head = NULL;
    `;
}
const push = (e) => {
    let data = Math.round((Math.random()*100)+1);
    let node, p;
    console.log(stack.isEmpty())
    if (stack.isEmpty()) {
        node = new Node(head.x, head.y+100);
        document.getElementById('btn-push').disabled = false;

        document.querySelector('textarea').innerHTML = 
`void push(NODE* head, int data) {
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

        document.querySelector('textarea').innerHTML = 
`void push(NODE* head, int data) {
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
    let prev = (stack.elements.length>0?stack.peek():head);
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
            p = new Pointer(prev.x, prev.y, node.x, node.y-15, "down");
            

            animatePointer();

            // Label
            c.font = "16px Helvetica";
            c.fillText(`int data = ${data};`, node.x-130, node.y-20);
            cancelAnimationFrame(id);
            stack.push(node);
            document.getElementById('btn-push').disabled = false;
            if (stack.elements.length == 7)
                document.getElementById('btn-push').disabled = true;
        }
        
    }
    c.clearRect(prev.x, prev.y+50, canvas.width, canvas.height);
    c.clearRect(prev.x, prev.y+50, -canvas.width, canvas.height);
    
    animateNode();
}

const deletePop = () => {
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

const pop = () => {
    deletePop();
    document.querySelector('textarea').innerHTML = 
`int pop(NODE** head) {
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