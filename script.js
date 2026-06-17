const main = document.querySelector("main");
const form = document.querySelector("form");
const taskContainer = document.querySelector(".task-container");
const addBtn = document.getElementById("add");
const tasksList = document.querySelector(".tasks-list");
const taskInput = document.querySelector("#taskInput");
const toggleBtn = document.querySelector("#toggle");
const categorySelect = document.querySelector("#categorySelect");

const taskArr = JSON.parse(localStorage.getItem("taskArr")) || [
  {
    id: 1,
    title: "Learn JavaScript",
    category: "study",
    status: "Pending",
  },
  {
    id: 2,
    title: "Go to Gym",
    category: "gym",
    status: "Pending",
  },
];

function saveTask() {
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
}

const savedTheme = localStorage.getItem('theme') || 'light';
document.body.dataset.theme = savedTheme;
if(savedTheme === 'dark') {
  document.body.classList.add('dark');
  toggleBtn.textContent = 'Light Mode'
}

let editTaskId = null;

let ui = () => {
  tasksList.innerHTML = "";

  taskArr.forEach((task, index) => {
    // create Task card
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    // Step 1: custom data attribute to card
    taskCard.setAttribute("data-id", task.id);
    taskCard.setAttribute("data-status", task.status);
    taskCard.setAttribute("data-category", task.category);

    // Step 2: Demonstrate dataset
    console.log(taskCard.dataset.id);
    console.log(taskCard.dataset.status);
    console.log(taskCard.dataset.category);

    // Step 3: Demonstrate getAttribute()
    console.log(taskCard.getAttribute("data-id"));
    console.log(taskCard.getAttribute("data-status"));

    //Step 4: Demonstrate hasAttribute()
    console.log(taskCard.hasAttribute("data-status"));

    // Step 5: Demonstrate removeAttribute()
    // taskCard.removeAttribute('data-status')
    // console.log(taskCard.hasAttribute('data-status'));

    // Step 6: putting it back
    // taskCard.setAttribute("data-status", "pending");

    // Task Content
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    // Category
    const category = document.createElement("span");
    category.classList.add("category");

    const categoryText = document.createTextNode(task.category);
    category.appendChild(categoryText);

    // Title
    const title = document.createElement("h2");

    const titleText = document.createTextNode(task.title);
    title.appendChild(titleText);

    // Actions
    const actions = document.createElement("div");
    actions.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.appendChild(document.createTextNode("Edit"));

    // replaceWith() -> replacing title with input field
    // editBtn.addEventListener('click', () => {
    //   const input = document.createElement('input')
    //   input.value = title.textContent;
    //   title.replaceWith(input)
    // })

    // editBtn.addEventListener("click", () => {
    //   taskInput.value = task.title;
    //   category.value = task.category;

    //   editTaskId = task.id;
    //   addBtn.textContent = "Update Task";
    // });

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.appendChild(document.createTextNode("Complete"));

    // Demonstrate setAttribute() on Complete button
    // completeBtn.addEventListener("click", () => {
    //   if (taskCard.dataset.status === "Completed") return;

    //   taskCard.dataset.status = "Completed";

    //   const doneBadge = document.createElement("span");
    //   doneBadge.textContent = "✓ Completed";

    //   taskContent.prepend(doneBadge);

    //   const msg = document.createElement("span");
    //   msg.textContent = "🎉";
    //   title.after(msg);
    // });

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-btn");
    delBtn.appendChild(document.createTextNode("Delete"));

    // remove() -> deleting task card
    // delBtn.addEventListener("click", () => {
    //   taskCard.remove();
    // });
    // Assemble
    taskContent.append(category, title);
    actions.append(editBtn, completeBtn, delBtn);
    taskCard.append(taskContent, actions);
    tasksList.append(taskCard);

    if (task.status === "Completed") {
      const doneBadge = document.createElement("span");
      doneBadge.textContent = "✓ Completed";

      taskContent.prepend(doneBadge);

      const msg = document.createElement("span");
      msg.textContent = " 🎉";

      title.after(msg);
    }
  });
};
ui();

/** removing all separate event listener and using event delegation */
tasksList.addEventListener("click", (e) => {
  console.log(e.target); // getting all element inside task list

  const taskCard = e.target.closest(".task-card");
  if (!taskCard) return;
  const id = Number(taskCard.dataset.id);

  // delete
  if (e.target.classList.contains("delete-btn")) {
    // taskCard.remove();

    const index = taskArr.findIndex((task) => task.id === id);

    taskArr.splice(index, 1);

    saveTask();
    ui();
  }

  // complete using get/set attributes
  // if (e.target.classList.contains("complete-btn")) {
  //   if (taskCard.dataset.status === "Completed") return;
  //   taskCard.dataset.status = "Completed";

  //   const doneBadge = document.createElement("span");
  //   doneBadge.textContent = "✓ Completed";
  //   const taskContent = taskCard.querySelector(".task-content");
  //   taskContent.prepend(doneBadge);

  //   const msg = document.createElement("span");
  //   const title = taskCard.querySelector("h2");
  //   msg.textContent = "🎉";
  //   title.after(msg);
  // }

  /** complete using local stroage */
  if (e.target.classList.contains("complete-btn")) {
    const task = taskArr.find((task) => task.id === id);

    if (task.status === "Completed") return;
    task.status = "Completed"; // update data

    saveTask();
    ui();
  }

  // edit
  if (e.target.classList.contains("edit-btn")) {
    const task = taskArr.find((task) => task.id === id);

    taskInput.value = task.title;
    categorySelect.value = task.category;

    editTaskId = task.id;
    addBtn.textContent = "Update Task";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let title = e.target[0].value;
  let category = e.target[1].value;
  console.log(title, category);

  console.log("event", e);

  if (title.trim() === "" || category.trim() === "") {
    alert("Please fill all the details..");
    return;
  }

  if (editTaskId === null) {
    // add task
    taskArr.push({
      id: taskArr.length + 1,
      title,
      category,
      status: "Pending",
    });
  } else {
    const taskToEdit = taskArr.find((task) => task.id === editTaskId);
    console.log(taskToEdit);

    taskToEdit.title = title;
    taskToEdit.category = category;

    editTaskId = null;
    addBtn.textContent = "Add Task";
  }

  saveTask();
  ui();

  form.reset();
});

// Attributes vs Properties Demo
/** ATTRIBUTE
 * - It is Stored in HTML markup.
 * - Eg: <input value='Learn JS'>
 * - input.getAttribute('value') will return orginal html value 'Learn JS'
 *
 * PROPERTY
 * - Stored on the DOM object
 * - if the user changes the input the property changes
 * - input.value: current value in input which user enters
 */

console.log("Property: ", taskInput.value);
console.log("Attribute: ", taskInput.getAttribute("value"));

/** toggle handler using get/set */
// toggleBtn.addEventListener("click", () => {
//   if (document.body.dataset.theme === "light") {
//     document.body.classList.add("dark");

//     document.body.setAttribute("data-theme", "dark");
//     toggleBtn.textContent = "Light Mode";
//   } else {
//     document.body.classList.remove("dark");
//     document.body.setAttribute("data-theme", "light");
//     toggleBtn.textContent = "Dark Mode";
//   }

//   console.log("Current Theme:", document.body.dataset.theme);
// });

/** Upgrading toggle handler using localstorage */
toggleBtn.addEventListener("click", () => {
  if (document.body.dataset.theme === "light") {
    document.body.classList.add("dark");

    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem('theme', 'dark');

    toggleBtn.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    document.body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");

    toggleBtn.textContent = "Dark Mode";
  }

  console.log("Current Theme:", document.body.dataset.theme);
});

/** Event Bubbling Demo */
const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const childBtn = document.querySelector(".child-btn");

/** Event Bubbling
 *
 * - Event starts from its target element and moves upword to ancestor
 * - bubbling is the third phase of event propagation/traversal where event bubbles up after reaching target to upword
 * - By default every event uses bubbling phase
 *
 * - order will be:
 * - 1. child
 * - 2. parent
 * - 3. grand parent
 */
grandparent.addEventListener("click", () => {
  console.log("Grandparent");
});

parent.addEventListener("click", () => {
  console.log("Parent");
});

childBtn.addEventListener("click", () => {
  console.log("Child");
});

/** Event Capturing
 *
 * - Event starts from its root element and moves down to target
 * - capturing is the first phase of event propagation/traversal where event travels down up from root to target and capture each one
 * - to enable capturing we explicity need to opt for that using the third arguments of addEventListener.
 *
 * - order will be:
 * - 1. grand parent
 * - 2. parent
 * - 3. child
 */

grandparent.addEventListener(
  "click",
  () => {
    console.log("Grandparent");
  },
  true,
);

parent.addEventListener(
  "click",
  () => {
    console.log("Parent");
  },
  true,
);

childBtn.addEventListener(
  "click",
  () => {
    console.log("Child");
  },
  true,
);
