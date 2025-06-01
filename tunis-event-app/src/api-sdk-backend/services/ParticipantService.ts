/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ParticipantService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static participantControllerCreateParticipation(
        requestBody: {
            eventId: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/participant/inscription',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param eventId
     * @returns any
     * @throws ApiError
     */
    public static participantControllerCancelParticipation(
        eventId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/participant/desinscription/{eventId}',
            path: {
                'eventId': eventId,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static participantControllerGetMyEvents(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/participant/mes-evenements',
        });
    }
}
