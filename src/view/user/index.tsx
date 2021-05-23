import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'timeago.js'
import sdk from '../../service/cnode-sdk';
import isEmpty from '../../utils/isEmpty';
import useAsync from '../../hooks/useAsync';
import useInitPosition from '../../hooks/useInitPosition';
import { ArticleLink } from '../../types'

import Image from '../../components/image';

import { 
    InfoPanel,
    InfoContent,
    ListPanel,
    ListItem,
    SkeletonInfo,
    SkeletonList
} from './style'

interface UserDetail {
    avatar_url: string;
    created_at: string;
    githubUsername: string;
    loginname: string;
    recent_replies: ArticleLink[];
    recent_topics: ArticleLink[];
    score: number;
}

interface InfoProps {
    loginname: string;
    avatar_url: string;
    score: number;
    created_at: string;
}

interface ListProps {
    title: string;
    value: ArticleLink[];
}

// memo 不做更改的时候不做重新渲染
const Info: React.FC<{ value: InfoProps | undefined }> = React.memo((props) => {
    const info = props.value || ({} as InfoProps);
    // 判断info是否为空，如果为空，显示骨架图
    // 如果不为空，显示数据
    return !isEmpty(info) ? (
        <InfoPanel>
            <Image
                src={info?.avatar_url || ''}
                width={60}
                height={60}
                radius={4}
            />
            <InfoContent>
                <h3>{info?.loginname}</h3>
                <ul>
                    <li>积分：{info.score || 0}</li>
                    <li>注册于&nbsp;{format(info.created_at, 'zh_CN')}</li>
                </ul>
            </InfoContent>
        </InfoPanel>
    ) : (
        <SkeletonInfo />
    );
});

const List: React.FC<ListProps> = React.memo((props) => {
    const { title, value } = props;
    return !isEmpty(value) ? (
        <ListPanel>
            <h3>{title}</h3>
            {value.map((link) => {
                return (
                    <ListItem key={link.id}>
                        <Link to={`/article/${link.id}`}>{link.title}</Link>
                        <span className="created-at">
                            {format(link.last_reply_at, 'zh_CN')}
                        </span>
                    </ListItem>    
                )
            })}
        </ListPanel>
    ) : (
        <SkeletonList />
    )
});

const User: React.FC<{}> = (props) => {
    const { name = '' } = useParams<{ name?: string }>()
    let { result: infoResult } = useAsync<{ data: UserDetail }>(() => 
        sdk.getUserDetails(name)
    );

    let { result: collectionResult } = useAsync<{ data: ArticleLink[] }>(() =>
        sdk.getUserCollection(name)
    )

    // 在列表页面的时候，位置可能不在顶部了
    useInitPosition(0, 0)

    const info = infoResult ? infoResult.data : ({} as UserDetail);
    const collection = collectionResult ? collectionResult.data : ([] as ArticleLink[]);

    return (
        <section>
            <Info value={info} />
            <List title="最近发布话题" value={info?.recent_topics}></List>
            <List title="最近回复" value={info?.recent_replies}></List>
            <List title="收藏话题" value={collection}></List>
        </section>
    )
}

export default User;