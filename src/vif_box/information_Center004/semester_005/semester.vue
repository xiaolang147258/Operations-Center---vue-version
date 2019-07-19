<template>
	<!-- 工作台-审核 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' v-model="lx_val" clearable placeholder="请选择学期">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='zt_cl'  v-model="sh_val" clearable placeholder="请选择学年">
			   <el-option v-for="(item,index) in sh_zt_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<div class='inp_a'><el-input placeholder="请输入关键字" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			<el-button @click='create_data("")' style='float:right;margin-right: 40px;' type="primary">添加服务期</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       <el-table-column prop="city_name" align='center' header-align='center' label="城市" ></el-table-column>
       <el-table-column prop="region_name" class='tds' align='center' header-align='center'  label="区域" ></el-table-column>
       <el-table-column prop="street_name" align='center' header-align='center' label="街道" ></el-table-column>
	   <el-table-column prop="region_name" align='center' header-align='center' label="学期"></el-table-column>
	   <el-table-column prop="created_at" align='center' header-align='center' label="开学时间"></el-table-column>
	   <el-table-column prop="created_at" align='center' header-align='center' label="学期结束"></el-table-column>
	   <el-table-column prop="created_at" align='center' header-align='center' label="学年"></el-table-column>
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			  <el-button type="primary" plain>编辑</el-button>
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
<!-- 添加、编辑弹框 -->  
     <transition name="el-fade-in-linear">
        <div v-show="show" class="transition-box">
			<transition name="el-zoom-in-top">
              <el-card v-show="show" class="transition-boxs">
				  
				 <p style="font-size:20px;font-weight:600;text-align:center;margin-bottom:30px;margin-top:10px;">添加/编辑服务期</p>  
				 <div class="box_call">
					 <div style="width:400px;float:right;height:100%;">
						 <el-select style='width:125px;'  v-model="cs_val2" placeholder="请选择城市">
						    <el-option v-for="(item,index) in cs_box2" :key="item.city_id" :label="item.city_name" :value="item.city_id"></el-option>
						 </el-select>
						 <el-select style='width:125px;'  @change='qy_click2' v-model="qy_val2"  placeholder="请选择区域">
						    <el-option v-for="(item,index) in qy_box2" :key="item.region_id" :label="item.region_name" :value="item"></el-option>
						 </el-select>
						 <el-select style='width:125px;'  @change='jd_click2' v-model="jd_val2"  placeholder="请选择街道">
						    <el-option v-for="(item,index) in jd_box2" :key="item.street_id" :label="item.street_name" :value="item"></el-option>
						 </el-select>
					 </div><p>*城市区域：</p>
				 </div> 
				 
				  <div class="box_call">
				 	  <div class="box_call_c"><el-date-picker style='width:385px;' v-model="yuer_date" align="right" type="year"  placeholder="选择学年"></el-date-picker></div> 
				 	 <p>*学年：</p>
				 </div>  
				 
				 <div class="box_call">
						  <div class="box_call_c"><el-select style='width:385px;' @change='zt_cl'  v-model="sh_val" clearable placeholder="请选择学期">
						      <el-option v-for="(item,index) in sh_zt_box" :key="index" :label="item.name" :value="item.id"></el-option>
						  </el-select></div> 
				 	 <p>*学期：</p>
				 </div>
				 
				 <div class="box_call">
				 		<div class="box_call_c">
						  <el-date-picker  style='width:385px;'
      						v-model="value6" type="daterange" :unlink-panels='false' range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
						  </el-date-picker>
						</div> 
				 	 <p>*学期时间段：</p>
				 </div>
				
				<div style="width:180px;height:40px;margin:40px auto;">
					   <el-button @click='show=false' style='float:left;' type="info">取消</el-button>
					   <el-button style='float:right;' type="primary">提交</el-button>
				</div>
			  </el-card>
           </transition>
		</div>
      </transition>
  <!--  -->
  </el-card>
</div>
</template>

<script>
	import store from "../../../vuex/store.js";
     export default {
	  data(){
	    return {
		  yuer_date:'',//学年
		  value6:'',//学期时间段
		  
		  show:false,
		  input:[],
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
		   loading:true,
		   
		   cs_box2:[],
		   qy_box2:[],
		   jd_box2:[],
		   cs_val2:'',
		   qy_val2:'',
		   jd_val2:'',
		   cs_id2:'',
		   qy_id2:'',
		   jd_id2:'',
		   
	    }
	  },
		
	methods:{
		
		//添加服务
		create_data(i){
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
		
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////				 
		//城市数据			 
		        cs_fn2(){
				   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'city',id:440},headers:{'Authorization':'Bearer '+localStorage.token}}
				      ).then(res=>{
				        if(res.data.code==200){
				   		  for (var i = 0; i < res.data.data.length;i++){
				   		  		if(localStorage.cs_id==res.data.data[i].city_id){
				   		  			this.cs_box2 = [];this.cs_box2.push(res.data.data[i]);this.cs_val2 = res.data.data[i].city_name;
				   		  		}
				   		  };this.qy_fn2();//获取区域数据
						    
				   		}}).catch(error=> {});
				},
				
		//获取区域数据
				qy_fn2(){
				   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'region',id:localStorage.cs_id},headers:{'Authorization':'Bearer '+localStorage.token}}
				      ).then(res=>{
				        if(res.data.code==200){
				   		    this.qy_box2 = res.data.data;
							this.qy_val2 = this.qy_box2[0].region_name;
							console.log(this.qy_val2)
							this.qy_id2 = this.qy_box[0].region_id;
							this.jd_fn2();
				   		}
				      }).catch(error=> {});
				},
				
		//当区域选项被点击
				qy_click2(i){
					this.qy_val2 = i.region_name;
					this.qy_id2 = i.region_id;this.jd_val2 = '';this.jd_box2 = [];this.jd_id2 = '';
					this.jd_fn2();//获取街道数据
				    console.log(this.qy_id2,this.qy_val2);
				},
				
		//获取街道数据
				jd_fn2(){
				   this.$axios({method:'get',url:store.state.url_data+'/api/regions',params:{type:'street',id:this.qy_id2},headers:{'Authorization':'Bearer '+localStorage.token}}
				     ).then(res=>{
						 console.log(res.data,'街道数据222')
				       if(res.data.code==200){
				  		    this.jd_box2 = res.data.data;
							this.jd_id2 = this.jd_box2[0].street_id;
							this.jd_val2 = this.jd_box2[0].street_name
				  		}
				     }).catch(error=> {});
				},
				
		//当街道选项被点击
				jd_click2(i){
					this.jd_id2 = i.street_id;this.jd_val2 = i.street_name;
					 console.log(this.jd_id2,this.jd_val2);
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
		this.cs_fn2()
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
		padding-right: 20px;
	}
	
	.transition-boxs{
		width: 600px;
		height: 420px;
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
