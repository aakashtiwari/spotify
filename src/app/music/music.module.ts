import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MusicComponent } from './music.component';
import { MusicDetailComponent } from './music-detail/music-detail.component';
import { MusicDetailGuard, MusicEditGuard } from './music-guard.service';
import { MusicEditComponent } from './music-edit/music-edit.component'

import { MusicFilterPipe } from './music-filter.pipe';
import { MusicService } from './music.service';

import { AuthGuard } from '../auth.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: 'music', component: MusicComponent, canActivate: [AuthGuard] },
        { path: 'song/:id',
	        canActivate: [ AuthGuard, MusicDetailGuard ],
	        component: MusicDetailComponent
	      },
	      { path: 'musicEdit/:id',
	      	canActivate: [AuthGuard],
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
    MusicService,
    MusicDetailGuard,
    MusicEditGuard
  ]
})
export class MusicModule { }
