import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-status-message',
  templateUrl: './purchase-status-message.component.html',
  styleUrls: ['./purchase-status-message.component.scss'],
})
export class PurchaseStatusMessageComponent implements OnInit {

  @Input() status: string;

  constructor() { }

  ngOnInit() {}

}
