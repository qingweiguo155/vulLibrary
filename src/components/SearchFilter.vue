<template>
    <div class="common_header">
        <div class="search_keywords">
            <el-input v-model="keyWord" placeholder="请输入要搜索的内容" clearable @change="getvulList">
                <el-button slot="append" icon="el-icon-search" @click="getvulList"></el-button>
            </el-input>
        </div>
        <!--<div class="filter-modal">-->
            <!--<filter-modal />-->
        <!--</div>-->
    </div>
</template>

<script>
    // import FilterModal from '../views/index/filter'
    export default {
        name: "SearchFilter",
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang="sass">
    .common_header
        display: flex
        .search_keywords
            margin-left: 20%
            margin-bottom: 20px
            width: 50%
        .filter-modal
            flex: 1
            text-align: left
            margin-left: 30px
</style>