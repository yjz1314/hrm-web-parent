<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.keyword" placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <!--<el-input v-model="filters.keyword" placeholder="关键字"></el-input>-->
                    <el-select v-model="filters.status" clearable placeholder="课程状态">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getCourses">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增课程</el-button>
                    <el-button type="primary" @click="handleAdd">市场信息</el-button>
                    <el-button type="primary" @click="handleAdd">图片信息</el-button>
                    <el-button type="primary" @click="handleAdd">上架</el-button>
                    <el-button type="primary" @click="handleAdd">下架</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="courses" highlight-current-row @selection-change="selsChange" style="width: 100%;">

            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="120" sortable>
            </el-table-column>
            <el-table-column prop="courseType.name" label="课程类型" width="100" sortable>
            </el-table-column>
            <el-table-column prop="tenantName" label="机构" width="100" sortable>
            </el-table-column>
            <el-table-column prop="userName" label="创建用户" width="120" sortable>
            </el-table-column>
            <el-table-column prop="startTime" label="上架时间" min-width="180" sortable :formatter="formatStartTime">
            </el-table-column>
            <el-table-column prop="endTime" label="下架时间" min-width="180" sortable :formatter="formatEndTime">
            </el-table-column>
            <el-table-column prop="status" label="课程状态" min-width="180" sortable>
                <template scope="scope">
                    <span v-if="scope.row.status == 1" style="color: green;">
                        上架
                    </span>
                    <span v-else style="color: red;">
                        未上架
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
            </el-pagination>
        </el-col>


        <!--新增界面-->
        <el-dialog title="新增课程" v-model="addCourseVisible" :close-on-click-modal="false">
            <el-form :model="addCourse" label-width="80px" :rules="addCourseRules" ref="addCourse">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addCourse.name" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addCourseVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        name: "course",
        data(){
            return {
                options:[
                    {
                        value:0,
                        label:"未上架"
                    },
                    {
                        value:1,
                        label:"上架"
                    }
                ],
                filters:{
                    keyword:"",
                    status:null
                },
                courses:[],
                sels:[],//多选框选中的行
                pageNum:1,
                pageSize:10,
                total:0,
                addCourseVisible:false,
                addCourse:{

                }
            }
        },
        methods:{
            formatStartTime(row, column){
                return this.formatTime(row.startTime);
            },
            formatEndTime(row, column){
                return this.formatTime(row.endTime);
            },
            formatTime(time){
                if (!time){
                    return "";
                }
                let date = new Date(time);
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let day = date.getDay();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                let timeStr = year+"-"+this.formatNum(month)+"-"+this.formatNum(day)+" "
                            + this.formatNum(hours)+":"+this.formatNum(minutes)+":"+this.formatNum(seconds)
                return timeStr
            },
            formatNum(num){
                if (num<10){
                    return "0"+num;
                }
                return num;
            },
            //获取课程
            getCourses(){
                let param = {};
                param.page = this.pageNum;
                param.rows = this.pageSize;
                param.keyword = this.filters.keyword;
                param.status = this.filters.status;
                this.$http.post("/course/course/page",param)
                    .then(res=>{
                        let {total,rows} = res.data;
                        this.total = total;
                        this.courses = rows;
                    })
            },
            handleAdd(){

            },
            handleEdit(index,row){
                
            },
            handleDel(index,row){
                
            },
            batchRemove(){
                
            },
            handleCurrentChange(val){
                this.pageNum = val;
                this.getCourses();
            },
            addSubmit(){

            }
        },
        mounted(){
            this.getCourses();
        }
    }
</script>

<style scoped>

</style>