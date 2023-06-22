 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
 import { getDatabase, push, ref, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDuWm7D3aVpSf54XuTW2O2AayA56W4cYmA",
   authDomain: "todofirebase-8b414.firebaseapp.com",
   databaseURL: "https://todofirebase-8b414-default-rtdb.firebaseio.com",
   projectId: "todofirebase-8b414",
   storageBucket: "todofirebase-8b414.appspot.com",
   messagingSenderId: "932895857173",
   appId: "1:932895857173:web:5ff95c5ec61766c4b4cc1c",
   measurementId: "G-EE9SCFLPC1"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 var db = getDatabase()

alert("Welcome to my Todo App");
var inpval = document.getElementById("inp");
var listval = document.getElementById("list");

window.delRow = function(btn) {
    var taskNode = btn.parentNode;
    deleteTaskFromDatabase(taskNode);
    taskNode.parentNode.removeChild(taskNode); // Remove the task from the DOM
  }
    
  function editRow(btn) {
    var newValue = prompt("Enter new value:");
    if (newValue !== null) {
      btn.parentNode.firstChild.nodeValue = newValue;
      updateTaskInDatabase(btn.parentNode);
    }
  }
  
  window.addTask = function() {
    var li = document.createElement("li");
    var liText = document.createTextNode(inpval.value);
    li.appendChild(liText);
    li.setAttribute("class", "myli");

  
    var del = document.createElement("button");
    var delText = document.createTextNode("Delete");
    del.appendChild(delText);
    del.setAttribute("class", "btn");
    del.addEventListener("click", function() {
      delRow(this);
      deleteTaskFromDatabase(this.parentNode);
    });
    li.appendChild(del);
  
    listval.appendChild(li);
  
    var edit = document.createElement("button");
    var editText = document.createTextNode("Edit");
    edit.setAttribute("class", "btn");
    edit.addEventListener("click", function() {
      editRow(this);
    });
    edit.appendChild(editText);
    li.appendChild(edit);
  
    inpval.value = "";
  
    var taskRef = push(ref(db, "tasks"));
    var taskId = taskRef.key;
    var taskData = {
      id: taskId,
      value: liText.nodeValue
    };
    set(taskRef, taskData);
    
    li.setAttribute("data-id", taskId);
  }

  function deleteTaskFromDatabase(taskNode) {
    var taskId = taskNode.getAttribute("data-id");
    if (taskId) {
      var taskRef = ref(db, "tasks/" + taskId);
      set(taskRef, null)
        .then(() => {
          console.log("Task deleted from the database.");
        })
        .catch((error) => {
          console.error("Error deleting task from the database:", error);
        });
    }
  }
  
  function updateTaskInDatabase(taskNode) {
    var taskId = taskNode.getAttribute("data-id");
    if (taskId) {
      var taskRef = ref(db, "tasks/" + taskId);
      set(taskRef, { value: taskNode.firstChild.nodeValue });
    }
  }
  
window.DelAll = function() {
    listval.innerHTML = "";
    var tasksRef = ref(db, "tasks");
    set(tasksRef, null);
  }