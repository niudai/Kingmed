export interface IQArobot {
    id?: number;
    diseaseSeries?: string;
    projectSeries?: string;
    level?: string;
    questionType?: string;
    question?: string;
    answer?: string;
    updateDate?: string;
    submitter?: string;
    qaSubsidiary?: string;
    specialProcess?: string;
    qaClass?: string;
}

export class QArobot implements IQArobot {
    constructor(
        public id?: number,
        public diseaseSeries?: string,
        public projectSeries?: string,
        public level?: string,
        public questionType?: string,
        public question?: string,
        public answer?: string,
        public updateDate?: string,
        public submitter?: string,
        public qaSubsidiary?: string,
        public specialProcess?: string,
        public qaClass?: string
    ) {}
}
