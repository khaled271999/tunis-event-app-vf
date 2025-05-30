/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEventDto } from '../models/CreateEventDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EventsService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static eventsControllerCreateEvent(
        requestBody: CreateEventDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static eventsControllerGetAllEvents(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static eventsControllerDeleteEvent(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{id}',
            path: {
                'id': id,
            },
        });
    }
}
