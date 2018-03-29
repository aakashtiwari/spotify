import {  PipeTransform, Pipe } from '@angular/core';
import { IMusic } from './music';

@Pipe({
    name: 'musicFilter'
})
export class MusicFilterPipe implements PipeTransform {

    transform(value: IMusic[], filterBy: string): IMusic[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((song: IMusic) =>
            song.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
