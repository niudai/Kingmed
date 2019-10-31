import { Pipe, PipeTransform } from '@angular/core';

/**
 * @whatitDoes convert a long string to a shorter string to fit the screen if
 *   the screen size if smaller than 700 pixel.
 * @howToUse
 *   ```
       {{foo | trim}}
 *   ```
 */
@Pipe({name: 'keywordHighlight'})
export class KeywordHighlightPipe implements PipeTransform {
    transform(value: string, keyword?: string) {
        console.log(`*******************TEST************* ${keyword} ${value}`);
        console.log(value.replace(keyword, `<strong style="color: red; font-size: medium">${keyword}</strong>`));
        return value.replace(keyword, `<strong style="color:red; font-size: medium">${keyword}</strong>`);
    }
}
