import { Component, Input, OnInit } from '@angular/core';
import { Purchase } from 'src/app/model/purchase/purchase';

@Component({
  selector: 'app-purchase-status-message',
  templateUrl: './purchase-status-message.component.html',
  styleUrls: ['./purchase-status-message.component.scss'],
})
export class PurchaseStatusMessageComponent implements OnInit {

  @Input() purchase: Purchase;

  constructor() { }

  ngOnInit() {}

}
