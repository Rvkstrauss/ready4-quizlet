import {inject, bindingMode, bindable} from 'aurelia-framework';

@inject(Element)
export class QuestionCustomElement {
  
  @bindable question;
  @bindable({defaultBindingMode: bindingMode.twoWay}) chosenAnswerIndex;
  
  constructor(element) {
    this.element = element;
  }
  
  questionChanged() {
    this.chosenAnswerIndex = undefined;
  }
  
  next() {
    var event = new CustomEvent('next');
    this.element.dispatchEvent(event);
  }
}