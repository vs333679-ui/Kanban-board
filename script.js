let draggedCard = null;

// Load saved data when page opens
window.onload = function () {
    loadBoard();
};

// Add new task
function addTask() {
    const input = document.getElementById("taskInput");
    const priority = document.getElementById("priority").value;

    if (input.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const card = createCard(input.value, priority);

    document.getElementById("todo").appendChild(card);

    input.value = "";

    saveBoard();
}

// Create card
function createCard(text, priority) {

    const card = document.createElement("div");
    card.className = "card";
    card.draggable = true;

    card.innerHTML = `
        <p>${text}</p>

        <span class="priority ${priority.toLowerCase()}">
            ${priority}
        </span>

        <div class="buttons">
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);

    return card;
}

// Edit task
function editTask(btn) {

    const card = btn.parentElement.parentElement;

    const text = card.querySelector("p");

    const newText = prompt("Edit Task", text.innerText);

    if (newText && newText.trim() !== "") {
        text.innerText = newText;
        saveBoard();
    }
}

// Delete task
function deleteTask(btn) {

    btn.parentElement.parentElement.remove();

    saveBoard();
}

// Drag Start
function dragStart() {

    draggedCard = this;

    setTimeout(() => {
        this.style.display = "none";
    }, 0);
}

// Drag End
function dragEnd() {

    this.style.display = "block";

    draggedCard = null;

    saveBoard();
}

// Allow Drop
function allowDrop(e) {
    e.preventDefault();
}

// Drop Card
function drop(e) {

    e.preventDefault();

    if (draggedCard) {
        e.currentTarget.appendChild(draggedCard);
        saveBoard();
    }
}
// Save board to localStorage
function saveBoard() {

    const board = {
        todo: document.getElementById("todo").innerHTML,
        progress: document.getElementById("progress").innerHTML,
        done: document.getElementById("done").innerHTML
    };

    localStorage.setItem("kanbanBoard", JSON.stringify(board));
}

// Load board from localStorage
function loadBoard() {

    const board = JSON.parse(localStorage.getItem("kanbanBoard"));

    if (!board) return;

    document.getElementById("todo").innerHTML = board.todo;
    document.getElementById("progress").innerHTML = board.progress;
    document.getElementById("done").innerHTML = board.done;

    // Reattach events after loading
    document.querySelectorAll(".card").forEach(card => {

        card.draggable = true;

        card.addEventListener("dragstart", dragStart);
        card.addEventListener("dragend", dragEnd);

    });
                                               }
