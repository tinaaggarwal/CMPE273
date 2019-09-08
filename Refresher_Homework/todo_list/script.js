const todoList = () => {
    let item = document.getElementById('todo_Input').value;
    let text = document.createTextNode(item);
    let newItem = document.createElement('li');
    newItem.appendChild(text);
    document.getElementById('todo_List').appendChild(newItem);
}

const removeAllTasks = () => {
    document.getElementById('todo_List').innerHTML = '';
}