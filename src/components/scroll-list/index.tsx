import React, { useEffect, useCallback, useRef }from 'react';
import Loading from '../loading'
import styled from 'styled-components'

// 交叉观察器
// polyfill 监听低版本浏览器，使其可以使用observer功能，监听某个滚动元素
import 'intersection-observer'

export interface IProps {
    loading: boolean;
    completed: boolean;
    children: React.ReactNode,
    onLoad: () => void;
}

const TipWord = styled.div`
    margin: 10px auto;
    color: #333;
    text-align: center;
`

const ScrollList: React.FC<IProps> = (props: IProps) => {
    const { completed, onLoad, loading } = props
    // 触发命中观察的回调, 只有依赖项改动才会重新生成一个handle
    const handle = useCallback(
        (entries) => {
            if (completed) return;
            if (entries[0].intersectionRatio > 0) {
                // 如果在可视区域则加载
                onLoad();
            }
        },
        [completed, onLoad]
    );
    

    const observer: React.RefObject<IntersectionObserver> = useRef(
        new IntersectionObserver(handle)
    );
    
    // 一个底部组件供监听
    const bottomEl: any = useRef<HTMLDivElement>();

    // 使用class组件需要在两个生命周期实现
    useEffect(() => {
        let botCur = bottomEl.current, obsCur = observer.current
        // 监听
        obsCur && obsCur.observe(botCur)
        // 取消监听
        return () => {
            obsCur && obsCur.unobserve(botCur)
        }
    }, []);

    return (
        <div>
            {props.children}
            <div ref={bottomEl}>
                {loading && !completed && <Loading text='玩命加载中' />}
                {loading && !completed && <TipWord>加载完成</TipWord>}
            </div>
        </div>
    )
}

// 建议有props的函数组件，都包裹上memo，可以提升性能
export default React.memo(ScrollList)