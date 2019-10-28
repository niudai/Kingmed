import { INtfType } from '../model/ntf-type.model';

// Used for disease notification mock data type
export const NTF_TYPE_FOR_DISEASE: INtfType[] = [
    { type: 'UPDATE', chinese: '变更'},
    { type: 'STOP', chinese: '停做'},
    { type: 'CREATE', chinese: '开展'}
];

export const NTF_TYPE_TRANSLATOR = {
    'UPDATE': '变更',
    'STOP': '停做',
    'CREATE': '开展'
};
