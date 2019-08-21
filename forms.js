const disablePush = (disabled) => {
    document.getElementById('btn-push').disabled = disabled;
}

const disablePop = (disabled) => {
    document.getElementById('btn-pop').disabled = disabled;
}

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
                    <div class="row" style="color: white; margin: 5%">
                                            <p><em>A <strong>stack</strong> behaves like a physical stack of objects. Normally, adding an item to the stack means putting it on top, and taking from the stack means removing the item on top.</em></p>                    </div>
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
                    <div class="row" style="color: white; margin: 5%">
                        <p><em>A <strong>queue</strong> works like an ATM queue. People who join the queue wait behind while the people in front get to withdraw and leave earlier.</em></p>
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
    // Safety disable
    disablePush(true);
    disablePop(true);
}

const handleCopy = () => {
    let copyText = document.querySelector("textarea");
    copyText.select();
    document.execCommand("copy");
}