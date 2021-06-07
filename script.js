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
      displayTodos();
    }
}

function deleteitem() {
 alert('hello');

//FUNCTION: DISPLAYING THE ENTERED ITEMS ON THE SCREEN
const displayTodos = () => {

 document.querySelector("#myInput").value = "";
 let todohtml= "";
 /*for each object in the array*/
  todoList.forEach((item) => {
  todohtml += `
<li>${item.todoText}
<i class="far fa-trash-alt" data-id="${item.id}" onclick="deleteitem()"></i>
<i class="fas fa-edit" data-id="${item.id}"></i></li>`

/*    const listElement = document.createElement("li"); /*create a list element
    const delBtn = document.createElement("i");       /*with two icon elements
    const editBtn = document.createElement("i");

    listElement.innerHTML = item.todoText;        add the 'todoText' of the object to the list element
    listElement.setAttribute("data-id", item.id);   
    add an ID (using todoObject ID) to the list element

    delBtn.classList.add("far", "fa-trash-alt"); /*assign class so 1st icon styled/awesomefont
    delBtn.setAttribute("data-id", item.id);          /*add same ID as the list element

    editBtn.classList.add("fas", "fa-edit");    /*assign class so 2nd icon styled/awesomefont
    editBtn.setAttribute("data-id", item.id);        /*add same ID as the list element*/

    /* ADD A LISTENER TO THE DELETE ICON
    delBtn.addEventListener("click", (event) => {
      const delId = event.target.getAttribute("data-id");
      deleteItem(delId);
    });

    /* ADD A LISTENER TO THE MODIFY ICON
    editBtn.addEventListener("click", (event) => {
      const editId = event.target.getAttribute("data-id"); 
      editItem(editId);
    });

    /* ADD TO THE DOM
    todoListElement.appendChild(listElement);
      listElement.appendChild(delBtn);
      listElement.appendChild(editBtn);*/
    });
    todoListElement.innerHTML = todohtml;      
    userInput.focus(); /*place cursor in input field ready for user input*/
}

displayTodos(); /*display todo list on load up*/