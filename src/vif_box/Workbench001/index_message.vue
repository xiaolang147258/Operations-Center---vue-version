<template>
	<div style="width:100%;">
		<div style="width:100%;margin-bottom:10px;float: left;">
            <el-select class='tab_c' @change='ly_cl' v-model="ly_val" clearable placeholder="请选择来源">
               <el-option v-for="(item,index) in ly_box" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
			
			<el-select class='tab_c' @change='lx_cl' v-model="lx_val" clearable placeholder="请选择类型">
			   <el-option v-for="(item,index) in lx_box" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
			
			<div class='inp_a'><el-input placeholder="请输入内容" v-model="masg_val" clearable></el-input></div>
            <el-button @click='git_act(1)' class='tab_c' type="primary">搜索</el-button>
		</div>
		
   <div style="width:100%;float: left;">
	<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"@selection-change="handleSelectionChange">
		
       <el-table-column type="selection" width="100" align='center' header-align='center'></el-table-column>
       <el-table-column prop="updated_at" align='center' header-align='center' label="时间"><template slot-scope="scope">{{ scope.row.updated_at }}</template></el-table-column>
       <el-table-column prop="src_name" align='center' header-align='center' label="来源" ></el-table-column>
       <el-table-column prop="message" class='tds' align='center' header-align='center'  label="消息内容" show-overflow-tooltip></el-table-column>
       <el-table-column prop="type_name" align='center' header-align='center' label="类型" ></el-table-column>
       <el-table-column  label="操作" align='center' header-align='center'>
		   <template slot-scope="scope">
			  <el-button @click='xiang("delete",scope.row.message_id,scope.row)' type="primary" plain>详情</el-button>
			  <el-button @click='del_click("delete",scope.row.message_id)' type="danger" plain>删除</el-button>
	       </template>
	   </el-table-column>
     </el-table>
  <div style="margin-top: 20px;">
        <el-button @click='all_del_du("read")' type="success">批量已读</el-button>
		<el-button @click='all_del_du("delete")' type="danger">批量删除</el-button>
<!-- 分页插件 :current-page="currentPage4" -->
	<div style="float:right;margin-right:10px;">
       <el-pagination background @size-change="handleSizeChange"
       @current-change="handleCurrentChange"
       :page-sizes="[15]"
       :page-size="100"
       layout="total, sizes, prev, pager, next, jumper"
       :total="total_01">
       </el-pagination>
	  </div>
     </div>
	 
<!-- 查看详情弹窗 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111-->
	  <transition name="el-fade-in-linear">
        <div v-show="show_meng" @click="show_meng=false" class="transition-box">
		   <transition name="el-zoom-in-top">
             <div v-show="show_meng" class="transition-box_child">
				 <p class="p_title">运营中心你好：</p>
				 <div class="tit_val">
					 {{xiang_value}}
				 </div>
			    <div style="width: 100%;height:30px;"><p class="ming">{{xiang_ly}}</p></div>
			    <div style="width: 100%;height: 30px;"><p class="ming">{{xiang_date}}</p></div>	
			  </div>
           </transition>
		</div>
      </transition>
<!-- 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 --> 
  </div>
</div>
</template>

<script>
	import store from "../../vuex/store.js";
     export default {
	  data(){
	    return {
		   show_meng:false,
		   total_01:0,//分页-总条数
	       ly_val:'',
		   ly_id:'',//来源id
		   ly_box:[],
		   lx_box:[],
		   lx_id:'',//类型id
		   lx_val:'',
		   
		   masg_val:'',//搜索输入框数据
		    
		   tableData3:[],//列表数据
			  
           multipleSelection: [],
		   
		   xiang_value:'',
		   xiang_ly:'',
		   xiang_date:'',
	    }
	  },
	 props: {
      fatherMethod: {
        type: Function,
        default: null
      }
     },
	  methods:{
		  //单个删除||已读
		   del_du(type,id){
		  		this.$axios({method:type,url:store.state.url_data+'/api/messages/'+id,
		  				      data:{'type':type,'ids':this.multipleSelection},
		  				      headers:{'Authorization':'Bearer '+localStorage.token}}
		  				      ).then(res=>{
		  				        if(res.data.code==200){
								   if(type=='delete'){
									   this.$message({ type:'success', message: '删除成功!'});
								   }
		  							   this.git_act(1);
									   this.fatherMethod();//调用父组件事件
		  				   		}
		  				      }).catch(error=> {});  
		   },
		   
		   //删除按钮被点击
		   del_click(type,id){
		  		this.$confirm('确定要删除选中的消息吗?', '提示', {
		  		  confirmButtonText: '确定',
		  		  cancelButtonText: '取消',
		  		  type: 'warning'
		  		}).then(() => {
		  			this.del_du(type,id);
		  		}).catch(() => {});  
		   },
		   
		  //详情按钮被点击 
		   xiang(type,id,i){
				this.del_du('put',id);//执行已读事件
		  		this.xiang_value = i.message;
				this.xiang_ly = i.src_type_name;
		  		this.xiang_date = i.created_at;
		  		this.show_meng = true;
		   },
		  
	   //列表勾选项，数据函数
       handleSelectionChange(val) {
		  // console.log(val);
		  let id = [];
		  for(var i=0;i<val.length;i++){
			  id.push(val[i].message_id);
		  }
         this.multipleSelection = id;
       },
	   
	   //分页相关函数
	   handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
		this.git_act(val);
      },
	  
	  ly_cl(i){
		// console.log(i);
		this.ly_id = i;
		this.git_act(1)
	  },
	  lx_cl(i){
	  		// console.log(i);
	  		this.lx_id = i;
			this.git_act(1)
	  },
	  
	//获取来源函数
	  git_ly(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/messageSourceTypes',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        // console.log(res.data,'来源数据');
		       if(res.data.code==200){
				   this.ly_box = res.data.data;
			   }
		     }).catch(error=> {});
	  },
	  
	//获取类型函数
	  git_lx(){
		  this.$axios({method:'get',url:store.state.url_data+'/api/messageTypes',headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		        // console.log(res.data,'类型数据');
		       if(res.data.code==200){
				   this.lx_box = res.data.data;
			   }
		     }).catch(error=> {});
	  },
	  GetDateStr(AddDayCount){//获取今天前后的时间
	       var dd = new Date();
	       dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
	       var y = dd.getFullYear();
	       var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
	       var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
	       return y+"-"+m+"-"+d;
	  },
	  
	//获取列表数据函数
	  git_act(pages){
	  		  this.$axios({method:'get',url:store.state.url_data+'/api/messages',
			  params:{
				page:pages,
				src_type:this.ly_id,
				dest_type:3,
				src_name:this.masg_val,
				is_read:0,
				type:this.lx_id,
				before_time:this.GetDateStr(-7),
			  },
			  headers:{'Authorization':'Bearer '+localStorage.token}}
	  		     ).then(res=>{
	  		        console.log(res.data,'数据');
	  		       if(res.data.code==200){
					   this.tableData3 = res.data.data;
					   this.total_01 = res.data.meta.total;
	  			   }
	  		  }).catch(error=> {});
	  },
	 
	 ////批量删除与批量已读
	  all_del_du(type){
		if(this.multipleSelection.length==0){
			return false;
		}
		let val = (type=='read')?'已读':'删除';
        this.$confirm('确定要批量'+val+'选中的消息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
		   this.$axios({method:'patch',url:store.state.url_data+'/api/messages',
		      data:{'type':type,'ids':this.multipleSelection},
		      headers:{'Authorization':'Bearer '+localStorage.token}}
		      ).then(res=>{
		        if(res.data.code==200){
		   		    this.$message({
		   		      type:'success',
		   		      message: '删除成功!'
		   		    });
					this.git_act(1);
					this.fatherMethod();//调用父组件事件
		   		}
		      }).catch(error=> {});  
        }).catch(() => {});
	  },
	  
	  
	  
	  },
	  mounted(){
		window.setTimeout(()=>{
		  this.tableData3 = store.state.message_box.slice(0,15);
		  this.total_01 = store.state.message_box.length;//赋值分页数据，进行分页
		},500)
		this.git_ly();
		this.git_lx();
		  
	  }
	};
	
</script>
<style scoped="scoped">
	.ming{
		float:right;
		line-height: 30px;
		margin: 0;
		margin-right:40px;
	}
	.tit_val{
		width: 70%;
		margin: 30px auto;
		/* background: red; */
		text-align:justify;
		line-height: 30px;
		margin-bottom: 80px;
		margin-top: 60px;
	}
	.p_title{
		font-size: 15px;
		/* width: 100%; */
		margin: 0px 0 50px 40px;
		font-weight: 600;
	}
	.transition-box_child{
		width: 70%;
		height: 90%;
		margin: 2% auto;
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
