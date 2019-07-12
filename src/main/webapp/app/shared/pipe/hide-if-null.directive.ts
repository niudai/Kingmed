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
    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) {}

    @Input()
    set jhiHideIfNull(value: string) {
        if (this.condition(value) && this.hasView) {
            this.viewContainerRef.clear();
            this.hasView = false;
        } else if (!this.hasView && !this.condition(value)) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
            this.hasView = true;
        }
    }

    condition(value: string): boolean {
        return (!value || value === '' || value === '/');
    }
}
