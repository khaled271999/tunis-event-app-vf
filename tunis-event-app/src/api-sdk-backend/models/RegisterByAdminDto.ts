/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegisterByAdminDto = {
    email: string;
    password: string;
    name: string;
    role: RegisterByAdminDto.role;
    orgName?: string;
    orgDescription?: string;
};
export namespace RegisterByAdminDto {
    export enum role {
        SUPERADMIN = 'SUPERADMIN',
        ORGANISATEUR = 'ORGANISATEUR',
        PARTICIPANT = 'PARTICIPANT',
    }
}

