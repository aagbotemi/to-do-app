//select Element
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//select classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

//get an item from the local storage
let data = localStorage.getItem("TODO");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.lenght;
    loadList(LIST);
}else {
    LIST = [];
    id = 0;
}

//load an item to the interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

// clear an item from the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});


//set date
const option = {weekday:"long", month:"short", day:"numeric"};
const now = new Date();
dateElement.innerHTML = now.toLocaleDateString("en-US", option);

//add a to-do function
function addToDo(toDo, id, done, trash) {

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                <i class="fa ${DONE}" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-alt" job="delete" id="${id}"></i>
                </li>`;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// use the enter key to add an item
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13) {
        const toDo = input.value;

        //if input isn't empty
        if (toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            //set local storage (set item to where list is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }

        input.value = "";
    }
});

//complete to do 
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do 
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target items dynamically
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeToDo(element);
    }else if (elementJob == "delete"){
        removeToDo(element);
    }

    //set local storage (set item to where list is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
