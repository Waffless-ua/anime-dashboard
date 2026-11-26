export type AsyncState<T> =
    | { status: 'loading'; data: null; error: null }
    | { status: 'success'; data: T; error: null }
    | { status: 'error'; data: null; error: string };

export type AsyncStatus = AsyncState<unknown>['status'];

export type AsyncResource<T> = AsyncState<T> & {
    reload: () => void;
};

export type RequestState = Pick<
    AsyncResource<unknown>,
    'status' | 'error' | 'reload'
>;