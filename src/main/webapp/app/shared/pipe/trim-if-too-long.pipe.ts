import { Pipe, PipeTransform } from '@angular/core';

/**
 * @whatitDoes convert a long string to a shorter string to fit the screen if
 *   the screen size if smaller than 700 pixel.
 * @howToUse
 *   ```
       {{foo | trim}}
 *   ```
 */
@Pipe({name: 'trim2'})
export class TrimIfTooLongPipe implements PipeTransform {
    transform(value: string) {
        if (value.length <= 15) {
            return value;
        }
        return value.substr(0, 15).concat('...');
    }
}
