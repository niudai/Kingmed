export interface IFile {
    id?: number;
    name?: string;
    path?: string;
}

export class File implements IFile {
    constructor(
        public id?: number,
        public name?: string,
        public path?: string
    ) {}
}
