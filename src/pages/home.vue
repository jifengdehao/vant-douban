<template>
    <div class="home">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-search placeholder="请输入搜索关键词" v-model="search" @search="onSearch"/>
            <van-list
                    style="margin-bottom: 50px"
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad">
                <ul id="movies" class="movies">
                    <li class="movie-item van-hairline--bottom" v-for="item in movies" :key="item.id"
                        @click="goToDetail(item.id)">
                        <img class="item-img" v-lazy="item.cover"/>
                        <div class="ellipsis dark-big mb5">
                            {{item.title}}
                        </div>
                        <div class="ellipsis mb5">
                            <span class="gray-small">{{item.genres}}</span>&nbsp;
                            <span v-if="item.score>0" class="orange-small">{{item.score}}分</span>
                            <span v-else class="orange-small">暂无评分</span>
                        </div>
                        <div class="ellipsis gray-small mb5">
                            导演：{{item.directors}}
                        </div>
                        <div class="ellipsis gray-small">
                            主演：{{item.casts}}
                        </div>
                    </li>
                </ul>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import {mapMutations, mapGetters} from 'vuex'
    import {get} from '../utils'

    export default {
        name: "home",
        data() {
            return {
                movies: [],
                start: 0,
                count: 10,
                isLoading: false,
                loading: false,
                finished: false,
                search: ''
            }
        },
        computed: {
            ...mapGetters([
                'getUser'
            ])
        },
        created() {
            //
        },
        mounted() {
            this.$nextTick(() => {
                this.setUser('wekery')
            })
        },
        methods: {
            ...mapMutations([
                'setUser'
            ]),
            // 获取电影详情
            getMovies() {
                if (this.isLoading) {
                    this.start = 0
                }
                get('/api/movie/in_theaters', {count: this.count, start: this.start}).then(res => {
                    console.log(res)
                    if (this.isLoading) {
                        this.movies = this.convert(res.subjects)
                        this.isLoading = false
                    } else {
                        this.movies = this.movies.concat(this.convert(res.subjects))
                    }
                    if (res.total > this.movies.length) {
                        this.start = this.movies.length
                        this.loading = false
                    } else {
                        this.loading = false
                        this.finished = true
                    }
                })
            },
            // 上拉刷新
            onRefresh() {
                this.getMovies()
            },
            // 搜索
            onSearch() {
                if (this.search) {
                    let count = 10, start = 0;
                    this.movies = [];
                    get('/api/movie/search', {q: this.search, start: start, count: count}).then(res => {
                        console.log(res);
                        this.movies = this.convert(res.subjects)
                    });
                }
            },
            // 下拉刷新
            onLoad() {
                this.getMovies()
            },
            // 跳转到详情
            goToDetail(id) {
                this.$router.push('/detail/' + id);
            },
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
            }
        }
    }
</script>

<style scoped>
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
</style>
