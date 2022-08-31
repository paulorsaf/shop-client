import { Component, Input, OnInit } from '@angular/core';
import { Purchase } from 'src/app/model/purchase/purchase';

@Component({
  selector: 'app-purchase-statuses',
  templateUrl: './purchase-statuses.component.html',
  styleUrls: ['./purchase-statuses.component.scss'],
})
export class PurchaseStatusesComponent implements OnInit {

  @Input() purchase: Purchase;

  constructor() { }

  ngOnInit() {}

}
