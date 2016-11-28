import {questions} from './questions';

export class App {
  activate() {
    this.startOver();
    this.questions = questions;
  }
  
  next() {
    this.chosenAnswerIndexes.push(this.chosenAnswerIndex);
    this.currentQuestionIndex++;
  }
  
  startOver() {
    this.chosenAnswerIndexes = [];
    this.currentQuestionIndex = 0;
    this.chosenAnswerIndex = undefined;
  }
}