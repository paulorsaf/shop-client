import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address/address';
import { CreditCardPayment, PaymentType } from 'src/app/model/payment/payment';
import { ProductNotes } from 'src/app/model/product/product-notes';
import { CalculatePrice, CalculatePriceResponse } from 'src/app/model/purchase/calculate-price';
import { ShoppingCartProduct } from 'src/app/model/shopping-cart-product/shopping-cart-product';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private apiService: ApiService
  ) { }

  calculatePrice(calculate: CalculatePrice): Observable<CalculatePriceResponse> {
    const url = `${environment.api}/purchases/prices`;
    return this.apiService.patch<CalculatePriceResponse>(url, calculate);
  }

  payByMoney(paymentDetails: Payment): Observable<void> {
    if (paymentDetails.purchaseId) {
      return this.retryPaymentByMoney(paymentDetails);
    }
    return this.makePaymentByMoney(paymentDetails);
  }

  payByPix(paymentDetails: PaymentByPix): Observable<void> {
    if (paymentDetails.purchaseId) {
      return this.retryPaymentByPix(paymentDetails);
    }
    return this.makePaymentByPix(paymentDetails);
  }

  payByCreditCard(paymentDetails: PaymentByCreditCard): Observable<void> {
    if (paymentDetails.purchaseId) {
      return this.retryPaymentByCreditCard(paymentDetails);
    }
    return this.makePaymentCreditCard(paymentDetails);
  }

  payBySavedCreditCard(paymentDetails: PaymentBySavedCreditCard): Observable<void> {
    if (paymentDetails.purchaseId) {
      return this.retryPaymentBySavedCreditCard(paymentDetails);
    }
    return this.makePaymentBySavedCreditCard(paymentDetails);
  }

  private makePaymentByMoney(paymentDetails: Payment) {
    const url = `${environment.api}/purchases`;
    return this.apiService.post<void>(url, {
      deliveryAddress: paymentDetails.deliveryAddress,
      deliveryPrice: paymentDetails.deliveryPrice,
      payment: {
        cupom: paymentDetails.cupom,
        type: PaymentType.MONEY
      },
      productNotes: paymentDetails.productNotes,
      products: paymentDetails.shoppingCart.map(s => ({
        amount: s.amount,
        productId: s.product.id,
        stockOptionId: s.stockOption?.id
      }))
    });
  }

  private makePaymentByPix(paymentDetails: PaymentByPix) {
    const url = `${environment.api}/purchases`;

    let formData = new FormData();
    formData.append('files', paymentDetails.receipt, paymentDetails.receipt.name);
    formData.append('body', JSON.stringify({
      deliveryAddress: paymentDetails.deliveryAddress,
      deliveryPrice: paymentDetails.deliveryPrice,
      payment: {
        cupom: paymentDetails.cupom,
        type: PaymentType.PIX
      },
      products: paymentDetails.shoppingCart.map(s => ({
        amount: s.amount,
        productId: s.product.id,
        stockOptionId: s.stockOption?.id
      })),
      name: paymentDetails.receipt.name
    }));

    return this.apiService.post<void>(url, formData);
  }

  private makePaymentCreditCard(paymentDetails: PaymentByCreditCard) {
    const url = `${environment.api}/purchases`;
    return this.apiService.post<void>(url, {
      deliveryAddress: paymentDetails.deliveryAddress,
      deliveryPrice: paymentDetails.deliveryPrice,
      payment: {
        billingAddress: paymentDetails.billingAddress,
        creditCard: paymentDetails.creditCard,
        cupom: paymentDetails.cupom,
        type: PaymentType.CREDIT_CARD
      },
      productNotes: paymentDetails.productNotes,
      products: paymentDetails.shoppingCart.map(s => ({
        amount: s.amount,
        productId: s.product.id,
        stockOptionId: s.stockOption?.id
      }))
    });
  }

  private makePaymentBySavedCreditCard(paymentDetails: PaymentBySavedCreditCard) {
    const url = `${environment.api}/purchases`;
    return this.apiService.post<void>(url, {
      deliveryAddress: paymentDetails.deliveryAddress,
      deliveryPrice: paymentDetails.deliveryPrice,
      payment: {
        creditCardId: paymentDetails.creditCardId,
        cupom: paymentDetails.cupom,
        type: PaymentType.CREDIT_CARD
      },
      productNotes: paymentDetails.productNotes,
      products: paymentDetails.shoppingCart.map(s => ({
        amount: s.amount,
        productId: s.product.id,
        stockOptionId: s.stockOption?.id
      }))
    });
  }

  private retryPaymentByMoney(paymentDetails: Payment) {
    const url = `${environment.api}/purchases/${paymentDetails.purchaseId}/payments`;
    return this.apiService.patch<void>(url, {
      payment: {
        cupom: paymentDetails.cupom,
        type: PaymentType.MONEY
      }
    });
  }

  private retryPaymentByPix(paymentDetails: PaymentByPix) {
    const url = `${environment.api}/purchases/${paymentDetails.purchaseId}/payments`;
    let formData = new FormData();
    formData.append('files', paymentDetails.receipt, paymentDetails.receipt.name);
    formData.append('body', JSON.stringify({
      payment: {
        cupom: paymentDetails.cupom,
        type: PaymentType.PIX
      },
      name: paymentDetails.receipt.name
    }));

    return this.apiService.patch<void>(url, formData);
  }

  private retryPaymentByCreditCard(paymentDetails: PaymentByCreditCard) {
    const url = `${environment.api}/purchases/${paymentDetails.purchaseId}/payments`;
    return this.apiService.patch<void>(url, {
      payment: {
        billingAddress: paymentDetails.billingAddress,
        creditCard: paymentDetails.creditCard,
        cupom: paymentDetails.cupom,
        type: PaymentType.CREDIT_CARD
      }
    });
  }

  private retryPaymentBySavedCreditCard(paymentDetails: PaymentBySavedCreditCard) {
    const url = `${environment.api}/purchases/${paymentDetails.purchaseId}/payments`;
    return this.apiService.patch<void>(url, {
      payment: {
        creditCardId: paymentDetails.creditCardId,
        cupom: paymentDetails.cupom,
        type: PaymentType.CREDIT_CARD
      }
    });
  }

}

type Payment = {
  cupom: string;
  deliveryAddress: Address;
  deliveryPrice: number;
  productNotes: ProductNotes[];
  purchaseId?: string;
  shoppingCart: ShoppingCartProduct[];
}

type PaymentByPix = {
  receipt: File;
} & Payment;

type PaymentByCreditCard = {
  billingAddress: Address;
  creditCard: CreditCardPayment;
} & Payment;

type PaymentBySavedCreditCard = {
  creditCardId: string;
} & Payment;