import { Component, OnInit, HostListener, ElementRef, forwardRef, Input, OnChanges, SimpleChange } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as dateFns from 'date-fns';
import * as format from 'date-fns/format';

let locales = {
  ar: require('date-fns/locale/ar'),
  bg: require('date-fns/locale/bg'),
  ca: require('date-fns/locale/ca'),
  cs: require('date-fns/locale/cs'),
  da: require('date-fns/locale/da'),
  de: require('date-fns/locale/de'),
  el: require('date-fns/locale/el'),
  en: require('date-fns/locale/en'),
  eo: require('date-fns/locale/eo'),
  es: require('date-fns/locale/es'),
  fi: require('date-fns/locale/fi'),
  fil: require('date-fns/locale/fil'),
  fr: require('date-fns/locale/fr'),
  hr: require('date-fns/locale/hr'),
  id: require('date-fns/locale/id'),
  is: require('date-fns/locale/is'),
  it: require('date-fns/locale/it'),
  ja: require('date-fns/locale/ja'),
  ko: require('date-fns/locale/ko'),
  mk: require('date-fns/locale/mk'),
  nb: require('date-fns/locale/nb'),
  nl: require('date-fns/locale/nl'),
  pl: require('date-fns/locale/pl'),  
  pt: require('date-fns/locale/pt'),
  ro: require('date-fns/locale/ro'),
  ru: require('date-fns/locale/ru'),
  sk: require('date-fns/locale/sk'),
  sv: require('date-fns/locale/sv'),
  th: require('date-fns/locale/th'),
  tr: require('date-fns/locale/tr')
}

export interface NgDateRangePickerOptions {
  theme: 'default' | 'green' | 'teal' | 'cyan' | 'grape' | 'red' | 'gray';
  range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly' | 'td';
  dayNames: string[];
  presetNames: string[];
  dateFormat: string;
  outputFormat: string;
  startOfWeek: number;
  locale: string;
}

export interface IDay {
  date: Date;
  day: number;
  weekday: number;
  today: boolean;
  firstMonthDay: boolean;
  lastMonthDay: boolean;
  visible: boolean;
  from: boolean;
  to: boolean;
  isWithinRange: boolean;
}

export let DATERANGEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgDateRangePickerComponent),
  multi: true
};

@Component({
  selector: 'ng-daterangepicker',
  templateUrl: 'ng-daterangepicker.component.html',
  styleUrls: ['ng-daterangepicker.sass'],
  providers: [ DATERANGEPICKER_VALUE_ACCESSOR ]
})
export class NgDateRangePickerComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() options: NgDateRangePickerOptions;

  modelValue: string;
  opened: false | 'from' | 'to';
  date: Date;
  dateFormat: string;
  locale: any;
  dateFrom: Date;
  dateTo: Date;
  dayNames: string[];
  days: IDay[];
  range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly' | 'td';
  defaultOptions: NgDateRangePickerOptions = {
    theme: 'default',
    range: 'tm',
    dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Today', 'Start', 'End'],
    dateFormat: 'yMd',
    outputFormat: 'DD/MM/YYYY',
    startOfWeek: 0,
    locale: 'en'
  }

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  constructor(private elementRef: ElementRef) { }

  get value(): string {
    return this.modelValue;
  }

  set value(value: string) {
    if (!value) { return; }
    this.modelValue = value;
    this.onChangeCallback(value);
  }

  writeValue(value: string) {
    if (!value) { return; }
    this.modelValue = value;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  getLocale() {
    switch (this.options.locale) {
      case 'ar':
        this.locale = locales.ar;
        break;
      case 'bg':
        this.locale = locales.bg;
        break;
      case 'ca':
        this.locale = locales.ca;
        break;
      case 'cs':
        this.locale = locales.cs;
        break;
      case 'da':
        this.locale = locales.da;
        break;
      case 'de':
        this.locale = locales.de;
        break;
      case 'el':
        this.locale = locales.el;
        break;
      case 'en':
        this.locale = locales.en;
        break;
      case 'eo':
        this.locale = locales.eo;
        break;
      case 'es':
        this.locale = locales.es;
        break;
      case 'fi':
        this.locale = locales.fi;
        break;
      case 'fil':
        this.locale = locales.fil;
        break;
      case 'fr':
        this.locale = locales.fr;
        break;
      case 'hr':
        this.locale = locales.hr;
        break;
      case 'id':
        this.locale = locales.id;
        break;
      case 'is':
        this.locale = locales.is;
        break;
      case 'it':
        this.locale = locales.it;
        break;
      case 'ja':
        this.locale = locales.ja;
        break;
      case 'ko':
        this.locale = locales.ko;
        break;
      case 'mk':
        this.locale = locales.mk;
        break;
      case 'nb':
        this.locale = locales.nb;
        break;
      case 'nl':
        this.locale = locales.nl;
        break;
      case 'pl':
        this.locale = locales.pl;
        break;
      case 'pt':
        this.locale = locales.pt;
        break;
      case 'ro':
        this.locale = locales.ro;
        break;
      case 'ru':
        this.locale = locales.ru;
        break;
      case 'sk':
        this.locale = locales.sk;
        break;
      case 'sv':
        this.locale = locales.sv;
        break;
      case 'th':
        this.locale = locales.th;
        break;
      case 'tr':
        this.locale = locales.tr;
        break;
    }
  }

  ngOnInit() {

    this.getLocale();

    this.opened = false;
    this.date = dateFns.startOfDay(new Date());
    this.dateFormat = format(this.date, 'MMMM YYYY', {locale: this.locale});

    this.options = this.options || this.defaultOptions;
    this.initNames();
    this.selectRange(this.options.range);
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    this.options = this.options || this.defaultOptions;
  }

  initNames(): void {
    this.dayNames = this.options.dayNames;
  }

  generateCalendar(): void {
    this.days = [];
    let start: Date = dateFns.startOfMonth(this.date);
    let end: Date = dateFns.endOfMonth(this.date);

    let days: IDay[] = dateFns.eachDay(start, end).map(d => {
      return {
        date: d,
        day: dateFns.getDate(d),
        weekday: dateFns.getDay(d),
        today: dateFns.isToday(d),
        firstMonthDay: dateFns.isFirstDayOfMonth(d),
        lastMonthDay: dateFns.isLastDayOfMonth(d),
        visible: true,
        from: dateFns.isSameDay(this.dateFrom, d),
        to: dateFns.isSameDay(this.dateTo, d),
        isWithinRange: dateFns.isWithinRange(d, this.dateFrom, this.dateTo)
      };
    });

    let prevMonthDayNum = dateFns.getDay(start) - 1;
    let prevMonthDays: IDay[] = [];
    if (prevMonthDayNum > 0) {
      prevMonthDays = Array.from(Array(prevMonthDayNum).keys()).map(i => {
        let d = dateFns.subDays(start, prevMonthDayNum - i);
        return {
          date: d,
          day: dateFns.getDate(d),
          weekday: dateFns.getDay(d),
          firstMonthDay: dateFns.isFirstDayOfMonth(d),
          lastMonthDay: dateFns.isLastDayOfMonth(d),
          today: false,
          visible: false,
          from: false,
          to: false,
          isWithinRange: false
        };
      });
    }

    this.days = prevMonthDays.concat(days);
    this.value = `${dateFns.format(this.dateFrom, this.options.outputFormat)}-${dateFns.format(this.dateTo, this.options.outputFormat)}`;
  }

  toggleCalendar(e: MouseEvent, selection: 'from' | 'to'): void {
    if (this.opened && this.opened !== selection) {
      this.opened = selection;
    } else {
      this.opened = this.opened ? false : selection;
    }
  }

  closeCalendar(e: MouseEvent): void {
    this.opened = false;
  }

  selectDate(e: MouseEvent, index: number): void {
    e.preventDefault();
    let selectedDate: Date = this.days[index].date;
    if ((this.opened === 'from' && dateFns.isAfter(selectedDate, this.dateTo)) ||
      (this.opened === 'to' && dateFns.isBefore(selectedDate, this.dateFrom))) {
      return;
    }

    if (this.opened === 'from') {
      this.dateFrom = selectedDate;
      this.opened = 'to';
    } else if (this.opened === 'to') {
      this.dateTo = selectedDate;
      this.opened = 'from';
    }

    this.generateCalendar();
  }

  prevMonth(): void {
    this.date = dateFns.subMonths(this.date, 1);
    this.dateFormat = format(this.date, 'MMMM YYYY ', {locale: this.locale});
    this.generateCalendar();
  }

  nextMonth(): void {
    this.date = dateFns.addMonths(this.date, 1);
    this.dateFormat = format(this.date, 'MMMM YYYY ', {locale: this.locale});
    this.generateCalendar();
  }

  selectRange(range: 'tm' | 'lm' | 'lw' | 'tw' | 'ty' | 'ly' | 'td'): void {
    let today = dateFns.startOfDay(new Date());

    switch (range) {
      case 'tm':
        this.dateFrom = dateFns.startOfMonth(today);
        this.dateTo = dateFns.endOfMonth(today);
        break;
      case 'lm':
        today = dateFns.subMonths(today, 1);
        this.dateFrom = dateFns.startOfMonth(today);
        this.dateTo = dateFns.endOfMonth(today);
        break;
      case 'lw':
        today = dateFns.subWeeks(today, 1);
        this.dateFrom = dateFns.startOfWeek(today, {weekStartsOn: this.options.startOfWeek});
        this.dateTo = dateFns.endOfWeek(today, {weekStartsOn: this.options.startOfWeek});
        break;
      case 'tw':
        this.dateFrom = dateFns.startOfWeek(today, {weekStartsOn: this.options.startOfWeek});
        this.dateTo = dateFns.endOfWeek(today, {weekStartsOn: this.options.startOfWeek});
        break;
      case 'ty':
        this.dateFrom = dateFns.startOfYear(today);
        this.dateTo = dateFns.endOfYear(today);
        break;
      case 'ly':
        today = dateFns.subYears(today, 1);
        this.dateFrom = dateFns.startOfYear(today);
        this.dateTo = dateFns.endOfYear(today);
        break;
      case 'td':
        this.dateFrom = dateFns.startOfToday();
        this.dateTo = dateFns.endOfToday();
        break;
    }

    this.range = range;
    this.generateCalendar();
  }

  @HostListener('document:click', ['$event'])
  handleBlurClick(e: MouseEvent) {
    let target = e.srcElement || e.target;
    if (!this.elementRef.nativeElement.contains(e.target) && !(<Element>target).classList.contains('day-num')) {
      this.opened = false;
    }
  }
}
