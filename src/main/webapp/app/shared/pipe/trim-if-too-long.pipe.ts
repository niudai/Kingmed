import { Pipe, PipeTransform } from '@angular/core';

/**
 * @whatitDoes convert a long string to a shorter string to fit the screen if
 *   the screen size if smaller than 700 pixel.
 * @howToUse
 *   ```
       {{foo | trim}}
 *   ```
 */
@Pipe({name: 'trimIfTooLong'})
export class TrimIfTooLongPipe implements PipeTransform {
    transform(value: string, maxLength?: number) {
        const len = maxLength ? maxLength : 15;
        if (value.length <= len) {
            return value;
        }
        return value.substr(0, len).concat('...');
    }
}
