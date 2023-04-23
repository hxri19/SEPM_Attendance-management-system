var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

function submitFun1(e) {
    document.querySelector("#tbody").innerHTML = "";
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var rollNo = document.querySelector("#rollNo").value;
    var subject = document.querySelector("#subject").value;
    var date = document.querySelector("#date").value;

    var studentObj = {
        name: name,
        rollNo: rollNo,
        attendance: [],
        subject: subject,
        date: date
    }

    var status;

    studentDataArr.push(studentObj);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    document.querySelector("#form1").reset();
    alert("Student Added Successfully");

    displayFun(studentDataArr)
}

function handleButtonClick(item, td6, status) {
    status = status === "Present" ? 1 : 0;
    item.attendance.push({ date: item.date, subject: item.subject, status: status });
    var button = document.createElement("button");
    button.disabled = true;
    button.textContent = status === 1 ? "Present" : "Absent";
    button.style.backgroundColor = status === 1 ? "green" : "red";
    td6.innerHTML = "";
    td6.appendChild(button);
  }
    
function displayFun(studentDataArr) {
  var count = 1;
  studentDataArr.map(function (item) {
    var tr = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.innerHTML = count++;
    var td2 = document.createElement("td");
    td2.innerHTML = item.name;
    var td3 = document.createElement("td");
    td3.innerHTML = item.rollNo;
    var td4 = document.createElement("td");
    td4.innerHTML = item.subject;
    var td5 = document.createElement("td");
    td5.innerHTML = item.date;
    var td6 = document.createElement("td");
    td6.classList.add("td6");

    var attendanceMarked = false;
    var attendanceStatus = "";

    // Check if attendance has been marked for the current date and subject
    item.attendance.forEach(function (attendance) {
      if (attendance.date === item.date && attendance.subject === item.subject) {
        attendanceMarked = true;
        attendanceStatus = attendance.status;
      }
    });

    // Set the button color based on attendance status
    if (attendanceMarked) {
      if (attendanceStatus === "Present") {
        td6.innerHTML = "<button disabled class='present'>" + attendanceStatus + "</button>";
      } else {
        td6.innerHTML = "<button disabled class='absent'>" + attendanceStatus + "</button>";
      }
    } else {
      var presentBtn = document.createElement("button");
      presentBtn.innerHTML = "Present";
      presentBtn.addEventListener("click", function () {
        handleButtonClick(item, td6, "Present");
      });

      var absentBtn = document.createElement("button");
      absentBtn.innerHTML = "Absent";
      absentBtn.addEventListener("click", function () {
        handleButtonClick(item, td6, "Absent");
      });

      td6.append(presentBtn, absentBtn);
    }

    tr.append(td1, td2, td3, td4, td5, td6);

    document.querySelector("#tbody").append(tr);
  });
}

document.querySelector("#form1").addEventListener("submit", submitFun1);
displayFun(studentDataArr);
