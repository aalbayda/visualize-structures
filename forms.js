const createForm = (structType) => {
    switch(structType) {
        case "Linked list":
            return `
                <div class="form-group" style="margin-top: 5%">
                    <label for="select-struct-type">Operation</label>
                    <div class="row">
                        <div class="col-sm">
                            <select class="form-control" id="select-operation" oninput="handleChange()">
                                <option>Insert at</option>
                                <option>Delete at</option>
                            </select>
                        </div>
                        <div class="col-sm">
                            <input class="form-control" type="number" placeholder="Index"></input>
                        </div>
                    </div>
                </div>
                `
        case "Stack":
            return `
                <div class="form-group" style="margin-top: 5%">
                    <input class="btn btn-dark" type="button" value="Push">
                    <input class="btn btn-dark" type="button" value="Pop">
                </div>
                `;
        case "Queue":            
            return `
            <div class="form-group" style="margin-top: 5%">
            <input class="btn btn-dark" type="button" value="Enqueue">
            <input class="btn btn-dark" type="button" value="Dequeue">
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
    console.log('handling')
    let form = document.getElementById('form-operations');
    form.innerHTML = createForm(structType);
}

