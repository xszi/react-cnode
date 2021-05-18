import React, { useState } from 'react';
import ImageWrapper from './style'

const defaultProps = {
    alt: '',
    width: 50,
    height: 50,
    radius: 8,
    onClick: (e: React.MouseEvent) => {}
};

// 普通写法 先定义类型，再定义变量
// Partial 支持你先定义变量，再通过变量来获取类型
export interface ImageProps extends Partial<typeof defaultProps> {
    src: string;
    style?: React.CSSProperties;
}

const Image: React.FC<ImageProps> = (props: ImageProps) => {
    // 可选属性最好价格默认值
    const { src, alt, width, height, radius, style = {}, onClick } = props;
    // 加载完成之前加载base64图片
    // 加载失败加载base64图片
    // 加载完成显示正式图片
    const [status, setStatus] = useState('loading');

    return (
        <ImageWrapper
            className={`image-${status}`}
            width={width}
            height={height}
            radius={radius}
            style={{ ...style }}
            onClick={onClick}
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