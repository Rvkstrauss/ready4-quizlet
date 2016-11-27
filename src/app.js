import {questions} from './questions';

export class App {
  activate() {
    this.startOver();
    this.questions = questions;
  }
  
  next() {
    this.chosenAnswerIndices.push(this.answerIndex);
    this.currentQuestionIndex++;
  }
  
  startOver() {
    this.chosenAnswerIndices = [];
    this.currentQuestionIndex = 0;
    this.answerIndex = undefined;
  }
}
