import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IMusic } from './music';

@Injectable()
export class MusicService {
    private baseUrl = 'http://akashtiwari.com:3002/songs';

    constructor(private http: HttpClient) { }

    getSongs(): Observable<IMusic[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getSongs: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getSong(id: number): Observable<IMusic> {
        if (id === 0) {
        return Observable.of(this.initializeSong());
        // return Observable.create((observer: any) => {
        //     observer.next(this.initializeProduct());
        //     observer.complete();
        // });
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getSong: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteSong(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteSong: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveSong(song: IMusic): Observable<IMusic> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (song.id === 0) {
            return this.createSong(song, options);
        }
        return this.updateSong(song, options);
    }

    private createSong(song: IMusic, options: RequestOptions): Observable<IMusic> {
        song.id = undefined;
        return this.http.post(this.baseUrl, song, options)
            .map(this.extractData)
            .do(data => console.log('createSong: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateSong(song: IMusic, options: RequestOptions): Observable<IMusic> {
        const url = `${this.baseUrl}/${song.id}`;
        return this.http.put(url, song, options)
            .map(() => song)
            .do(data => console.log('updateSong: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {        
        return response.data || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeSong(): IMusic {
        // Return an initialized music object
        return {
            id: 0,
            name: null,
            album: null,
            tags: [''],
            release_date: null,
            artist: null,
            description: null,
            star_rating: null,
            imageUrl: null
        };
    }
}
