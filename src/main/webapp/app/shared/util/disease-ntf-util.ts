import { INtfType } from '../model/ntf-type.model';

// Used for disease notification mock data type
export const NTF_TYPE_FOR_DISEASE: INtfType[] = [
    { type: 'UPDATE', chinese: '项目更新'},
    { type: 'DELETE', chinese: '项目删除'},
    { type: 'STOP', chinese: '项目停做'},
    { type: 'CREATE', chinese: '项目新建'}
];
