// import {
//   booleanAttribute,
//   Component,
//   EventEmitter,
//   Input,
//   Output,
// } from '@angular/core';

// @Component({
//   selector: 'app-layout-header-content',
//   standalone: true,
//   imports: [],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css',
// })
// export class HeaderContentComponent {}

// @Component({
//   selector: 'app-layout-header-bottom',
//   standalone: true,
//   imports: [],
//   template: `
//     <button (click)="updateCount(1)">Notify Parent</button>
//     <span>{{ count }}</span>
//     @if(isShowMessage){
//     {{ message }}
//     } @else { No Message }
//   `,
// })
// export class HeaderBottomComponent {
//   @Input({ transform: booleanAttribute }) isShowMessage = false;
//   @Input() message!: string;
//   @Output('customValueChanged') actualValueChanged = new EventEmitter<any>();

//   @Input() count: number = 1;
//   @Output() countChange = new EventEmitter<number>();

//   updateCount(amount: number): void {
//     this.count += amount;
//     this.countChange.emit(this.count);
//   }
// }

// @Component({
//   selector: 'app-layout-header',
//   standalone: true,
//   imports: [HeaderContentComponent, HeaderBottomComponent],
//   template: `
//     <app-layout-header-content />

//     <h1>Counter: {{ initialCount }}</h1>
//     <app-layout-header-bottom
//       [message]="message"
//       [isShowMessage]="isShowMessage"
//       (customValueChanged)="onCustomValueChanged($event)"
//       [(count)]="initialCount"
//     />
//   `,
// })
// export class HeaderComponent {
//   message = 'From parent';
//   isShowMessage = null;
//   initialCount = 1;

//   onCustomValueChanged(message: any) {
//     console.log(
//       '🚀 ~ HeaderComponent ~ onCustomValueChanged ~ message:',
//       message
//     );
//   }
// }

// './counter/counter.component.ts';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  TitleCasePipe,
} from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
  TemplateRef,
  viewChild,
  ViewChild,
} from '@angular/core';
import { FormatToVnd } from '../../shared/convertToVnd';
import { HighlightDirective } from '../../highlight.directive';

@Component({
  selector: 'shopping-cart',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TitleCasePipe, FormatToVnd],
  template: `
    <main>
      <!-- Transform the company name to title-case and
       transform the purchasedOn date to a locale-formatted string -->
      <h1>
        Purchases from {{ company | titlecase }} on {{ purchasedOn | date }}
      </h1>
      <!-- Transform the amount to a currency-formatted string -->
      <p>Total: {{ amount | formatVND }}</p>
    </main>
  `,
})
export class ShoppingCartComponent {
  amount = '123.45';
  company = 'acme corporation';
  purchasedOn = '2024-07-08';
}

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <button (click)="updateCount(-1)">-</button>
    <span>{{ count }}</span>
    <button (click)="updateCount(+1)">+</button>
  `,
})
export class CounterComponent {
  @Input() count: number = 0;
  @Output() countChange = new EventEmitter<number>();
  updateCount(amount: number): void {
    this.count += amount;
    this.countChange.emit(this.count);
  }
}

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [
    CounterComponent,
    ShoppingCartComponent,
    CommonModule,
    HighlightDirective,
  ],
  template: `
    <main>
      <!-- <h1>Counter: {{ initialCount }}</h1>
      <input type="text" (keyup.enter)="updateField()" />
      <app-counter [(count)]="initialCount"></app-counter>
      <shopping-cart /> 
      <ng-template #fragmentOne>
        <p>This is one template fragment</p>
      </ng-template>
      <ng-template #fragmentTwo>
        <p>This is another template fragment</p>
      </ng-template>
      <h2>Your profile</h2>
      <button [class]="classSection" (click)="changeTemplate()">trong</button>
      <ng-container *ngTemplateOutlet="profileTemplate()" />
      <ng-template #admin>This is the admin profile</ng-template>
      <ng-template #basic>This is the basic profile</ng-template> -->
      <p appHighlight>Highlight me!</p>
    </main>
  `,
})
export class HeaderComponent {
  disabled: boolean = true;
  classSection = ['expandable', 'elevated'];

  private _initialCount = 18;

  // Sử dụng getter và setter cho biến initialCount
  get initialCount(): number {
    return this._initialCount;
  }

  set initialCount(value: number) {
    this._initialCount = value;
  }

  updateField(): void {
    console.log('The user pressed enter in the text field.');
  }

  // When querying by name, you can use the `read` option to specify that you want to get the
  // TemplateRef object associated with the element.
  @ViewChild('fragmentOne', { read: TemplateRef }) fragmentOne:
    | TemplateRef<unknown>
    | undefined;
  @ViewChild('fragmentTwo', { read: TemplateRef }) fragmentTwo:
    | TemplateRef<unknown>
    | undefined;

  isAdmin = input<boolean>(false);

  adminTemplate = viewChild('admin', { read: TemplateRef });
  basicTemplate = viewChild('basic', { read: TemplateRef });
  profileTemplate = computed((): any =>
    this.isAdmin() ? this.adminTemplate() : this.basicTemplate()
  );
  changeTemplate() {
    console.log(
      '🚀 ~ HeaderComponent ~ changeTemplate ~ this.isAdmin:',
      this.isAdmin
    );
  }
}
