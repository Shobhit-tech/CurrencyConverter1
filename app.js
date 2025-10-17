// const BASE_URL = "https://www.amdoren.com/api/currency.php?api_key=RN8GU6C3HukHJNYVt5hLY9xSRAKGF6&from=USD&to=INR&amount=1";
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
// const amount = document.querySelector(".amount input");
// const amtValue = amount.value;

for(let select of dropdowns){
    for(currCode in countryList){
        // console.log(code, countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name == "from" && currCode == "USD"){
            newOption.selected = "selected";
        }
        else if(select.name == "to" && currCode == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change" ,(evt) =>{
        updateFlag(evt.target);
    });
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

button.addEventListener("click",e =>{
    e.preventDefault();
    getExchangeRate();
});

const updateFlag=(element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

function getExchangeRate(){
    let amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector("form .message")
    let amtValue = amount.value;
    if(amtValue === ""|| amtValue<1){
        amtValue = 1;
        amount.value = "1";
    }
    exchangeRateTxt.innerText = "Getting Exchange Rate Ready....."
    // console.log(fromCurr.value, toCurr.value);
    let URL = `https://v6.exchangerate-api.com/v6/1700fe8a3cbae797fac1b9d7/latest/${fromCurr.value.toLowerCase()}`;
    fetch(URL).then(response =>response.json()).then(result => {
        let ExchangeRate = result.conversion_rates[toCurr.value];
        // console.log(ExchangeRate); 
        let TotalExchangeRate = (amtValue * ExchangeRate).toFixed(2);
        // console.log(TotalExchangeRate);
        const exchangeRateTxt = document.querySelector(".message");
        exchangeRateTxt.innerText = `${amtValue} ${fromCurr.value} = ${TotalExchangeRate} ${toCurr.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went wrong";
    })
   
}