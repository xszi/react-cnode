import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from '../../components/header';
import Tabbar, { Tabber } from '../../components/tabbar';
import Topic from '../../view/topic';
// import Article from '../../view/Article';
// import User from '../../view/User';
// import About from '../../view/About';
// import NotFound from '../../view/NotFound';
// import Layout, { Fixed, Main } from './style'
import Layout, { Fixed } from './style'

import logo from '../../assets/logo.svg';

const navList: Tabber[] = [
    { name: '全部', route: '/topic/all' },
    { name: '精华', route: '/topic/good' },
    { name: '分享', route: '/topic/share' },
    { name: '问答', route: '/topic/ask' },
    { name: '招聘', route: '/topic/job' },
    { name: '关于', route: '/about' },
]

const BaseLayout = () => {
    return (
        <Layout>
            <Fixed>
                <Header logo={logo}></Header>
                <Tabbar value={navList}></Tabbar>
            </Fixed>

            <main>
                <Switch>
                    <Redirect from={'/'} to={'/topic/all'}></Redirect>
                    <Route path={'/topic/:tag'} component={Topic} exact></Route>
                    {/* <Route path={'/article/:id'} component={Article} exact /> */}
                    {/* <Route path={'/user/:name'} component={User} exact /> */}
                    {/* <Route path={'/about'} component={About} exact /> */}
                    {/* <Route path={'*'} component={NotFound} /> */}
                </Switch>
            </main>
        </Layout>
    )
}

export default React.memo(BaseLayout)