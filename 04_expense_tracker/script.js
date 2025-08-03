document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseAmt = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmt = document.getElementById("total-amount");

  let expense = JSON.parse(localStorage.getItem("exp")) || [];

  let totalPrice = calculateTotalAmt();
  renderExp();
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmt.value.trim());
    if (name != "" && !isNaN(amount) && amount > 0) {
      expense.push({
        id: Date.now(),
        name: name,
        amount: amount,
      });
      console.log(expense);
      saveLocal();
      renderExp();
      //clear input after submit
      expenseName.value = "";
      expenseAmt.value = "";
    }
  });

  function renderExp() {
    expenseList.innerHTML = "";
    expense.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name} - $${item.amount}</span>
        <button data-id=${item.id}>Delete</button>
        `;
      expenseList.appendChild(li);
    });
    updateTotal();
  }

  function calculateTotalAmt() {
    return expense.reduce((sum, expAmt) => sum + expAmt.amount, 0);
  }

  function updateTotal() {
    totalPrice = calculateTotalAmt();
    // console.log(totalPrice);
    totalAmt.textContent = totalPrice.toFixed(2);
  }
  function saveLocal() {
    localStorage.setItem("exp", JSON.stringify(expense));
  }

  expenseList.addEventListener("click", (e) => {
    // e.stopPropagation();
    if (e.target.tagName === "BUTTON") {
      const dataId = parseInt(e.target.getAttribute("data-id"));
      expense = expense.filter((e) => e.id != dataId);
      saveLocal();
      renderExp();
    }
  });
});
