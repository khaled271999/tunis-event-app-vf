/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegisterOrganisateurDto = {
    email: string;
    password: string;
    name: string;
    role: RegisterOrganisateurDto.role;
    orgName: string;
    orgDescription?: string;
};
export namespace RegisterOrganisateurDto {
    export enum role {
        SUPERADMIN = 'SUPERADMIN',
        ORGANISATEUR = 'ORGANISATEUR',
        PARTICIPANT = 'PARTICIPANT',
    }
}

