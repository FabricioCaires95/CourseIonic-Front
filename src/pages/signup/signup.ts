import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {

      this.formGroup = this.formBuilder.group({
        name : ['Fabricio' , [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['fabricio.legend@gmail.com', [Validators.required, Validators.email]],
        clientType : ['1', [Validators.required]],
        cpfOrCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        password : ['123', [Validators.required]],
        street : ['Rua Via', [Validators.required]],
        houseNumber : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        zipCode : ['10828333', [Validators.required]],
        phone1 : ['977261827', [Validators.required]],
        phone2 : ['', []],
        phone3 : ['', []],
        estadoId : [null, [Validators.required]],
        cityId : [null, [Validators.required]]  
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        console.log(response);
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {})
  }

  signupUser(){
    console.log("Enviou o FORM");
  }

  updateCidades(){
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estadoId)
      .subscribe(response => {
        this.cidades = response;
        console.log(response);
        this.formGroup.controls.cityId.setValue(null);
      },
      error => {})
  }

}
