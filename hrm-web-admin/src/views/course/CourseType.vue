<template id="courseType">
    <el-row style="height: 100%;border: 1px solid #DCDFE6;margin-top: 10px">
        <el-col :span="3" style="border-right: 1px solid #DCDFE6; min-height:600px;">
            <div class="grid-content bg-purple" style="height: 100%">
                <el-tree style="border:none" :data="courseTypes" :props="defaultProps"  @node-click="handleNodeClick">
                </el-tree>
            </div>
        </el-col>

        <!--<el-col :span="1" class="toolbar" style="padding-bottom: 0px;margin-top:5px">-->
            <!--<el-form :inline="true" :model="filters">-->
                <!--<el-form-item>-->
                    <!--<el-input v-model="filters.keyWord" placeholder="菜单搜索"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" v-on:click="getMenus" icon="el-icon-search" style="margin-left: 10px">查询</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                    <!--<el-button type="primary" icon="fa fa-plus" @click="handleAdd">新增</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</el-col>-->

        <el-col :span="20" style="margin-left: 10px;padding-top: 10px">
            <!--数据列表-->
            <el-table :data="CourseType" stripe="true" border="true" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;margin-top: auto">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" width="60" label="#">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="100" sortable>
                </el-table-column>
                <el-table-column prop="updateTime" label="修改时间" width="100" sortable>
                </el-table-column>
                <el-table-column prop="name" label="类型名" width="100" sortable>
                </el-table-column>
                <el-table-column prop="logo" label="图标" width="100" sortable>
                </el-table-column>
                <el-table-column prop="description" label="描述" width="100" sortable>
                </el-table-column>
                <el-table-column prop="path" label="路径" width="100" sortable>
                </el-table-column>
                <el-table-column prop="totalCount" label="课程数量" width="100" sortable>
                </el-table-column>
                <el-table-column label="操作" min-width="150">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-col>
    </el-row>
</template>
<style>
    .el-row {
        margin-bottom: 20px;
        height: 100%;
    }
    :last-child {
        margin-bottom: 0;
    }
    #courseType el-col {
        border: 1px solid red;
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>

<script>
    export default {
        data() {
            return {
                courseTypes:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        methods:{
            getTreeData(){
                // 发送一个异步请求: get请求 /product/courseType/treeData
                this.$http.get("/course/courseType/treeData").then(res=>{
                    this.courseTypes = res.data;

                });
            },
            handleNodeClick(){

            },
            CourseType(){

            },
            selsChange: function (sels) {
                this.sels = sels;
            },

        },
        mounted(){
            //对courseTypes数据赋值
           this.getTreeData();
        }
    };
</script>