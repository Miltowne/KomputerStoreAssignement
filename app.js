const getALoanButtonElement = document.getElementById("getLoanbtn");
const salaryPayButtonElement = document.getElementById("salarybtn");
const workButtonElement = document.getElementById("workbtn");
const repayLoanButtonElement = document.getElementById("repayLoanbtn");
const laptopSelectionAreaElement = document.getElementById("laptopSelectionArea");
const balanceElement = document.getElementById("balance");
const featuresElement = document.getElementById("features");
const payElement = document.getElementById("pay");
const deptElement = document.getElementById("dept");
const buyNowElement = document.getElementById("buyNow");
const imageElement = document.getElementById("image");
const headlinerElement = document.getElementById("headliner");
const titleElement = document.getElementById("titleComputer");
const breadElement = document.getElementById("breadComputer");





let salary = 0;
let balance = 0;
let dept = 0;
let computerInfos = [];
let features = [];
let buyComputerId = 0;


const updateBalance = () =>{
    balanceElement.innerText = `Your Balance: ${balance}`;
}

const updateSalary = () =>{
    payElement.innerText = `Total Salary: ${salary}`;
}

const updateDept = () =>{
    deptElement.innerText = `Total Dept: ${dept}`;
}



const getALoan = () => {
    const loan = prompt(`Enter amount of loan you want to take: `);
    if(loan < 0){
        alert("no free money here, my good sir")
    }
    else if(loan > salary * 2){
        alert("You cannot take more than double the amount of your salary")
    }
    else if(dept != 0){
        alert("You cannot take a new loan until you started paying back for the other loan");
    }
    else if(isNaN(loan)){
        console.log("is NaN")
    }
    else{
        console.log(loan)
        balance += parseInt(loan);
        dept += parseInt(loan);
        updateBalance();
        updateDept();
        repayLoanButtonElement.hidden = false;
    }
}

const salaryPay = () => {
    if(dept > 0){
        if(dept < salary * 0.1){
            balance = salary - dept;
            dept = 0;
            salary = 0;
            updateSalary();
            updateDept();
            updateBalance();
        }
        else{
            const procentValue = salary * 0.1;
            dept -= procentValue;
            salary -= procentValue;
            balance += salary;
            salary = 0;
            updateSalary();
            updateDept();
            updateBalance();
        }  
    }
    else{
        balance += salary;
        salary = 0;
        updateBalance();
        updateSalary();
    }
}

function work() { 
    salary += 100;
    updateBalance();
    updateSalary();
}

const repayLoan = () => {
    if(dept <= 0){
        alert("you dont have any dept");
    }
    else if(balance > dept){
        const payBackAmount = balance - dept;
        balance = payBackAmount;
        dept = 0;
        updateBalance();
        updateDept();
    }
    else{
        dept -= balance;
        balance = 0;
        updateSalary();
        updateDept();
        updateBalance();

    }
}

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
.then(response => response.json())
.then(data => computers = data)
    .then(computers => computerInfo(computers));
    
    const computerInfo = (computers) => {
        computerInfos = this.computers;
        firstTimeOpen(computers);
        // headlinerComputer();
        for (const computer of computers) {
            laptopElement = document.createElement("option");
            laptopElement.value = computer.title;
            laptopElement.appendChild(document.createTextNode(computer.title));
            laptopSelectionAreaElement.appendChild(laptopElement);
            
        }
        
    }

    const handleComputerMenuChange = e => {
        featuresElement.replaceChildren([]);
        const selectedComputer = computers[e.target.selectedIndex];
        buyComputerId = e.target.selectedIndex;
        features.push(selectedComputer.specs[0])
        features.push(selectedComputer.specs[1])
        features.push(selectedComputer.specs[3])
        features.push("Price: " + selectedComputer.price + " Kr")
        getImage(selectedComputer);
        titleComputer(selectedComputer);
        for (const feature of features) {
            const computerFeaturesElement = document.createElement("li");
            computerFeaturesElement.innerText = feature;
            computerFeaturesElement.className = "list-group-item";
            featuresElement.appendChild(computerFeaturesElement);
        }
        features = [];
    }

    const titleComputer = (selectedComputer) => {
        titleElement.innerText = selectedComputer.title;
        breadComputer.innerText = selectedComputer.description;
    }

    const getImage = (selectedComputer) => {
        imageElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedComputer.image;
    }

    const firstTimeOpen = (computers) => {
        const selectedComputer = computers[0];
        features.push(selectedComputer.specs[0])
        features.push(selectedComputer.specs[1])
        features.push(selectedComputer.specs[2])
        features.push("Price: " + selectedComputer.price + " Kr")
        getImage(selectedComputer);
        titleComputer(selectedComputer);
        for (const feature of features) {
        const computerFeaturesElement = document.createElement("li");
            computerFeaturesElement.innerText = feature;
            computerFeaturesElement.className = "list-group-item";

            featuresElement.appendChild(computerFeaturesElement);
        }
        features = [];
    }

    // function headlinerComputer(){
    //     const computerHead = computerInfos[buyComputerId];
    //     const imgHeadElement = document.createElement("img");
    //     const headlineHeadElement = document.createElement("h1");
    //     const pHeadElement = document.createElement("p");
    //     const h2HeadElement = document.createElement("h2");

    //     imgHeadElement.src = "https://noroff-komputer-store-api.herokuapp.com/assets/images/1.png"
    //     headlineHeadElement.innerText = computerHead.title;
    //     pHeadElement.innerText = computerHead.specs[4];
    //     h2HeadElement.innerText = "Price: " + computerHead.price

    //     headlineHeadElement.className = "float-left";

    //     headlinerElement.appendChild(imgHeadElement);
    //     headlinerElement.appendChild(headlineHeadElement);
    //     headlinerElement.appendChild(pHeadElement);
    //     headlinerElement.appendChild(h2HeadElement);
    // }


    const buyNow = () => {
        const buyComputer = computerInfos[buyComputerId];
        const price = parseInt(buyComputer.price);
        if(balance >= price){
            balance -= price;
            updateBalance();
            alert("You now own this computer!")
        }
        else{
            alert("You cannot afford this computer")
        }    
    }


getALoanButtonElement.addEventListener("click", getALoan);
salaryPayButtonElement.addEventListener("click", salaryPay);
workButtonElement.addEventListener("click", work);
repayLoanButtonElement.addEventListener("click", repayLoan);
laptopSelectionAreaElement.addEventListener("change", handleComputerMenuChange);
buyNowElement.addEventListener("click", buyNow)



