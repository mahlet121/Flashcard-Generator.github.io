//  incorporating an npm package for prompt question and answers.
var inquirer = require("inquirer");
//incorporating Basiccard.js file to grab constractive function
var BasicCard = require("./BasicCard.js");
//incorporating flashcard.json to grab question and answer array
var flashcard = require("./flashcard.json");
//function to grab questions from flashcard array
var question = function(card) {
    //set variable getQuest to be Basiccard object and initialize it in askQuestion
    var getQuest = new BasicCard(card.front, card.back);
    return getQuest.front;
};
//set variable count 0 to start from zero
var count = 0;
// variable to grab correct answers score 
var scoreCorrect = 0;
// variable to grab correct answers score 
var scoreIncorrect = 0;
//function to prompt question and grab answers
function askQuestion() {
    //prompt the question until count be 5 or until all question prompted
    if (count < 5) {
        //set variable to grab all questions from the flashcard array
        var quest = question(flashcard[count]);
        //inquirer used to ask the question from the flashcard.
        inquirer.prompt([{
            type: "input",
            name: "question",
            message: quest + "\nAnswer:"

        }]).then(function(answer) {
            //compair user answer and answers from array after converting to lowercase
            if (answer.question.toLowerCase() === flashcard[count].back) {
                //if the user answer is correct add one in scoreCorrect
                scoreCorrect++;
                console.log("You are correct!");
                console.log("---------------------");
            } else {
                //else add one in to scoreIncorrect
                scoreIncorrect++;
                //log the correct answer
                console.log("Incorrect! The correct answer is" + "'" + flashcard[count].back.toUpperCase() + "'" + ".");
                console.log("---------------------");
            }
            // add one in count to get all questions asked
            count++;
            //call function to run agin 
            askQuestion();


        });

    }
    //if count is 0 show the score result and ask them if they want to paly again
    else {
        console.log("Game Over!");
        console.log("Your Score is:" + scoreCorrect);
        console.log("You miss:" + scoreIncorrect);
        //inquirer used to ask they want play again or not
        inquirer.prompt([{
            type: "confirm",
            name: "choice",
            message: "play again?"

        }]).then(function(answer) {
            //if the answer is yes set everything to 0 and run function again
            if (answer.choice === true) {
                count = 0;
                scoreCorrect = 0;
                scoreIncorrect = 0;
                askQuestion();
            } else {
                console.log("Thanks for playing!\nGoodbye!");
            }
        });
    }


};
//call function to start the question
askQuestion();