const handleChange = () => {
    let e = document.getElementById('select-struct-type');
    let structType = e.options[e.selectedIndex].text;
    //Update card text
    document.getElementsByTagName('textarea').innerHTML = "aa";
    let form = document.getElementById('struct-type-form');
    if (form.childElementCount == 2) {
        form.removeChild(form.children[1]);
    }
    switch (structType) {
        case "Linked list":
            break;
        default:
            break;
    }
}