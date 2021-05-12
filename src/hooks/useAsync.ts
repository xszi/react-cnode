import { useEffect, useState, useCallback, useRef } from 'react';

const noop = () => {};
const defaultOption = {
    manual: false,
    onSuccess: noop as SuccessHandler,
    onError: noop as ErrorHandler
}

export interface SuccessHandler {
    <T>(res: any): T
}
export interface ErrorHandler {
    (err: any): void
}

export interface Option extends Partial<typeof defaultOption> {
    onSuccess: SuccessHandler;
    OnError: ErrorHandler;
}

export interface AsyncResult<T> {
    loading: boolean;
    run: () => void;
    result: T | undefined
}

/**
 * @param {Function} action should be a Promise
 * @param {Object} customOption
 */
const useAsync = <T>(
    action: () => Promise<any>,
    // customOption: object = {}
    customOption: any = {}
): AsyncResult<T> => {
    let option: Option = Object.assign({}, defaultOption, customOption);
    const result = useRef<T>();
    const [loading, setLoading] = useState(false)

    const run = useCallback(() => {
        setLoading(true);
        const ret: Promise<any> = action();
        if (ret.then) {
            ret.then(res => {
                result.current = option.onSuccess(res) || res;
            })
            .catch(option.OnError)
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [action])

    useEffect(() => {
        !option.manual && run();
    }, [])

    return { 
        loading,
        run,
        result: result.current
    }
}

export default useAsync;