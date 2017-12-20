/*
 * @flow
 */

export type ApiError = { +detail: string };

export type ApiErrors = Array<ApiError> | null;

export type EntityRelationshipPayload = { +attrName: string, +id: string, +type: string };

export type EntityRelationshipsPayload = Array<EntityRelationshipPayload>;

export type CreateEntityPayload = {
  +type: string,
  +relationships?: EntityRelationshipsPayload
};

export type ReadEntityPayload = { +id: string };

export type UpdateEntityPayload = CreateEntityPayload & ReadEntityPayload;

export type EntityPayload =
  | CreateEntityPayload
  | ReadEntityPayload
  | UpdateEntityPayload;

export type Entity = {
  +id: string,
  +type: string
};

export type Request = {
  +method: string,
  +url: string
};

export type PostPutRequest = Request & {
  +data?: mixed
};

export type GetEntityRequestParams = {
  +include?: string
};

export type GetEntitiesRequestParams = GetEntityRequestParams & {
  +all?: boolean,
  +'page[number]'?: number,
  +'page[size]'?: number
};

export type GetRequest = Request & {
  +params: GetEntityRequestParams | GetEntitiesRequestParams
};

export type IncludedEntities = Array<Entity>;
export type ResponseMeta = { +'total-pages': number, +'total-records': number };
export type ResponseLinks = { +first?: string, +last?: string };

export type HttpRequest = {
  +entity?: EntityPayload,
  +killCache?: boolean,
  +request: GetRequest | PostPutRequest,
  +successCb?: () => mixed
};

export type HttpResponse<Data> = {
  +data?: Data,
  +included?: IncludedEntities,
  +links?: ResponseLinks,
  +meta?: ResponseMeta
};

export type HttpResponseWithQuery<Data> = {
  +query: GetEntityRequestParams | GetEntitiesRequestParams,
  +response: HttpResponse<Data>
};
