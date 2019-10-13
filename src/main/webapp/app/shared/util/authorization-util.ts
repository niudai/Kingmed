export interface IAuthorization {
    auth: string;
    ch: string;
}

export const Authorizations: IAuthorization[] = [
    { auth: 'PRIVATE', ch: '仅自己可见'},
    { auth: 'PUBLIC', ch: '所有人可见'},
];
