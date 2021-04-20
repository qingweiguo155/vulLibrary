<template>
    <div>
        <v-filter @filterData="filterData"/>
        <el-table
                ref="filterTable"
                size="mini"
                border
                :data="metasploitList"
                style="width: 100%">
            <el-table-column
                    label="METASPLOI ID"
                    show-overflow-tooltip
                    width="200">
                <template slot-scope="scope">
                    <el-button @click="metasploitDetails(scope.row.metasploitId)" type="text" size="small">{{scope.row.metasploitId}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="disclosure_date"
                    label="公开时间"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="漏洞名称"
                    show-overflow-tooltip
                    width="100">
            </el-table-column>
            <el-table-column
                    width="180"
                    prop="platform"
                    label="受影响平台">
            </el-table-column>
            <el-table-column
                    width="100"
                    prop="rank"
                    label="级别">
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
    import { metasploitData  } from '../../api'
    import { mapActions } from 'vuex'
    export default {
        name: "metasploitList1",
        data() {
            return {
                metasploitList: [],
                total: 0,
                currentPage: 1
            }
        },
        mixins: [vFilter],
        methods: {
            ...mapActions([
                'setType'
            ]),
            metasploitDetails(id) {
                this.$router.push(`vuldetails/${id}${this.$route.path}`)
                // this.setType('metasploit')
            },
            getMetasploitData(val = 1, pageSize = 10, params = {}) {
                metasploitData(val, pageSize, params).then(data => {
                    if (data && data.data) {
                        let { dataList, total } = data.data
                        this.metasploitList = dataList
                        this.total = total
                        this.openLoading().close()
                    } else {
                        this.metasploitList = []
                        this.total = null
                    }
                })
            },
            filterData(params) {
                this.getMetasploitData(1, 10 ,params)
            },
            currentChange(val) {
                this.getMetasploitData(val)
            }
        },
        mounted() {
            this.getMetasploitData()
        }
    }
</script>

<style scoped>
    .main-pagination {
        margin: 20px auto 0
    }
</style>