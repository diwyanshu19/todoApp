console.log("working");
const todoIn = document.getElementById("addTodo");
const todoBut = document.querySelector(".add-button");
const showTodo = document.querySelector(".show-todo");
const editBut = document.querySelector(".editTodo");

let currTodo = [];
let len = 0;
let id = 0;


todoBut.addEventListener("click", (e) => {
  console.log(todoIn.value);
  if (todoIn.value === "") return;
  displayToDo({ val: todoIn.value, idx: id });
  todoIn.value = "";
});
showTodo.addEventListener("click", (e) => {
  if (e.target.closest(".editTodo")) {
    let pp = e.target.closest(".editTodo");
    const parent = pp.closest("[data-id]");
    let currid = parent.dataset.id;
    console.log(currid);
    let strx = currTodo[currid].children[0].textContent;
    console.log(strx);
    pp.classList.remove("editTodo");
    pp.classList.add("saveTodo");
    console.log(e.target.textContent)
    
   pp.innerHTML = '<img src="diskette.png" alt="">';
    todoIn.value = strx;
  }
  else if (e.target.closest(".saveTodo")) {
    let pp =  e.target.closest(".saveTodo");
    const parent = pp.closest("[data-id]");
    let currid = parent.dataset.id;
    // console.log(todoIn.value + "f99990");
    currTodo[currid].children[0].textContent = todoIn.value;
    showTodo.children[
      showTodo.children.length - currid - 1
    ].children[0].textContent = todoIn.value;
    pp.classList.add("editTodo");
    pp.classList.remove("saveTodo");
    pp.innerHTML = ' <img src="edit.png" alt="">';
    todoIn.value = "";
  }
  if (e.target.closest(".cross-todo")) {
    let pp =  e.target.closest(".cross-todo");
    const parent = pp.closest("[data-id]");

    console.log(parent);
    let currid = +parent.dataset.id;
    //currTodo[j].children[1].dataset.id-1;
    // console.log(currid);
    for (let j = currid + 1; j < len; j++) {
      let idx = currTodo[j].dataset.id - 1;
      // console.log(idx);
      currTodo[j].setAttribute("data-id", idx);
     
    }
    currTodo.splice(currid, 1);
    //  console.log(currTodo);
    showTodo.innerHTML = "";

    currTodo.forEach((x) => {
      displayToDo(
        { val: x.children[0].textContent, idx: x.dataset.id ,status : x.status,color:x.color,text : x.text},
        true
      );
    });

    len--;
    id--;
    console.table(len, id, currTodo.length);
  }
//   if(showTodo.length!= 0 && e.target?.name == 'statu'){
//      console.log(e.target.value);
// }
});
function displayToDo({ val, idx,status,color,text}, bol = false) {
  // console.log(bol);
  let htm = ` <div class="todo-ele" data-id = "${idx}">
         
          <p>${val}</p>
          <div class="ele-handler">
              <div class = "status">
              <select name="statu" id="stat">
            <option value="pending">pending</option>
           <option value="complete">complete</option>
           <option value="In progress">In progress</option>
          </select>
              
              </div>
              <div class="editing">
              <button class="editTodo">
              <img src="edit.png" alt=""/></button>
              <button class="cross-todo">
              <img src="trash-bin-2.png" alt=""/>
              </button>
              </div>
          </div>
          </div>`;
 
  showTodo.insertAdjacentHTML("afterbegin", htm);
  if(bol){
    console.log(status);
    const $select = document.querySelector('#stat');
    
    const $options = Array.from($select.options);
  const optionToSelect = $options.find(item => item.text == status);
  $select.value  = optionToSelect;
  optionToSelect.selected  = true;
  console.log(showTodo.children[0]);
  console.log(text);
  showTodo.children[0].style.backgroundColor = color;
  showTodo.children[0].children[0].style.color = text;
  }
  showTodo.children[0].children[1].children[0].children[0].addEventListener("change",(e)=>{
    console.log(e.target.value);
    const parent = e.target.closest("[data-id]");
    console.log(parent);
    let currid = parent.dataset.id;
    parent.children[0].style.color = "white";
    if(e.target.value == 'complete'){
     parent.style.backgroundColor = "lightgreen";
     parent.children[0].style.color = "black";
     currTodo[currid].status = 'complete';
     currTodo[currid].color = 'lightgreen';
     currTodo[currid].text = 'black';
    }
    if(e.target.value == 'In progress'){
      parent.style.backgroundColor = "lightyellow";
      parent.children[0].style.color = "black";
      currTodo[currid].status = 'In progress';
      currTodo[currid].color = 'lightyellow';
      currTodo[currid].text = 'black';
     }
     if(e.target.value == 'pending'){
      parent.style.backgroundColor = "rgba(30, 119, 220, 0.908)";
      currTodo[currid].status = 'pending';
      currTodo[currid].color = 'rgba(78, 128, 228, 0.849)';
      currTodo[currid].text = 'white';
     }
  });
  if (!bol) {
    currTodo.push(showTodo.children[0]);
    currTodo[len].status = 'pending';
    currTodo[len].color = 'rgba(78, 128, 228, 0.849)';
    currTodo[len].text = 'white';
    id++;
    len++;
  }
}
{/* <button class="save-todo">save</button> */}