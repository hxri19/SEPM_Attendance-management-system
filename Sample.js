document = document.getElementById("form1").addEventListener("submit", submitFun1);
const MongoClient = require('mongodb').MongoClient;

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

    // Connect to the MongoDB database
    const uri = 'mongodb+srv://vicky:vicky@cluster0.mcyak.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("Vi").collection("DS");

        // Insert the new student object into the database
        collection.insertOne(studentObj, function(err, result) {
            if (err) throw err;
            console.log("Student Added Successfully");

            // Update attendance array with status
            var attendanceObj = {
                date: date,
                subject: subject,
                status: status
            };
            studentObj.attendance.push(attendanceObj);

            client.close();
            displayFun(studentDataArr);
        });
    });

    document.querySelector("#form1").reset();
}

function handleButtonClick(item, td6, status) {
    // TODO: Update attendance for the student
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
      return tr;
    }).forEach(function(tr) {
      document.querySelector("#attendance-table tbody").appendChild(tr);
    });
  }
  