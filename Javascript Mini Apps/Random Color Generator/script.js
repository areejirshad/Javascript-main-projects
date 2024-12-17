const colorchange=()=>{
    const randomnum=Math.floor(Math.random()*16777215);
    const randomcode="#"+randomnum.toString(16);
    document.body.style.backgroundColor=randomcode;
    document.querySelector("#colorcode").innerText=randomcode;
    document.querySelector("#btn").style.backgroundColor=randomcode;
    console.log(randomcode);
    
    navigator.clipboard.writeText(randomcode).then(() => {
        // Show confirmation message
        const copyMessage = document.querySelector("#copyMessage");
        copyMessage.classList.remove("hidden");
        
        // Hide the message after 2 seconds
        setTimeout(() => {
            copyMessage.classList.add("hidden");
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
document.querySelector("#btn").addEventListener("click",colorchange);
colorchange();
