import {bindable} from 'aurelia-framework';

export class ResultsCustomElement {
  @bindable questions;
  @bindable chosenAnswerIndexes;
  
  bind() {
    this.calculateNumCorrect();
  }
  
  calculateNumCorrect() {
    this.numCorrect = this.questions.reduce((_numCorrect, question, questionIndex) => {
      return parseInt(this.chosenAnswerIndexes[questionIndex], 10) === question.correct_answer - 1 ? _numCorrect + 1 : _numCorrect;
    }, 0);
  }
}