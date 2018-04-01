import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { IMusic } from '../music';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.component.html',
  styleUrls: ['./music-detail.component.css']
})
export class MusicDetailComponent implements OnInit {

    pageTitle: string = 'Music Detail';
    song: IMusic;
    errorMessage: string;
    private sub: Subscription;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private musicService: MusicService) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getSong(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getSong(id: number) {
        this.musicService.getSong(id).subscribe(
            song => this.song = song,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this.router.navigate(['/music']);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Music Detail: ' + message;
    }
}

