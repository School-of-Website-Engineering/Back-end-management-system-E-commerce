"use strict";(self["webpackChunkBack_end_management_system_E_commerce"]=self["webpackChunkBack_end_management_system_E_commerce"]||[]).push([[445],{2445:function(e,t,s){s.r(t),s.d(t,{default:function(){return d}});var a=function(){var e=this,t=e._self._c;return t("div",[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),t("el-breadcrumb-item",[e._v("用户管理")]),t("el-breadcrumb-item",[e._v("用户列表")])],1),t("br"),t("el-card",[t("el-row",{attrs:{gutter:20}},[t("el-col",{attrs:{span:8}},[t("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容",clearable:""},on:{clear:e.getUserList},model:{value:e.queryInfo.query,callback:function(t){e.$set(e.queryInfo,"query",t)},expression:"queryInfo.query"}},[t("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.getUserList},slot:"append"})],1)],1),t("el-col",{attrs:{span:4}},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addDialogVisible=!0}}},[e._v("添加用户")])],1)],1),t("br"),t("el-table",{attrs:{data:e.userList,border:"",stripe:""}},[t("el-table-column",{attrs:{type:"index",label:"#"}}),t("el-table-column",{attrs:{label:"姓名",prop:"username"}}),t("el-table-column",{attrs:{label:"邮箱",prop:"email"}}),t("el-table-column",{attrs:{label:"电话",prop:"mobile"}}),t("el-table-column",{attrs:{label:"角色",prop:"role_name"}}),t("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(s){return[t("el-switch",{on:{change:function(t){return e.userStateChanged(s.row)}},model:{value:s.row.mg_state,callback:function(t){e.$set(s.row,"mg_state",t)},expression:"scope.row.mg_state"}})]}}])}),t("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(s){return[t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(t){return e.showEditDialog(s.row.id)}}}),t("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"mini"},on:{click:function(t){return e.removeUserById(s.row.id)}}}),t("el-tooltip",{attrs:{effect:"dark",content:"分配角色",placement:"top",enterable:!1}},[t("el-button",{attrs:{type:"warning",icon:"el-icon-setting",size:"mini"},on:{click:function(t){return e.setRole(s.row)}}})],1)]}}])})],1),t("br"),t("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[1,2,3,4],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),t("el-dialog",{attrs:{title:"添加用户",visible:e.addDialogVisible,width:"30%"},on:{"update:visible":function(t){e.addDialogVisible=t},close:e.addDialogClosed}},[t("el-form",{ref:"addFormRef",attrs:{model:e.addForm,rules:e.addFormRules,"label-width":"70px"}},[t("el-form-item",{attrs:{label:"用户名",prop:"username"}},[t("el-input",{model:{value:e.addForm.username,callback:function(t){e.$set(e.addForm,"username",t)},expression:"addForm.username"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{model:{value:e.addForm.password,callback:function(t){e.$set(e.addForm,"password",t)},expression:"addForm.password"}})],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{model:{value:e.addForm.email,callback:function(t){e.$set(e.addForm,"email",t)},expression:"addForm.email"}})],1),t("el-form-item",{attrs:{label:"手机",prop:"mobile"}},[t("el-input",{model:{value:e.addForm.mobile,callback:function(t){e.$set(e.addForm,"mobile",t)},expression:"addForm.mobile"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.addDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"修改用户",visible:e.editDialogVisible,width:"50%"},on:{"update:visible":function(t){e.editDialogVisible=t},close:e.editDialogClosed}},[t("el-form",{ref:"editFormRef",attrs:{model:e.editForm,rules:e.editFormRules,"label-width":"70px"}},[t("el-form-item",{attrs:{label:"用户名"}},[t("el-input",{attrs:{disabled:""},model:{value:e.editForm.username,callback:function(t){e.$set(e.editForm,"username",t)},expression:"editForm.username"}})],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{model:{value:e.editForm.email,callback:function(t){e.$set(e.editForm,"email",t)},expression:"editForm.email"}})],1),t("el-form-item",{attrs:{label:"手机",prop:"mobile"}},[t("el-input",{model:{value:e.editForm.mobile,callback:function(t){e.$set(e.editForm,"mobile",t)},expression:"editForm.mobile"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.editDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.editUserInfo}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"分配角色",visible:e.setRoleDialogVisible,width:"50%"},on:{"update:visible":function(t){e.setRoleDialogVisible=t}}},[t("div",[t("p",[e._v("当前的用户:"+e._s(e.userInfo.username))]),t("br"),t("p",[e._v("当前的角色:"+e._s(e.userInfo.role_name))]),t("br"),t("p",[e._v(" 分配新角色: "),t("el-select",{attrs:{placeholder:"请选择"},model:{value:e.selectedRoleId,callback:function(t){e.selectedRoleId=t},expression:"selectedRoleId"}},e._l(e.rolesList,(function(e){return t("el-option",{key:e.id,attrs:{label:e.roleName,value:e.id}})})),1)],1)]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)])],1)},r=[],i={data(){var e=(e,t,s)=>{const a=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;a.test(t)?s():s(new Error("邮箱格式不正确"))},t=(e,t,s)=>{const a=/^1[3-9]\d{9}$/;a.test(t)?s():s(new Error("手机号格式不正确"))};return{queryInfo:{query:"",pagenum:1,pagesize:2},userList:[],total:0,addDialogVisible:!1,addForm:{username:"",password:"",email:"",mobile:""},addFormRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:10,message:"长度在3到10个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:12,message:"长度在6到12个字符",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱格式",trigger:"blur"}],mobile:[{required:!0,message:"请输入手机号",trigger:"blur"},{pattern:/^1[3456789]\d{9}$/,message:"请输入正确的手机号",trigger:"blur"}]},editDialogVisible:!1,editForm:{},editFormRules:{email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{validator:e,trigger:"blur"}],mobile:[{required:!0,message:"请输入手机号",trigger:"blur"},{validator:t,trigger:"blur"}]},setRoleDialogVisible:!1,userInfo:{},rolesList:[],selectedRoleId:""}},created(){this.getUserList()},methods:{async getUserList(){const{data:e}=await this.$http.get("users",{params:this.queryInfo});if(200!==e.meta.status)return this.$message.error("获取用户列表失败");this.userList=e.data.users,this.total=e.data.total},handleSizeChange(e){this.queryInfo.pagesize=e,this.getUserList()},handleCurrentChange(e){this.queryInfo.pagenum=e,this.getUserList()},async userStateChanged(e){const{data:t}=await this.$http.put(`users/${e.id}/state/${e.mg_state}`);if(200!==t.meta.status)return e.mg_state=!e.mg_state,this.$message.error("修改用户状态失败");this.$message.success("修改用户状态成功")},addDialogClosed(){this.$refs.addFormRef.resetFields()},addUser(){this.$refs.addFormRef.validate((async e=>{if(!e)return;const{data:t}=await this.$http.post("users",this.addForm);if(201!==t.meta.status)return this.$message.error("添加用户失败");this.$message.success("添加用户成功"),this.addDialogVisible=!1,await this.getUserList()}))},async showEditDialog(e){const{data:t}=await this.$http.get(`users/${e}`);if(200!==t.meta.status)return this.$message.error("获取用户信息失败");this.editForm=t.data,this.editDialogVisible=!0},editDialogClosed(){this.$refs.editFormRef.resetFields()},editUserInfo(){this.$refs.editFormRef.validate((async e=>{if(!e)return;const{data:t}=await this.$http.put(`users/${this.editForm.id}`,this.editForm);if(200!==t.meta.status)return this.$message.error("修改用户信息失败");this.$message.success("修改用户信息成功"),this.editDialogVisible=!1,await this.getUserList()}))},async removeUserById(e){const t=await this.$confirm("此操作将永久删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((e=>e));if("cancel"===t)return this.$message.info("已取消删除");const{data:s}=await this.$http.delete(`users/${e}`);if(200!==s.meta.status)return this.$message.error("删除用户失败");this.$message.success("删除用户成功"),await this.getUserList()},async setRole(e){this.userInfo=e;const{data:t}=await this.$http.get("roles");if(200!==t.meta.status)return this.$message.error("获取角色列表失败");this.rolesList=t.data,this.setRoleDialogVisible=!0}}},l=i,o=s(1001),n=(0,o.Z)(l,a,r,!1,null,"34599dc4",null),d=n.exports}}]);
//# sourceMappingURL=445.e938ff74.js.map