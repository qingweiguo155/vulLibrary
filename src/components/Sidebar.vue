<template>
    <div class="sidebar">
        <el-menu
                class="sidebar-el-menu"
                :default-active="onRoutes"
                background-color="#324157"
                text-color="#fff"
                active-text-color="#ffd04b"
                unique-opened
                router
        >
        <!-- 008080 -->
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                    v-if="subItem.subs"
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item
                                        v-for="(threeItem, i) in subItem.subs"
                                        :key="i"
                                        :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                    v-else
                                    :index="subItem.index"
                                    :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" :class="$route.path == item.index?'is-active':''" :disabled="item.disabled">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    // import bus from "../common/bus";
    export default {
        data() {
            return {
                items: [
                    {
                        icon: "el-icon-location",
                        index: "cve",
                        title: "cve",
                         disabled: false
                    },
                    {
                        icon: "el-icon-menu",
                        index: "exb",
                        title: "exb",
                         disabled: false
                    },
                    {
                        icon: "el-icon-document",
                        index: "metasploit",
                        title: "metasploit",
                         disabled: false
                    },
                    {
                        icon: "el-icon-setting",
                        index: "cnnvd",
                        title: "cnnvd",
                        disabled: false
                    }
                    // {
                    //     icon: "el-icon-loading",
                    //     index: "cwe",
                    //     title: "cwe",
                    //     disabled: true
                    // }
                    // {
                    //     icon: "el-icon-lx-calendar",
                    //     index: "3",
                    //     title: "一级菜单",
                    //     subs: [
                    //         {
                    //             index: "form",
                    //             title: "二级菜单"
                    //         },
                    //         //         {
                    //         //             index: "3-2",
                    //         //             title: "三级菜单",
                    //         //             subs: [
                    //         //                 {
                    //         //                     index: "editor",
                    //         //                     title: "3-2-1"
                    //         //                 },
                    //         //                 {
                    //         //                     index: "upload",
                    //         //                     title: "3-2-2"
                    //         //                 }
                    //         //             ]
                    //         //         },
                    //         {
                    //             index: "upload",
                    //             title: "upload"
                    //         }
                    //     ]
                    // }
                ]
            };
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace("/", "");
            },
            // collapse(){
            //     return this.$store.state.collapse
            // }
        }
    };
</script>

<style scoped>
    .sidebar {
        display: block;
        /*position: absolute;*/
        left: 0;
        top: 59px;
        bottom: 0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }
    .sidebar > ul {
        height: 100%;
    }
</style>
