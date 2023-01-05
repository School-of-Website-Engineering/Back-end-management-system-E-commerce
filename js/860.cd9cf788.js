"use strict";(self["webpackChunkBack_end_management_system_E_commerce"]=self["webpackChunkBack_end_management_system_E_commerce"]||[]).push([[860],{3860:function(e,t,a){a.r(t),a.d(t,{default:function(){return c}});var r=function(){var e=this,t=e._self._c;return t("div",[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),t("el-breadcrumb-item",[e._v("商品管理")]),t("el-breadcrumb-item",[e._v("商品分类")])],1),t("br"),t("el-card",[t("el-row",[t("el-col",[t("el-button",{attrs:{type:"primary"},on:{click:e.showAddCateDialog}},[e._v(" 添加分类 ")])],1)],1),t("br"),t("zk-table",{attrs:{data:e.cateList,columns:e.columns,"selection-type":!1,"expand-type":!1,"show-index":!0,"index-text":this.indexText,border:"","show-row-hover":!1},scopedSlots:e._u([{key:"isOk",fn:function(e){return[!1===e.row.cat_deleted?t("i",{staticClass:"el-icon-success",staticStyle:{color:"lightgreen"}}):t("i",{staticClass:"el-icon-error",staticStyle:{color:"red"}})]}},{key:"order",fn:function(a){return[0===a.row.cat_level?t("el-tag",{attrs:{size:"mini"}},[e._v("一级")]):1===a.row.cat_level?t("el-tag",{attrs:{size:"mini",type:"success"}},[e._v("二级")]):t("el-tag",{attrs:{size:"mini",type:"warning"}},[e._v("三级")])]}},{key:"action",fn:function(a){return[t("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:function(t){return e.handleEdit(a.row)}}},[e._v(" 编辑 ")]),t("el-button",{attrs:{type:"danger",icon:"el-icon-delete",size:"small"},on:{click:function(t){return e.handleDelete(a.row)}}},[e._v(" 删除 ")])]}}])}),t("br"),t("el-pagination",{attrs:{"current-page":e.queryInfo.pagenum,"page-sizes":[2,3,5,10],"page-size":e.queryInfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),t("el-dialog",{attrs:{title:"添加分类",visible:e.addCateDialogVisible,width:"50%"},on:{"update:visible":function(t){e.addCateDialogVisible=t}}},[t("el-form",{ref:"addCateForRef",attrs:{model:e.addCateForm,rules:e.addCateFormRules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"分类名称:",prop:"cat_name"}},[t("el-input",{model:{value:e.addCateForm.cat_name,callback:function(t){e.$set(e.addCateForm,"cat_name",t)},expression:"addCateForm.cat_name"}})],1),t("el-form-item",{attrs:{label:"父级分类:"}},[t("el-input",{model:{value:e.addCateForm.cat_name,callback:function(t){e.$set(e.addCateForm,"cat_name",t)},expression:"addCateForm.cat_name"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.addCateDialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addCateDialogVisible=!1}}},[e._v("确 定")])],1)],1)],1)},i=[],s={data(){return{addCateForm:{cat_name:"",cat_pid:0,cat_level:0,cat_deleted:!1},addCateFormRules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}]},addCateDialogVisible:!1,indexText:"#",queryInfo:{type:3,pagenum:1,pagesize:5},cateList:[],total:0,columns:[{label:"分类名称",prop:"cat_name"},{label:"是否有效",type:"template",template:"isOk"},{label:"排序",type:"template",template:"order"},{label:"操作",type:"template",template:"action"}],parentCateList:[]}},created(){this.getCateList()},methods:{async getCateList(){const{data:e}=await this.$http.get("categories",{params:this.queryInfo});if(200!==e.meta.status)return this.$message.error("获取商品分类数据失败");console.log(e),this.cateList=e.data.result,this.total=e.data.total},handleSizeChange(e){this.queryInfo.pagesize=e,this.getCateList()},handleCurrentChange(e){this.queryInfo.pagenum=e,this.getCateList()},showAddCateDialog(){this.getParentCateList(),this.addCateDialogVisible=!0},async getParentCateList(){const{data:e}=await this.$http.get("categories",{params:{type:2}});if(200!==e.meta.status)return this.$message.error("获取父级分类数据失败");this.parentCateList=e.data}}},l=s,n=a(1001),o=(0,n.Z)(l,r,i,!1,null,"9ccb9b88",null),c=o.exports}}]);
//# sourceMappingURL=860.cd9cf788.js.map