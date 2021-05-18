import isEmpty from "../utils/isEmpty";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback } from "react";
import useAsync from "./useAsync";

const defaultOption = {
    initPage: 1,
    initPageSize: 10,
};

interface Option extends Partial<typeof defaultOption> {
    defaultResult?: { list: Array<any> };
    formatResult?<T>(result: any): { list: Array<T> };
    isNoMore?(result: any): boolean;
}

/**
 * @param {Function} action should return a Promise
 * @param {Object} option
 * @param {Array} deps dependecies
 */
// eslint-disable-next-line
export default (
    action: (res: any) => Promise<any>,
    option: Option = defaultOption,
    deps: React.DependencyList = []
) => {
    option = Object.assign({}, defaultOption, option || {});

    const defaultList = option.defaultResult?.list || [];

    // useRef 可以缓存上次获取的list
    // useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
    // 返回的 ref 对象在组件的整个生命周期内保持不变。
    const infoRef = useRef({
        completed: false,
        page: 1,
        list: [] as any[],
    });

    const actionHandler = useCallback(() => {
        return action({
            page: infoRef.current.page,
            pageSize: option.initPageSize,
        });
    }, [action]);

    // useAsync
    const { loading, run } = useAsync(actionHandler, {
        manual: true, // 是否需要手动触发
        onSuccess: (res: { list?: any }) => {
            const prevList = infoRef.current.list;
            const currentPage = infoRef.current.page;

            const resultList = option.formatResult
                ? option.formatResult({
                    response: res,
                    page: currentPage,
                }).list
                : res.list;

            infoRef.current.list =
                currentPage !== 1 ? prevList.concat(resultList) : resultList;

            infoRef.current.completed = option.isNoMore
                ? option.isNoMore(res)
                : false;
        },
    });

    // 只执行一次，依赖项空数组
    const loadMore = useCallback(() => {
        infoRef.current = {
            ...infoRef.current,
            page: infoRef.current.page + 1,
        };
        run();
    }, []);

    useEffect(() => {
        infoRef.current = {
            page: 1,
            list: defaultList || [],
            completed: false,
        };
        isEmpty(defaultList) && run();
    }, [...deps]);

    return {
        loading,
        loadMore,
        ...infoRef.current,
    };
};
