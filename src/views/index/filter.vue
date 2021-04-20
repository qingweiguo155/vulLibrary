<template>
    <div>
        <div class="common_header">
            <div class="search_keywords">
                <el-input  placeholder="请输入要搜索的内容" clearable >
                    <el-button slot="append" icon="el-icon-search" ></el-button>
                </el-input>
            </div>
            <el-drawer
                    :title="titleNameFilter + ' ' + '漏洞筛选'"
                    :visible.sync="drawer"
                    direction="rtl"
                    size="40%"
            >
            <span>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                     v-if="titleNameFilter === 'cve'" style="width: 700px">
                <el-form-item label="CVE ID" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="受影响产品" prop="affectedProducts">
                    <el-input v-model="ruleForm.affectedProducts"></el-input>
                </el-form-item>
                <el-form-item label="厂商" prop="manufacturer">
                    <el-input v-model="ruleForm.manufacturer"></el-input>
                </el-form-item>
                <el-form-item label="版本号" prop="version">
                    <el-input v-model="ruleForm.version"></el-input>
                </el-form-item>
                <el-form-item label="漏洞类型" prop="vulType">
                    <el-select v-model="ruleForm.vulType" placeholder="请选择漏洞类型" style="width: 100%">
                        <el-option
                                v-for="{key, value} in cveVulTypesList"
                                :key="value"
                                :label="key"
                                :value="value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :model="exbForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                     v-if="titleNameFilter === 'exb'" style="width: 700px">
                <el-form-item label="作者" prop="author">
                    <el-input v-model="exbForm.author"></el-input>
                </el-form-item>
                <el-form-item label="CVE" prop="cve">
                    <el-input v-model="exbForm.cveId"></el-input>
                </el-form-item>
                <el-form-item label="包含App" prop="hasApp">
                    <el-select v-model="exbForm.hasApp" placeholder="placeholder" style="width: 100%">
                        <el-option
                                v-for="item in appList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="受影响产品" prop="affectedProducts">
                    <el-select v-model="exbForm.platform" filterable placeholder="请选择受影响产品" style="width: 100%">
                        <el-option
                                v-for="item in exbAffectedProductsList"
                                :key="item.value"
                                :label="item.key"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="漏洞类型" prop="affectedProducts">
                    <el-select v-model="exbForm.tag" filterable placeholder="请选择漏洞类型" style="width: 100%">
                        <el-option
                                v-for="item in vulTagsList"
                                :key="item.value"
                                :label="item.key"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="威胁类型" prop="affectedProducts">
                    <el-select v-model="exbForm.type" filterable placeholder="请选择威胁类型" style="width: 100%">
                        <el-option
                                v-for="item in threatTypesList"
                                :key="item.value"
                                :label="item.key"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="漏洞验证" prop="affectedProducts">
                    <el-select v-model="exbForm.verified" placeholder="请选择漏洞验证" style="width: 100%">
                        <el-option
                                v-for="item in vulRegList"
                                :key="item.value"
                                :label="item.key"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-form :model="cnnvdForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                     style="width: 700px" v-if="titleNameFilter === 'cnnvd'">
                <el-form-item label="CNNVD ID" prop="name">
                    <el-input v-model="cnnvdForm.cnnvdId"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" prop="product">
                    <el-input v-model="cnnvdForm.product"></el-input>
                </el-form-item>
                <el-form-item label="危害等级" prop="riskLevel">
                    <el-select v-model="cnnvdForm.riskLevel" placeholder="请选择危害等级" style="width: 100%">
                        <el-option
                                v-for="item in riskLevelList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="威胁类型" prop="version">
                    <el-select v-model="cnnvdForm.threatType" placeholder="请选择威胁类型" style="width: 100%">
                        <el-option
                                v-for="item in threatTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <!--<el-input v-model="cnnvdForm.threatType" ></el-input> !-->
                </el-form-item>
                <el-form-item label="厂商名称" prop="vendor">
                    <el-input v-model="cnnvdForm.vendor"></el-input>
                </el-form-item>
                <el-form-item label="漏洞名称" prop="vulName">
                    <el-input v-model="cnnvdForm.vulName"></el-input>
                </el-form-item>
                <el-form-item label="漏洞类型" prop="vulType">
                    <el-input v-model="cnnvdForm.vulType"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="metasploitForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                     style="width: 700px" v-if="titleNameFilter === 'metasploit'">
                <el-form-item label="漏洞名称" prop="name">
                    <el-input v-model="metasploitForm.name"></el-input>
                </el-form-item>
                <el-form-item label="受影响平台" prop="platform">
                    <el-input v-model="metasploitForm.platform"></el-input>
                </el-form-item>
                <el-form-item label="越权" prop="privileged">
                    <el-select v-model="metasploitForm.privileged" placeholder="请选择是否越权" style="width: 100%">
                        <el-option
                                v-for="item in privilegedList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="级别" prop="rank">
                    <el-select v-model="metasploitForm.rank" filterable placeholder="请选择级别" style="width: 100%">
                        <el-option
                                v-for="item in rankList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                 <el-button @click="drawer = false">取 消</el-button>
                 <el-button @click="resetForm('ruleForm')">重置</el-button>
                 <el-button type="primary" @click="filterVulList(titleNameFilter)">确 定</el-button>
               </span>
            </span>
            </el-drawer>
            <el-button type="text" @click="drawer = true" style="margin-top: -20px;margin-left: 20px">筛选</el-button>
        </div>
        <!--<el-dialog-->
        <!--:title= "type + '筛选'"-->
        <!--:visible.sync="dialogVisible"-->
        <!--width="70%"-->
        <!--&gt;-->
        <!---->
        <!--</el-dialog>-->
    </div>
</template>

<script>
    import {cveVulTypes, exbAffet, vulTags} from '../../api'
    // import {mapGetters} from 'vuex'

    export default {
        name: "filterName",
        props: ['type'],
        data() {
            return {
                cveFilterAll: {cve: 123},
                hasApp: true,
                drawer: false,
                platforms: '',
                vulTags: '',
                threatTypes: '',
                privileged: null,
                dialogVisible: false,
                rank: '',
                privilegedList: [{
                    label: '是',
                    value: true
                }, {
                    label: '否',
                    value: false
                }],
                rankList: [{
                    label: 'low',
                    value: 'low'
                }, {
                    label: 'good',
                    value: 'good'
                }, {
                    label: 'average',
                    value: 'average'
                }, {
                    label: 'normal',
                    value: 'normal'
                }, {
                    label: 'manual',
                    value: 'manual'
                }, {
                    label: 'great',
                    value: 'great'
                }, {
                    label: 'excellent',
                    value: 'excellent'
                }],
                vulReg: null,
                exbAffectedProductsList: [],
                vulTagsList: [],
                cveVulTypesList: [],
                appList: [
                    {
                        label: '是',
                        value: true
                    },
                    {
                        label: '否',
                        value: false
                    },
                ],
                threatTypesList: [{
                    key: 'dos',
                    value: 'dos',
                }, {
                    key: 'local',
                    value: 'local',
                }, {
                    key: 'remote',
                    value: 'remote',
                }, {
                    key: 'webapps',
                    value: 'webapps',
                }],
                riskLevel: '',
                riskLevelList: [{
                    label: '超危',
                    value: '超危'
                }, {
                    label: '高危',
                    value: '高危'
                }, {
                    label: '中危',
                    value: '中危'
                }, {
                    label: '低危',
                    value: '低危'
                }],
                threat: '',
                threatTypeList: [{
                    label: '远程',
                    value: '远程',
                }, {
                    label: '本地',
                    value: '本地',
                }, {
                    label: '其他',
                    value: '其他',
                }],
                vulRegList: [{
                    key: '是',
                    value: true
                }, {
                    key: '否',
                    value: false
                }],
                ruleForm: {
                    name: '',
                    manufacturer: '',
                    affectedProducts: '',
                    vulType: '',
                    version: '',
                    cvssScoreFilter: 0
                },
                exbForm: {

                },
                cnnvdForm: {},
                metasploitForm: {},
                rules: {
                    // name: [
                    //     { message: '请输入活动名称', trigger: 'blur' },
                    //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    // ],
                    // region: [
                    //     { message: '请选择活动区域', trigger: 'change' }
                    // ]
                }
            }
        },
        methods: {
            filterVulList(type) {
                let Params = {}
                switch (type) {
                    case 'cve':
                        Params = {
                            cveId: this.ruleForm.name,
                            vendor: this.ruleForm.manufacturer,
                            version: this.ruleForm.version,
                            product: this.ruleForm.affectedProducts,
                            vulType: this.ruleForm.vulType,
                        }
                        // this.cveFilter = Params
                        this.$emit('filterData', Params)
                        break
                    case 'exb':
                        Params = {
                            author: this.exbForm.author,
                            cveId: this.exbForm.cveId,
                            hasApp: this.exbForm.hasApp,
                            platform: this.exbForm.platform,
                            tag: this.exbForm.tag,
                            type: this.exbForm.type,
                            verified: this.exbForm.verified
                        }
                        this.$emit('filterData', Params)
                        break
                    case 'metasploit':
                        Params = {
                            name: this.metasploitForm.name,
                            platform: this.metasploitForm.platform,
                            privileged: this.metasploitForm.privileged,
                            rank: this.metasploitForm.rank
                        }
                        this.$emit('filterData', Params)
                        break
                    case 'cnnvd':
                        Params = {
                            cnnvdId: this.cnnvdForm.cnnvdId,
                            product: this.cnnvdForm.product,
                            riskLevel: this.cnnvdForm.riskLevel,
                            threatType: this.cnnvdForm.threatType,
                            vendor: this.cnnvdForm.vendor,
                            vulName: this.cnnvdForm.vulName,
                            vulType: this.cnnvdForm.vulType
                        }
                        this.$emit('filterData', Params)
                        break
                    default:
                        Params = {}
                }
                this.drawer = false
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        },
        computed: {
            titleNameFilter() {
                return this.$route.path.replace('/', '')
            },
            // cveFilter: {
            //     set(val) {
            //         this.$store.state.cveFilter = val
            //     }
            // }
        },
        mounted() {
            exbAffet().then(data => {
                this.exbAffectedProductsList = data.data
            })
            vulTags().then(data => {
                this.vulTagsList = data.data
            })
            cveVulTypes().then(data => {
                this.cveVulTypesList = data.data
            })
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