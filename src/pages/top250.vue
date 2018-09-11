<template>
    <div class="top250">
        <van-tabs v-model="active" @click="handleClick">
            <van-tab title="Top1-50">
                <ul class="top-list">
                    <li v-for="item in list" :key="item.id" class="item" @click="goToDetail(item.id)">
                        <div class="tc">
                            <div class="line"></div>
                            <div class="top-index">{{item.sort}}</div>
                            <div class="line"></div>
                        </div>
                        <div class="card van-hairline--surround">
                            <img v-lazy="item.cover" class="fl item-cover"/>
                            <div class="dark-big mb5">{{item.title}}</div>
                            <div class="mb5">
                                <span class="gray-small">豆瓣评分：</span><span
                                    class="orange-small">{{item.score}}分</span>
                            </div>
                            <div class="gray-small ellipsis mb5">
                                导演：{{item.directorsStr}}
                            </div>
                            <div class="gray-small ellipsis">
                                演员：{{item.castsStr}}
                            </div>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab title="51-100">
                <ul class="top-list">
                    <li v-for="item in list" :key="item.id" class="item" @click="goToDetail(item.id)">
                        <div class="tc">
                            <div class="line"></div>
                            <div class="top-index">{{item.sort}}</div>
                            <div class="line"></div>
                        </div>
                        <div class="card van-hairline--surround">
                            <img v-lazy="item.cover" class="fl item-cover"/>
                            <div class="dark-big mb5">{{item.title}}</div>
                            <div class="mb5">
                                <span class="gray-small">豆瓣评分：</span><span
                                    class="orange-small">{{item.score}}分</span>
                            </div>
                            <div class="gray-small ellipsis mb5">
                                导演：{{item.directorsStr}}
                            </div>
                            <div class="gray-small ellipsis">
                                演员：{{item.castsStr}}
                            </div>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab title="101-150">
                <ul class="top-list">
                    <li v-for="item in list" :key="item.id" class="item" @click="goToDetail(item.id)">
                        <div class="tc">
                            <div class="line"></div>
                            <div class="top-index">{{item.sort}}</div>
                            <div class="line"></div>
                        </div>
                        <div class="card van-hairline--surround">
                            <img v-lazy="item.cover" class="fl item-cover"/>
                            <div class="dark-big mb5">{{item.title}}</div>
                            <div class="mb5">
                                <span class="gray-small">豆瓣评分：</span><span
                                    class="orange-small">{{item.score}}分</span>
                            </div>
                            <div class="gray-small ellipsis mb5">
                                导演：{{item.directorsStr}}
                            </div>
                            <div class="gray-small ellipsis">
                                演员：{{item.castsStr}}
                            </div>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab title="151-200">
                <ul class="top-list">
                    <li v-for="item in list" :key="item.id" class="item" @click="goToDetail(item.id)">
                        <div class="tc">
                            <div class="line"></div>
                            <div class="top-index">{{item.sort}}</div>
                            <div class="line"></div>
                        </div>
                        <div class="card van-hairline--surround">
                            <img v-lazy="item.cover" class="fl item-cover"/>
                            <div class="dark-big mb5">{{item.title}}</div>
                            <div class="mb5">
                                <span class="gray-small">豆瓣评分：</span><span
                                    class="orange-small">{{item.score}}分</span>
                            </div>
                            <div class="gray-small ellipsis mb5">
                                导演：{{item.directorsStr}}
                            </div>
                            <div class="gray-small ellipsis">
                                演员：{{item.castsStr}}
                            </div>
                        </div>
                    </li>
                </ul>
            </van-tab>
            <van-tab title="201-250">
                <ul class="top-list">
                    <li v-for="item in list" :key="item.id" class="item" @click="goToDetail(item.id)">
                        <div class="tc">
                            <div class="line"></div>
                            <div class="top-index">{{item.sort}}</div>
                            <div class="line"></div>
                        </div>
                        <div class="card van-hairline--surround">
                            <img v-lazy="item.cover" class="fl item-cover"/>
                            <div class="dark-big mb5">{{item.title}}</div>
                            <div class="mb5">
                                <span class="gray-small">豆瓣评分：</span><span
                                    class="orange-small">{{item.score}}分</span>
                            </div>
                            <div class="gray-small ellipsis mb5">
                                导演：{{item.directorsStr}}
                            </div>
                            <div class="gray-small ellipsis">
                                演员：{{item.castsStr}}
                            </div>
                        </div>
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import {get} from '../utils'

    export default {
        name: "top250",
        data() {
            return {
                active: 0,
                start: 0,
                count: 50,
                list: []
            }
        },
        created() {
            this.getListData()
        },
        methods: {
            handleClick(index) {
                switch (index) {
                    case 0:
                        this.start = 0;
                        this.getListData();
                        break;
                    case 1:
                        this.start = 50;
                        this.getListData();
                        break;
                    case 2:
                        this.start = 100;
                        this.getListData();
                        break;
                    case 3:
                        this.start = 150;
                        this.getListData();
                        break;
                    case 4:
                        this.start = 200;
                        this.getListData();
                        break;
                    default:
                        return;
                }
            },
            getListData() {
                const loading = this.$toast.loading({
                    message: '加载中...',
                    duration: 0,
                    type: 'loading'
                });
                get('/api/movie/top250', {start: this.start, count: this.count}).then(res => {
                    console.log(res);
                    this.list = this.convert(res);
                    loading.clear();
                })
            },
            goToDetail(id) {
                this.$router.push('/detail/' + id);
            },
            convert(obj) {
                let newItems = [];
                let items = obj.subjects;
                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    //重组导演数据a / b / c
                    let directorsStr = '';
                    for (let k = 0; k < item.directors.length; k++) {
                        directorsStr += item.directors[k].name;
                        if (k !== item.directors.length - 1) {
                            directorsStr += '/';
                        }
                    }
                    //演员数据
                    let castsStr = '';
                    for (let k = 0; k < item.casts.length; k++) {
                        castsStr += item.casts[k].name;
                        if (k !== item.casts.length - 1) {
                            castsStr += '/';
                        }
                    }
                    newItems.push({
                        sort: i + obj.start + 1,
                        id: item.id,
                        title: item.title,
                        cover: item.images.medium,
                        score: item.rating.average,
                        directorsStr: directorsStr,
                        castsStr: castsStr
                    });
                }
                return newItems;
            }
        }
    }
</script>

<style scoped>
    .top-list .item {
        padding:0 15px;
    }

    .top-list .item-cover {
        width: 70px;
        height: 95px;
        margin-right: 10px;
    }

    /*排序数字样式*/
    .top-index {
        color: red;
        font-size: 16px;
        font-style: italic;
        width: 30px;
        display: inline-block;
        margin-top: 20px;
        margin-bottom: 15px;
    }

    /*线的样式*/
    .line {
        width: 50px;
        height: 0.5px;
        background: #C4C4C4;
        display: inline-block;
        vertical-align: middle;
    }

    /*card样式*/
    .card {
        height: 120px;
        border-radius: 2px;
        box-shadow: 0px 1px 5px #C4C4C4;
        padding: 15px;
        text-align: left;
    }
</style>
