import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit {

  @Input() placeholder: string = '';
  @Output() onValue = new EventEmitter<string>();

  private debouncer: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      this.onValue.emit(value);
    });
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(search: string): void {
    this.debouncer.next(search);
  }
}
