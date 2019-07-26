<template>
	<!-- 班级名单 -->
	<div style="width:100%;">
	   <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		<div style="width:100%;margin-bottom:10px;float: left;">
           
			<el-select class='tab_c'  @change='lx_cl' style='width:150px;' v-model="lx_val" clearable placeholder="托管时段">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<el-select class='tab_c' @change='zt_cl' style='width:150px;' v-model="sh_val" clearable placeholder="托管类型">
			   <el-option :label="'关闭'" :value="'0'"></el-option>
			   <el-option :label="'开启'" :value="'1'"></el-option>
			</el-select>
			
			<el-date-picker class='tab_c' style='width:150px;' v-model="value4" type="month" placeholder="托管月份"></el-date-picker>
   
			<div class='inp_a' style='width:150px;'><el-input placeholder="请输入关键字" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
			
			<el-button @click='create_date("")' style='float:right;' type="primary" >添加信息</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%">
       
	   <el-table-column prop="school_detail.city_name" align='center' header-align='center' label="标题" ></el-table-column>
       <el-table-column prop="school_detail.region_name" class='tds' align='center' header-align='center'  label="金额" ></el-table-column>
       <el-table-column prop="school_detail.street_name" align='center' header-align='center' label="开始时间" ></el-table-column>
	   <el-table-column prop="school_name" class='tds' align='center' header-align='center'  label="结束时间" show-overflow-tooltip></el-table-column>
	   
	   <el-table-column prop="target_tags" align='center' header-align='center' label="托管类型" ></el-table-column>
	   <el-table-column prop="schools_tags" align='center' header-align='center' label="托管时段" show-overflow-tooltip></el-table-column>
	   
	   <el-table-column prop="key_works" class='tds' align='center' header-align='center'  label="托管月份" show-overflow-tooltip></el-table-column>
		    
	   <el-table-column prop="phase_name" align='center' header-align='center' label="托管天数" show-overflow-tooltip></el-table-column>
	   
	   <el-table-column prop="school_detail.can_arrange" class='tds' align='center' header-align='center'  label="状态" >
		   <template slot-scope="scope">
			   <el-button v-if='true' type="success">上架</el-button>
			   <el-button v-else type="danger">下架</el-button>
		   </template>
	   </el-table-column>
	   
	    <el-table-column prop="school_detail.can_arrange" class='tds' align='center' header-align='center'  label="状态" show-overflow-tooltip>
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
   
   <!-- 添加标签 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
   	  <transition name="el-fade-in-linear">
           <div v-show="show_meng" class="transition-box">
   		   <transition name="el-zoom-in-top">
                <div v-show="show_meng" class="transition-box_child">
   				  <p class="p_title">添加/编辑普惠套餐</p>
   				  
				  <div class="divbox">
					  <el-input class='tall' placeholder="请输入" v-model="input[0]" clearable></el-input>
                      <p>*托管标题:</p>
				  </div>
				  
				   <div class="divbox">
				  		<el-select class='tall' v-model="tuo_lei" placeholder="托管类型">
				  		   <el-option :label="'月度托管'" :value="'月度托管'"></el-option>
				  		   <el-option :label="'学期托管'" :value="'学期托管'"></el-option>
				  		</el-select>
				      <p>*托管类型:</p>
				  </div>
				  
				  <div class="divbox">
				  	   <el-date-picker class='tall' v-if='tuo_lei=="月度托管"' v-model="tuo_yue" type="month" placeholder="选择月"></el-date-picker>
                       <div v-else class='tall'>
						   <el-date-picker style='width:135px;float:left;' v-model="tuo_yue_2[0]" type="month" placeholder="起始月份"></el-date-picker>
						   <el-date-picker style='width:135px;float:right;' v-model="tuo_yue_2[1]" type="month" placeholder="结束月份"></el-date-picker>
					   </div>
					   <p>*托管月份:</p>
				  </div>
				  
				  <div class="divbox">
				  		<el-select class='tall' v-model="tuo_date_lei" placeholder="托管时段类型">
				  		   <el-option :label="'午托'" :value="'午托'"></el-option>
				  		   <el-option :label="'晚托'" :value="'晚托'"></el-option>
				  		</el-select>
				      <p>*托管时段:</p>
				  </div>
				  
				  <div class="divbox">
				  	  <el-date-picker class='tall' @change='que_date' v-model="tuo_date[0]" type="date" placeholder="选择日期"></el-date-picker>
				      <p>*开始日期:</p>
				  </div>
				  
				  <div class="divbox">
				  	  <el-date-picker class='tall' @change='que_date' v-model="tuo_date[1]" type="date" placeholder="选择日期"></el-date-picker>
				      <p>*结束日期:</p>
				  </div>
				  
				  <div class="divbox">
				  	  <div class="tall">{{date_ri}}天</div>
				      <p>*服务天数:</p>
				  </div>
				  <div class="divbox">
				  	  <div class="tall">{{marenr}}￥</div>
				      <p>*金额:</p>
				  </div>
				  
                  <div class="inp_box" style="width:170px;">
   					  <el-button @click='show_meng=false' style='float:left;' type="info">取消</el-button>
   					  <el-button @click='git_num' style='float:right;' type="primary">确认</el-button>
   				  </div>
   			  </div>
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
		  marenr:0,
		  date_ri:0,
		  
		  tuo_date:['',''],
		  tuo_date_lei:'',//托管时间段类型
		
		  tuo_yue_2:['',''],//托管月份时间段
		  tuo_yue:'',//托管月份
		  
		  tuo_lei:'月度托管',//托管类型
		  input:[],
			
		  show_meng:false,
		  value4:'',//月份
		  
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
		   
           multipleSelection:[],
		   loading:true,
	    }
	  },
		
	methods:{
	create_date(i){//添加||编辑被点击
		this.show_meng = true
	},
    que_date(i){//开始日期||结束日期被选定
		if(this.tuo_date[0]){}else{this.date_ri=0;this.marenr=0;return false;}
		if(this.tuo_date[1]){}else{this.date_ri=0;this.marenr=0;return false;}
		
		this.date_ri = this.calculateDiffTime(this.tuo_date[0],this.tuo_date[1]);
		this.marenr = this.calculateDiffTime(this.tuo_date[0],this.tuo_date[1])*5;
		
	},
	
    calculateDiffTime(start_time, end_time){//获取具体有多少天 
      let start=start_time.getTime();
      let end=end_time.getTime();
	  let utc=end-start;
	  return utc/(24*60*60*1000);//天
     },
     
//提交数据
      git_num(){
		 if(this.tuo_lei=='学期托管'){
			if(this.tuo_yue_2[0]==''||this.tuo_yue_2[1]==''){this.$message({message:'起始月份或者结束月份不能为空！',type:'warning'});return false};
			if(this.tuo_yue_2[0].getTime()<this.tuo_yue_2[1].getTime()){}else{this.$message({message:'起始月份必须小于结束月份！',type:'warning'});return false};
		 }
		
		if(this.tuo_date[0]==''||this.tuo_date[1]==''){this.$message({message:'开始日期或者结束日期不能为空！',type:'warning'});return false};
		
		if(this.tuo_date[0].getTime()<this.tuo_date[1].getTime()){}else{this.$message({message:'开始日期必须小于结束日期！',type:'warning'});return false};
		
		if(this.tuo_lei=='月度托管'){
			if(this.calculateDiffTime(this.tuo_date[0],this.tuo_date[1])<=31){}else{this.$message({message:'月度托管服务天数不能大于31天！',type:'warning'});return false;}
		}
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
		this.git_lx();
		this.git_act(1);
		
	  }
	};
	
</script>
<style scoped="scoped">
	.divbox p{
		margin: 0;
		font-size: 14px;
	    font-weight:600;
		float: right;
	}
	.tall{
		float: right;
		width:280px;
		margin-left: 10px;
	}
	.divbox{
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin: 20px 0;
		padding:0 50px 0 0;
	}
	.inp_box{
		width: 320px;
		height: 40px;
		margin: 20px auto;
	}
	.p_title{
		font-size: 15px;
		font-weight: 600;
		text-align: center;
		margin: 0 0 20px 0;
		
	}
	.transition-box_child{
		width:450px;
		height:620px;
		margin:50px auto;
		background: white;
		border-radius:5px;
		overflow:auto;
		padding-top:30px;
		
		
	}
	.transition-box{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 500;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
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
