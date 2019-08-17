createForm(structType) {
    switch(structType) {
        case "Stack":
            break;
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
    let form = document.getElementById('form-struct-type');
    if (form.childElementCount == 3) {
        form.removeChild(form.children[2]);
    }
    switch (structType) {
        case "Linked list":
            createForm(structType);
            break;
        default:
            break;
    }
}

