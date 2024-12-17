
let userscore = 0;
let compscore = 0;
const choices = document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
let userscorepara=document.querySelector('#user-score');
let compscorepara=document.querySelector('#comp-score');

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        console.log(userchoice);
        playgame(userchoice);
    });
});

const gencompchoice = () => {
    const items = ['Rock', 'Paper', 'Scissors'];
    const ranIdx = Math.floor(Math.random() * 3);
    return items[ranIdx];
};

const drawgame = () => {
  
    msg.innerText=`Game was draw!Play again!`;
    msg.style.backgroundColor="rgb(38, 36, 39)";
};

const showwinner = (userwin,userchoice,compchoice) => {
    if (userwin) {
        userscore++;
        userscorepara.innerText=userscore;
        msg.innerText=`You win! Your ${userchoice} beats ${compchoice}`;
        msg.style.backgroundColor="green";
    } else {
        compscore++;
        compscorepara.innerText=compscore;
        msg.innerText=`You lose! ${userchoice} beats Your ${compchoice}`;
        msg.style.backgroundColor="red";
    }
};

const playgame = (userchoice) => {
    console.log("User choice is", userchoice);
    const compchoice = gencompchoice();
    console.log("Computer choice =", compchoice);

    if (userchoice === compchoice) {
        drawgame();
    } else {
        let userwin = true;
        
        // Error 1: String values should be in lowercase or consistent with user choices
        // Error 2: The conditional checks in the `if` and `else if` blocks should be corrected
        if (userchoice === 'Rock') {
            userwin = compchoice === 'Paper' ? false : true;
        } else if (userchoice === 'Paper') {
            userwin = compchoice === 'Scissors' ? false : true;
        } else {  // Changed to `else if` from `else`
            userwin = compchoice === 'Rock' ? false : true;
        }

        showwinner(userwin,userchoice,compchoice);
    }
};
