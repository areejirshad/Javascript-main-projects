const endDate="20 April 2025 11:05 PM";
document.querySelector("#end-date").innerText=endDate;
const input=document.querySelectorAll("input");
function time() {
    const end= new Date(endDate);
    const now=new Date();
   
    const diff=(end-now)/1000;
    if (diff<0) return;
    input[0].value=Math.floor(diff/3600/24);
    input[1].value=Math.floor(diff/3600)%24;
    input[2].value=Math.floor(diff/60)%60;
    input[3].value=Math.floor(diff)%60;
    
    
};
setInterval(()=>{
    time();
},1000);
