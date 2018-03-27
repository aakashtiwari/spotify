import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MusicComponent } from './music.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        { path: 'music', component: MusicComponent }
    ])
  ],
  declarations: [
  	MusicComponent
  ]
})
export class MusicModule { }
