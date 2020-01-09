<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :model="filters" :inline="true">
                <el-form-item>
                    <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="handleAdd">页面静态化</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表v-loading="listLoading"
    private Long pid;

        -->
        <el-table :data="pages"
                  highlight-current-row  style="width: 100%;"
                  @selection-change="selsChange"
        >
            <!--多选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引值,为什么不用id,id不序号-->
            <el-table-column type="index" width="60">
            </el-table-column>
            <!--其他都设置值,只有一个不设置值就自动适应了
            id
            name
            alias
            type
            physicalPath
            createTime
            site_id
            template_url

            -->
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="alias" label="别名">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="type" label="页面类型">
                <template scope="scope">
                    <span v-if="scope.row.type==1">
                        静态页面
                    </span>
                    <span v-else-if="scope.row.type==2">
                        动态页面
                    </span>
                    <span v-else>
                        其他
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="physicalPath" label="物理路径">
            </el-table-column>
            <el-table-column prop="templateUrl" label="模板路径">
            </el-table-column>
            <el-table-column prop="templateFile" label="模板文件">
            </el-table-column>
            <el-table-column prop="site.name" label="站点">
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template scope="scope">
                    <el-button size="small"  @click="edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange"  :page-size="pageSize" :total="total" style="float:right;">
            </el-pagination>
        </el-col>


        <!--添加对话框-->
        <el-dialog title="添加" :visible.sync="formVisible" :close-on-click-modal="false">
            <el-form :model="pageInfo" label-width="80px" :rules="formRules" ref="pageInfo">
                <el-form-item label="名称">
                    <el-input v-model="pageInfo.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="别名">
                    <el-input v-model="pageInfo.alias" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="物理路径">
                    <el-input v-model="pageInfo.physicalPath" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="站点选择">
                    <el-input v-model="pageInfo.siteId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传模板">
                    <el-input v-model="pageInfo.templateUrl" auto-complete="off"></el-input>
                    <el-upload
                            class="upload-demo"
                            action="http://localhost:9527/services/file/fastdfs/upload"
                            :on-success="handleUploadSuccess"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="模板文件">
                    <el-input v-model="pageInfo.templateFile" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="formVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSave" >提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    export default {
        name: "page",
        data(){
            return {
                fileList:[],
                pages:[],
                sels:[],
                page:1,
                pageSize:10,
                total:0,
                formVisible:false,
                pageInfo:{
                    name:"",
                    alias:"",
                    type:null,
                    physicalPath:"",
                    siteId:null,
                    templateUrl:"",
                    templateFile:""
                },
                formRules:{

                }
            }
        },
        methods:{
            //保存
            handleSave(){
                this.$refs.pageInfo.validate((valid) => {
                    //校验表单成功后才做一下操作
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            //拷贝后面对象的值到新对象,防止后面代码改动引起模型变化
                            let para = Object.assign({}, this.pageInfo);
                            this.$http.post("/page/pageInfo/save",para).then((res) => {
                                this.$message({
                                    message: '操作成功!',
                                    type: 'success'
                                });
                                //重置表单
                                this.$refs['pageInfo'].resetFields();
                                //关闭对话框
                                this.formVisible = false;
                                //刷新数据
                                this.getPages();
                            });
                        });
                    }
                })
            },
            //模板上传成功回调
            handleUploadSuccess(response, file, fileList){
                let {success,message,resultObj} = response;
                if (success){
                    this.pageInfo.templateUrl = resultObj;
                }else{
                    this.$message({
                        message:message ,
                        type: 'error'
                    });
                }
            },
            handleAdd(){
                this.formVisible = true;
            },
            selsChange(val){
                this.sels = val;
            },
            handleCurrentChange(currentPage){
                this.page = currentPage
            },
            getPages(){
                let param = {
                    page : this.page,
                    rows : this.pageSize
                }
                this.$http.post("/page/pageInfo/page",param)
                    .then(res =>{
                        let {total,rows} = res.data;
                        this.total = total;
                        this.pages = rows;
                    })
            }
        },
        mounted(){
            this.getPages()
        }
    }
</script>

<style scoped>

</style>