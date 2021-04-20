<template>
    <div>
        <v-filter @filterData="filterData"/>
        <el-table
                ref="filterTable"
                size="mini"
                border
                :data="exbList"
                style="width: 100%">
            <el-table-column
                    label="EXB ID"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="exbDetails(scope.row.edbId)" type="text" size="small">{{scope.row.edbId}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="发布时间"
                    width="100">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="platform"
                    label="受影响平台">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="tag"
                    show-overflow-tooltip
                    label="漏洞类型">
            </el-table-column>
            <el-table-column
                    width="180"
                    prop="title"
                    show-overflow-tooltip
                    label="漏洞标题">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="type"
                    label="威胁类型">
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
    import vFilter from '../../mixins/commonImport'
    import { exbData } from '../../api'
    import { mapActions } from 'vuex'
    export default {
        name: "exbList1",
        data() {
            return {
                exbList: [],
                total: 0,
                currentPage: 1
            }
        },
        mixins: [vFilter],
        methods: {
            ...mapActions([
                'setType'
            ]),
            exbDetails(id) {
                this.$router.push(`vuldetails/${id}${this.$route.path}`)
                // this.setType('exb')
            },
            filterData(params) {
                this.getExbData(1, 10 ,params)
            },
            getExbData(val = 1, pageSize = 10, params = {}) {
                exbData(val, pageSize, params).then(data => {
                    if (data && data.data) {
                        let { dataList, total } = data.data
                        this.exbList = dataList
                        this.total = total
                    } else {
                        this.exbList = []
                        this.total = null
                    }
                })
            },
             currentChange(val) {
                 this.getExbData(val)
            }
        },
        mounted() {
            this.getExbData()
        }
    }
</script>

<style scoped>
    .main-pagination {
        margin: 20px auto 0
    }
</style>