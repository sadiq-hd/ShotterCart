import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShoppingCartService } from '../service/shopping-cart.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  creditCardForm!: FormGroup;
  cartItems: any[] = [];

  constructor(
    private formBuilder: FormBuilder ,
    private shoppingCartService: ShoppingCartService
    ) {}

  ngOnInit() {
    this.cartItems = this.shoppingCartService.getShoppingCartItems();

    this.paymentForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.creditCardForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  submitCreditCardForm() {
    if (this.creditCardForm.valid) {
      // Logic to process credit card payment
    }
  }
}
