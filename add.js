// Khởi tạo Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDNVI6MfggzOLtCoP1uVAvajd9lKtS22LU",
    authDomain: "ifarme-df868.firebaseapp.com",
    databaseURL: "https://ifarme-df868-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ifarme-df868",
    storageBucket: "ifarme-df868.appspot.com",
    messagingSenderId: "124564135650",
    appId: "1:124564135650:web:e969f361eb2d8611fb48bb",
    measurementId: "G-V3SCKCZMV9"
}


firebase.initializeApp(firebaseConfig);

// Đặt tên cây và lưu vào Firebase
function submitValue() {
    var Tray = document.getElementById('tray').value;
    var input = document.getElementById('txtName');
    var value = input.value;

    if (Tray === "1") {
        saveToFirebase();
    }
    else if (Tray === "2") {
        saveToFirebase();
    }
    else if (Tray === "3") {
        saveToFirebase();
    }
    else if (Tray === "4") {
        saveToFirebase();
    }
}

// In ra thông tin
function checkDangky() {
    var name = document.getElementById("txtName").value;
    var accept = document.getElementById("chAcpt").checked;
    var temp = document.getElementById("txtTemp").value;
    var hum = document.getElementById("txtHum").value;
    var tray = document.getElementById("tray").value;
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;

    document.getElementById("ketqua").innerHTML = 'Entered information is:<br>' +
        'Plant name: ' + name + '<br>Check: ' + accept + "<br>Temp: " + temp + "<br>Hum: " + hum +
        "<br>Number Tray: " + tray + "<br> Plating date: " + day + " Month " + month + " Year " + year;
}

// Đổi khung tên cây
function doico1() {
    document.getElementById('txtName').style.color = "black";
    document.getElementById('txtName').style.fontSize = "30px";
}

function doilai1() {
    document.getElementById('txtName').style.color = "red";
    document.getElementById('txtName').style.fontSize = "15px";
}

// Đổi khung nhiệt độ
function doico2() {
    document.getElementById('txtTemp').style.color = "black";
    document.getElementById('txtTemp').style.fontSize = "30px";
}

function doilai2() {
    document.getElementById('txtTemp').style.color = "red";
    document.getElementById('txtTemp').style.fontSize = "15px";
}

// Đổi khung độ ẩm
function doico3() {
    document.getElementById('txtHum').style.color = "black";
    document.getElementById('txtHum').style.fontSize = "30px";
}

function doilai3() {
    document.getElementById('txtHum').style.color = "red";
    document.getElementById('txtHum').style.fontSize = "15px";
}

// Tải lại trang
function tai_lai_trang() {
    location.reload();
}

// Hàm lưu giá trị vào Firebase
function saveToFirebase() {
    var database = firebase.database();
    var name = document.getElementById("txtName").value;
    var accept = document.getElementById("chAcpt").checked;
    var temp = document.getElementById("txtTemp").value;
    var hum = document.getElementById("txtHum").value;
    var tray = document.getElementById("tray").value;
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;

    // Đường dẫn trong Firebase Realtime Database để lưu giá trị
    var firebasePath = "/test"; // Thay đổi đường dẫn tùy theo nhu cầu của bạn

    // Tạo đối tượng dữ liệu để lưu vào Firebase
    var dataToSave = {
        name: name,
        accept: accept,
        temp: temp,
        hum: hum,
        tray: tray,
        day: day,
        month: month,
        year: year
    };

    // Thực hiện lưu dữ liệu vào Firebase
    database.ref(firebasePath).push(dataToSave)
        .then(function () {
            console.log("Dữ liệu đã được lưu vào Firebase.");
            // Sau khi lưu xong, bạn có thể thực hiện các hành động khác, chẳng hạn như chuyển hướng người dùng.
            window.location.href = 'flow.html'; // Chuyển hướng đến trang "flow.html"
            
            // Lưu dữ liệu vào nút con tương ứng với khay
            var trayNode = firebase.database().ref('/tray' + tray);
            trayNode.set(dataToSave); // Ghi đè dữ liệu trước đó (nếu có)
        })
        .catch(function (error) {
            console.error("Lỗi khi lưu dữ liệu vào Firebase: " + error);
        });
}


