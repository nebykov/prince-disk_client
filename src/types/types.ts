

export interface IUser {
        _id: string,
        email: string,
        diskSpace: number,
        usedSpace: number,
        files: IFile[],
}


export interface IFile {
    _id: string,
    name: string,
    type: string,
    size: number,
    childs: [],
    date: string,
    parent_id: string
}


export interface IResponse {
    token: string,
    user: IUser
}


export interface IUploadFile {
        id: number,
        name: string
        progress: number
}



export enum SORT_BY {
    TYPE = 'type',
    NAME = 'name',
    SIZE = 'size'
}


export enum VIEW_MODE {
    MODULE = 'module',
    LIST = 'list'
}