/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static organizationControllerGetMyEvents(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/organisateur/mes-evenements',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static organizationControllerCreateOrganization(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/organisateur/create-organization',
        });
    }
}
