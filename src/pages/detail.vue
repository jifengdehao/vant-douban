<template>
    <div class="detail">
        <div class="top-image-block">
            <img v-lazy="cover" class="top-img" @click="openImg(cover)"/>
        </div>
        <div class="detail-content">
            <div class="fl">
                <div class="dark-big mb5">{{title}}</div>
                <div class="gray-small mb5">{{year}} / {{countries.toString().replace(/,/g,' / ')}} /
                    {{genres.toString().replace(/,/g,' / ')}}
                </div>
                <div class="gray-small mb5">{{directors.length > 0 ? directors[0].name:''}}导演作品</div>
            </div>
            <div class="fr detail-tip">
                <div class="gray-micro">豆瓣评分</div>
                <div class="dark-big" v-if="score>0">{{score}}</div>
                <div class="dark-medium" v-else>暂无评分</div>
                <div class="gray-micro">{{ratingCount}}人</div>
            </div>
            <div class="van-clearfix"></div>
            <div class="van-hairline--bottom mt5"></div>
            <p class="gray-small">剧情简介</p>
            <p class="dark-medium">{{summary}}</p>
            <p class="gray-small">演员</p>
            <ul class="list">
                <li class="item" v-for="item in casts" :key="item.id" @click="$router.push('/performer/'+item.id)">
                    <img v-lazy="item.avatars.medium" class="item-img" :alt="item.name"/>
                    <div class="dark-micro ellipsis">{{item.name}}</div>
                </li>
            </ul>
            <van-button type="default" block>评论</van-button>
        </div>
    </div>
</template>

<script>
    import {get} from '../utils/'
    import {ImagePreview} from 'vant';

    export default {
        name: "detail",
        data() {
            return {
                title: '',
                cover: '',
                score: '',
                ratingCount: '',
                summary: '',
                countries: '',
                year: '',
                genres: '',
                casts: [],
                directors: []
            }
        },
        created() {
            this.getMovieDetail()
        },
        methods: {
            getMovieDetail() {

                const loading = this.$toast.loading({
                    message: '加载中...',
                    duration: 0,
                    type: 'loading'
                });
                get('/api/movie/subject/' + this.$route.params.id).then(resp => {
                    this.title = resp.title;
                    this.cover = resp.images.large;
                    this.score = resp.rating.average;
                    this.ratingCount = resp.ratings_count;
                    this.summary = resp.summary;
                    this.countries = resp.countries;
                    this.year = resp.year;
                    this.genres = resp.genres;
                    this.casts = resp.casts;
                    this.directors = resp.directors;
                    loading.clear();
                })
            },
            openImg(img) {
                ImagePreview([img]);
            }
        }
    }
</script>

<style scoped>
    .top-image-block {
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #3C3C3C;
    }

    .top-image-block .top-img {
        width: 160px;
        height: 240px;
        vertical-align: top;
    }

    .detail-content {
        padding: 15px;
    }

    .detail-tip {
        width: 60px;
        height: 60px;
        background-color: white;
        text-align: center;
        box-shadow: 0px 0px 10px #aaaaaa;
        line-height: 20px;
        padding: 4px;
    }

    .detail-content .list {
        overflow-x: scroll;
        white-space: nowrap;
        margin-bottom: 15px;
    }

    .detail-content .list .item {
        width: 70px;
        display: inline-block;
        margin-right: 10px;
    }

    .detail-content .list .item:last-child {
        margin-right: 0px;
    }

    .detail-content .list .item-img {
        height: 100px;
        width: 70px;
    }
</style>
