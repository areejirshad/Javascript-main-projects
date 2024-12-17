let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newbtn=document.querySelector("#new-btn");
let msg=document.querySelector(".msg");
let msgcontain=document.querySelector(".msg-container")
turn0=true;
const winpatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    
];
const resetbutton=()=>{
    turn0=true;
    msgcontain.classList.add("hide")
    enableboxes();
}
const enableboxes=()=>{
    for (let box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
}

const disableboxes=()=>{
    for (let box of boxes) {
        box.disabled=true;
    }
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulation! Winner is ${winner}`;
    msgcontain.classList.remove("hide");
    disableboxes();

}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log('box was clicked');
    if (turn0) {
        box.innerText='O';
        turn0=false;
       
    } else {
        box.innerText='X';
        turn0=true;
        
    }
    box.disabled=true;
    checkWinner();
    })
})
const checkWinner=()=>{
    for (let patterns of winpatterns) {
        let posVal1=boxes[patterns[0]].innerText;
        let posVal2=boxes[patterns[1]].innerText;
        let posVal3=boxes[patterns[2]].innerText;
        if(posVal1!="" && posVal2!="" && posVal3!=""){
            if (posVal1==posVal2 && posVal3==posVal2) {
               console.log("winner" ,posVal1);
               showWinner(posVal1);
            }
        }
    
    }
    
};
resetbtn.addEventListener("click",resetbutton);
newbtn.addEventListener("click",resetbutton);
