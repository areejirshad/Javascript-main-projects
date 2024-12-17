const baseURL= "https://v6.exchangerate-api.com/v6/247d0d5f80520c9120e414f0/latest/";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const exchangeIcon=document.querySelector(".dropdown i");


for (let select of dropdown) {
    for (let currcode in countryList) {
        newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        
        if (select.name==="from" && currcode==="USD") {
            newOption.selected="selected";
        } else 
        if (select.name==="to" && currcode==="PKR") {
            newOption.selected="selected";
        } 
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    });
}
const changeFlag=(element)=>{
   let currcode=element.value;
   let countryCode=countryList[currcode];
   newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newSrc;

};
btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateRate();
    
});
    const updateRate= async()=>{
        let amount = document.querySelector(".amount input");
        let amtValue = amount.value;
    
        if (amtValue == "" || amtValue < 1) {
            amtValue = 1;
            amount.value = "1";
        }
    
        const fromCurrency = fromCurr.value;
        const toCurrency = toCurr.value;
        
        // Build the API URL with the selected base currency
        try {
            const URL = `${baseURL}${fromCurrency}`;
            const response=await fetch(URL);
            const data=await response.json();
            if (data.result === "success") {
                const rate=data.conversion_rates[toCurrency];
                let finalAmount=amtValue*rate;
                msg.innerText=`${amtValue}${fromCurrency}=${finalAmount}${toCurrency}`;
            } else {
                msg.innerText = "Error fetching exchange rate.";
            }
            
        } catch (error) {
            msg.innerHTML = "Error: Unable to connect to the API.";
            console.error(error);
        }
    }
    window.addEventListener('load',()=>{
        updateRate();
    })

exchangeIcon.addEventListener("click", () => {
    // Get current values of both select elements
    let tempValue = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = tempValue;
    
    // Trigger the change event to update flags
    changeFlag(fromCurr);
    changeFlag(toCurr);
    
    // Optionally, update the exchange rate after the swap
    updateRate();
});
  
 

  

