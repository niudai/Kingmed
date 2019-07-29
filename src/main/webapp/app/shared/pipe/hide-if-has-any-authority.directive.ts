import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from 'app/core';

/**
 * @whatItDoes Conditionally hide the parent directory if the content is null.
 *
 * @howToUse
 * ``` *
 *     <some-element *jhiHideIfNull="content">...</some-element>
 * ```
 */
@Directive({
    selector: '[jhiHideIfHasAnyAuthority]'
})
export class HideIfHasAnyAuthorityDirective {
    private hasView = true;
    private authorities: string[];

    @Input()
    set jhiHideIfHasAnyAuthority(value: string | string[]) {
        this.authorities = typeof value === 'string' ? [value] : value;
        if (this.accountService.hasAnyAuthority(this.authorities) && this.hasView) {
            this.viewContainerRef.clear();
        }
    }

    constructor(
        private accountService: AccountService,
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) {}

}
