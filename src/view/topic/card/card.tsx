import React from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'timeago.js';
import Image from '../../../components/image';
import Tag from '../../../components/tag';
import CardWrapper, { CardHead, CardBody, Info, Time } from './style';

import { Topic as TopicType } from '../../../types';

interface IProps {
    data: TopicType,
    onClick?: (e: React.MouseEvent) => void;
}

const Card: React.FC<IProps> = (props: IProps) => {
    const { data, onClick } = props;
    const history = useHistory();

    // 获取tag的类型
    const getTagType = () => {
        if (data.top) return 'top';
        if (data.good) return 'good';

        return data.tab;
    }

    const visitUser = (e: React.MouseEvent, name: string) => {
        e.stopPropagation();
        history.push(`/user/${name}`);
    }

    return (
        <CardWrapper onClick={onClick}>
            <CardHead>
                <Tag type={getTagType()}></Tag>
                <h4>{data.title}</h4>
            </CardHead>

            <CardBody>
                {/* optional chain ?.
                    data.author && data.author.avatar_url || ''
                */}
                <Image
                    src={data.author?.avatar_url || ''}
                    width={44}
                    height={44}
                    radius={4}
                    onClick={(e) => visitUser(e, data.author.loginname)}
                />
                <Info>
                    <ul>
                        <li>查看数：{data.visit_count}</li>
                        <li>回复数数：{data.reply_count}</li>
                    </ul>
                    <Time>{format(data.last_reply_at, 'zh_CN')}</Time>
                </Info>
            </CardBody>
        </CardWrapper>
    )
}

export { createSkeleton } from './style'
export default React.memo(Card)