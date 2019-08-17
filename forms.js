const createForm = (structType) => {
    switch(structType) {
        case "Linked list":
            return `
            <div class="form-group" style="margin-top: 5%">
            <div class="row">
                <input class="btn btn-dark col-sm" type="button" value="Insert node">
                <input class="btn btn-dark col-sm" type="button" value="Delete node">
            </div>
            </div>
                `
        case "Stack":
            return `
                <div class="form-group" style="margin-top: 5%">
                    <div class="row">
                        <input class="btn btn-dark col-sm" type="button" value="New stack" onclick="newStack()">
                        <input class="btn btn-dark col-sm" type="button" value="Push" onclick="push()">
                        <input class="btn btn-dark col-sm" type="button" value="Pop" onclick="deleteTop()">
                    </div>
                </div>
                `;
        case "Queue":            
            return `
                <div class="form-group" style="margin-top: 5%">
                <div class="row">
                    <input class="btn btn-dark col-sm" type="button" value="New queue" onclick="newQueue()">
                    <input class="btn btn-dark col-sm" type="button" value="Enqueue" onclick="enqueue()">
                    <input class="btn btn-dark col-sm" type="button" value="Dequeue" onclick="deleteTop()">
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