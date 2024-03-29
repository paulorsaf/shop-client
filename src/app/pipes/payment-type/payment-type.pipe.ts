import { Pipe, PipeTransform } from '@angular/core';
import { PaymentType } from 'src/app/model/payment/payment';

@Pipe({name: 'paymentType'})
export class PaymentTypePipe implements PipeTransform {

  transform(value: string): string {
    if (value == PaymentType.MONEY.toString()) {
      return "Dinheiro";
    }
    if (value == PaymentType.CREDIT_CARD.toString()) {
      return "Cartão de Crédito";
    }
    return value;
  }

}