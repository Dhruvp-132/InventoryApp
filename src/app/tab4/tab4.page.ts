import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false
})
export class Tab4Page {

  constructor(private alertController: AlertController) { }

  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Help',
      message: 'This page explains privacy and security information.',
      buttons: ['OK']
    });
    await alert.present();
  }

}