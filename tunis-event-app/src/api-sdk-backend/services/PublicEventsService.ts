/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PublicEventsService {
    /**
     * Récupérer les événements approuvés (public)
     * @returns any Liste des événements approuvés retournée avec succès.
     * @throws ApiError
     */
    public static publicEventsControllerGetApprovedEvents(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/public/events',
        });
    }
}
