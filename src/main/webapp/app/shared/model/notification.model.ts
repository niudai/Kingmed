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
    constructor(
        public id?: number,
        public subsidiary?: ISubsidiary,
        public title?: string,
        public type?: string,
        public description?: string,
        public createdDate?: Date,
        public diseaseXiAn?: IDiseaseXiAn) {}

}
