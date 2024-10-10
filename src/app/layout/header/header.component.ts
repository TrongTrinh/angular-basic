import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-layout-header-content',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderContentComponent {}

@Component({
  selector: 'app-layout-header-bottom',
  standalone: true,
  imports: [],
  template: `
    <button (click)="notifyParent()">Notify Parent</button>

    @if(isShowMessage){
    {{ message }}
    } @else { No Message }
  `,
})
export class HeaderBottomComponent {
  @Input({ transform: booleanAttribute }) isShowMessage = false;
  @Input() message!: string;
  @Output('customValueChanged') actualValueChanged = new EventEmitter<any>();

  notifyParent() {
    this.actualValueChanged.emit('Hello from Child Component 111!');
  }
}

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [HeaderContentComponent, HeaderBottomComponent],
  template: `
    <app-layout-header-content />
    <app-layout-header-bottom
      [message]="message"
      [isShowMessage]="isShowMessage"
      (customValueChanged)="onCustomValueChanged($event)"
    />
  `,
})
export class HeaderComponent {
  message = 'From parent';
  isShowMessage = null;

  onCustomValueChanged(message: any) {
    console.log(
      '🚀 ~ HeaderComponent ~ onCustomValueChanged ~ message:',
      message
    );
  }
}
