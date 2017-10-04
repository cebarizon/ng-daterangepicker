Angular DateRange Picker
---

This date range picker is a fork of project https://github.com/jkuri/ng-daterangepicker

This project has been adapted to accept location and have range option today's date.

### Installation

```sh
npm install ng-daterangepicker --save
```

### Example

```ts
import { NgDateRangePickerModule } from 'ng-daterangepicker';

// app.module.ts
@NgModule({
  ...
  imports: [ ..., NgDateRangePickerModule, ... ],
  ...
})
export class AppModule { }
```

```ts
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  options: NgDateRangePickerOptions;

  ngOnInit() {
    this.options = {
	  theme: 'default',
	  range: 'td',
	  dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	  presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Today', 'Start', 'End'],
	  dateFormat: 'yMd',
	  outputFormat: 'DD/MM/YYYY',
    locale: 'en',
	  startOfWeek: 1
	};
  }
}
```

```html
<!-- app.component.html -->
<ng-daterangepicker [(ngModel)]="value" [options]="options"></ng-daterangepicker>
```

### Configuration

```ts
export interface NgDateRangePickerOptions {
  theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
  range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly' | 'td';
  dayNames: string[];
  presetNames: string[];
  dateFormat: string;
  outputFormat: string;
  startOfWeek: number;
}
```

### Licence

MIT
