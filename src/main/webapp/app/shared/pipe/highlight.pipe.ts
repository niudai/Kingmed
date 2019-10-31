import { Pipe, PipeTransform, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
    constructor(private sanitizer: DomSanitizer) {}
    transform(value: string, keyword?: string) {
        console.log(`*******************TEST************* ${keyword} ${value}`);
        console.log(value.replace(keyword, `<strong style="color: red; font-size: medium">${keyword}</strong>`));
        return value.replace(keyword, `<strong class = "keyword" style = "color: red; font-size: medium">${keyword}</strong>`);
    }
}
