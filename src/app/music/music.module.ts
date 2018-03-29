import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MusicComponent } from './music.component';
import { MusicDetailComponent } from './music-detail/music-detail.component';
import { MusicEditComponent } from './music-edit/music-edit.component'

import { MusicFilterPipe } from './music-filter.pipe';
import { MusicService } from './music.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: 'music', component: MusicComponent }
        { path: 'music/:id',
	        canActivate: [ MusicDetailGuard],
	        component: MusicDetailComponent
	      },
	      { path: 'musicEdit/:id',
	        canDeactivate: [ MusicEditGuard ],
	        component: MusicEditComponent 
	      },
    ])
  ],
  declarations: [
  	MusicComponent,
  	MusicDetailComponent,
  	MusicEditComponent,
  	MusicFilterPipe
  ],
  providers: [
    MusicService
  ]
})
export class MusicModule { }
