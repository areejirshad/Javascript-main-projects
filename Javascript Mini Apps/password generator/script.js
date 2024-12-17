const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerSet = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbolChars = "!@#$%^&*()_+{}[]";

const passbox = document.querySelector("#passbox");
const upperInput = document.querySelector("#uppercase");
const lowerInput = document.querySelector("#lowercase");
const numberInput = document.querySelector("#numbers");
const symbolInput = document.querySelector("#symbols");
const totalchars = document.querySelector("#total-char");

const getrandomdata = (dataset) => {
    return dataset[Math.floor(Math.random() * dataset.length)];
}

const getpassword = (password = '') => {
    if (upperInput.checked) {
        password += getrandomdata(upperSet);
    }
    if (lowerInput.checked) {
        password += getrandomdata(lowerSet);
    }
    if (numberInput.checked) {
        password += getrandomdata(numbers);
    }
    if (symbolInput.checked) {
        password += getrandomdata(symbolChars);
    }
    if (password.length < totalchars.value) {
        return getpassword(password);
    }
    passbox.value = truncateString(password, totalchars.value);
}

function truncateString(str, num) {
    if (str.length > num) {
        let subStr = str.substring(0, num);
        return subStr;
    } else {
        return str;
    }
}

document.querySelector("#btn").addEventListener("click", function () {
    getpassword();
});
