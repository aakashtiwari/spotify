import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IMusic } from '../music';
import { MusicService } from '../music.service';

import { NumberValidators } from '../../shared/number-validator';
import { GenericValidator } from '../../shared/generic-validator';



@Component({
  selector: 'app-music-edit',
  templateUrl: './music-edit.component.html',
  styleUrls: ['./music-edit.component.css']
})
export class MusicEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Music Edit';
    errorMessage: string;
    musicForm: FormGroup;

    song: IMusic;
    private sub: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    get tags(): FormArray {
        return <FormArray>this.musicForm.get('tags');
    }

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private musicService: MusicService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Song name is required.',
                minlength: 'Song name must be at least three characters.',
                maxlength: 'song name cannot exceed 50 characters.'
            },
            album: {
                required: 'Album name is required.'
            },
            star_rating: {
                range: 'Rate the product between 1 (lowest) and 5 (highest).'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.MusicForm = this.fb.group({
            name: ['', [Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50)]],
            album: ['', Validators.required],
            star_rating: ['', NumberValidators.range(1, 5)],
            tags: this.fb.array([]),
            description: ''
        });

        // Read the song Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getSong(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.musicForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.musicForm);
        });
    }

    addTag(): void {
        this.tags.push(new FormControl());
    }
    
    deleteTag(index: number): void {
        this.tags.removeAt(index);
        // The line below is required in Angular 4 to fix a bug with `removeAt` that was fixed in Angular 5.
        this.productForm.setControl('tags', this.fb.array(this.tags.value || []));
    }

    getSong(id: number): void {
        this.musicService.getSong(id)
            .subscribe(
                (song: IMusic) => this.onSongRetrieved(song),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onSongRetrieved(song: IMusic): void {
        if (this.musicForm) {
            this.musicForm.reset();
        }
        this.song = song;

        if (this.song.id === 0) {
            this.pageTitle = 'Add Song';
        } else {
            this.pageTitle = `Edit Song: ${this.song.name}`;
        }

        // Update the data on the form
        this.musicForm.patchValue({
            name: this.product.name,
            album: this.product.album,
            star_rating: this.product.star_rating,
            description: this.product.description
        });
        this.productForm.setControl('tags', this.fb.array(this.song.tags || []));
    }

    deleteSong(): void {
        if (this.song.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the song: ${this.song.name}?`)) {
                this.musicService.deleteSong(this.song.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveSong(): void {
        if (this.musicForm.dirty && this.musicForm.valid) {
            // Copy the form values over the product object values
            let p = Object.assign({}, this.song, this.musicForm.value);

            this.musicService.saveSong(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.musicForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.musicForm.reset();
        this.router.navigate(['/songs']);
    }
}
