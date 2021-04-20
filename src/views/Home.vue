<template>
  <div class="home">
    <el-container>
      <!--<el-header>漏洞库</el-header>-->
      <el-header>漏洞库</el-header>
      <div class="content">
        <v-sidebar />
        <el-main>
          <div style="display: flex">
            <!--<div class="search_keywords">-->
              <!--<el-input v-model="keyWord" placeholder="请输入要搜索的内容" clearable @change="getvulList">-->
                <!--<el-button slot="append" icon="el-icon-search" @click="getvulList"></el-button>-->
              <!--</el-input>-->
            <!--</div>-->
            <!--<div class="filter-modal">-->
              <!--<filter-modal :type="type" @filterData="filterData"/>-->
            <!--</div>-->
          </div>
          <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </div>
      <!--<el-footer>版权所有© </el-footer>-->
      <el-footer>版权所有© </el-footer>
    </el-container>
  </div>
</template>

<script>
  /*disable-eslint*/

  import vSidebar from '../components/Sidebar'
  import FilterModal from './index/filter'
export default {
    name: 'Home',
    data() {
        return {
            keyWord: '',
            currentPage: 1,
            total: null,
            type: 'cve',
            cveList: [],
            // exbList: [],
            // cnnvdList: [],
            // metasploitList: []
        }
    },
    components: {
        vSidebar,
        // DropDown,
        FilterModal,
        // ExbList,
        // CnnvdList,
        // MetaList,
    },
    methods: {
      // handleSizeChange(val) {
      //   cveData(1, val).then(data => {
      //     if (data && data.data) {
      //       let { dataList, total } = data.data
      //       this.cveList = dataList
      //       this.total = total
      //     } else {
      //       this.cveList = []
      //       this.total = null
      //     }
      //   })
      // },
    },
    mounted() {
    }
}
</script>

<style lang="sass" scoped>
  $myHeight: 50px
  .home
    width: 100%
    height: 100%
    /*background-color: skyblue*/
    .el-container
      height: 100%
      .content
        display: flex
        height: 100%
      .el-header, .el-footer
        background-color: #B3C0D1
        color: #333
        text-align: center
        line-height: 60px
        height: 10%
        letter-spacing: 2px
      .el-main
        color: #333
        text-align: center
        height: 90%
        flex: 1
        .operator
          height: $myHeight * 2
          display: flex
        .main_menu_table
          display: flex
        .filter_type
          width: 200px
          /*background: #1d7db1*/
        .main-pagination
          margin: 20px auto 0
        .search_keywords
          width: 60%
          margin: 20px 0 30px 10%
        .filter-modal
          margin-left: 30px
          margin-top: 20px
        .main_table
          .font-class-red
            color: red
          .font-class-orange
            color: orange
          .font-class-green
            color: green
          .vulStatus
            display: flex
            .vulDetails
              margin: 0 20px


</style>
