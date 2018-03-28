import { Component, OnInit } from '@angular/core';

import { IMusic } from './music';
import { MusicService } from './music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  pageTitle: string = 'Music List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  listFilter: string;
  errorMessage: string;

  songs: IMusic[];

  constructor(private musicService: MusicService) {

  }

  toggleImage(): void {
      this.showImage = !this.showImage;
  }

  ngOnInit(): void {
      this.musicService.getSongs()
              .subscribe(songs => this.songs = songs,
                         error => this.errorMessage = <any>error);
  }

  onRatingClicked(message: string): void {
      this.pageTitle = 'Music List: ' + message;
  }

}