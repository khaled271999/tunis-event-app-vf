/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SuperAdminService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static superAdminControllerGetAllUsers(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/users',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static superAdminControllerApproveOrganization(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/admin/organizations/{id}/approve',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static superAdminControllerDeleteEvent(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/admin/events/{id}',
            path: {
                'id': id,
            },
        });
    }
}
