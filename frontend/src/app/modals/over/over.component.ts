import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-over',
  templateUrl: './over.component.html',
  styleUrls: ['./over.component.scss']
})
export class OverComponent {
  @Input() name:string;
  @Input() showContent:any;
  @Output() saveChanges = new EventEmitter<any>();

  hide(){
    this.showContent.showForm = false;
  }
}
