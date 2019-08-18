setTitle("Stack");

const createForm = (structType) => {
    switch(structType) {
        // case "Linked list": // linked list is complicated
        //     return `
        //     <div class="form-group" style="margin-top: 5%">
        //     <div class="row">
        //         <input class="btn btn-dark col-sm" type="button" value="Insert node">
        //         <input class="btn btn-dark col-sm" type="button" value="Delete node">
        //     </div>
        //     </div>
        //         `
        case "Stack":
            return `
                <div class="form-group" style="margin-top: 5%">
                    <div class="row">
                        <input class="btn btn-dark col-sm" type="button" value="New stack" onclick="newStack()">
                        <input class="btn btn-dark col-sm" type="button" value="Push" id="btn-push" onclick="push()">
                        <input class="btn btn-dark col-sm" type="button" value="Pop" id="btn-pop" onclick="pop()">
                    </div>
                </div>
                `;
        case "Queue":            
            return `
                <div class="form-group" style="margin-top: 5%">
                <div class="row">
                    <input class="btn btn-dark col-sm" type="button" value="New queue" onclick="newQueue()">
                    <input class="btn btn-dark col-sm" type="button" value="Enqueue" id="btn-push" onclick="enqueue()" disabled>
                    <input class="btn btn-dark col-sm" type="button" value="Dequeue" id="btn-pop" onclick="dequeue()" disabled>
                </div>
                </div>
                `;
        default:
            break;
    }
}

const handleChange = () => {
    let e = document.getElementById('select-struct-type');
    let structType = e.options[e.selectedIndex].text;
    setTitle(structType);
    //Update card text
    let form = document.getElementById('form-operations');
    form.innerHTML = createForm(structType);
}

const handleCopy = () => {
    let copyText = document.querySelector("textarea");
    copyText.select();
    document.execCommand("copy");
}