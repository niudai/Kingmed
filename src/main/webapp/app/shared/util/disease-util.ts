export interface ISort {
    sort: string;
    chinese: string;
}

export const DiseaseSorts: ISort[] = [
    { sort: 'views', chinese: '浏览量'},
    { sort: 'last_modified_date', chinese: '更新日期'}
];
