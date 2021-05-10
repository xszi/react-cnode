// 覆盖默认配置
const path = require('path')

module.exports = {
    webpack: config => {
        // 设置别名
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, 'src')
        }
        return config
    }
}