const API = "/api/todos";
const todoInput = document.getElementById("todoInput");
const todoPending = document.getElementById("todoPending");
const todoDone = document.getElementById("todoDone");
const countPending = document.getElementById("countPending");
const countDone = document.getElementById("countDone");


// READ
async function loadTodos() {
  const res = await fetch(API);
  const todos = await res.json();
  renderTodos(todos);
}

// CREATE
async function addNew() {
  const text = todoInput.value.trim();
  if (!text) {
    alert("Vui lòng nhập công việc!");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      status: "todo"  
    })
  });

  todoInput.value = "";
  loadTodos();
}

// RENDER (PHÂN LOẠI)
function renderTodos(todos) {
  todoPending.innerHTML = "";
  todoDone.innerHTML = "";

  let pending = 0;
  let done = 0;

  todos.forEach(todo => {
    const li = document.createElement("li");

    if (todo.status === "done") {
      li.classList.add("done");
      done++;
    } else {
      pending++;
    }

    li.innerHTML = `
      <div class="todo-text">${todo.text}</div>
      <div class="controls">
        <div class="status">
          <span class="red ${todo.status === 'todo' ? 'active' : ''}"
            onclick="updateStatus(${todo.id}, 'todo')"></span>
          <span class="orange ${todo.status === 'doing' ? 'active' : ''}"
            onclick="updateStatus(${todo.id}, 'doing')"></span>
          <span class="green ${todo.status === 'done' ? 'active' : ''}"
            onclick="updateStatus(${todo.id}, 'done')"></span>
        </div>
        <div>
          <button onclick="editTodo(${todo.id}, '${todo.text}')">Sửa</button>
          <button onclick="deleteTodo(${todo.id})">Xoá</button>
        </div>
      </div>
    `;

    if (todo.status === "done") {
      todoDone.appendChild(li);
    } else {
      todoPending.appendChild(li);
    }
  });

  // UPDATE COUNT
  countPending.textContent = pending;
  countDone.textContent = done;
}

// UPDATE STATUS
async function updateStatus(id, status) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  loadTodos();
}

// UPDATE TEXT
async function editTodo(id, oldText) {
  const text = prompt("Nhập nội dung mới:", oldText);
  if (!text) return;

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  loadTodos();
}

// DELETE
async function deleteTodo(id) {
  if (!confirm("Bạn có chắc muốn xóa?")) return;

  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadTodos();
}

// LOAD
loadTodos();