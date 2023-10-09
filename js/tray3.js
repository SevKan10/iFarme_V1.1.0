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

const app = firebase.initializeApp(firebaseConfig);

const value = firebase.database();
const dataValue = value.ref('Tray3');

var tempData = [];
var humData = [];
var dayData = [];

var chart; // Biến global để lưu biểu đồ

// Hàm để cập nhật biểu đồ theo thời gian thực
function updateRealTimeChart(temperatureData, humidityData, dayData) {
    var xValues = [];
    var currentTime = moment().format("HH:mm:ss");

    for (let i = 0; i < temperatureData.length; i++) {
        xValues.push(moment().subtract(temperatureData.length - 1 - i, "seconds").format("HH:mm:ss"));
    }

    // Nếu biểu đồ đã được tạo, cập nhật dữ liệu
    if (chart) {
        chart.data.labels = xValues;
        chart.data.datasets[0].data = temperatureData;
        chart.data.datasets[1].data = humidityData;
        chart.data.datasets[2].data = dayData;
        chart.update(); // Cập nhật biểu đồ
    } else {
        // Nếu biểu đồ chưa được tạo, tạo biểu đồ mới
        chart = new Chart("myChart", {
            type: "line",
            data: {
                labels: xValues,
                datasets: [
                    {
                        label: 'Temperature',
                        data: temperatureData,
                        borderColor: "red",
                        fill: false
                    },
                    {
                        label: 'Humidity',
                        data: humidityData,
                        borderColor: "blue",
                        fill: false
                    },
                    {
                        label: 'Day',
                        data: dayData,
                        borderColor: "yellow",
                        fill: false
                    }
                ]
            },
            options: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: "Plant Process Tray 3",
                    fontSize: 25
                }
            }
        });
    }
}

dataValue.once('value')
    .then((snapshot) => {
        const data = snapshot.val();
        var dataElement = document.getElementById("temperature");
        dataElement.textContent = data.Temp; // Lấy giá trị nhiệt độ từ 'Temp' trong 'Data'

        var humElement = document.getElementById("humidity");
        humElement.textContent = data.Hum; // Lấy giá trị độ ẩm từ 'Hum' trong 'Data'

        var dayElement = document.getElementById("day");
        dayElement.textContent = data.Day; // Lấy giá trị ngày từ 'Day' trong 'Data'

        tempData.push(parseFloat(data.Temp));
        humData.push(parseFloat(data.Hum));
        dayData.push(parseFloat(data.Day));

        if (!isNaN(tempData[0]) && !isNaN(humData[0]) && !isNaN(dayData[0])) {
            console.log("Temperature data:", tempData[0]);
            console.log("Humidity data:", humData[0]);
            console.log("Day data:", dayData[0]);
        } else {
            console.error("Invalid data");
        }

        updateRealTimeChart(tempData, humData, dayData); // Cập nhật biểu đồ ban đầu
    })
    .catch((error) => {
        console.error("Error reading data: ", error);
    });

const temperatureRef = firebase.database().ref('Tray3/Temp'); // Theo dõi nhiệt độ
const humidityRef = firebase.database().ref('Tray3/Hum'); // Theo dõi độ ẩm
const dayRef = firebase.database().ref('Tray3/Day'); // Theo dõi ngày

function updateTemperature(temperature) {
    const temperatureElement = document.getElementById("temperature");
    temperatureElement.textContent = temperature;
    tempData.push(parseFloat(temperature));
    updateRealTimeChart(tempData, humData, dayData);
}

function updateHumidity(humidity) {
    const humidityElement = document.getElementById("humidity");
    humidityElement.textContent = humidity;
    humData.push(parseFloat(humidity));
    updateRealTimeChart(tempData, humData, dayData);
}

function updateDay(day) {
    const dayElement = document.getElementById("day");
    dayElement.textContent = day;
    dayData.push(parseFloat(day));
    updateRealTimeChart(tempData, humData, dayData);
}

// Đọc giá trị nhiệt độ, độ ẩm và ngày
temperatureRef.on('value', (snapshot) => {
    const temperature = snapshot.val();
    if (temperature !== null) {
        updateTemperature(temperature);
    } else {
        updateTemperature("No data available");
    }
});

humidityRef.on('value', (snapshot) => {
    const humidity = snapshot.val();
    if (humidity !== null) {
        updateHumidity(humidity);
    } else {
        updateHumidity("No data available");
    }
});

dayRef.on('value', (snapshot) => {
    const day = snapshot.val();
    if (day !== null) {
        updateDay(day);
    } else {
        updateDay("No data available");
    }
});
