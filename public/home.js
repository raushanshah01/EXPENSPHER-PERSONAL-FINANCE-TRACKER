// Wait until the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Select the canvas elements
    const overviewCanvas = document.getElementById("overviewGraph").getContext("2d");

    // Data for "Today's Overview" (Bar Chart)
    const overviewData = {
        labels: ["Food", "Shopping", "Rent", "Entertainment", "Medical/Bills", "Others", "Savings"],
        datasets: [{
            label: "Today's Expenses",
            data: [500, 1200, 8000, 700, 1500, 400, 3000], // Example values
            backgroundColor: ["#FF5733", "#33FFBD", "#3388FF", "#F333FF", "#FFD700", "#FF9933", "#33FF57"],
            borderColor: "#333",
            borderWidth: 1
        }]
    };

    // Create "Today's Overview" Bar Chart
    const overviewChart = new Chart(overviewCanvas, {
        type: "bar",
        data: overviewData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Tracing Graph (Line Chart)
    const tracingCanvas = document.createElement("canvas");
    tracingCanvas.id = "tracingGraph";
    document.querySelector(".timeframe").appendChild(tracingCanvas);
    const tracingCtx = tracingCanvas.getContext("2d");

    // Data for tracing graph (default: Weekly)
    const tracingData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            label: "Weekly Expense Trend",
            data: [2000, 2500, 1800, 3000, 4000, 3800, 5000], // Example values
            borderColor: "#FF5733",
            backgroundColor: "rgba(255,87,51,0.2)",
            borderWidth: 2,
            fill: true
        }]
    };

    // Create Tracing Graph (Line Chart)
    let tracingChart = new Chart(tracingCtx, {
        type: "line",
        data: tracingData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Function to update tracing graph when clicking Weekly, Monthly, or Yearly
    function updateTracingGraph(timeframe) {
        let newData = [];

        if (timeframe === "Weekly") {
            tracingData.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
            newData = [2000, 2500, 1800, 3000, 4000, 3800, 5000];
        } else if (timeframe === "Monthly") {
            tracingData.labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
            newData = [10000, 12000, 15000, 13000];
        } else if (timeframe === "Yearly") {
            tracingData.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            newData = [15000, 18000, 22000, 17000, 20000, 24000, 26000, 28000, 30000, 32000, 35000, 37000];
        }

        tracingData.datasets[0].data = newData;
        tracingChart.update();
    }

    // Add event listeners to the timeframe buttons
    document.querySelectorAll(".timeframe button").forEach(button => {
        button.addEventListener("click", function () {
            updateTracingGraph(this.textContent);
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("month-year");
    const calendarTable = document.querySelector("#calendar-table tbody");
    
    function generateCalendar(year, month) {
        calendarTable.innerHTML = ""; // Clear previous calendar
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        monthYear.textContent = new Date(year, month).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        });
        
        let row = document.createElement("tr");
        for (let i = 0; i < firstDay; i++) {
            let emptyCell = document.createElement("td");
            row.appendChild(emptyCell);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            let cell = document.createElement("td");
            cell.textContent = day;
            row.appendChild(cell);
            
            if ((firstDay + day) % 7 === 0) { // Start a new row every Sunday
                calendarTable.appendChild(row);
                row = document.createElement("tr");
            }
        }
        
        if (row.children.length > 0) {
            calendarTable.appendChild(row);
        }
    }
    
    const today = new Date();
    generateCalendar(today.getFullYear(), today.getMonth());
});


document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("month-year");
    const calendarTable = document.querySelector("#calendar-table tbody");
    
    function generateCalendar(year, month) {
        calendarTable.innerHTML = ""; // Clear previous calendar
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
        
        monthYear.textContent = new Date(year, month).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
        });
        
        let row = document.createElement("tr");
        for (let i = 0; i < firstDay; i++) {
            let emptyCell = document.createElement("td");
            row.appendChild(emptyCell);
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            let cell = document.createElement("td");
            cell.textContent = day;
            
            if (isCurrentMonth && day === today.getDate()) {
                cell.style.backgroundColor = "#ffcccb"; // Highlight today
                cell.style.fontWeight = "bold";
            }
            
            row.appendChild(cell);
            
            if ((firstDay + day) % 7 === 0) { // Start a new row every Sunday
                calendarTable.appendChild(row);
                row = document.createElement("tr");
            }
        }
        
        if (row.children.length > 0) {
            calendarTable.appendChild(row);
        }
    }
    
    const today = new Date();
    generateCalendar(today.getFullYear(), today.getMonth());
<<<<<<< HEAD
});

document.getElementById("logoutLink").addEventListener("click", function (e) {
    e.preventDefault(); // stop the default link behavior

    fetch("/api/logout", {
        method: "POST",
        credentials: "include", // needed if token is in HTTP-only cookie
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // follow redirect from server
        } else {
            window.location.href = "/login"; // fallback
        }
    })
    .catch(error => {
        console.error("Logout failed:", error);
    });
});

=======
});
>>>>>>> f9b3af4a138f0c001dbecf51e9de271d2f7d4a15
