<template>
    <div class="performer">
        <div class="top-image-block">
            <img v-lazy="cover" class="top-img" @click="openImg(cover)"/>
        </div>
        <div class="p15">
            <div class="dark-big mb5">{{name}}</div>
            <div class="gray-medium mb5">{{enName}}</div>
            <div class="gray-small mb5">个人简介</div>
            <div class="dark-medium">{{summary}}</div>
        </div>

        <div class="gray-small pl15">代表作品</div>
        <div class="detail-content">
            <ul class="list">
                <li v-for="item in works" class="item" :key="item.subject.id"
                    @click="$router.push('/detail/'+item.subject.id)">
                    <img v-lazy="item.subject.images.medium" class="item-img"/>
                    <div class="dark-micro ellipsis mt5 mb5">{{item.subject.title}}</div>
                    <div class="orange-small ellipsis">{{item.subject.rating.average}}分</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {get} from '../utils'
    import {ImagePreview} from 'vant'

    export default {
        name: "performer",
        data() {
            return {
                name: '',
                enName: '',
                cover: '',
                summary: '',
                works: []
            }
        },
        created() {
            this.getDetial()
        },
        methods: {
            getDetial() {
                get('/api/movie/celebrity/' + this.$route.params.id).then(resp => {
                    this.name = resp.name;
                    this.enName = resp.name_en;
                    this.cover = resp.avatars.large;
                    this.summary = resp.name + '，' + resp.gender + '，' + resp.born_place;
                    this.works = resp.works;
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
        background: #3C3C3C;
    }

    .top-image-block .top-img {
        width: 160px;
        height: 240px;
        vertical-align: top;
    }

    .detail-content .list {
        overflow-x: scroll;
        white-space: nowrap;
        margin-bottom: 15px;
    }

    .detail-content {
        padding: 15px;
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
