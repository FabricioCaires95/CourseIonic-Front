import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;

  parcels: number[] = [1,2,3,4,5,6,7,8,9,10];

  formGroup: FormGroup; 

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.pedido = this.navParams.get('pedido');

      console.log(this.pedido);
      this.formGroup = this.formBuilder.group({
        parcels: [1, Validators.required],
        "@type": ["PaymentWithCreditCard", Validators.required]
      });
  }

  nextPage(){
    this.pedido.payment = this.formGroup.value;
    this.navCtrl.setRoot('OrderConfirmationPage', {pedido: this.pedido});
  }


}
