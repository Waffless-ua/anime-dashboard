export type AsyncState<T> =
    | { status: 'loading'; data: T | null; error: null }
    | { status: 'success'; data: T; error: null }
    | { status: 'error'; data: T | null; error: string };

export type AsyncStatus = AsyncState<unknown>['status'];

export type AsyncResource<T> = AsyncState<T> & {
    loading: boolean;
    reload: () => void;
};

export type RequestState = Pick<
    AsyncResource<unknown>,
    'loading' | 'status' | 'error' | 'reload'
>;