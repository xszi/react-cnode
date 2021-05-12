import Service, { SuccessFormat } from './base';

class CnodeSDK extends Service {
    constructor() {
        super({
            baseURL: 'https://cnodejs.org/api/v1',
            timeout: 8000
        })
    }

    /**
     * 获取分类列表
     * @param {String} tab 类型
     * @param {Number} page 类型
     * @param {Number} limit 每页数量
    */
    getTopicsByTab(
        tab: string,
        page: number = 1,
        limit: number = 20
    ): Promise<SuccessFormat> {
        return this.get('/topics', {
            page: page,
            limit: limit,
            tab: tab
        })
    }

    /**
     * 获取话题的文章详情
     * @param {String} topicId
     */
    getTopicDetail(topicId: number | number): Promise<SuccessFormat> {
        return this.get(`/topic/${topicId}`);
    }

    /**
     * 获取用户详情页数据
     * @param {String} username
     */
    getUserDetails(username: string): Promise<SuccessFormat> {
        return this.get(`/user/${username}`);
    }

    /**
     * 获取用户收藏的文章
     * @param {String} username
     */
    getUserCollection(username: string): Promise<SuccessFormat> {
        return this.get(`topic_collect/${username}`)
    }
}

export default new CnodeSDK()