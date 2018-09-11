<template>
    <div class="us-rang">
        <van-list
                style="margin-bottom: 50px"
                v-model="loading"
                :finished="finished"
                @load="onLoad">
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
                            <span class="gray-small">豆瓣评分：</span><span class="orange-small">{{item.score}}分</span>
                        </div>
                        <div class="gray-small ellipsis mb5">导演：{{item.directorsStr}}</div>
                        <div class="gray-small ellipsis">演员：{{item.castsStr}}</div>
                    </div>
                </li>
            </ul>
        </van-list>
    </div>
</template>

<script>
    import {get} from '../utils'

    export default {
        name: "us-rang",
        data() {
            return {
                list: [],
                loading: false,
                finished: false
            }
        },
        methods: {
            onLoad() {
                get('/api/movie/us_box').then(res => {
                    console.log(res);
                    this.list = this.convert(res);
                    this.loading = false;
                    this.finished = true;
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
                    for (let k = 0; k < item.subject.directors.length; k++) {
                        directorsStr += item.subject.directors[k].name;
                        if (k !== item.subject.directors.length - 1) {
                            directorsStr += '/';
                        }
                    }
                    //演员数据
                    let castsStr = '';
                    for (let k = 0; k < item.subject.casts.length; k++) {
                        castsStr += item.subject.casts[k].name;
                        if (k !== item.subject.casts.length - 1) {
                            castsStr += '/';
                        }
                    }
                    newItems.push({
                        sort: i + 1,
                        id: item.subject.id,
                        title: item.subject.title,
                        cover: item.subject.images.medium,
                        score: item.subject.rating.average,
                        directorsStr: directorsStr,
                        castsStr: castsStr,
                        box: item.box
                    });
                }
                return newItems;
            }
        }
    }
</script>

<style scoped>
    .top-list .item {
        padding: 0 15px;
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
