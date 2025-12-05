import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';
import { Tab4PageRoutingModule } from './tab4-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab4PageRoutingModule // Imports the routing specific to this page
  ],
  declarations: [Tab4Page] // Declares the component here, NOT in app.module.ts
})
export class Tab4PageModule {}