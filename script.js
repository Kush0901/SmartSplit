// script.js

let peopleDishes = {};
let dishCosts = {};

function addPersonDish() {
    const person = document.getElementById('person').value.trim();
    const dish = document.getElementById('dish').value.trim();

    if (person && dish) {
        if (!peopleDishes[dish]) {
            peopleDishes[dish] = [];
        }
        peopleDishes[dish].push(person);

        const list = document.getElementById('people-dishes-list');
        const listItem = document.createElement('div');
        listItem.textContent = `${person} shared ${dish}`;
        list.appendChild(listItem);

        document.getElementById('person').value = '';
        document.getElementById('dish').value = '';
    } else {
        alert("Please enter both a person's name and a dish.");
    }
}

function addDishCost() {
    const dishName = document.getElementById('dish-cost-name').value.trim();
    const cost = parseFloat(document.getElementById('dish-cost').value);

    if (dishName && !isNaN(cost)) {
        dishCosts[dishName] = cost;

        const list = document.getElementById('dish-costs-list');
        const listItem = document.createElement('div');
        listItem.textContent = `${dishName}: Rs.${cost.toFixed(2)}`;
        list.appendChild(listItem);

        document.getElementById('dish-cost-name').value = '';
        document.getElementById('dish-cost').value = '';
    } else {
        alert("Please enter a valid dish name and cost.");
    }
}

function calculateSplit() {
    const totalCosts = {};

    for (const dish in peopleDishes) {
        if (dish in dishCosts) {
            const costPerPerson = dishCosts[dish] / peopleDishes[dish].length;
            peopleDishes[dish].forEach(person => {
                if (!totalCosts[person]) {
                    totalCosts[person] = 0;
                }
                totalCosts[person] += costPerPerson;
            });
        }
    }

    const results = document.getElementById('results');
    results.innerHTML = '';
    for (const person in totalCosts) {
        const resultItem = document.createElement('div');
        resultItem.textContent = `${person} should pay: Rs.${totalCosts[person].toFixed(2)}`;
        results.appendChild(resultItem);
    }
}

// Event listeners for buttons
document.getElementById('add-person-dish-btn').addEventListener('click', addPersonDish);
document.getElementById('add-dish-cost-btn').addEventListener('click', addDishCost);
document.getElementById('calculate-split-btn').addEventListener('click', calculateSplit);
