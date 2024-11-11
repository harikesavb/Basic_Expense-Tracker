// Get DOM elements
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');

// Initialize the transactions array
let transactions = [];

// Function to update the UI (Balance, Income, Expense)
function updateUI() {
    const amounts = transactions.map(transaction => transaction.amount);
    const totalBalance = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    balance.textContent = `₹${totalBalance}`;

    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
    moneyPlus.textContent = `+₹${income}`;

    const expense = (amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1).toFixed(2);
    moneyMinus.textContent = `-₹${expense}`;

    // Clear list
    list.innerHTML = '';

    // Add items to the list
    transactions.forEach((transaction, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

        listItem.innerHTML = `${transaction.text} 
            <span>₹${Math.abs(transaction.amount).toFixed(2)}</span>
            <button class="delete-btn" onclick="deleteTransaction(${index})">x</button>`;

        list.appendChild(listItem);
    });
}

// Function to add a new transaction
function addTransaction(e) {
    e.preventDefault();

    if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert('Please enter both text and amount');
        return;
    }

    const newTransaction = {
        text: textInput.value,
        amount: parseFloat(amountInput.value),
    };

    transactions.push(newTransaction);
    updateUI();

    // Clear input fields
    textInput.value = '';
    amountInput.value = '';
}

// Function to delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

// Add event listener to form submit
form.addEventListener('submit', addTransaction);

// Initial UI update
updateUI();
