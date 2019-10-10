export interface IAuthorization {
    auth: string;
    ch: string;
}

export const Authorizations: IAuthorization[] = [
    { auth: 'ROLE_ADMIN', ch: '仅自己可见'},
    { auth: 'ROLE_DOCTOR', ch: '所有人可见'},
];
