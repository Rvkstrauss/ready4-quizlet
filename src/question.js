import {inject, bindingMode, bindable} from 'aurelia-framework';

@inject(Element)
export class QuestionCustomElement {
  
  @bindable question;
  @bindable({defaultBindingMode: bindingMode.twoWay}) answerIndex;
  
  constructor(element) {
    this.element = element;
  }
  
  questionChanged() {
    this.answerIndex = undefined;
  }
  
  next() {
    var event = new CustomEvent('next');
    this.element.dispatchEvent(event);
  }
}
