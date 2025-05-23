/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegisterDto = {
    email: string;
    password: string;
    name: string;
    role: RegisterDto.role;
};
export namespace RegisterDto {
    export enum role {
        SUPERADMIN = 'SUPERADMIN',
        ORGANISATEUR = 'ORGANISATEUR',
        PARTICIPANT = 'PARTICIPANT',
    }
}

