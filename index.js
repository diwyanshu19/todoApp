console.log("working");
const todoIn = document.getElementById("addTodo");
const todoBut = document.querySelector(".add-button");
const showTodo = document.querySelector(".show-todo");
const editBut = document.querySelector(".edit-todo");

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
  if (e.target.classList.contains("edit-todo")) {
    // console.log(e.target);
    const parent = e.target.closest("[data-id]");
    let currid = parent.dataset.id;
    console.log(currid);
    let strx = currTodo[currid].children[0].textContent;
    todoIn.value = strx;
  }
  if (e.target.classList.contains("save-todo")) {
    const parent = e.target.closest("[data-id]");
    let currid = parent.dataset.id;
    console.log(todoIn.value + "f");
    currTodo[currid].children[0].textContent = todoIn.value;
    showTodo.children[
      showTodo.children.length - currid - 1
    ].children[0].textContent = todoIn.value;

    todoIn.value = "";
  }
  if (e.target.classList.contains("cross-todo")) {
    const parent = e.target.closest("[data-id]");
    let currid = +parent.dataset.id;
    //currTodo[j].children[1].dataset.id-1;
    // console.log(currid);
    for (let j = currid + 1; j < len; j++) {
      let idx = currTodo[j].children[1].dataset.id - 1;
      // console.log(idx);
      currTodo[j].children[1].setAttribute("data-id", idx);
      currTodo[j].children[0].setAttribute("data-id", idx);
      currTodo[j].setAttribute("data-id", idx);
    }
    currTodo.splice(currid, 1);
    //  console.log(currTodo);
    showTodo.innerHTML = "";

    currTodo.forEach((x) => {
      displayToDo(
        { val: x.children[0].textContent, idx: x.children[1].dataset.id },
        true
      );
    });

    len--;
    id--;
    console.table(len, id, currTodo.length);
  }
});
function displayToDo({ val, idx }, bol = false) {
  // console.log(bol);
  let htm = ` <div class="todo-ele" data-id = "${idx}">
          <p data-id = "${idx}">${val}</p>
          <div class="ele-handler" data-id = "${idx}">
              <button class="save-todo">save</button>
              <button class="edit-todo">edit</button>
              <button class="cross-todo">❌</button>
          </div>
          </div>`;
  showTodo.insertAdjacentHTML("afterbegin", htm);
  if (!bol) {
    currTodo.push(showTodo.children[0]);
    id++;
    len++;
  }
}