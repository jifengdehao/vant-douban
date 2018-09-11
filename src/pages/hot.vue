<template>
    <div class="hot">
        <van-swipe :autoplay="3000">
            <van-swipe-item>
                <a href="javascript:;">
                    <img src="../assets/banner1.jpg" width="100%"/>
                </a>

            </van-swipe-item>
            <van-swipe-item>
                <a href="javascript:;">
                    <img src="../assets/banner2.jpg" width="100%"/>
                </a>

            </van-swipe-item>
            <van-swipe-item>
                <a href="javascript:;">
                    <img src="../assets/banner3.jpg" width="100%"/>
                </a>
            </van-swipe-item>
        </van-swipe>
        <div class="group">
            <div class="item" @click="$router.push('/top-250')">
                <div class="billboard top250">
                    <span class="billboard-title">豆瓣Top250</span>
                </div>
            </div>
            <div class="item" @click="$router.push('/us-rang')">
                <div class="billboard top">
                    <span class="billboard-title">北美票房榜</span>
                </div>
            </div>
        </div>
        <div class="dark-medium pl15">即将上映</div>
        <van-list
                style="margin-bottom: 50px"
                v-model="loading"
                :finished="finished"
                @load="onLoad">
            <ul class="movies">
                <li class="movie-item van-hairline--bottom" v-for="item in movies" :key="item.id">
                    <img v-lazy="item.cover" class="item-img"/>
                    <div class="item-content">
                        <div class="dark-big ellipsis mb5">{{item.title}}</div>
                        <div class="mb5">
                            <span class="gray-small ellipsis mb5">{{item.genres}}</span>&nbsp;
                            <span v-if="item.score > 0" class="orange-small">{{item.score}}分</span>
                            <span v-else="" class="orange-small">暂无评分</span>
                        </div>
                        <div class="gray-small ellipsis mb5">
                            导演：{{item.directors}}
                        </div>
                        <div class="gray-small ellipsis mb10">
                            主演：{{item.casts}}
                        </div>
                        <van-button type="warning" plain size="small" class="item-button" @click="goToDetail(item.id)">想看</van-button>
                    </div>
                </li>
            </ul>
        </van-list>
    </div>
</template>

<script>
    import {get} from '../utils'

    export default {
        name: "hot",
        data() {
            return {
                images: [
                    'https://img.yzcdn.cn/1.jpg',
                    'https://img.yzcdn.cn/2.jpg'
                ],
                movies: [],
                finished: false,
                loading: false,
                count: 10,
                start: 0
            }
        },
        created() {
        },
        methods: {
            //数据转换
            convert(items) {
                let newItems = [];
                //遍历items
                items.forEach(function (item) {
                    let genres = item.genres.toString().replace(/,/g, ' / ');
                    //导演
                    let directors = '';
                    for (let i = 0; i < item.directors.length; i++) {
                        directors += item.directors[i].name;
                        if (i !== item.directors.length - 1) {
                            directors += ' / ';
                        }
                    }
                    //演员
                    let casts = '';
                    for (let i = 0; i < item.casts.length; i++) {
                        casts += item.casts[i].name;
                        if (i !== item.casts.length - 1) {
                            casts += ' / ';
                        }
                    }

                    newItems.push({
                        id: item.id,
                        title: item.title,
                        genres: genres,
                        cover: item.images.large,
                        score: item.rating.average,
                        directors: directors,
                        casts: casts
                    });
                });

                return newItems;
            },
            getHotMovies() {
                get('/api/movie/coming_soon', {start: this.start, count: 10}).then(res => {
                    console.log(res);
                    this.movies = this.movies.concat(this.convert(res.subjects))
                    if (res.total > this.movies.length) {
                        this.start = this.movies.length
                        this.loading = false
                    } else {
                        this.loading = false
                        this.finished = true
                    }
                })
            },
            onLoad() {
                this.getHotMovies()
            },
            goToDetail(id){
                this.$router.push('/detail/' + id);
            }
        }
    }
</script>

<style scoped>
    .group {
        display: flex;
        flex-flow: row nowrap;
        flex: 1 1 0;
        height: 200px;
        text-align: center;
    }

    .item {
        width: 50%;
        height: 100%;
        padding: 15px;
        box-sizing: border-box;
    }

    .billboard {
        width: 100%;
        height: 100%;
        line-height: 100%;
        border-radius: 5px;
        display: table;
    }

    .billboard-title {
        color: white;
        font-size: 18px;
        display: table-cell;
        vertical-align: middle;
    }

    .top250 {
        background: linear-gradient(#941AE6, #F1E0FC);
    }

    .top {
        background: linear-gradient(#3370CC, #CEE1FD);
    }

    .movies .movie-item {
        padding: 20px 15px;
        box-sizing: border-box;
    }

    .movies .item-img {
        width: 60px;
        height: 90px;
        margin-right: 10px;
        float: left;
    }

    .movies .item-button {
        margin-left: 70px;
    }


</style>
