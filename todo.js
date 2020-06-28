// select elements
var clear = document.querySelector('.clear');
var dateElement = document.getElementById('date');
var list = document.getElementById('list');
var input = document.getElementById('input');

//select classes
var CHECK = 'fa-check-circle';
var UNCHECK = 'fa-circle-thin';
var LINE_THROUGH = 'lineThrough';


//variables
let LIST = [], id = 0;

//show today date
const options = {weekday:'long', month:'long',day:'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US",options);

// add to do function
function addTODO(toDo, id, done, trash){
    const position = 'beforeend';
    if(trash){return;}
    
    var DONE = done ? CHECK : UNCHECK;
    var LINE = done ? LINE_THROUGH : "";
    const item =
            `
                    <li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id=""${id}"></i>
                    </li>
            `;
    list.insertAdjacentHTML(position,item);
}



// add item to the list when the user clicks the add button
document.getElementById("add").addEventListener("click",function(event){
    var toDo = input.value;
       if(toDo){
            addTODO(toDo,id,false,false);
            LIST.push({
                name:toDo,
                id:id,
                done:false,
                trash: false
            });
            id++;
        } 
       input.value = '';    //to empty the box after entering the value
    });

// add item to the list when the user enters enter    
document.addEventListener('keyup',function(event){
   if(event.keyCode == 13 ){
       var toDo = input.value;
       if(toDo){
            addTODO(toDo,id,false,false);
            LIST.push({
                name:toDo,
                id:id,
                done:false,
                trash: false
            });
            id++;
        }
       input.value = '';
       
   } 
});










// complete todo
function completeTODO(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}




// remove todo

function removeTODO(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}


list.addEventListener('click',function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if(elementJob == 'complete'){
            completeTODO(element);
    
    }else if(elementJob == 'delete'){
        removeTODO(element);
    }
    
});



