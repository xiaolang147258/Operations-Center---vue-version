<template>
	<!-- 班级名单 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' style='width:150px;' v-model="lx_val" clearable placeholder="排课状态">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='zt_cl' style='width:150px;' v-model="sh_val" clearable placeholder="报课状态">
			   <el-option :label="'关闭'" :value="'0'"></el-option>
			   <el-option :label="'开启'" :value="'1'"></el-option>
			</el-select>
			
			<el-select class='tab_c' v-model="cs_val" style='width:110px;' placeholder="城市">
			   <el-option v-for="(item,index) in cs_box" :key="index" :label="item.city_name" :value="item.city_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='qy_click' style='width:110px;' v-model="qy_val" clearable placeholder="区域">
			   <el-option v-for="(item,index) in qy_box" :key="index" :label="item.region_name" :value="item.region_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='jd_click' style='width:110px;' v-model="jd_val" clearable placeholder="街道">
			   <el-option v-for="(item,index) in jd_box" :key="index" :label="item.street_name" :value="item.street_id"></el-option>
			</el-select>
			
			<div class='inp_a' style='width:150px;'><el-input placeholder="请输入关键字" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			<!-- <el-button style='float:right;' type="primary" >批量导入<i class="el-icon-upload el-icon--right"></i></el-button> -->
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       
	   <el-table-column prop="school_detail.city_name" align='center' header-align='center' label="城市" ></el-table-column>
       <el-table-column prop="school_detail.region_name" class='tds' align='center' header-align='center'  label="区域" ></el-table-column>
       <el-table-column prop="school_detail.street_name" align='center' header-align='center' label="街道" ></el-table-column>
	   <el-table-column prop="school_name" class='tds' align='center' header-align='center'  label="学校名称" show-overflow-tooltip></el-table-column>
	   
	   <el-table-column prop="target_tags" align='center' header-align='center' label="育人目标" ></el-table-column>
	   <el-table-column prop="schools_tags" align='center' header-align='center' label="办学特色" show-overflow-tooltip></el-table-column>
	   
	   <el-table-column prop="key_works" class='tds' align='center' header-align='center'  label="关键字" show-overflow-tooltip></el-table-column>
		    
	   <el-table-column prop="phase_name" align='center' header-align='center' label="排课状态" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="school_detail.can_arrange" class='tds' align='center' header-align='center'  label="报课状态" show-overflow-tooltip>
		   <template slot-scope="scope">{{scope.row.school_detail.can_arrange==0?'关闭':'开启'}}</template>
	   </el-table-column>
	   
	   <!-- <el-table-column prop="audit_status_name" align='center' header-align='center' label="服务类型" show-overflow-tooltip>
		    <template slot-scope="scope">{{scope.row.source_type==1?'机构调配':(scope.row.source_type==2?'学校调配':'平台调配')}}</template>
	   </el-table-column>
	   
	   <el-table-column prop="classes.teacher.name" align='center' header-align='center' label="授课老师" ></el-table-column>
	   <el-table-column prop="classes.teacher.phone" class='tds' align='center' header-align='center'  label="教师号码" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="street_name" align='center' header-align='center' label="上课时间" show-overflow-tooltip>
		   <template slot-scope="scope">
		      <span v-for="i in scope.row.timetable">{{i.timetable_format}}</span>
		   </template>
	   </el-table-column> -->
	   
     </el-table>
  <div style="margin-top:20px;">
<!-- 分页插件 :current-page="currentPage4" -->
	<div style="float:right;margin-right:10px;">
       <el-pagination background @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :page-sizes="ye_s"
       :page-size="100"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total_01">
       </el-pagination>
	  </div>
     </div>
  </div>
  
  </el-card>
</div>
</template>

<script>
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
			
		  input_val:'',
			
		  sh_val:'',
		  sh_zt_box:[],
		  sh_zt_id:'',
			
		   total_01:0,//分页-总条数
		   ye_s:[15],
		   
		   lx_box:[],
		   lx_id:'',//类型id
		   lx_val:'',
		   
		   masg_val:'',//搜索输入框数据
		   
		   tableData3:[],//列表数据
		   
           multipleSelection: [],
		   
		   // 城市区域街道
		   cs_box:[],
		   qy_box:[],
		   jd_box:[],
		   
		   cs_val:'',
		   qy_val:'',
		   jd_val:'',
		   
		   cs_id:'',
		   qy_id:'',
		   jd_id:'',
		   loading:true,
	    }
	  },
		
	methods:{
			
		//城市区域街道函数
		cs_fn(){//城市数据
		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'city',id:440},headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
		        if(res.data.code==200){
		   		  for (var i = 0; i < res.data.data.length; i++) {
		   		  		if(localStorage.cs_id==res.data.data[i].city_id){
		   		  			this.cs_box = [];this.cs_box.push(res.data.data[i]);
							this.cs_val = res.data.data[i].city_name;
		   		  		}
		   		  }; 
				  this.qy_fn();//获取区域数据
		   		}
		      }).catch(error=> {});
		},
		
		//获取区域数据
		qy_fn(){
		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'region',id:localStorage.cs_id},headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
				console.log(res.data,'区域数据')
		        if(res.data.code==200){
		   		    this.qy_box = res.data.data;
		   		}
		      }).catch(error=> {});
		},
		
		//当区域选项被点击
		qy_click(i){
			this.qy_id = i;
			this.jd_val = '';
			this.jd_box = [];
			this.jd_id = '';
			this.jd_fn();//获取街道数据
			this.git_act(1)
		},
		
		//获取街道数据
		jd_fn(){
		   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'street',id:this.qy_id},headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		  		console.log(res.data,'街道数据')
		       if(res.data.code==200){
		  		    this.jd_box = res.data.data;
		  		}
		     }).catch(error=> {});
		},
		
		//当街道选项被点击
		jd_click(i){
			this.jd_id = i;
			this.git_act(1)
		},
		
	   //分页相关函数
	   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
		this.git_act(val);
      },
	  lx_cl(i){
	  		// console.log(i);
	  		this.lx_id = i;
			this.git_act(1)
	  },
	  zt_cl(i){
		  this.sh_zt_id = i;
		  this.git_act(1)
	  },
	//获取排课状态和报课状态
	  git_lx(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/coursePlansCourses/dict',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        console.log(res.data,'排课状态和报课状态数据');
		       if(res.data.code==200){
				  this.lx_box = res.data.data.status;
				  
			   }
		     }).catch(error=> {});
	  },
	  
	//获取列表数据函数
	  git_act(pages){
	  		this.$axios({method:'get',url:store.state.url_data+'/api/coursePlans',
			  params:{
				page:pages,
				city_id:localStorage.cs_id,
				region_id:this.qy_id,
				street_id:this.jd_id,
				status:this.lx_id,
				can_arrange:this.sh_zt_id,
				search:this.input_val
			  },headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
	  		        console.log(res.data,'数据');
					this.loading = false;
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   this.total_01 = res.data.meta.total;
	  			   }
	  		  }).catch(error=>{});
	  },
	 
	 },
	  mounted(){
		this.cs_fn();
		this.git_lx();
		
		this.git_act(1);
	  }
	};
	
</script>
<style scoped="scoped">
	
	.tds{
		text-align: center;
	}
	.tab_c{
		float:left;margin-right:10px;
	}
	.inp_a{
		width: 200px;
		float: left;
		margin-right: 10px;
	}
</style>
