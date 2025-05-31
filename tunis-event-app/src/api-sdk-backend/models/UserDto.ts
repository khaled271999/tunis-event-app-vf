/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserDto = {
    id: string;
    name: string;
    email: string;
    role: UserDto.role;
};
export namespace UserDto {
    export enum role {
        PARTICIPANT = 'PARTICIPANT',
        ORGANISATEUR = 'ORGANISATEUR',
        SUPERADMIN = 'SUPERADMIN',
    }
}

