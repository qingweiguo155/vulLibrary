<template>
    <div>
        <el-switch
            v-if="$route.params.type === 'cve'"
            style="display: block;margin-bottom: 10px;margin-top: -5px"
            @change="handleChangeval"
            v-model="selfRelation"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="自身图谱"
            inactive-text="相关图谱">
        </el-switch>
        <!--<div style="position: relative;">
            <div id="graphNode" ref="graph"></div>
            <div id="menuHolder" style="position: absolute;"></div>
        </div>-->
        <div id="graphNode" style=" width: 100%; border: 1px solid #00F;">
            <CJS ref="ref_CJS"></CJS>
        </div>
        
        
    </div>
</template>




<script>
/* eslint-disable no-debugger, no-console */
// import func from 'vue-editor-bridge'
    import { cveKnowledge } from '../../api'
    // import { RadialMenu } from '../../utils/RadialMenu'
    // import CircleMenu from 'vue-circle-menu'
  import CJS from '../../components/cjs'
    export default {
    data() {
        // graphNode
        return {
            selfRelation: true,
            status: 'self'
        }
    },
        props: ['id'],
    methods: {
        handleChangeval(val) {
            // let status = 'self'
            console.log(val);
            if(val) {
                // status = 'self'
            } else {
                // status = 'relation'
            }
            // this.setOptionsNode(this.$route.params.id, this.$route.params.type, status)
        },
        addEles() {
            let data = [
          {group: 'nodes', data: {'id': '鲁A123456', 'name': '鲁A123456', size: 100}, classes: 'classes-A', position: {x: 200, y: 50}},
          {group: 'nodes', data: {'id': '鲁B123456', 'name': '鲁B123456',}, classes: 'classes-A', position: {x: 500, y: 50}},
          {group: 'nodes', data: {'id': '鲁C123456', 'name': '鲁C123456',}, classes: 'classes-A', display: 'hide', position: {x: 200, y: 150}},
          {group: 'nodes', data: {'id': '鲁D123456', 'name': '鲁D123456',}, classes: 'classes-A', position: {x: 500, y: 150}},
          {group: 'nodes', data: {'id': '小王', 'name': '小王'}, classes: 'classes-B', position: {x: 100, y: 100}},
          {group: 'nodes', data: {'id': '小赵', 'name': '小赵',}, classes: 'classes-B', position: {x: 400, y: 100}},
          {group: 'nodes', data: {'id': '川川某公司', 'name': '川川某公司',}, classes: 'classes-C', display: 'hide', position: {x: 300, y: 100}},
          {group: 'nodes', data: {'id': '京京某单位', 'name': '京京某单位',}, classes: 'classes-D', position: {x: 300, y: 200}},
          {group: 'edges', data: {id: 'e0', name: '拥有', source: '小王', target: '鲁A123456'}},
          {group: 'edges', data: {id: 'e1', name: '拥有', source: '小赵', target: '鲁B123456'}},
          {group: 'edges', data: {id: 'e2', name: '拥有', source: '小王', target: '鲁C123456'}},
          {group: 'edges', data: {id: 'e3', name: '拥有', source: '小赵', target: '鲁D123456'}},
          {group: 'edges', data: {id: 'e4', name: '就职', source: '小王', target: '川川某公司'}},
          {group: 'edges', data: {id: 'e5', name: '就职', source: '小赵', target: '川川某公司'}},
          {group: 'edges', data: {id: 'e6', name: '租用', source: '川川某公司', target: '鲁A123456'}},
          {group: 'edges', data: {id: 'e7', name: '租用', source: '川川某公司', target: '鲁B123456'}}
        ]
        cveKnowledge(this.$route.params.id, this.$route.params.type).then(() => {
            // let { knowledgeNodes, knowledgeLinks } = res.data
            // console.log(knowledgeLinks);
            // let nodes = {
            //     group: 'nodes',
            //     data: knowledgeNodes,
            //     classes: 'classes-A',
            //     // position: {x: parseInt(Math.random()* 200), y: parseInt(Math.random()* 50)}
            // }
            // let links = {
            //     group: 'edges', data: knowledgeLinks
            // }
            // console.log(nodes);
            // console.log(links);
            // let data = []
            // data.push({
            //     nodes,
            //     links
            // })
            // // let data = [...nodes, ...links]
            // console.log(data);
            this.$refs['ref_CJS'].addEles(data)
            // return data
        })
        // this.$refs['ref_CJS'].addEles(
        //     let ma
        // );
      },
//         setOptionsNode(id, type, status = 'self') {
//             let graph = this.$echarts.init(document.getElementById('graphNode'),'macarons')
//             cveKnowledge(id, type, status).then(data => {
//             let option = {
//                 title: {
//                     text: '知识图谱',
//                 },
//                 tooltip: {
//                     trigger: 'item',
//                     formatter: params => {
//                         let html = '';
//                         html+= ` <div>${params.data.name} : ${params.data.value}</div>`
//                         return html
//                     }
//                 },
//                 legend: [{
//                     // selectedMode: 'single',
//                     data: data.data.knowledgeCategories.map(x => x.name),
//                     // icon: 'circle'
//                 }],
//                 series: [
//                 {
//                     type: 'graph',
//                     layout: 'force',
//                     symbolSize: (value, params) => {
//                         switch (params.data.bigSize) {
//                             case true:return 60;
//                             case false:return 60
//                             default:return 60;
//                             }
//                     },
//                     draggable: false,
//                     // roam: true,
//                     // bigSize
//                     // focusNodeAdjacency: true,
//                     edgeSymbol: ['', 'arrow'],
//                     data: data.data.knowledgeNodes,
//                     links: data.data.knowledgeLinks,
//                     categories: data.data.knowledgeCategories,
//                     roam: true,
//                     label: {
//                         position: 'inside',
//                         show: true,
//                         formatter(x) {
//                                 return x.data.value.length > 5 ? x.data.value.substring(0, 5) + '...' : x.data.value
//                             }
//                     },
//                     // force: {
//                     //     edgeLength: 100,
//                     //     repulsion: 500,
//                     //     gravity: 0.1
//                     // },
//                     // edgeLabel: {
//                     //     normal: {
//                     //         // show: true,
//                     //         // textStyle: {
//                     //         //     fontSize: 20
//                     //         // },
//                     //         formatter(x) {
//                     //             return x.data.value;
//                     //         }
//                     //     }
//                     // },
//                     force: {
//                         // repulsion: 100,
//                          edgeLength: 100,
//                          repulsion: 500,
//                          friction: 0.1
//                         // gravity: 0.1
//                     }   
//                 }

//                 //     {
//                 //     type: 'graph',
//                 //     layout: 'force',
//                 //     symbolSize: 58,
//                 //     draggable: true,
//                 //     roam: true,
//                 //     focusNodeAdjacency: true,
//                 //     categories: this.data.categories,
//                 //     edgeSymbol: ['', 'arrow'],
//                 //     // edgeSymbolSize: [80, 10],
//                 //     edgeLabel: {
//                 //         normal: {
//                 //             show: true,
//                 //             textStyle: {
//                 //                 fontSize: 20
//                 //             },
//                 //             formatter(x) {
//                 //                 return x.data.name;
//                 //             }
//                 //         }
//                 //     },
//                 //     label: {
//                 //         show: true
//                 //     },
//                 //     force: {
//                 //         repulsion: 2000,
//                 //         edgeLength: 120
//                 //     },
//                 //     data: this.data.nodes,
//                 //     links: this.data.links
//                 // }
//                 ]
//             }
//             // graph.on("contextmenu", e => {
//             //     //去除默认的鼠标事件
//             //     document.oncontextmenu = function () { return false; }; 
//             //         this.isShowcontext = true
//             //         let contextmenu = document.getElementById("contextmenu")
//             //         console.log(contextmenu);
//             //         contextmenu.style.left = e.event.offsetX + 50 + 'px'
//             //         contextmenu.style.top = e.event.offsetY + 50 + 'px'

//             //         document.body.onclick = () => {
//             //             this.isShowcontext = false
//             //         }
//             // })
            

//             // graph.on("click", e => {
//             //     if(e.data.bigSize) {
//             //         this.$router.push({ path: `/vuldetails/${e.data.url}` })
//             //         this.$router.go(0)
//             //     }
//             // })
//              // 节点点击事件
//             graph.setOption(option)
//              graph.on('click', caozuokuang);
//              function caozuokuang(params) {
//     var menuHolder = document.getElementById('menuHolder')
//     console.log('menuHolder:', menuHolder)
//     if (menuHolder) {
//         menuHolder.parentNode.removeChild(menuHolder);
//     }

//     // 创建svg 图形 设置大小
//     var menuItems = [{
//             id: '1',
//             title: '主机通信',
//             icon: '#walk'
//         },
//         {
//             id: '2',
//             title: '主机配置',
//             icon: '#run'
//         },
//         {
//             id: '3',
//             title: '主机进程',
//             icon: '#drive'
//         },
//         {
//             id: '4',
//             title: '配置详情',
//             icon: '#fight'
//         },
//         {
//             id: '5',
//             title: '其他功能...',
//             icon: '#more',
//             items: [{
//                     id: 'a',
//                     title: '软件版本',
//                     icon: '#eat'
//                 },
//                 {
//                     id: 'b',
//                     title: 'Sleep',
//                     icon: '#sleep'
//                 },
//                 {
//                     id: 'c',
//                     title: 'Take Shower',
//                     icon: '#shower'
//                 },
//                 {
//                     id: 'd',
//                     icon: '#workout',
//                     title: 'Work Out'
//                 }
//             ]
//         },
//         {
//             id: '6',
//             title: '其他功能2....',
//             icon: '#weapon',
//             items: [{
//                     id: 'A',
//                     icon: '#firearm',
//                     title: 'Firearm...',
//                     items: [{
//                             id: 'A1',
//                             title: 'Glock 22'
//                         },
//                         {
//                             id: 'A2',
//                             title: 'Beretta M9'
//                         },
//                         {
//                             id: 'A3',
//                             title: 'TT'
//                         },
//                         {
//                             id: 'A4',
//                             title: 'M16 A2'
//                         },
//                         {
//                             id: 'A5',
//                             title: 'AK 47'
//                         }
//                     ]
//                 },
//                 {
//                     id: 'B',
//                     icon: '#knife',
//                     title: 'Knife'
//                 },
//                 {
//                     id: 'C',
//                     icon: '#machete',
//                     title: 'Machete'
//                 }, {
//                     id: 'D',
//                     icon: '#grenade',
//                     title: 'Grenade'
//                 }
//             ]
//         }
//     ];
//     var svgMenu = new RadialMenu({
//         parent: document.body,
//         size: 160, // 设置整体大小
//         closeOnClick: true, // 点击是否关闭菜单
//         menuItems: menuItems,
//         onClick: function(item) {
//             console.log('You have clicked:', item);
//             if (item.id == '1') {
//                 // 主机通信
//                 // btn_Grid_comm();
//             } else if (item.id == '2') {
//                 // 主机配置
//                 // btn_Grid_peizhi();
//             } else if (item.id == '3') {
//                 // 主机进程
//                 // btn_Grid_process();
//             } else if (item.id == '4') {
//                 // 配置详情
//                 // btn_Grid_treediagram();
//             } else if (item.id == 'a') {
//                 // 软件版本
//                 // btn_Grid_version();
//             }
//         }
//     });
//     svgMenu.open();
//     var menu = document.getElementById('menuHolder')
//     console.log('menu:', menu)
//     console.log('x:', params.event.offsetX)
//     console.log('y:', params.event.offsetY)
//      menu.style.top = params.event.offsetY+ 'px';
//      menu.style.left = String(params.event.offsetX) + 'px';
//     menu.style.top = String(params.event.offsetY) + 'px';
//     // menu.style.left = String(params.event.offsetX + 20) + 'px';
// }
//         })
//         }
    },
    components: {
        CJS
    },
    mounted() {
        // this.setOptionsNode(this.$route.params.id, this.$route.params.type)
    //   cveKnowledge(this.$route.params.id, this.$route.params.type).then(() => {
    //   })
    // if(this.$route.params.id) {
        

    // }
        // this.$cy.elements({
      //  nodes: [],
      //  edges: []
    //  })
            this.addEles()
        }
    }
</script>

<style scoped>
    @import "../../assets/css/RadialMenu.css";
    #graphNode {
        width: 1400px;
        height: 800px;
        border: 1px solid #ccc;
        margin: 0 auto;
    }
     #icons {
            display: none;
            filter: url(#drop-shadow);
        }
        
        div.menuHolder {
            margin: 0 auto;
            position: absolute;
        }
       

</style>