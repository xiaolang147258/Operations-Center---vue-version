<template>
	<!-- 学校管理 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			
			
			<el-select class='tab_c' @change='zt_cl' v-model="sh_val" clearable placeholder="请选择课程状态">
			   <el-option  :label="'开启'" :value="'开启'"></el-option>
			   <el-option  :label="'关闭'" :value="'关闭'"></el-option>
			</el-select>
			
			<el-select class='tab_c' v-model="cs_val" style='width:150px;' placeholder="请选择城市">
			   <el-option v-for="(item,index) in cs_box" :key="index" :label="item.city_name" :value="item.city_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='qy_click' style='width:150px;' v-model="qy_val" clearable placeholder="请选择区域">
			   <el-option v-for="(item,index) in qy_box" :key="index" :label="item.region_name" :value="item.region_id"></el-option>
			</el-select>
			<el-select class='tab_c' @change='jd_click' style='width:150px;' v-model="jd_val" clearable placeholder="请选择街道">
			   <el-option v-for="(item,index) in jd_box" :key="index" :label="item.street_name" :value="item.street_id"></el-option>
			</el-select>
			
			<div class='inp_a'><el-input placeholder="请输入关键字" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			 <el-button @click='add_xuexiao("")' style='float:right;margin-right:10px;' type="primary">添加学校</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       <!-- <el-table-column type="selection" width="100" align='center' header-align='center'></el-table-column> -->
       <el-table-column prop="created_at" align='center' header-align='center' label="学校名称"><template slot-scope="scope">{{ scope.row.name }}</template></el-table-column>
       
	   
	   <el-table-column prop="city_name" align='center' header-align='center' label="个性化课程" >
		   <template slot-scope="scope">
			     <el-button v-if='scope.row.is_course==1' @click='gun_bi("is_course",scope.row.school_id,0)' type="success">开启</el-button>
				 <el-button @click='gun_bi("is_course",scope.row.school_id,1)' v-else type="danger">关闭</el-button>
		   </template>
	   </el-table-column>
	   
	   <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="学校一键排课" >
		    <template slot-scope="scope">
		   		<el-button v-if='scope.row.can_arrange==1' @click='gun_bi("can_arrange",scope.row.school_id,0)' type="success">开启</el-button>
				<el-button v-else @click='gun_bi("can_arrange",scope.row.school_id,1)' type="danger">关闭</el-button>
		   </template>
	   </el-table-column>
	   
	   <el-table-column prop="street_name" align='center' header-align='center' label="普惠午托" >
		    <template slot-scope="scope">
		   		<el-button v-if='scope.row.is_noon==1' @click='gun_bi("is_noon",scope.row.school_id,0)' type="success">开启</el-button>
				<el-button v-else @click='gun_bi("is_noon",scope.row.school_id,1)' type="danger">关闭</el-button>
		   </template>
	   </el-table-column>
	   
	   <el-table-column prop="audit_type_name" class='tds' align='center' header-align='center'  label="营养餐" >
		    <template slot-scope="scope">
		   			     <el-button v-if='scope.row.is_food==1' @click='gun_bi("is_food",scope.row.school_id,0)' type="success">开启</el-button>
						 <el-button v-else type="danger" @click='gun_bi("is_food",scope.row.school_id,1)'>关闭</el-button>
		   </template>
	   </el-table-column>
	   
	   <el-table-column prop="audit_status_name" align='center' header-align='center' label="普惠晚托" >
		   <template slot-scope="scope">
		   			     <el-button v-if='scope.row.is_afternoon==1' @click='gun_bi("is_afternoon",scope.row.school_id,0)' type="success">开启</el-button>
						 <el-button v-else @click='gun_bi("is_afternoon",scope.row.school_id,1)' type="danger">关闭</el-button>
		   </template>
	   </el-table-column>
	   
	   <el-table-column prop="city_name" align='center' header-align='center' label="城市" ></el-table-column>
       <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="区域" ></el-table-column>
       <el-table-column prop="street_name" align='center' header-align='center' label="街道" ></el-table-column>
	   <el-table-column prop="contact_name" class='tds' align='center' header-align='center'  label="联系人" ></el-table-column>
	   <el-table-column prop="contact_phone" align='center' header-align='center' label="手机号码" ></el-table-column>
	   
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			  <el-button @click='add_xuexiao(scope.row.school_id)' type="primary" plain>编辑</el-button>
	       </template>
	   </el-table-column>
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
		  sh_val:'',
		  sh_zt_box:[],
		  sh_zt_id:'',
			
		   total_01:0,//分页-总条数
		   ye_s:[15],
		   
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
		gun_bi(type,id,num){//关闭和开启按钮被点击
		    let data = {}
			if(type=='is_noon'){data.is_noon = num};
			if(type=='is_afternoon'){data.is_afternoon = num};
			if(type=='is_course'){data.is_course = num};
			if(type=='can_arrange'){data.can_arrange = num};
			if(type=='is_food'){data.is_food = num};
			
			this.$axios({method:'put',url:store.state.url_data+'/api/schools/'+id,data,headers:{'Authorization':'Bearer '+localStorage.token}}
			   ).then(res=>{
				   console.log(res.data)
			     if(res.data.code==200){
					    this.$message({message: '修改状态成功', type: 'success' });
                        this.git_act(1);
				 }
			   }).catch(error=> {});
		},
		
//添加学校		
		add_xuexiao(i){
			localStorage.school_id = i;
			this.$router.push({path:'/add_School_management'});
		},
		
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
	 
	  zt_cl(){
		  // this.sh_zt_id = i;
		  this.git_act(1)
	  },
	
	  
	//获取列表数据函数
	  git_act(pages){
	  		this.$axios({method:'get',url:store.state.url_data+'/api/schools',
			  params:{
				city_id:localStorage.cs_id,
				region_id:this.qy_id,
				street_id:this.jd_id,
				is_course:this.sh_val=='关闭'?0:(this.sh_val=='开启'?1:''),
				search:this.masg_val,
				page:pages
			  },
			  headers:{'Authorization':'Bearer '+localStorage.token}}
	  		     ).then(res=>{
	  		        console.log(res.data,'数据');
					this.loading = false;
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   this.total_01 = res.data.meta.total;
	  			   }
	  		  }).catch(error=> {});
	  },
	 
	 },
	  mounted(){
		this.cs_fn();
		
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
