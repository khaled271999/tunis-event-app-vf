/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCommentDto } from '../models/CreateCommentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CommentsService {
    /**
     * Créer un commentaire
     * @param eventId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static commentControllerCreateComment(
        eventId: string,
        requestBody: CreateCommentDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/comments/{eventId}',
            path: {
                'eventId': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Récupérer tous les commentaires d’un événement
     * @param eventId
     * @returns any
     * @throws ApiError
     */
    public static commentControllerGetAllCommentsForEvent(
        eventId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/event/{eventId}',
            path: {
                'eventId': eventId,
            },
        });
    }
    /**
     * Signaler un commentaire
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static commentControllerReportComment(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/comments/{id}/report',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Annuler un signalement (SuperAdmin)
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static commentControllerUnreportComment(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/comments/{id}/unreport',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Lister tous les commentaires signalés (SuperAdmin)
     * @returns any
     * @throws ApiError
     */
    public static commentControllerGetReportedComments(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/reported',
        });
    }
    /**
     * Supprimer un commentaire (SuperAdmin)
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static commentControllerDeleteComment(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/comments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Supprimer son propre commentaire
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static commentControllerDeleteOwnComment(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/comments/own/{id}',
            path: {
                'id': id,
            },
        });
    }
}
