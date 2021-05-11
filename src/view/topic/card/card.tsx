import React from 'react';
import { useHistory } from 'react-router-dom';
import Image from 'components/image';
import Tag from 'components/tag';
import { format } from 'timeago';
import CardWrapper, { CardHead, CardBody, Info, Time } from './style';

import { Topic as TopicType } from '../../../types';

interface IProps {
    data: TopicType,
    onclick?: (e: React.MouseEvent) => void;
}

const Card: React.FC<IProps> = (props: IProps) => {
    const { data, onclick } = props;
    const history = useHistory();

    // 获取tag的类型
    const getTagType = () => {
        if (data.top) return 'top';
        if (data.good) return 'good';

        return data.tab;
    }

    return (
        <div>111</div>
    )
}