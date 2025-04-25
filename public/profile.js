document.getElementById("change-pic-btn").addEventListener("click", () => {
    document.getElementById("profile-upload").click();
});

document.getElementById("profile-upload").addEventListener("change", () => {
    document.getElementById("profilePicForm").submit();
});

document.getElementById("update-finances-btn").addEventListener("click", () => {
    const income = prompt("Enter Monthly Income:");
    const expenses = prompt("Enter Monthly Expenses:");
    const savings = prompt("Enter Savings Amount:");

    if (income && expenses && savings) {
        fetch("/update-finances", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: document.querySelector("input[name='email']").value,
                monthlyIncome: parseFloat(income),
                expenses: parseFloat(expenses),
                savings: parseFloat(savings)
            })
        }).then(() => {
            location.reload();
        }).catch(error => console.error("Error:", error));
    }
});
