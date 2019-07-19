<template>
	<!-- 学校编辑添加 -->
	<div style="width:100%;">
	  <el-card v-loading="loading" class="box-card"  style="padding:0;margin:20px;padding-bottom: 20px;">
		  
	    <div class="box_tall"><el-input class='tab_c' placeholder="请输入" v-model="input[0]" clearable></el-input><p>*学校名称:</p></div>
			 
		<div class="box_tall">
		  <div class='tab_c'>
			  <el-select style='width:115px;'  v-model="cs_val2" placeholder="请选择城市">
			     <el-option v-for="(item,index) in cs_box2" :key="item.city_id" :label="item.city_name" :value="item.city_id"></el-option>
			  </el-select>
			  <el-select style='width:115px;'  @change='qy_click2' v-model="qy_val2"  placeholder="请选择区域">
			     <el-option v-for="(item,index) in qy_box2" :key="item.region_id" :label="item.region_name" :value="item"></el-option>
			  </el-select>
			  <el-select style='width:115px;'  @change='jd_click2' v-model="jd_val2"  placeholder="请选择街道">
			     <el-option v-for="(item,index) in jd_box2" :key="item.street_id" :label="item.street_name" :value="item"></el-option>
			  </el-select>
		  </div>
		  <p>*所在城市:</p>
		</div> 
		
		<div class="box_tall"><el-input type='text' class='tab_c' placeholder="请输入" v-model="input[1]" clearable></el-input>
		  <p>*联系人:</p></div>
		
		<div class="box_tall"><el-input type='text' class='tab_c' placeholder="请输入" v-model="input[1]" clearable></el-input>
		  <p>*详细地址:</p></div>
		
		<div class="box_tall"><el-input type='Number' class='tab_c' placeholder="请输入" v-model="input[1]" clearable></el-input>
		  <p>*手机号码:</p></div>
		
		<div class="box_tall"><el-input type='text' class='tab_c' placeholder="请输入" v-model="input[1]" clearable></el-input>
		  <p>*登录账号:</p></div>
		
		<div class="box_tall"><el-input type='text' class='tab_c' placeholder="请输入" v-model="input[1]" clearable></el-input>
		  <p>*登录密码:</p></div>
		
		<div class="box_tall" style="height:auto;float:left;width:850px;padding-right:5px;">
			<div class='tab_c' style="height:auto;width:600px;">
				 <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
				  <el-checkbox style='margin:0px 10px 10px 0px;' v-for="city in cities" :label="city.id" :key="city.id" border>{{city.name}}</el-checkbox>
				</el-checkbox-group>
			</div><p>*办学特色:</p>
		</div>
        <div class="box_tall" style="height:auto;float:left;width:850px;padding-right:5px;">
        	<div class='tab_c' style="height:auto;width:600px;">
        		 <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
        		  <el-checkbox style='margin:0px 10px 10px 0px;' v-for="city in cities1" :label="city.id" :key="city.id" border>{{city.name}}</el-checkbox>
        		</el-checkbox-group>
        	</div><p>*育人目标:</p>
        </div>
	 
	   <div class="box_tall" style="height:auto;float:left;width:750px;">
		   <div class='tab_c' style="width:505px;height: auto;">
			  <div class="tab_c_c">
				  
			   <div style="float:left;height: 45px;">
				 <el-time-picker format='HH:mm' is-range v-model='value_box[0]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' is-range v-model='value_box[1]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			    <div style="float:left;height: 45px;">
			   	  <el-time-picker format='HH:mm' is-range v-model='value_box[2]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[3]' style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' is-range v-model='value_box[3]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[4]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' is-range v-model='value_box[4]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[5]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' is-range v-model='value_box[5]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			    <div v-show='value_box[6]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' is-range v-model='value_box[6]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[7]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' is-range v-model='value_box[7]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[8]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' is-range v-model='value_box[8]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   <div v-show='value_box[9]'  style="float:left;height: 45px;">
			   	 <el-time-picker format='HH:mm' is-range v-model='value_box[9]' range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
			   </div>
			   
			   <el-button @click='create_date' style='margin-left:10px;' type="primary" icon="el-icon-circle-plus">添加课时</el-button>
			  </div> 
		   </div><p>*课程时间设置:</p>
		</div>
	 
	 
	  
<!-- 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222 -->	  
	  <div style="width: 100%;height:40px;float: left;margin-top: 10px;">
	  		    <div style="width: 210px;height: 100%;margin-left:350px;">
	  				<el-button @click='quxioa' style='float:left;' type="info">返回列表</el-button>
	  				<el-button @click='git_active' style='float:right;' type="primary">确认提交</el-button>
	  			</div>
	  </div>
<!-- 22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222 -->
	  
      </el-card>
 
</div>
</template>

<script>
	 import store from "../../../vuex/store.js";
	 
     export default {
		 computed:{
			 url_img(){return store.state.url_data+'/api/uploads'},
			 headers_s(){return {'Authorization':'Bearer '+localStorage.token}},
			 
			 radios(){return this.radio},
		 },
		 data(){
			 return{
				 value4:[new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 23, 40)],//展示数据
				 value_box:[
					 [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 23, 40)],
				     [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 23, 40)],
				     [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 23, 40)]
				 ],
					   
				checkedCities:[],//选中的标签数组
				cities:[],
				checkedCities1:[],//选中的标签数组
				cities1:[],
				input:[],
	 // 城市区域街道2
				cs_box2:[],
				qy_box2:[],
				jd_box2:[],
				cs_val2:'',
				qy_val2:'',
				jd_val2:'',
				cs_id2:'',
				qy_id2:'',
				jd_id2:'',
				
				loading:false,
			 }
		 },
	methods:{
	create_date(){
	    if(this.value_box.length>=10){return false};
		var a = [];a[0] = new Date(2016, 9, 10, 8, 40);a[1] = new Date(2016, 9, 10, 23, 40)
		this.value_box.push(a);
		console.log(this.value_box);
	},	
		
    git_put_act(){//判断是否为编辑状态
		if(sessionStorage.teacher_id==''){//增加状态
		    
		}else{//编辑状态
		
		  this.bank_show=true//银行卡效验开关
		  this.idcard_show=true//身份证效验开关
		  this.$axios({method:'get',url:store.state.url_data+'/api/teachers/'+sessionStorage.teacher_id,
		     headers:{'Authorization':'Bearer '+localStorage.token}}
		     ).then(res=>{
		  	   console.log(res.data.data,'编辑详情')
		       if(res.data.code==200){
				   
			   }
		     }).catch(error=> {});
		}
	},
//提交数据
	git_active(){
		
	// 	if(this.input[0]){}else{ this.$message({message:'请填写教师姓名！',type:'warning'});return false}
	// 
	// 	
	// 	if(this.img_url_box.s6){}else{this.$message({message:'请上传职业照',type:'warning'});return false}
	// 	let postData = {
	// 		
	// 	};
	// 	let type = sessionStorage.teacher_id==''?'post':'put';
	// 	this.$axios({method:type,url:store.state.url_data+'/api/teachers/'+sessionStorage.teacher_id,params:postData,
	// 	     headers:{'Authorization':'Bearer '+localStorage.token}}).then(res=>{
	// 	     console.log(res.data,'添加结果')
	// 	     if(res.data.code==200){
	// 			this.$message({message:'提交成功',type:'success'});
	// 			this.$router.go(-1);
	// 	    }else{
	// 			let box=res.data.data;let vals = '';
	// 			for (var index in box){vals=box[index].join(' ')}
	// 			this.$alert(vals,'服务器返回!',{confirmButtonText:'确定',callback:action=>{}})}
	// 		}).catch(error=> {this.$message.error('发生了错误！');});
	},
//返回	
	quxioa(){this.$router.go(-1);},//返回上一页
     

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
					// this.jd_fn2();
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
//办学特色		
		      handleCheckedCitiesChange(value) {//任意一项被点击
		        let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
				console.log(this.checkedCities)
		      },
			  git_check(){//获取授课门类数据
				this.$axios({method:'get',url:store.state.url_data+'/api/courseCategories',
				   headers:{'Authorization':'Bearer '+localStorage.token}}
				   ).then(res=>{
					 // console.log(res.data.data,'授课门类')
				     if(res.data.code==200){
							this.cities = res.data.data;
						}
				   }).catch(error=> {});
			  },
//育人目标		
		            handleCheckedCitiesChange1(value) {//任意一项被点击
		              let checkedCount = value.length;
					  this.checkAll = checkedCount === this.cities1.length;
					  this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities1.length;
		      		console.log(this.checkedCities1)
		            },
		      	  git_check1(){//获取授课门类数据
		      		this.$axios({method:'get',url:store.state.url_data+'/api/courseCategories',
		      		   headers:{'Authorization':'Bearer '+localStorage.token}}
		      		   ).then(res=>{
		      			 // console.log(res.data.data,'授课门类')
		      		     if(res.data.code==200){
		      					this.cities1 = res.data.data;
		      				}
		      		   }).catch(error=> {});
		      	  },
		
		},
		 mounted(){
			this.cs_fn2();
			
			this.git_check();
			this.git_check1();
			this.git_put_act();
		},
	 };
</script>
<style scoped="scoped">
	.tab_c_c{
		width: 100%;
		margin-bottom: 10px;
		float: left;
	}
	
	.img_f_box{
		width: 100%;
		height: 150px;
		margin: 20px 0;
		float: left;
		/* background: red; */
		padding-left:160px;
	}
	.tab_c{
		width:355px;
		height: 40px;
		float: right;
		}
	.box_tall p{
		font-size: 15px;
		font-weight: 600;
		float: right;
		margin: 0;
		line-height: 40px;
		margin-right: 10px;
	}
	.box_tall{
		width: 600px;
		height: 40px;
		padding-left: 70px;
		margin: 20px 0;
	}
	
</style>
