<template>
  <div class="about">
    <!-- <div class="box-info-details">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div class="detailsObj.references" v-for="item in baseInfoList" :key="item.label">
                <div class="base-info">
                  <div>{{item.label}}</div>
                  <div>{{item.value}}</div>
                  <a :href="detailsObj.sourceUrl" target="_blank" v-if="item.icon" :class="item.icon" style="text-decoration: none;margin-left: 10px;font-size: 20px;color: #409eff;cursor: pointer">
                </a>
                </div>
              </div>
              <div class="base-info" v-if="type === 'cve'">
                <div>漏洞类型</div>
                <div>
                    <el-tag v-for="type in detailsObj.vulType" :key="type" size="mini">{{type}}</el-tag>
                </div>
            </div>
                <div class="base-info" v-if="type === 'exb'">
                    <div>漏洞类型</div>
                    <div>
                        <el-tag size="mini">{{detailsObj.tag}}</el-tag>
                    </div>
                </div>
                <div class="base-info" v-if="type === 'cnnvd'">
                    <div>漏洞类型</div>
                    <div>
                        <el-tag v-for="type in detailsObj.vulType" :key="type" size="mini">{{type}}</el-tag>
                    </div>
                </div>
            </el-card>
          </el-col>
          <el-col :span="12" v-if="type === 'cve'">
            <el-card class="box-card">
              <el-collapse v-model="activeNames" >
                <el-collapse-item title="描述" name="1">
                  <div>{{detailsObj.desc}}</div>
                </el-collapse-item>
                <el-collapse-item title="受影响设备" name="2">
                  <el-table
                          :data="detailsObj.cveAffectProductList"
                          border
                          style="width: 100%">
                    <el-table-column
                            prop="vendor"
                            label="厂商"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="product"
                            label="产品"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="productType"
                            label="产品类型"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="version"
                            label="版本号">
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
                <el-collapse-item title="参考链接" name="3">
                  <div v-for="(item, index) in detailsObj.references" :key="index">
                    <div class="base-info">
                      <div>{{item.url}}</div>
                      <div>{{item.desc}}</div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
          </el-col>

            <el-col :span="12" v-if="type === 'exb'">
                <el-card class="box-card">
                    <el-collapse v-model="activeNames" >
                        <el-collapse-item title="来源URl" name="1">
                            <div>{{detailsObj.sourceUrl}}</div>
                        </el-collapse-item>
                        <el-collapse-item title="漏洞验证" name="2">
                            <diz>{{detailsObj.verified}}</diz>
                        </el-collapse-item>
                        <el-collapse-item title="App下载链接" name="3">
                            <div>{{detailsObj.vulnerableApp}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-col>
            <el-col :span="12" v-if="type === 'cnnvd'">
            <el-card class="box-card">
                <el-collapse v-model="activeNames" >
                    <el-collapse-item title="描述" name="1">
                        <div>{{detailsObj.vulDescription}}</div>
                    </el-collapse-item>
                    <el-collapse-item title="漏洞公告" name="2">
                        <diz>{{detailsObj.vulAdvisory}}</diz>
                    </el-collapse-item>
                    <el-collapse-item title="参考网址" name="3">
                        <div v-for="(item, index) in detailsObj.refWebsite" :key="index">
                            <div class="base-info">
                                <div>{{item.url}}</div>
                                <div>{{item.desc}}</div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </el-col>
            <el-col :span="12" v-if="type === 'metasploit'">
                <el-card class="box-card">
                    <el-collapse v-model="activeNames" >
                        <el-collapse-item title="描述" name="1">
                            <div>{{detailsObj.description}}</div>
                        </el-collapse-item>
                        <el-collapse-item title="作者" name="2">
                            <div v-for="(item, index) in detailsObj.authors" :key="index">
                                <div class="base-info">
                                    <div>{{item}}</div>
                                </div>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="参考链接" name="3">
                            <div v-for="(item, index) in detailsObj.references" :key="index">
                                <div class="base-info">
                                    <div>{{item}}</div>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-col>
        </el-row>
    </div>
-->
    <div class="menu-tabs">
      <el-tabs v-model="activeName" type="card">

        <el-tab-pane label="cve基本信息" name="info" v-if="$route.params.type === 'cve'">
          <el-card>
            <div class="base-info-title" style="display: flex;width: 100%">
                <div style="height: 50px;border-top: 1px solid #ccc;width: 100%;line-height: 50px;display: flex;justify-content:space-between">
                    <div style="width: 300px">
                        <i class="iconfont iconloudong"></i>
                        <span>CVE ID</span>
                        <span style="margin-left: 20px">{{$route.params.id}}</span>
                    </div>
                    <div style="width: 500px">
                        <i class="iconfont icon17"></i>
                        <span>漏洞类型</span>
                        <el-tag style="margin-left: 20px" v-for="type in detailsObj.vulType" :key="type" size="mini">{{type}}</el-tag>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont iconpingfen"></i>
                        <span>漏洞评分</span>
                        <span style="margin-left: 20px">{{removeBlock(detailsObj['riskCode'])}}</span>
                    </div>
                </div> 
            </div>
            <div class="base-info-title" style="display: flex;width: 100%">
                <div style="height: 50px;border-top: 1px solid #ccc;width: 100%;line-height: 50px;display: flex;justify-content:space-between">
                    <div style="width: 300px">
                        <i class="iconfont iconcangpeitubiao_quanxian"></i>
                        <span>访问权限</span>
                        <span style="margin-left: 20px">{{detailsObj['gainAccess']}}</span>
                    </div>
                    <div style="width: 500px">
                        <i class="iconfont iconhaofangtuo400iconfont2fabushijian"></i>
                        <span>发布时间</span>
                        <span style="margin-left: 20px">{{detailsObj['publishDate']}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont iconshijian"></i>
                        <span>更新时间</span>
                        <span style="margin-left: 20px">{{detailsObj['updateDate']}}</span>
                    </div>
                </div> 
            </div>
          </el-card>
          <el-card style="margin: 20px 0">
            <div>
                <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">受影响设备</span></div>
                <div style="margin: 10px 0"></div>
                <div>
                    <el-table
                          :data="detailsObj.cveAffectProductList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                          border
                          style="width: 100%">
                    <el-table-column
                            prop="vendor"
                            label="厂商"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="product"
                            label="产品"
                            width="500">
                    </el-table-column>
                    <el-table-column
                            prop="productType"
                            label="产品类型"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="version"
                            label="版本号">
                    </el-table-column>
                  </el-table>
                </div>
                <div style="text-align: center">
                    <el-pagination
                        style="margin-top: 15px"
                        background
                        :current-page="currentPage"
                        :page-size="pageSize"
                        :hide-on-single-page="true"
                        layout="total, prev, pager, next, jumper"
                        @current-change="handleCurrentChange"
                        :total="detailsObj.cveAffectProductList.length"
                        >
                    </el-pagination>
                </div>
            </div>
          </el-card>
          <el-card>
            <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">漏洞描述</span></div>
            <div style="margin: 10px 0"></div>
            <div>{{detailsObj.desc}}</div>
          </el-card>
          <el-card style="margin-top: 20px">
            <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">参考链接</span></div>
            <div style="margin: 10px 0"></div>
            <div v-for="(item, index) in detailsObj.references" :key="index">
                <div style="display: flex">
                    <a :href="item.url" style="margin: 3px 0">{{item.url}}</a>
                    <!-- <div style="margin-left: 20px">{{item.desc}}</div> -->
                </div>
            </div>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="exb基本信息" name="info" v-if="$route.params.type === 'exb'">
        <el-card>
            <div class="base-info-title" style="display: flex;width: 100%">
                <div style="height: 50px;border-top: 1px solid #ccc;width: 100%;line-height: 50px;display: flex;justify-content:space-between">
                    <div style="width: 300px">
                        <i class="iconfont iconloudong"></i>
                        <span>CVE ID</span>
                        <span style="margin-left: 50px">{{$route.params.id}}</span>
                    </div>
                    <div style="width: 300px" >
                        <i class="iconfont icon17"></i>
                        <span>漏洞类型</span>
                        <el-tag style="margin-left: 50px" size="mini" v-if="detailsObj.tag">{{detailsObj.tag}}</el-tag>
                        <span style="margin-left: 50px" v-else>无</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont iconpingtai"></i>
                        <span>受影响平台</span>
                        <span style="margin-left: 50px">{{detailsObj['platform']}}</span>
                    </div>
                </div> 
            </div>
            <div class="base-info-title" style="display: flex;width: 100%">
                <div style="height: 50px;border-top: 1px solid #ccc;width: 100%;line-height: 50px;display: flex;justify-content:space-between">
                    <div style="width: 300px">
                        <i class="iconfont iconleixing"></i>
                        <span>威胁类型</span>
                        <span style="margin-left: 50px">{{detailsObj['type']}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont icontitle"></i>
                        <span>漏洞标题</span>
                        <span style="margin-left: 50px" :title="detailsObj['title']">{{detailsObj['title'].length > 15 ? detailsObj['title'].substring(0, 15) + '...' : detailsObj['title']}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont iconhaofangtuo400iconfont2fabushijian"></i>
                        <span>发布时间</span>
                        <span style="margin-left: 50px">{{detailsObj['date']}}</span>
                    </div>
                </div> 
            </div>
          </el-card>
          <el-card style="margin: 20px 0">
            <div>
                <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">来源URL</span></div>
                <a :href="detailsObj.sourceUrl" style="margin:10px 0">{{detailsObj.sourceUrl}}</a>
            </div>
          </el-card>
          <el-card style="margin: 20px 0">
            <div>
                <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">漏洞验证</span></div>
                <div style="margin:10px 0">{{detailsObj.verified ? '是' : '否'}}</div>
            </div>
          </el-card>
          <el-card style="margin-top: 20px" v-if="detailsObj.vulnerableApp">
            <div>
                <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">APP下载链接</span></div>
                <a :href="detailsObj.vulnerableApp" style="margin:10px 0">{{detailsObj.vulnerableApp}}</a>
            </div>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="metasploit基本信息" name="info"  v-if="$route.params.type === 'metasploit'">
        <div>
            <el-card>
                <div class="base-info-title" style="display: flex;width: 100%">
                <div style="height: 50px;border-top: 1px solid #ccc;width: 100%;line-height: 50px;display: flex;justify-content:space-between">
                    <div style="width: 300px">
                        <i class="iconfont iconname"></i>
                        <span>漏洞名称</span>
                        <span style="margin-left: 50px" :title="detailsObj['name']">{{detailsObj['name'].length > 15 ? detailsObj['name'].substring(0, 15) + '...' : detailsObj['name']}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont iconzhengshu-copy"></i>
                        <span>漏洞证书</span>
                        <span style="margin-left: 50px" :title="detailsObj['license']">{{detailsObj['license'].length > 15 ? detailsObj['license'].substring(0, 15) + '...' : detailsObj['license']}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont iconpingtai"></i>
                        <span>受影响平台</span>
                        <span style="margin-left: 50px">{{detailsObj['platform']}}</span>
                    </div>
                </div> 
            </div>
            <div class="base-info-title" style="display: flex;width: 100%">
                <div style="height: 50px;border-top: 1px solid #ccc;width: 100%;line-height: 50px;display: flex;justify-content:space-between">
                    <div style="width: 300px">
                        <i class="iconfont iconvisit"></i>
                        <span>越权</span>
                        <span style="margin-left: 50px">{{detailsObj['privileged']}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont icondengji"></i>
                        <span>级别</span>
                        <span style="margin-left: 50px" >{{detailsObj['rank']}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont iconshijian"></i>
                        <span>公开时间</span>
                        <span style="margin-left: 50px">{{detailsObj['disclosure_date']}}</span>
                    </div>
                </div> 
            </div>
            </el-card>

            <el-card style="margin-top: 20px">
            <div>
                    <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">描述</span></div>
                    <div style="margin: 10px 0">{{detailsObj.description}}</div>
                </div>
            </el-card>

            <el-card style="margin: 20px 0">
                <div>
                    <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">作者</span></div>
                    <div v-for="(item, index) in detailsObj.authors" :key="index" style="margin: 10px 0">
                                <div class="base-info">
                                    <div>{{item}}</div>
                                </div>
                            </div>
                </div>
            </el-card>

            <el-card>
            <div> 
                <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">参考链接</span></div>
                <div v-for="(item, index) in detailsObj.references" :key="index" style="margin: 10px 0">
                                <div class="base-info">
                                    <a :href="item" style="margin: 3px 0">{{item}}</a>
                                </div>
                            </div>
            </div>
            </el-card>
            
        </div>
        </el-tab-pane>

        <el-tab-pane name="info" label="cnnvd基本信息" v-if="$route.params.type === 'cnnvd'">
            <div>
                <el-card>
                <div class="base-info-title" style="display: flex;width: 100%">
                <div style="height: 50px;border-top: 1px solid #ccc;width: 100%;line-height: 50px;display: flex;justify-content:space-between">
                    <div style="width: 300px">
                        <i class="iconfont iconloudong"></i>
                        <span>CVE ID</span>
                        <span style="margin-left: 50px">{{$route.params.id}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont icon17"></i>
                        <span>漏洞类型</span>
                        <span style="margin-left: 50px">{{detailsObj['vulType']}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont iconname"></i>
                        <span>漏洞名称</span>
                        <span style="margin-left: 50px" :title="detailsObj['vulName']">{{detailsObj['vulName'].length > 15 ? detailsObj['vulName'].substring(0, 15) + '...' : detailsObj['vulName']}}</span>
                    </div>
                </div> 
            </div>
            <div class="base-info-title" style="display: flex;width: 100%">
                <div style="height: 50px;border-top: 1px solid #ccc;width: 100%;line-height: 50px;display: flex;justify-content:space-between">
                    <div style="width: 300px">
                        <i class="iconfont icondengji"></i>
                        <span>危害级别</span>
                        <span style="margin-left: 50px">{{detailsObj['riskLevel']}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont iconleixing"></i>
                        <span>威胁类型</span>
                        <span style="margin-left: 50px" >{{detailsObj['threatType']}}</span>
                    </div>
                    <div style="width: 300px">
                        <i class="iconfont iconhaofangtuo400iconfont2fabushijian"></i>
                        <span>发布时间</span>
                        <span style="margin-left: 50px">{{detailsObj['releaseTime']}}</span>
                    </div>
                </div> 
            </div>
            </el-card>



<!-- <el-collapse v-model="activeNames" >
                    <el-collapse-item title="描述" name="1">
                        <div>{{detailsObj.vulDescription}}</div>
                    </el-collapse-item>
                    <el-collapse-item title="漏洞公告" name="2">
                        <diz>{{detailsObj.vulAdvisory}}</diz>
                    </el-collapse-item>
                    <el-collapse-item title="参考网址" name="3">
                        <div v-for="(item, index) in detailsObj.refWebsite" :key="index">
                            <div class="base-info">
                                <div>{{item.url}}</div>
                                <div>{{item.desc}}</div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse> -->



            <el-card style="margin-top: 20px">
                <div>
                    <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">描述</span></div>
                    <div style="margin: 10px 0">{{detailsObj.vulDescription}}</div>
                </div>
            </el-card>

            <el-card style="margin: 20px 0">
                <div>
                    <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">漏洞公告</span></div>
                    <div style="margin: 10px 0">{{detailsObj.vulAdvisory}}</div>
                </div>
            </el-card>

            <el-card>
                <div>
                    <div><span style="background: teal;color: teal">|</span><span style="margin-left: 10px">参考网址</span></div>
                    <div v-for="item in detailsObj.refWebsite" :key="item">
                            <div class="base-info">
                                <a :href="item" style="margin: 3px 0">{{item}}</a>
                                <!-- <div>{{item.desc}}</div> -->
                            </div>
                        </div>
                </div>
            </el-card>
            </div>
        </el-tab-pane>

        <el-tab-pane label="知识图谱" name="topo">
          <el-card class="box-card-content" shadow="never">
            <!--<v-chart :options="getOptions()" />-->
              <graph-node :id="$route.params.id"/>
          </el-card>
        </el-tab-pane>
          <!--<el-tab-pane label="SVG" name="two">-->
              <!--&lt;!&ndash;"middle"类型, 动画引入animate.css库，白色遮罩，圆形自定义开关按钮，默认菜单颜色配置&ndash;&gt;-->

          <!--</el-tab-pane>-->
        <el-tab-pane label="可利用脚本" name="bash" v-if="($route.params.type !== 'cve') && ($route.params.type !== 'cnnvd')">
            <div v-highlight v-if="detailsObj.isFrame">
                <pre>
                    <code>
                        <iframe width="1700" height="2000" frameborder="0" :srcdoc="detailsObj.script"></iframe>
                    </code>
                </pre>
            </div>
            <div v-highlight v-else>
                <pre>
                    <code v-html="detailsObj.script"></code>
                </pre>
            </div>

        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
    /* eslint-disable */
    import { mapGetters } from 'vuex'
    // import 'highlight.js/styles/atom-one-dark.css' //样式文件
    // import 'highlight.js/styles/atelier-dune-light.css' //样式文件
    import { cveDetails,exbDetails,cnnvdDetails,metasploitDetailss,cnnvdVulTypes } from '../api'
    // import GraphAll from './graph/GraphAll'
  // import D3Graph from './graph/D3'
    import GraphNode from './graph/GraphNode'



    // import SvgTemplate from './graph/svg'

  export default {
      name: 'About',
      data() {
          return {
              activeName: 'info',
              defaultCss: 'idea',
              activeNames: ['1'],
              detailsObj: {},
              pageSize: 10,
              currentPage: 1,
              baseInfoList: []
          }
      },
      computed: {
          ...mapGetters([
              'type'
          ])
      },
      components: {
          GraphNode
          // CircleMenu
      },
      methods: {
          handleCurrentChange(val) {
              this.currentPage = val;
          },
          removeBlock (str) {
              if (str) {
                  return str.replace(/\([^\)]*\)/g,"");
              } else {
                  return str
              }
          },
          // getOptions() {
          //     return {
          //         title: {
          //             text: '知识图谱',
          //         }
          //     }
          // },
          async getDetails() {
              let { type, id } = this.$route.params
                  if(type === 'cve') {
                        cveDetails(id).then(data => {
                          this.detailsObj = data.data
                      }).then(_ => {
                          this.baseInfoList.push({
                              label: 'CVE ID',
                              value: this.detailsObj['cveId'],
                              icon: 'el-icon-link'
                          },{
                              label: '漏洞评分',
                              value: this.detailsObj['riskCode']
                          },{
                              label: '访问权限',
                              value: this.detailsObj['gainAccess']
                          },{
                              label: '发布时间',
                              value: this.detailsObj['publishDate'],
                          },{
                              label: '更新时间',
                              value: this.detailsObj['updateDate'],
                          })
                      })
                  }
                    if (type === 'exb') {
                          exbDetails(id).then(data => {
                              this.detailsObj = data.data
                          }).then(_ => {
                              this.baseInfoList.push({
                                  label: 'CVE ID',
                                  value: this.$route.params.id,
                                  icon: 'el-icon-link'
                              },{
                                  label: '作者',
                                  value: this.detailsObj['author']
                              },{
                                  label: '发布时间',
                                  value: this.detailsObj['date']
                              },{
                                  label: '受影响平台',
                                  value: this.detailsObj['platform'],
                              },{
                                  label: '漏洞标题',
                                  value: this.detailsObj['title'],
                              },{
                                  label: '威胁类型',
                                  value: this.detailsObj['type'],
                              })
                          })
                      }
                      if (type === 'cnnvd') {
                          cnnvdDetails(id).then(data => {
                              this.detailsObj = data.data
                          }).then(_ => {
                              this.baseInfoList.push({
                                  label: 'CVE ID',
                                  value: this.$route.params.id,
                                  icon: 'el-icon-link'
                              },{
                                  label: '漏洞名称',
                                  value: this.detailsObj['vulName']
                              },{
                                  label: '漏洞类型',
                                  value: this.detailsObj['vulType']
                              },{
                                  label: '发布时间',
                                  value: this.detailsObj['date']
                              },{
                                  label: '危害级别',
                                  value: this.detailsObj['riskLevel'],
                              },{
                                  label: '修改时间',
                                  value: this.detailsObj['threatType'],
                              },{
                                  label: '威胁类型',
                                  value: this.detailsObj['updateTime'],
                              })
                          })
                      }
                      if (type === 'metasploit') {
                          metasploitDetailss(id).then(data => {
                              this.detailsObj = data.data
                              console.log('detailsObj',data.data);
                          }).then(_ => {
                              this.baseInfoList.push({
                                  label: '漏洞名称',
                                  value: this.detailsObj['name']
                              },{
                                  label: '漏洞全名',
                                  value: this.detailsObj['fullname']
                              },{
                                  label: '受影响平台',
                                  value: this.detailsObj['platform']
                              },{
                                  label: '越权',
                                  value: this.detailsObj['privileged'],
                              },{
                                  label: '级别',
                                  value: this.detailsObj['rank'],
                              },{
                                  label: '公开时间',
                                  value: this.detailsObj['disclosure_date']
                              },{
                                  label: '证书',
                                  value: this.detailsObj['license']
                              })
                          })
                      }
                      return this.detailsObj;
              }
      },
       async mounted() {
           let detailsObj = await this.getDetails();
           // cnnvdVulTypes()
           // if (detailsObj.isFrame) {
           require('highlight.js/styles/atelier-dune-light.css')
           // } else require('highlight.js/styles/atom-one-dark.css')
       }
  }
</script>

<style lang="sass" scoped>
  .about
    height: 100%
    .box-info-details
      width: 100%
      height: 30%
      .box-card
        min-height: 230px
        .base-info
          display: flex
          margin-top: 10px
          div:last-child
            margin-left: 15px
      .vul-details-cards
        margin-top: 25px
    .menu-tabs
      /*text-align: center*/
      margin-top: 10px
      height: 60%
      .el-tabs__content
        width: 1400px
        margin: 0 auto
        .box-card-content
          height: 750px
          width: 1400px
          margin: 0 auto
          .el-card__body
            height: 100%
            .echarts
              min-height: 750px
</style>