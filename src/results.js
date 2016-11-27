import {bindable} from 'aurelia-framework';

export class ResultsCustomElement {
  @bindable questions;
  @bindable chosenAnswerIndices;
  
  bind() {
    this.calculateNumCorrect();
  }
  
  calculateNumCorrect() {
    this.numCorrect = this.questions.reduce((_numCorrect, question, index) => {
      return parseInt(this.chosenAnswerIndices[index], 10) === question.correct_answer ? _numCorrect + 1 : _numCorrect;
    }, 0);
  }
}
