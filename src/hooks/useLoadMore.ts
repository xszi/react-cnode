import { useEffect, useRef, useCallback } from 'react'
import isEmpty from '../utils/isEmpty';
import useAsync from './useAsync';

const defaultOption = {
    initPage: 1,
    initPageSize: 10
}

interface Option extends Partial<typeof defaultOption> {
    defaultResult?: { list: Array<any> };
    formatResult?<T>(result: any): { list: Array<T> };
    isNoMore?(result: any): boolean;
}

/**
 * @param {Function} action should return a Promise
 * @param {Object} option
 * @param {Array} deps dependencies
 */
// eslint-disable-next-line
export default (
    action: (res: any) => Promise<any>,
    option: Option = defaultOption,
    deps: React.DependencyList = []
) => {
    // 浅拷贝：将传过来的值覆盖默认的值
    option = Object.assign({}, defaultOption, option || {});
    const defaultList = option.defaultResult?.list || [];

    const infoRef = useRef({
        completed: false,
        page: 1,
        list: [] as any[]
    })

    const actionHandler = useCallback(() => {
        return action({
            page: infoRef.current.page,
            pageSize: option.initPageSize
        })
        // eslint-disable-next-line
    }, [action])

    const { loading, run } = useAsync(actionHandler, {
        manual: true, // 是否手动触发
        onSuccess: (res: { list?: any}) => {
            const prevList = infoRef.current.list;
            const currentPage = infoRef.current.page

            const resultList = option.formatResult
                ? option.formatResult({
                    response: res,
                    page: currentPage
                }).list
                : res.list

            infoRef.current.list =
                currentPage !== 1 ? prevList.concat(resultList) : resultList;

            infoRef.current.completed = option.isNoMore
                ? option.isNoMore(res)
                : false;
         }
    })

    const loadMore = useCallback(() => {
        infoRef.current = {
            ...infoRef.current,
            page: infoRef.current.page + 1
        };
        run();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        infoRef.current = {
            page: 1,
            list: defaultList || [],
            completed: false
        };
        isEmpty(defaultList) && run();
        // eslint-disable-next-line
    }, [deps]);

    return {
        loading,
        loadMore,
        ...infoRef.current
    }
}