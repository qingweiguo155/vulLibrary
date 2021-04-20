<template>
    <div>
        <view-filter @filterData="filterData"/>
        <el-table
            ref="filterTable"
            size="mini"
            border
            :data="cveDataList"
            style="width: 100%">
            <el-table-column
                    label="CVE ID"
                    width="180">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.cveId)" type="text" size="small">{{scope.row.cveId}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="publishDate"
                    label="发布日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="漏洞评分"
                    width="100">
                <template slot-scope="scope">
                    <span :class="scope.row.cvssScore <= 7.5 ? scope.row.cvssScore >= 2.5 ?  'font-class-orange': 'font-class-green' : 'font-class-red'">{{scope.row.cvssScore}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="vulName"
                    show-overflow-tooltip
                    label="漏洞名称">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="漏洞状态"
            >
                <template slot-scope="scope">
                    <div class="vulStatus">
                        <el-tag type='primary' disable-transitions v-if="scope.row.exploitScripts">漏洞利用代码</el-tag>
                        <el-tag type="primary" class="vulDetails" v-if="scope.row.exploitInfo" style="margin: 0 5px">漏洞细节</el-tag>
                        <el-tag type="primary" v-if="scope.row.exploitCarrier">漏洞载体</el-tag>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="main-pagination">
            <el-pagination
                background
                :current-page="currentPage"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                @current-change="currentChange"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import ViewFilter from '../../views/index/filter'
    // import vSerach from '../../components/SearchFilter'
    // import vFilter from '../../views/index/filter'
    import { cveData } from '../../api'
    import { mapGetters,mapActions } from 'vuex'
    export default {
        name: "cveList",
        data() {
            return {
                cveDataList: [],
                total: 0,
                currentPage: 1
            }
        },
        // mixins: [vFilter],
        components: {
           ViewFilter
        },
        computed: {
            ...mapGetters(['cveFilter']),
        },
        methods: {
            ...mapActions([
                'setType'
            ]),
            handleClick(id) {
                this.$router.push(`vuldetails/${id}${this.$route.path}`)
            },
            getCveData(val = 1, pageSize = 10, params = {}) {
                cveData(val, pageSize, params).then(data => {
                    if (data && data.data) {
                        let { dataList, total } = data.data
                        this.cveDataList = dataList
                        this.total = total
                    } else {
                        this.cveDataList = [{ncveId: 1234}]
                        this.total = null
                    }
                })
            },
            filterData(params) {
                this.getCveData(1, 10 ,params)
            },
            currentChange(val) {
                this.getCveData(val, 10, )
            }
        },
        mounted() {
            this.getCveData()
        }
    }
</script>

<style scoped>
    .main-pagination {
        margin: 20px auto 0
    }
    .font-class-orange {
            color: orange

    }
    .font-class-red {
        color: red;
    }
    .font-class-green {
        color: green;
    }

</style>