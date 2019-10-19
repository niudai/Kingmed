export interface IMapAuthorization {
    auth: string;
    ch: string;
}

export const MapAuthorizations: IMapAuthorization[] = [
    { auth: 'PRIVATE', ch: '仅自己可见'},
    { auth: 'PUBLIC', ch: '所有人可见'},
];
