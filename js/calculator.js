/**
 * Калькулятор питания и БЖУ
 * Формула Mifflin-St Jeor для расчёта BMR
 */

function calculateNutrition(event) {
    if (event) {
        event.preventDefault();
    }

    const gender = document.getElementById("gender").value;
    const age = Number(document.getElementById("age").value);
    const weight = Number(document.getElementById("weight").value);
    const height = Number(document.getElementById("height").value);
    const activity = Number(document.getElementById("activity").value);
    const goal = document.getElementById("goal").value;

    const errorEl = document.getElementById("error");
    const resultEl = document.getElementById("result");

    if (age <= 0 || weight <= 0 || height <= 0 || age > 120 || weight > 300 || height > 250) {
        errorEl.textContent = "Пожалуйста, введите корректные значения: возраст, вес и рост.";
        errorEl.classList.add("visible");
        resultEl.classList.remove("visible");
        return;
    }

    errorEl.classList.remove("visible");

    let bmr;

    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let calories = bmr * activity;

    if (goal === "lose") {
        calories *= 0.8;
    } else if (goal === "gain") {
        calories *= 1.15;
    }

    calories = Math.round(calories);

    const protein = Math.round(weight * 2);
    const fat = Math.round(weight * 0.9);
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);

    document.getElementById("calories").innerHTML =
        `<b>Ваша дневная норма:</b> ${calories} ккал`;
    document.getElementById("protein").textContent = protein;
    document.getElementById("fat").textContent = fat;
    document.getElementById("carbs").textContent = Math.max(carbs, 0);

    resultEl.classList.add("visible");
    resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("nutrition-form");
    if (form) {
        form.addEventListener("submit", calculateNutrition);
    }
});
