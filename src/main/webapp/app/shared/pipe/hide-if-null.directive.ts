import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * @whatItDoes Conditionally hide the parent directory if the content is null.
 *
 * @howToUse
 * ``` *
 *     <some-element *jhiHideIfNull="content">...</some-element>
 * ```
 */
@Directive({
    selector: '[jhiHideIfNull]'
})
export class HideIfNullDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) {}

    @Input()
    set jhiHideIfNull(value: string) {
        if (!value || value === '' || value === '/' ) {
            this.viewContainerRef.clear();
        } else {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    }
}
