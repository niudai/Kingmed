import { INtfType } from '../model/ntf-type.model';

// Used for disease notification mock data type
export const NTF_TYPE_FOR_DISEASE: INtfType[] = [
    { type: 'UPDATE', chinese: '项目变更'},
    { type: 'STOP', chinese: '项目停做'},
    { type: 'CREATE', chinese: '项目开展'}
];
