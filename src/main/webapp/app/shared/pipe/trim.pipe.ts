import { Pipe, PipeTransform } from '@angular/core';

/**
 * @whatitDoes convert a long string to a shorter string to fit the screen if
 *   the screen size if smaller than 700 pixel.
 * @howToUse
 *   ```
       {{foo | trim}}
 *   ```
 */
@Pipe({name: 'trim'})
export class TrimPipe implements PipeTransform {
    transform(value: string) {
        if (value.length <= 25) {
            return value;
        }
        return window.innerWidth < 700 ? value.substr(0, 25).concat('...') : value;
    }
}
