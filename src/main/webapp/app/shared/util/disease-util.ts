export interface ISort {
    sort: string;
    chinese: string;
}

export const DiseaseSorts: ISort[] = [
    { sort: 'views,desc', chinese: '浏览量'},
    { sort: 'lastModifiedDate,desc', chinese: '更新日期'}
];
