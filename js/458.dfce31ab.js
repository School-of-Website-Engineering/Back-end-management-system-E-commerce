"use strict";(self["webpackChunkBack_end_management_system_E_commerce"]=self["webpackChunkBack_end_management_system_E_commerce"]||[]).push([[458],{4458:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var s=function(){var e=this,t=e._self._c;return t("div",[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),t("el-breadcrumb-item",[e._v("用户管理")]),t("el-breadcrumb-item",[e._v("用户列表")])],1),t("br"),t("el-card",[t("el-row",{attrs:{gutter:20}},[t("el-col",{attrs:{span:8}},[t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getUserList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getUserList},slot:"append"})],1)],1),t("el-col",{attrs:{span:4}},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addDialogVisible=!0}}},[e._v("添加用户")])],1)],1),t("br"),t("el-table",{attrs:{data:e.userList,border:"",stripe:""}},[t("el-table-column",{attrs:{type:"index",label:"#"}}),t("el-table-column",{attrs:{label:"姓名",prop:"username"}}),t("el-table-column",{attrs:{label:"邮箱",prop:"email"}}),t("el-table-column",{attrs:{label:"电话",prop:"mobile"}}),t("el-table-column",{attrs:{label:"角色",prop:"role_name"}}),t("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-switch",{on:{change:function(t){return e.userStateChanged(a.row)}},model:{value:a.row.mg_state,callback:function(t){e.$set(a.row,"mg_state",t)},expression:"scope.row.mg_state"}})]}}])}),t("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function({}){return[t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(t){return e.showEditDialog()}}}),t("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"}}),t("el-tooltip",{attrs:{effect:"dark",content:"分配角色",placement:"top",enterable:!1}},[t("el-button",{attrs:{type:"warning",icon:"el-icon-setting",size:"mini"}})],1)]}}])})],1),t("br"),t("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[1,2,3,4],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),t("el-dialog",{attrs:{title:"添加用户",visible:e.addDialogVisible,width:"30%"},on:{"update:visible":function(t){e.addDialogVisible=t},close:e.addDialogClosed}},[t("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"70px"}},[t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{model:{value:e.addForm.username,callback:function(t){e.$set(e.addForm,"username",t)},expression:"addForm.username"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{model:{value:e.addForm.password,callback:function(t){e.$set(e.addForm,"password",t)},expression:"addForm.password"}})],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{model:{value:e.addForm.email,callback:function(t){e.$set(e.addForm,"email",t)},expression:"addForm.email"}})],1),t("el-form-item",{attrs:{label:"手机",prop:"mobile"}},[t("el-input",{model:{value:e.addForm.mobile,callback:function(t){e.$set(e.addForm,"mobile",t)},expression:"addForm.mobile"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"修改用户",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t}}},[t("span",[e._v("这是一段信息")]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.editDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.editDialogVisible=!1}}},[e._v("确 定")])],1)])],1)},r=[],l={data(){return{queryInfo:{query:"",pagenum:1,pagesize:2},userList:[],total:0,addDialogVisible:!1,addForm:{username:"",password:"",email:"",mobile:""},addFormRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:10,message:"长度在3到10个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:12,message:"长度在6到12个字符",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱格式",trigger:"blur"}],mobile:[{required:!0,message:"请输入手机号",trigger:"blur"},{pattern:/^1[3456789]\d{9}$/,message:"请输入正确的手机号",trigger:"blur"}]},editDialogVisible:!1}},created(){this.getUserList()},methods:{async getUserList(){const{data:e}=await this.$http.get("users",{params:this.queryInfo});if(200!==e.meta.status)return this.$message.error("获取用户列表失败");this.userList=e.data.users,this.total=e.data.total},handleSizeChange(e){this.queryInfo.pagesize=e,this.getUserList()},handleCurrentChange(e){this.queryInfo.pagenum=e,this.getUserList()},async userStateChanged(e){const{data:t}=await this.$http.put(`users/${e.id}/state/${e.mg_state}`);if(200!==t.meta.status)return e.mg_state=!e.mg_state,this.$message.error("修改用户状态失败");this.$message.success("修改用户状态成功")},addDialogClosed(){this.$refs.addFormRef.resetFields()},addUser(){this.$refs.addFormRef.validate((async e=>{if(!e)return;const{data:t}=await this.$http.post("users",this.addForm);if(201!==t.meta.status)return this.$message.error("添加用户失败");this.$message.success("添加用户成功"),this.addDialogVisible=!1,await this.getUserList()}))},showEditDialog(){this.editDialogVisible=!0}}},i=l,o=a(1001),n=(0,o.Z)(i,s,r,!1,null,"94e33fde",null),d=n.exports}}]);
//# sourceMappingURL=458.dfce31ab.js.map