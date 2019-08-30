export interface INtfType {
    type: string;
    chinese: string;
}

export class NtfType implements INtfType {
    constructor(public type?: string, public chinese?: string) {
    }
}
