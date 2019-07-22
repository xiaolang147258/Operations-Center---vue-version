<template>
	<!-- 工作台-审核 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' style='width:150px;' v-model="lx_val" clearable placeholder="课程门类">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='zt_cl' style='width:120px;' v-model="sh_val" clearable placeholder="服务类型">
			   <el-option v-for="(item,index) in sh_zt_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='zt_cl' style='width:100px;' v-model="sh_val" clearable placeholder="年级">
			   <el-option v-for="(item,index) in sh_zt_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='zt_cl' style='width:100px;' v-model="sh_val" clearable placeholder="班级">
			   <el-option v-for="(item,index) in sh_zt_box" :key="index" :label="item.name" :value="item.id"></el-option>
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
			
			<el-button style='float:right;' type="primary">导出excel</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       
	   <el-table-column prop="city_name" align='center' header-align='center' label="城市" ></el-table-column>
       <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="区域" ></el-table-column>
       <el-table-column prop="street_name" align='center' header-align='center' label="街道" ></el-table-column>
	   
	   <el-table-column prop="audit_type_name" class='tds' align='center' header-align='center'  label="学校名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="audit_status_name" align='center' header-align='center' label="服务年级" ></el-table-column>
	   <el-table-column prop="city_name" align='center' header-align='center' label="服务类型" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="课程门类" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="street_name" align='center' header-align='center' label="课程名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="audit_type_name" class='tds' align='center' header-align='center'  label="平台课程名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="audit_status_name" align='center' header-align='center' label="课班名称" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="city_name" align='center' header-align='center' label="上课时间" ></el-table-column>
	   <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="总价格（课时单价x课时总数+材料费+教材费）" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="street_name" align='center' header-align='center' label="课程日期（开始/结束）" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="audit_type_name" class='tds' align='center' header-align='center'  label="授课老师" ></el-table-column>
	   <el-table-column prop="audit_status_name" align='center' header-align='center' label="报名人数" show-overflow-tooltip></el-table-column>
	   <el-table-column prop="audit_status_name" align='center' header-align='center' label="开班下限/开班上限" show-overflow-tooltip></el-table-column>
	   
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			  <el-button @click='fen_shi("")' type="primary" plain>分配老师</el-button>
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
  
    <transition name="el-fade-in-linear">
       <div v-show="show" class="transition-box">
    			<transition name="el-zoom-in-top">
             <el-card v-show="show" class="transition-boxs">
    				  
    				 <p style="font-size:20px;font-weight:600;text-align:center;margin-bottom:30px;margin-top:10px;">分配老师</p>  
    				 
    				 <div class="box_call">
    				    <div style="width:400px;float:right;height:100%;">
							<el-select class='tab_c'  @change='lx_cl' style='width:250px;' v-model="lx_val" clearable placeholder="请选择老师">
							   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
							<el-button @click='create_there' type="primary">添加老师</el-button>
						</div>
    				   
    				 </div> 
    				    
    				<div style="width:180px;height:40px;margin:35px auto;">
    					   <el-button @click='show=false' style='float:left;' type="info">取消</el-button>
    					   <el-button style='float:right;' type="primary">确认</el-button>
    				</div>
    			  </el-card>
          </transition>
    		</div>
     </transition>
  
  </el-card>
</div>
</template>

<script>
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
		  input_val:'',
			
		  show:false,
			
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
		create_there(){//添加老师按钮被点击
		  this.show = false;
		  this.$router.push({path:'/Teacher_management_003'});
			
		},
		
//分配老师被点击		
		fen_shi(i){
			this.show=true;
		},
		
		
		//获取审核状态数据
		git_zt(){
		   this.$axios({method:'get',url:store.state.url_data+'/api/auditStatus',
			  headers:{'Authorization':'Bearer '+localStorage.token}}
			  ).then(res=>{
				    console.log(res.data,'状态数据')
			    if(res.data.code==200){
					this.sh_zt_box = res.data.data;
				  }
			  }).catch(error=> {});
		},
		
		//审核按钮被点击
		audit_click(i,val){
			console.log(i);
			store.state.audit_id = i.audit_id;
			store.state.audit_val = val;
			
			if(i.audit_type_name=='机构审核'){
				this.$router.push({path:'/ji_audit_001'});
			}else if(i.audit_type_name=='课程审核'){
				this.$router.push({path:'/ke_audit_002'});
			}else if(i.audit_type_name=='教师审核'){
				this.$router.push({path:'/jiao_shi_audit_003'});
			}
			
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
	  lx_cl(i){
	  		// console.log(i);
	  		this.lx_id = i;
			this.git_act(1)
	  },
	  zt_cl(i){
		  this.sh_zt_id = i;
		  this.git_act(1)
	  },
	//获取类型函数
	  git_lx(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/auditTypes',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        // console.log(res.data,'类型数据');
		       if(res.data.code==200){
				   this.lx_box = res.data.data;
			   }
		     }).catch(error=> {});
	  },
	  
	//获取列表数据函数
	  git_act(pages){
	  		this.$axios({method:'get',url:store.state.url_data+'/api/audits',
			  params:{
				audit_type:this.lx_id,
				city_id:localStorage.cs_id,
				region_id:this.qy_id,
				street_id:this.jd_id,
				audit_status:this.sh_zt_id,//这里只获取待审核的数据，审核中心需要修改
				audit_name:this.masg_val,
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
		this.git_lx();
		this.git_zt();
		this.git_act(1);
	  }
	};
	
</script>
<style scoped="scoped">
	.box_call_c{
		width:400px;float:right;height:100%;
	}
	.box_call p{
		float: right;
		font-size: 15px;
		font-weight: 600;
		margin: 0;
		margin-right: 10px;
		line-height: 40px;
	}
	.box_call{
		width: 100%;
		height: 40px;
		margin: 25px 0;
		padding-right: 0px;
	}
	
	.transition-boxs{
		width: 500px;
		height: 240px;
		background: white;
		margin: 100px auto;
	}
	
	.transition-box{
		 position: fixed;
		 top: 0;
		 left: 0;
		 z-index: 500;
		 width: 100%;
		 height: 100%;
		 background: rgba(0,0,0,.3);
		}
	
	
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
