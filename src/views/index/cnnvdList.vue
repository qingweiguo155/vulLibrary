<template>
    <div>
        <v-filter @filterData="filterData"/>
        <el-table
                ref="filterTable"
                size="mini"
                border
                :data="cnnvdList"
                style="width: 100%">
            <el-table-column
                    label="CNNVD ID"
                    width="180">
                <template slot-scope="scope">
                    <el-button @click="cnnvdDetails(scope.row.cnnvd)" type="text" size="small">{{scope.row.cnnvd}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="releaseTime"
                    label="发布时间"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="riskLevel"
                    label="危害等级"
                    width="100">
            </el-table-column>
            <el-table-column
                    width="70"
                    prop="threatType"
                    label="威胁类型">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="vulName"
                    show-overflow-tooltip
                    label="漏洞名称">
            </el-table-column>
            <el-table-column
                    width="180"
                    prop="vulType"
                    label="漏洞类型">
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
    import { cnnvdData  } from '../../api'
    import { mapActions } from 'vuex'
    export default {
        name: "cnnvdList1",
        data() {
            return {
                cnnvdList: [],
                total: 0,
                currentPage: 1
            }
        },
        mixins: [vFilter],
        methods: {
            ...mapActions([
                'setType'
            ]),
            cnnvdDetails(id) {
                this.$router.push(`vuldetails/${id}${this.$route.path}`)
                // this.setType('cnnvd')
            },
            getCnnvdData(val = 1, pageSize = 10, params = {}) {
                cnnvdData(val, pageSize, params).then(data => {
                    if (data && data.data) {
                        let { dataList, total } = data.data
                        this.cnnvdList = dataList
                        this.total = total
                        this.openLoading().close()
                    } else {
                        this.cnnvdList = []
                        this.total = null
                    }
                })
            },
            filterData(params) {
                this.getCnnvdData(1, 10 ,params)
            },
            currentChange(val) {
                this.getCnnvdData(val)
            }
        },
        mounted() {
            this.getCnnvdData()
        }
    }
</script>

<style scoped>
    .main-pagination {
        margin: 20px auto 0
    }
</style>