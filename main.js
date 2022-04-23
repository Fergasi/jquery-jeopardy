//fetch jeopardy question object data from jeopardy.json file
const main = async () => {
    const httpResponse = await fetch("jeopardy.json");
    const data = await httpResponse.json();

    // query-selectors for dom elements
    const oneHundred = $(".100");
    const twoHundred = $(".200");
    const fourHundred = $(".400");
    const sixHundred = $(".600");
    const eightHundred = $(".800");

    const score = $("#score");
    const question = $("#question");
    const answer = $("#answer");
    const form = $("#form");
    const message = $("#message");

    // establish variables
    let randomObject = 0;
    let isClicked = false;
    let buttonEnable = true;
    let doubleAnswer = false;

    // manage and diplay scores
    let scoreTotal = localStorage.getItem("scoreTotal");
    if (scoreTotal === null) {
        scoreTotal = 0;
        score.text(`$${Number(scoreTotal)}`);
    }
    else {
        score.text(`$${Number(scoreTotal)}`);
    }

    // function to pull random jeopardy question
    const randomQuestion = function (value) {
        randomObject = data[Math.ceil(Math.random() * data.length - 1)];
        while (randomObject.value !== value) {
            randomObject = data[Math.ceil(Math.random() * data.length - 1)];
        }
        console.log(randomObject);
        question.text(`${randomObject.question}?`);
    }

    // event-listeners for different $ value question brackets
    
    // listener for $100 Q's
    oneHundred.on("click", (event) => {
        if (isClicked === false) {
            if ($(event.target).hasClass("disable")) {
            }
            else {
                randomQuestion("$100");
                $(event.target).text("");
                $(event.target).addClass("disable");
                isClicked = true;
                buttonEnable = true;
                doubleAnswer = false;
                answer.val("");
            }
        }
    })
    // listener for $200 Q's
    twoHundred.on("click", (event) => {
        if (isClicked === false) {
            if ($(event.target).hasClass("disable")) {
            }
            else {
                randomQuestion("$200");
                $(event.target).text("");
                $(event.target).addClass("disable");
                isClicked = true;
                buttonEnable = true;
                doubleAnswer = false;
                answer.val("");
            }
        }
    })
    // listener for $400 Q's
    fourHundred.on("click", (event) => {
        if (isClicked === false) {
            if ($(event.target).hasClass("disable")) {
            }
            else {
                randomQuestion("$400");
                $(event.target).text("");
                $(event.target).addClass("disable");
                isClicked = true;
                buttonEnable = true;
                doubleAnswer = false;
                answer.val("");
            }
        }
    })
    // listener for $600 Q's
    sixHundred.on("click", (event) => {
        if (isClicked === false) {
            if ($(event.target).hasClass("disable")) {
            }
            else {
                randomQuestion("$600");
                $(event.target).text("");
                $(event.target).addClass("disable");
                isClicked = true;
                buttonEnable = true;
                doubleAnswer = false;
                answer.val("");
            }
        }
    })
    // listener for $800 Q's
    eightHundred.on("click", (event) => {
        if (isClicked === false) {
            if ($(event.target).hasClass("disable")) {
            }
            else {
                randomQuestion("$800");
                $(event.target).text("");
                $(event.target).addClass("disable");
                isClicked = true;
                buttonEnable = true;
                doubleAnswer = false;
                answer.val("");
            }
        }
    })

    // conditon and event listener for the submit button
    if (buttonEnable === true) {
        form.on("submit", (event) => {
            event.preventDefault();

            let currentScore = randomObject.value.substring(1);

            // function to manage correct answer
            const correctAnswer = () => {
                scoreTotal = Number(scoreTotal) + Number(currentScore);
                question.text(`Correct! + $${currentScore}`);
                answer.val("");
                score.text(`$${Number(scoreTotal)}`);
                localStorage.setItem("scoreTotal", scoreTotal);
                isClicked = false;
                buttonEnable = false;
            }

            // function to manage incorrect answer
            const incorrectAnswer = () => {
                scoreTotal = Number(scoreTotal);
                score.text(`$${scoreTotal}`);
                question.text(`Incorrect! The correct answer is: ${randomObject.answer}`);
                answer.val("");
                localStorage.setItem("scoreTotal", scoreTotal);
                isClicked = false;
                buttonEnable = false;
            }

            // conditions to verify correct/incorrect input answers vs object answer, and if first attempt at asnwering (check boolean to prevent re-entering input after answer is exposed)
            if (answer.val().toString() === randomObject.answer.toString() && doubleAnswer === false) {
                correctAnswer();
                message.text('');
                doubleAnswer = true;
            }
            else {
                // condition to manage invalid inputs
                if (answer.val().toString() === undefined) {
                    message.text('(please enter a valid answer)');
                }
                // condition to manage invalid inputs
                else if (answer.val().toString() === "") {
                    message.text('(please enter a valid answer)');
                }
                // if input is valid and is first attempt at asnwering (check boolean to prevent re-entering input after answer is exposed), but answer is wrong
                else if (doubleAnswer === false){
                    incorrectAnswer();
                    message.text('');
                    doubleAnswer = true;
                }
            }
        })
    }
    
    // Event listener for Reset button 
    form.on("reset", (event) => {
        event.preventDefault();
        resetGame();
    })
    
    
}

// Function for Reset button 
function resetGame() {
    localStorage.clear();
    location.reload();
};

main();