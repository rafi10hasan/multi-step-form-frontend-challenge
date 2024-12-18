const allNumberBtn = document.querySelectorAll(".number-btn");
const allInfo = document.querySelectorAll(".your-info");
const allNextButton = document.querySelectorAll(".next-btn");
const allPrevButton = document.querySelectorAll(".prev-btn");
const checkbox = document.getElementById("checkbox");
const allPlan = document.querySelectorAll(".plan");
const allServicesCheckbox = document.querySelectorAll(".services-checkbox");
const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let currentInfo = e.currentTarget.parentElement.nextElementSibling;
  let currentNumber = allNumberBtn[1];
  classAddOrRemove(currentInfo, currentNumber);
});

function classAddOrRemove(currentInfo, currentNumber) {
  allInfo.forEach((info) => {
    info.classList.remove("active");
  });
  allNumberBtn.forEach((num) => {
    num.classList.remove("active");
  });

  currentInfo.classList.add("active");
  currentNumber.classList.add("active");
}

allNextButton.forEach((nextBtn, index) => {
  nextBtn.addEventListener("click", (e) => {
    let currentInfo = e.currentTarget.parentElement.parentElement.nextElementSibling;
    let currentNumber = allNumberBtn[index + 2];
    classAddOrRemove(currentInfo, currentNumber);
    console.log(index);
    if (index === 1) {
      summary();
    }
  });
});

allPrevButton.forEach((prevBtn, index) => {
  prevBtn.addEventListener("click", (e) => {
    let currentInfo = e.currentTarget.parentElement.parentElement.previousElementSibling;
    let currentNumber = allNumberBtn[index];
    classAddOrRemove(currentInfo, currentNumber);
  });
});

document.getElementById("toggle-btn").addEventListener("click", () => {
  let currentActivePlan = document.querySelector(".plan-section");
  let currentAddOns = document.querySelector(".add-ons-plan");
  if (checkbox.checked) {
    currentActivePlan.classList.remove("active");
    currentActivePlan.nextElementSibling.classList.add("active");
    currentAddOns.classList.remove("active");
    currentAddOns.nextElementSibling.classList.add("active");
  } else {
    currentActivePlan.classList.add("active");
    currentActivePlan.nextElementSibling.classList.remove("active");
    currentAddOns.classList.add("active");
    currentAddOns.nextElementSibling.classList.remove("active");
  }
  allPlan.forEach((plan) => plan.classList.remove("active"));
  allServicesCheckbox.forEach((checkbox) => (checkbox.checked = false));
});

allPlan.forEach((plan) => {
  plan.addEventListener("click", () => {
    allPlan.forEach((p) => {
      if (p === plan) {
        plan.classList.toggle("active");
      } else {
        p.classList.remove("active");
      }
    });
  });
});

function summary() {
  let addOnsSection = document.getElementById("selected-add-ons");
  let totalPrice = document.getElementsByClassName("total-price")[0].children;
  addOnsSection.innerHTML = "";
  let total = [];
  let activePlan = document.querySelectorAll(".plan.active")[0].children;
  let price = activePlan[2].firstElementChild.innerText;
  total.push(parseInt(price));
  let selectedPaln = document.getElementsByClassName("selected-plan")[0].children;
  selectedPaln[0].innerText = checkbox.checked
    ? `${activePlan[1].innerText}(yearly)`
    : `${activePlan[1].innerText}(monthly)`;
  selectedPaln[1].innerText = checkbox.checked ? `$${price}/yr` : `$${price}/mo`;
  allServicesCheckbox.forEach((checkbox) => {
    if (checkbox.checked) {
      let selectedAddOns = checkbox.parentElement.nextElementSibling.children;
      let selectedPrice = checkbox.parentElement.parentElement.nextElementSibling.children[0];
      total.push(parseInt(selectedPrice.firstElementChild.innerText));
      const div = document.createElement("div");
      div.classList.add("add-ons");
      div.innerHTML = `
            <h4>${selectedAddOns[0].innerText}</h4>
            <span>${selectedPrice.textContent}</span>
            `;

      addOnsSection.appendChild(div);
    }
  });

  let sum = total.reduce((acc, curr) => (acc += curr));
  totalPrice[0].innerText = checkbox.checked ? `Total(per year)` : `Total(Per Month)`;
  totalPrice[1].innerText = checkbox.checked ? `$${sum}/yr` : `$${sum}/mo`;
}

document.getElementById("confirm-btn").addEventListener("click", () => {
  let currentInfo = document.querySelector(".your-info.active");
  currentInfo.classList.remove("active");
  currentInfo.nextElementSibling.classList.add("active");
});
