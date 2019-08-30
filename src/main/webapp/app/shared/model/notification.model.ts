import { ISubsidiary } from './subsidiary.model';
import { IDiseaseXiAn } from './disease-xi-an.model';

export interface INotification {
    id?: number;
    subsidiary?: ISubsidiary;
    title?: string;
    type?: string;
    description?: string;
    createdDate?: Date;
    diseaseXiAn?: IDiseaseXiAn;
}

export class Notification implements INotification {
    constructor(private id: )
}
