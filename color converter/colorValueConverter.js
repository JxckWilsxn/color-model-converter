/*
1. Write a function that converts HEX to RGB
2. Make that function auto-dect the formats so that if you enter HEX color format it returns RGB vice versa.
*/

const colorModel = document.getElementById('RGB-HEX');

const userRedInput = document.getElementById('red-input');
const userGreenInput = document.getElementById('green-input');
const userBlueInput = document.getElementById('blue-input');

const convertBtn = document.getElementById('convertBtn');
const resetBtn = document.getElementById('resetBtn');

const answer = document.getElementById('convertAnswer');

const colorBar = document.getElementById('colorBar');

const userInput = {
    userRedInput,
    userGreenInput,
    userBlueInput
}

rgbToHexConverter = () => {
    answer.innerHTML = "#";

    Object.keys(userInput).forEach((item) => {
        let num = parseInt(userInput[item].value);

        if (isNaN(num) || num < 0 || num > 255) {
            answer.innerHTML = "Please enter a valid input between 0 & 255. "
            reload();
        }

        let hexNums = num.toString(16).toUpperCase();
        answer.innerHTML += hexNums;
      
    });
    colorBar.style.backgroundColor = answer.innerHTML;
}       
/*
            RGBvalue[0] = Math.trunc(userInput[item].value / 16);
            RGBvalue[1] = userInput[item].value % 16;
        

            for (let index = 0; index < 3; index++) {

                if (RGBvalue[index] < 10) {
                    console.log(RGBvalue[index])
                    answer.innerHTML += RGBvalue[index]; 
                } else {
                    let hexValue = 65;
                    for (let i = 10; i <= 15; i++) {
                        if (RGBvalue[index] === i) {
                            console.log(String.fromCharCode(hexValue))
                            answer.innerHTML += String.fromCharCode(hexValue); 
                        } else {
                            hexValue++;
                        }
                    }
                }
            }
*/

hexToRgbConverter = () => {
    
    answer.innerHTML = "RGB(";

    let rgbValues = Object.keys(userInput).map((item) =>
        parseInt(userInput[item].value, 16)
    );

    answer.innerHTML += rgbValues.join(", ") + ")";
    colorBar.style.backgroundColor = answer.innerHTML;
}

colorModel.addEventListener('change', () => {
    Object.keys(userInput).forEach((item) => {
        userInput[item].value = "";
    
        answer.innerHTML = "";

        if (colorModel.value === 'RGB') {
            userInput[item].maxLength = 3;
            userInput[item].style.width = '110px';
            userRedInput.placeholder = 'RRR';
            userGreenInput.placeholder = 'GGG';
            userBlueInput.placeholder = 'BBB';

        } else if (colorModel.value === 'HEX') {
                userInput[item].maxLength = 2;
                userInput[item].style.width = '70px';
                userRedInput.placeholder = 'RR';
                userGreenInput.placeholder = 'GG';
                userBlueInput.placeholder = 'BB';
            }
        });
});

const inputs = document.querySelectorAll('input');
inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length >= input.maxLength) {
            const next = inputs[index + 1];
            if (next) {
                next.focus()
            };
        }
    })
})

convertBtn.addEventListener('click', () => {
    if (colorModel.value === 'RGB') {
        rgbToHexConverter();
    } else if (colorModel.value === 'HEX') {
        hexToRgbConverter();
    } else {
        alert("please select a HEX or RGB format")
    }
});

resetBtn.addEventListener('click', () => {
    inputs.forEach((input) => {
        input.value = '';
    });
    answer.innerHTML = '';
    colorBar.style.backgroundColor = '';
});
