<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                active: 0
            }
        }
    }
</script>

<style>
    .dark-big {
        color: #333333;
        font-size: 16px;
    }

    .dark-medium {
        color: #333333;
        font-size: 14px;
    }

    .dark-small {
        color: #333333;
        font-size: 12px;
    }

    .dark-micro {
        color: #333333;
        font-size: 10px;
    }

    .gray-big {
        color: #A2A2A2;
        font-size: 16px;
    }

    .gray-medium {
        color: #A2A2A2;
        font-size: 14px;
    }

    .gray-small {
        color: #A2A2A2;
        font-size: 12px;
    }

    .gray-micro {
        color: #A2A2A2;
        font-size: 10px;
    }

    .orange-big {
        color: #F79709;
        font-size: 16px;
    }

    .orange-medium {
        color: #F79709;
        font-size: 14px;
    }

    .orange-small {
        color: #F79709;
        font-size: 12px;
    }

    .orange-micro {
        color: #F79709;
        font-size: 10px;
    }

    .ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .mb5 {
        margin-bottom: 5px;
    }

    .mt5 {
        margin-top: 5px;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .clearfix:after {
        content: '';
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
    }

    .tc {
        text-align: center;
    }

    .p15 {
        padding: 15px;
    }

    .p20 {
        padding: 20px;
    }

    .pl15 {
        padding-left: 15px;
    }

    .pr15 {
        padding-right: 15px;
    }

    img {
        vertical-align: middle;
    }

    .mb10 {
        margin-bottom: 10px;
    }
</style>
