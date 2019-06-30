import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'trim'})
export class TrimPipe implements PipeTransform {
    transform(value: string, windowWidth: number) {
        return windowWidth < 700 ? value.substr(0, 25).concat('...') : value;
    }
}
