import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MusicComponent } from './music.component';
import { MusicDetailComponent } from './music-detail/music-detail.component';
import { MusicEditComponent } from './music-edit/music-edit.component'

import { MusicService } from './music.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: 'music', component: MusicComponent }
    ])
  ],
  declarations: [
  	MusicComponent,
  	MusicDetailComponent,
  	MusicEditComponent
  ],
  providers: [
    MusicService
  ]
})
export class MusicModule { }
