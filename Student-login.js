
document.querySelector("#form").addEventListener("submit", submitFun);

var studentNames = JSON.parse(localStorage.getItem("name")) || [];
console.log(studentNames);


function submitFun(elme) {
    elme.preventDefault();
    username = document.querySelector("#name").value;
    password =  document.querySelector("#password").value;

    if (username == "Student" && password == "root") {
       
        window.location.href = "student.html";
    } else {
        alert("Invalid username or password");
        document.querySelector("#form").reset();
    }

}
