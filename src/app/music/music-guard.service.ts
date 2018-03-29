import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { MusicEditComponent } from './music-edit/music-edit.component';

@Injectable()
export  class MusicDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid product Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/music']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export  class MusicEditGuard implements CanDeactivate<MusicEditComponent> {

    canDeactivate(component: MusicEditComponent): boolean {
        if (component.musicForm.dirty) {
            let productName = component.musicForm.get('name').value || 'New Song';
            return confirm(`Navigate away and lose all changes to ${name}?`);
        }
        return true;
    }
}
