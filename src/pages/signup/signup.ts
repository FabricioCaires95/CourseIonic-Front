import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';



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
    public estadoService: EstadoService,
    public clientService: ClienteService,
    public alertInsert: AlertController) {

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
    this.clientService.insertNewClient(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }

  showInsertOk(){
    let alert = this.alertInsert.create({
      title: 'Sucesso',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false, 
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
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
