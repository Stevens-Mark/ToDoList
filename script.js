const userInput = document.getElementById('myInput');
/*declare a place to put the todo list in the dom*/
const todoListElement = document.querySelector("#myUL");

/*Set the 'items' key to the string form of the todoList array
localStorage.setItem('items', JSON.stringify(todoList));  */  

/*Check if objects exist in the local storage and assign them to the todoList array*/
let todoList = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];     

console.log('on loadup', todoList);

//FUNCTION: TO STORE ARRAY TO LOCAL STORAGE
const Store = () => {
  localStorage.setItem('items', JSON.stringify(todoList));
}

//FUNCTION: GETTING VALUES FROM INPUT TO PUT IN ARRAY OF OBJECTS
const addTodo = () => {
  const todoText = document.querySelector("#myInput").value;
  document.getElementById("Message").textContent = "";

  if (todoText == "") {         /*if no characters entered, give user a prompt*/
    document.getElementById("Message").textContent = "Veuillez entrer une tâche";
  } else {
    const todoObject = {  /*otherwise create the object: the ID is unique (number of milliseconds elapsed since January 1, 1970)*/
      id: Date.now(),     /*creates a very unique ID using the date method*/
      todoText: todoText,
    };
    todoList.unshift(todoObject);    /*with unshift (instead of push) the new object is added to the beginning of the array.*/
    Store();                          /*This way the new items show up at the top of the todo list*/
    console.log('after add', todoList);
    displayTodos();                  
  }
}

//FUNCTION: TO DELETE AN ITEM FROM THE LIST
const deleteItem = (idvalue) => {
  todoList.splice(                           /*splice: remove ONE (1) object at index in array that corresponds to object with IDvalue*/
    todoList.findIndex((item) => item.id == idvalue), 1); /*find the object's position in the array based on it's ID*/
  Store();
  console.log('after delete', todoList);
  displayTodos();
}

//FUNCTION: TO MODIFY AN ITEM FROM THE LIST
const editItem = (idvalue) => {
  userInput.focus();
  const modifyText = document.querySelector("#myInput").value; /*new modified text entered by user in input field*/
  document.getElementById("addBtn").disabled = true; /*disable 'ajouter' button during modify*/

  document.getElementById("Message").textContent = "";
    if (modifyText == "") {                                   /*if no characters entered, give user a prompt*/
      document.getElementById("Message").textContent = "Veuillez modifier votre tâche ici et cliquer sur l'icône de modification correspondante.";
      /*return false;*/
  } else {
      objectIndex = todoList.findIndex((item) => item.id == idvalue); /*find the object's position in the array based on it's ID*/
      todoList[objectIndex].todoText = modifyText;                    /*replace text in object with new text entered*/
      document.getElementById("addBtn").disabled = false;           /*enable 'ajouter' button after modification*/
      Store(); 
      console.log('after modify', todoList);
      displayTodos();
    }
}

//FUNCTION: DISPLAYING THE ENTERED ITEMS ON THE SCREEN
const displayTodos = () => {

 document.querySelector("#myInput").value = "";
 let todohtml = "";
 /*for each object in the array*/
  todoList.forEach((item) => {
  todohtml += `
<li>${item.todoText}
<i class="far fa-trash-alt" onclick="deleteItem(${item.id})"></i>
<i class="fas fa-edit"  onclick="editItem(${item.id})"></i></li>`
});
    todoListElement.innerHTML = todohtml;      
    userInput.focus(); /*place cursor in input field ready for user input*/
}

displayTodos(); /*display todo list on load up*/