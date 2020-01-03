<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :model="filters" :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="add">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表v-loading="listLoading"
    private Long pid;

        -->
        <el-table :data="pageInfos" v-loading="listLoading"
                  highlight-current-row  style="width: 100%;"
                  @selection-change="selsChange"
        >
            <!--多选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引值,为什么不用id,id不序号-->
            <el-table-column type="index" width="60">
            </el-table-column>
            <!--其他都设置值,只有一个不设置值就自动适应了-->
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="alias" label="别名">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" :formatter="formatStartTime">
            </el-table-column>
            <el-table-column prop="type" label="类型">
            </el-table-column>
            <el-table-column prop="physicalPath" label="物理路径">
            </el-table-column>
            <el-table-column prop="templateUrl" label="模板路径" >
            </el-table-column>
            <el-table-column prop="pageConfig.pageUrl" label="页面路径" >
            </el-table-column>
            <el-table-column prop="pageConfig.dataKey" label="模板数据" >
            </el-table-column>
            <el-table-column prop="siteId" label="站点" sortable >
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small"  @click="edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange"  :page-size="pageSize" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--//多对一-->
        <!--private Employee manager;                               // 部门经理 员工对象-->
        <!--后台提供获取所有员工-->
        <!--//多对一-->
        <!--private Department parent;                              // 上级部门 部门对象-->

        <!--添加或编辑对话框-->
        <!-- <el-dialog title="添加或修改" :visible.sync="formVisible" :close-on-click-modal="false">
             <el-form :model="course" label-width="80px" :rules="formRules" ref="course">
                 <el-form-item label="名称" prop="name">
                     <el-input v-model="course.name" auto-complete="off"></el-input>
                 </el-form-item>
                 <el-form-item label="适用人群" prop="users">
                     <el-input v-model="course.users" auto-complete="off"></el-input>
                 </el-form-item>
                 <el-form-item label="课程等级" prop="grade">
                     <el-radio-group v-model="course.grade" >
                         <el-radio v-for="courseLevel in courseLevels"
                                   :label="courseLevel.id">{{courseLevel.name}}</el-radio>
                     </el-radio-group>
                 </el-form-item>
                 <el-form-item label="课程类型" prop="courseTypeId">
                     &lt;!&ndash;<el-input v-model="course.courseTypeId" auto-complete="off"></el-input>&ndash;&gt;
                     <el-cascader v-model="course.courseTypeId"
                                  :options="typeTree"
                                  :props="{ checkStrictly: true,value:'id',label:'name'}"
                                  clearable></el-cascader>
                 </el-form-item>
                 <el-form-item label="简介" prop="intro">
                     <el-input v-model="course.detail.intro" auto-complete="off"></el-input>
                 </el-form-item>
                 <el-form-item label="详情" prop="description">
                     <el-input v-model="course.detail.description" auto-complete="off"></el-input>
                 </el-form-item>
             </el-form>
             <div slot="footer" class="dialog-footer">
                 <el-button @click.native="formVisible = false">取消</el-button>
                 <el-button type="primary" @click="save" >提交</el-button>
             </div>
         </el-dialog>-->
    </section>
</template>

<script>
    export default {
        name: "static-page",
        data(){
            return{
                formVisible:false,//对话框默认不显示,只有点击添加或修改的时候显示
                listLoading:false,
                //查询对象
                filters:{
                    keyword:''
                },
                pageNum:1,//当前页,要传递到后台的
                total:0, //分页总数
                pageSize:10,
                pageInfos:[], //当前页数据
                courseLevels:[],
                //初始值
                /*pageInfo:{
                    id:null,
                    name:'',
                    alias:'',
                    type:null,
                    physicalPath:'',
                    physicalPath:'',
                    createTime:null,
                    pageConfig:{
                        dataKey:'',
                        pageUrl:''
                    }
                },*/
                sels:[]
            }
        },
        methods:{
            formatStartTime(row, column){
                return this.formatTime(row.createTime);
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
            //加载页面数据
            getPageInfos(){
                //发送Ajax请求后台获取数据  axios
                //添加分页条件及高级查询条件
                let para = {
                    "pageNum":this.pageNum,
                    "pageSize":this.pageSize,
                };
                this.listLoading = true; //显示加载圈
                //分页查询
                this.$http.post("/page/pageInfo/page",para) //$.Post(.....)
                    .then(result=>{
                        this.total = result.data.total;
                        this.pageInfos = result.data.rows;
                        this.listLoading = false;  //关闭加载圈
                    });
            },
            handleCurrentChange(val){
                this.pageNum=val;
                this.getPageInfos();
            }

        },
        mounted() {
            this.getPageInfos();
        }
    }
</script>

<style scoped>

</style>