# React CNode

用React实现Node中文社区[CNode](https://cnodejs.org/)

## 项目结构

1. 页面

```
view
|- not-found
|   |- index.tsx // 404 页面
|- about
|   |- index.tsx // 关于页面
|- user
|   |- index.tsx // 用户信息页面
|   |- style.tsx
|- topic
|   |- index.tsx // 各种主题的文章列表页
|   |- card
|   |   |- card.tsx // 列表项
|   |   |- style.tsx
|- article
|   |- index.tsx // 文章详情页
|   |- style.tsx
|   |- code-prettify-sunburst.css
|   |- comment
|   |   |- index.tsx // 评论详情
|   |   |- style.tsx
|   |- comment-panel // 评论面板
|   |   |- index.tsx
|   |   |- style.tsx
|   |- info-bar
|   |   |- index.tsx // 文章顶部info
|   |   |- style.tsx
```

2. 组件

```
components
|- loading
|   |- index.tsx // 加载中
|- header
|   |- index.tsx // 顶部header
|- image
|   |- index.tsx // 图片组件
|   |- style.tsx
|- scroll-list
|   |- index.tsx // 滚动列表
|- tabbar
|   |- index.tsx // 顶部nav tabbar
|   |- style.tsx
|- tag
|   |- index.tsx // 文章标签
```

## 开始！

### hooks

React.memo
函数组件，使用 React.memo ，将函数组件传递给 memo 之后，就会返回一个新的组件，新组件的功能：如果接受到的属性不变，则不重新渲染函数

useCallback

接收一个内联回调函数参数和一个依赖项数组（子组件依赖父组件的状态，即子组件会使用到父组件的值） ，useCallback 会返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新

useRef

useRef 返回的 ref 对象在组件的整个生命周期内保持不变，也就是说每次重新渲染函数组件时，返回的 ref 对象都是同一个

### 自定义 hooks

1. useAsync 用来发起异步请求, 添加 loading 等各种通用信息
2. useLoadMore 用来下拉加载
3. useInitPosition 用来初始化位置

### Hooks使用总结
* Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。
* Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。
* 作用：复用不同组件之间的状态逻辑
* State Hook 允许你在 React 函数组件中添加 state 的 Hook
* Effect Hook 能在函数组件中执行副作用，并且它与 class 中的生命周期函数极为类似。
* 数据获取，设置订阅以及手动更改 React 组件中的 DOM 都属于副作用
* 如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
* 自定义 Hook 必须以 “use” 开头吗？必须如此。这个约定非常重要。
* 使用规则：可以使用eslint-plugin-react-hooks 的 ESLint 插件来强制执行这两条规则
    1. 只在最顶层使用 Hook，不要在循环，条件或嵌套函数中调用 Hook
    2. 只在 React 函数中调用 Hook
    
### 开始

1. 路由
2. Tabbar
3. topic 列表页面
   3.1 service 请求封装
   3.2 scrollList 滚动列表
   3.3 card 列表项
   3.4 useLoadMore 下拉刷新
4. article 文章详情页面
   4.1 useAsync 异步请求 loading
   4.2 useInitPosition
   4.3 infoBar
   4.4 CommentPanel
   4.5 Comment
5. user
6. not-found
7. about
