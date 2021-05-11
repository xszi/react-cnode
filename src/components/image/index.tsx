import React, { useState } from 'react';
import ImageWrapper from './style'

const defaultProps = {
    alt: '',
    width: 50,
    height: 50,
    radius: 8,
    onclick: (e: React.MouseEvent) => { }
};

// 普通写法 先定义类型，再定义变量
// Partial 支持你先定义变量，再通过变量来获取类型
export interface ImageProps extends Partial<typeof defaultProps> {
    src: string;
    style?: React.CSSProperties;
}

const Image: React.FC<ImageProps> = (props: ImageProps) => {
    const { src, alt, width, height, radius, style = {}, onclick } = props;
    const [status, setStatus] = useState('loading');

    return (
        <ImageWrapper
            className={`image-${status}`}
            width={width}
            height={height}
            radius={radius}
            style={{ ...style }}
            onClick={onclick}
        >
            <img
                src={src}
                alt={alt}
                onLoad={() => setStatus('complete')}
                onError={() => setStatus('error')}
            />
        </ImageWrapper>
    )
}

Image.defaultProps = defaultProps

export default React.memo(Image)