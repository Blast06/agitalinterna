import { Flashlight } from '@ionic-native/flashlight';
import { Shake } from '@ionic-native/shake';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isOn:boolean = false;

  constructor(public navCtrl: NavController,
              public shake:Shake,
              private platform: Platform,
              private flashlight:Flashlight) {



                this.platform.ready().then(() =>{
                  this.shake.startWatch().subscribe( (data) =>{
                    // console.log("shaking device!!!");
                    // alert('FUNCIONO!!');
                    this.toggleFlash();


                  });
                });

  }


  async isAvailable():Promise<boolean>{
    try {
      return await this.flashlight.available();
    } catch (e) {
      console.log("ERROR EN CONSOLA: ",e);
      
    }
  }

  async toggleFlash():Promise<void>{
    try {
      let available = await this.isAvailable();
      if(available){
        await this.flashlight.toggle();
        this.isOn = !this.isOn;
        console.log("estado: ", this.isOn);
      }
    } catch (e) {
      console.log("isnt available")
      
    }
  }

}
