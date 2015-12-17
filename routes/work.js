var db=require('./server');
var async=require('async');

//3G指标
var Third=['开始时间','1X标识','网元名称','小区号','扇区号','载频号','小区号_num','分公司','镇区','直观基站名',
'覆盖区域','1X载频数','伪导频','扇区呼建失败','扇区掉话','RSSI是否异常','软切换比例_FCH_百分比','软切换因子_百分比','尝试次数_CS',
'建立成功次数_CS','建立失败次数_CS','建立成功率_CS_百分比','掉话次数_CS','掉话率_CS_百分比','捕获反向业务信道前导失败次数_CS','分配呼叫资源失败次数_CS',
'寻呼响应次数载频','业务连接失败次数_CS','业务信道信令交互失败次数_CS','A1接口失败次数_CS','尝试次数_PS','建立成功次数_PS',
'建立失败次数_PS','掉话次数操作维护干预_CS','掉话次数定时器超时_CS','掉话次数其它_CS','掉话次数设备故障_CS','掉话次数无线接口失败_CS',
'掉话次数收不到反向帧_CS','掉话次数无线接口消息失败_CS','掉话次数系统侧_CS','掉话次数A2接口_CS','掉话次数Abis接口_CS','掉话次数Erasure帧多_CS',
'掉话次数_PS','业务信道分配成功次数','业务信道分配请求次数','业务信道请求失败次数','分集RSSIdBm','主集RSSIdBm','载频反向链路平均FER_CS_百分比',
'载频前向链路平均FER_CS_百分比','拥塞次数','业务信道拥塞率_百分比','业务信道分配失败次数前向功率不足_软切换',
'业务信道分配失败次数WALSH不足','业务信道分配Abis前向带宽不足','业务信道分配Abis反向带宽不足','业务信道分配失败次数其它','业务信道分配失败次数反向功率不足','业务信道分配失败次数前向功率不足',
'业务信道分配失败次数信道不足','业务信道分配失败次数A3/A7资源不足_软切换','业务信道分配失败次数功率不足_前向SCH','Walsh最大占用数','Walsh平均占用数',
'业务信道承载的话务量强度不含切换CS_FCHErl','业务信道承载的话务量强度不含切换PS_FCHErl','业务信道承载的话务量含切换爱尔兰','WALSH话务量强度_FCHErl'];
//4G指标
var Fourth=['日期','地市','分公司','行政区','覆盖类型','网络制式','厂家','eNodeBName','基站名称',
'基站编号','小区名称','小区编号','下行PRB平均利用率_百分比','上行PRB平均利用率_百分比','PDCCH信道占用率_百分比',
'PRACH信道占用率_百分比','最大RRC连接用户数','平均RRC连接用户数','平均激活用户数','PDCP层上行流量_MB',
'PDCP层下行流量_MB','PDCP层总流量_MB','上行PRB资源利用率_业务信息_百分比','上行PRB资源利用率_控制信息_百分比',
'下行PRB资源利用率_业务信息_百分比','下行PRB资源利用率_控制信息_百分比','空口下行用户面丢包数','空口上行用户面丢包数',
'平均用户数','用户面下行平均时延_ms','用户面PDCP层上行平均吞吐率_百分比','用户面PDCP层下行平均吞吐率_百分比',
'物理层上行平均吞吐率_Kbps','物理层下行平均吞吐率_Kbps','UE发起的RRC连接建立请求次数','UE发起的RRC连接建立成功次数',
'UE发起的RRC连接建立成功率_百分比','UE发起的RRC连接失败次数','网络发起的RRC连接建立请求次数','网络发起的RRC连接建立成功次数',
'网络发起的RRC连接失败次数','网络发起的RRC建立成功率_百分比','RRC连接建立成功率_百分比','RRC连接重建请求次数','RRC连接重建成功次数',
'RRC连接重建成功率_百分比','RRC连接建立失败次数_UE无应答','RRC连接建立失败次数_小区Reject','RRC连接建立失败次数_其它原因',
'E_RAB建立请求次数','E_RAB建立成功次数','E_RAB建立成功率_百分比','无线连接成功率_百分比','E_RAB建立失败次数_UE无响应',
'E_RAB建立失败次数_核心网问题','E_RAB建立失败次数_传输层问题','E_RAB建立失败次数_无线层问题','E_RAB建立失败次数_无线资源不足',
'E_RAB建立失败次数_安全模式配置失败','E_RAB建立失败次数_其它原因','E_RAB异常释放次数','E_RAB正常释放次数',
'E_RAB掉线率_百分比','E_RAB异常释放次数_核心网问题','E_RAB异常释放次数_传输层问题','E_RAB异常释放次数_网络拥塞',
'E_RAB异常释放次数_切换失败','S1信令连接建立尝试次数','S1信令连接建立成功次数','S1信令连接建立成功率_百分比',
'eNodeB内切换请求次数','eNodeB内切换成功次数','系统内切换成功率_百分比','eNodeB内切换成功率_百分比','eNodeB间切换成功率_百分比',
'X2接口切换请求次数','X2接口切换成功次数','X2接口切换成功率_百分比','S1接口切换请求次数','S1接口切换成功次数',
'S1接口切换成功率_百分比','UE上下文异常释放次数','UE上下文正常释放次数','UE上下文掉线率_百分比','同频切换请求次数',
'同频切换成功次数','同频切换成功率_百分比','异频切换请求次数','异频切换成功次数','异频切换成功率_百分比','RSSI平均值_dBm',
'RSSI最大值_dBm','RSSI最小值_dBm','平均每PRB干扰噪声平均值_dBm','信道干扰噪声_dBm','下行双流比_分子','下行双流比_不含单发送天线_百分比',
'CQI质差比例','CQI0_4次数','LTE重定向到3G的次数','4G重定向3G比例','MR总数','第二强邻区MR重叠覆盖数',
'精确覆盖率','经度','纬度','参考信号功率','小区发射功率']
//查询3G参数值 
exports.getThird=function(type,timeFrom,timeEnd,condition,screening,db,res,min,max,name){
  //根据用户输入的3G查找值（可能不准确），查询数据库中mysql标准键的值
  
  var newCondition=getThirdDim(condition);
  //存储查询出来的信息
  var rowsContent=[];
  //获取按时间段查询的查询连续天数如timelength=20150810-20150803+1=8天
  var timeLength=parseInt(timeEnd.slice(0))-parseInt(timeFrom.slice(0))+1;
      if(type=="模糊查找"){
        //根据查询的值，和分公司名称，返回一个可以进行模糊匹配的数组（查询条件）
        var queryEle=getDimEle(screening,name);
        console.log('queryEle',queryEle);
        //遍历在查询时间段范围内的所有表
        for(var i=0;i<timeLength;i++){
        //返回需要查询的表的名称                    
          var tableName=getThirdName(timeFrom,i).toString();
          console.log('tableName',tableName);
          if(name){
            //如果查询的值中包含分公司名称，查询语句为：查找出起始时间，小区号，查询的值从表的名称中，条件是查询值为？并且分公司为？
            var query='SELECT 开始时间,小区号,扇区掉话,扇区呼建失败,'+newCondition[0]+' FROM '+tableName+' WHERE '+newCondition[0]+' LIKE? AND 分公司 LIKE ?';
            console.log('query',query);
          }else{
            //如果查询的值中不包含分公司名称，查询语句为：查找出起始时间，小区号，查询的值从表的名称中，条件是查询值为？
            var query='SELECT 开始时间,小区号,扇区掉话,扇区呼建失败,'+newCondition[0]+' FROM '+tableName+' WHERE '+newCondition[0]+' LIKE? ';
            console.log('query',query);
          }          
          console.log('query',query);
          //根据查询语句和查询值从数据库中返回所需信息，放在rowsContent数组中
          getContent(query,queryEle,db,rowsContent,res);
        }
        setTimeout(function(){
          showResult(condition,rowsContent,res);
        },1000)
      }else{
        //按照查询的指标值的范围进行查找
        //返回查询条件中的最小值，最大值，分公司名称
        var queryEle=getRangeEle(min,max,name);
        for(var i=0;i<timeLength;i++){    
          //获取表的名称                
          var tableName=getThirdName(timeFrom,i);
          if(name){
            //如果查询的值中包含分公司名称，查询语句为：查找出起始时间，小区号，查询的指标从表的名称中，条件是查询指标范围为（？，？）？并且分公司为？
            var query='SELECT 开始时间,小区号,扇区掉话,扇区呼建失败,'+newCondition[0]+' FROM '+tableName+' WHERE ('+newCondition[0]+' BETWEEN ? AND ?) AND 分公司 LIKE ? ';
          }else{
            var query='SELECT 开始时间,小区号,扇区掉话,扇区呼建失败,'+newCondition[0]+' FROM '+tableName+' WHERE ('+newCondition[0]+' BETWEEN ? AND ?) ';
          }          
          console.log('query',query);
          getContent(query,queryEle,db,rowsContent,res);
        }
        //1s后将查询结果渲染在页面上
        setTimeout(function(){
          showResult(condition,rowsContent,res);
        },1000)
    }
}
//查询4G参数值
exports.getVender=function(type,timeFrom,timeEnd,condition,screening,db,res,min,max,name){
  //获取按时间段查询的查询连续天数如timelength=20150810-20150803+1=8天
  var timeLength=timeEnd.slice(0)-timeFrom.slice(0)+1;  
  //放置查询结果
  var rowsContent=[];
  var newCondition=get_4G_Dim(condition);
    //根据查询的指标名称（可能不准确），返回4G指标数组中的标准数据库表的键的名称  
      if(type=="模糊查找"){
        //根据查询的值，和分公司名称，返回一个可以进行模糊匹配的数组
        var queryEle=getDimEle(screening,name);
        console.log(type,timeFrom,timeEnd,condition,screening);        
        console.log('newCondition',newCondition);        
        console.log('timelength',timeLength);   
        //根据查询的值，和分公司名称，返回一个可以进行模糊匹配的数组             
        console.log('queryEle',queryEle);
        //遍历在查询时间段范围内的所有表
        for(var i=0;i<timeLength;i++){    
        //获取4G数据库中表的名称
          //查询值中包括基站名，不包含分公司名，则显示全网此基站的信息
          if(newCondition[0]=='eNodeBName' && name!=''){
            var tableName=get_4G_Name(timeFrom,i);
            var query='SELECT * FROM '+tableName+' WHERE '+newCondition[0]+' LIKE? AND 分公司 LIKE ?';            
            console.log('query',query);
            getContent(query,queryEle,db,rowsContent,res);
          }
          //查询值中包括基站名，包含分公司名，则显示此分公司内此基站的信息
          else if(newCondition[0]=='eNodeBName' && name==''){          
            var tableName=get_4G_Name(timeFrom,i);
            var query='SELECT * FROM '+tableName+' WHERE '+newCondition[0]+' LIKE? ';            
            console.log('query',query);
            getContent(query,queryEle,db,rowsContent,res);
          }
          //查询值中不包括基站名，包含分公司名，则显示此分公司内包含此指标数值的基站信息
          else if(newCondition[0]!='eNodeBName' && name!=''){          
            var tableName=get_4G_Name(timeFrom,i)
            var query='SELECT 日期,eNodeBName,小区编号,覆盖类型,RRC连接建立成功率_百分比,E_RAB掉线率_百分比,RSSI平均值_dBm,'
                    +'平均每PRB干扰噪声平均值_dBm,下行双流比_不含单发送天线_百分比,'
                    +newCondition[0]+' FROM '+tableName+' WHERE '+newCondition[0]+' LIKE? AND 分公司 LIKE ?';
            console.log('query',query);
            getContent(query,queryEle,db,rowsContent,res);
          } 
          //查询值中不包括基站名，不包含分公司名，则显示全网包含此指标数值的基站信息                    
          else{
            var tableName=get_4G_Name(timeFrom,i)
            var query='SELECT 日期,eNodeBName,小区编号,覆盖类型,RRC连接建立成功率_百分比,E_RAB掉线率_百分比,RSSI平均值_dBm,'
                    +'平均每PRB干扰噪声平均值_dBm,下行双流比_不含单发送天线_百分比,'
                    +newCondition[0]+' FROM '+tableName+' WHERE '+newCondition[0]+' LIKE? ';
            console.log('query',query);
            getContent(query,queryEle,db,rowsContent,res);
          }             
        }
        setTimeout(function(){
          showResult(condition,rowsContent,res);
        },1000)
      
      }else{
        //指标按照范围查找
        var queryEle=getRangeEle(min,max,name);
        console.log(queryEle,'queryEle');
        for(var i=0;i<timeLength;i++){
          if(name==''){
            var tableName=get_4G_Name(timeFrom,i)
            var query='SELECT 日期,eNodeBName,小区编号,'+newCondition[0]+' FROM '+tableName+' WHERE '+newCondition[0]+' BETWEEN  ? AND ?';
            console.log('query',query);
            getContent(query,queryEle,db,rowsContent,res);
          }else{
            var tableName=get_4G_Name(timeFrom,i)
            var query='SELECT 日期,eNodeBName,小区编号,'+newCondition[0]+' FROM '+tableName+' WHERE ('+newCondition[0]+' BETWEEN ? AND ?) AND 分公司 LIKE ?';            
            console.log('query',query);
            getContent(query,queryEle,db,rowsContent,res);
          }          
          
        }
        setTimeout(function(){
          showResult(condition,rowsContent,res);
        },1000)

      }
}

//搜索3G基站指标
exports.get_3G_station=function(timeFrom,timeEnd,condition,db,res){
  var timeLength=parseInt(timeEnd.slice(0))-parseInt(timeFrom.slice(0))+1;
  var queryEle=['%'+condition+'%'];
  var rowsContent=[];
  for(var i=0;i<timeLength;i++){
    var tableName=getThirdName(timeFrom,i).toString();
    var query='SELECT * FROM '+tableName+' WHERE 小区号 LIKE? ';
    getContent(query,queryEle,db,rowsContent,res);
  }
  setTimeout(function(){
    showResult(condition,rowsContent,res);
  },1000)
}

//搜索4G基站指标
exports.get_4G_station=function(timeFrom,timeEnd,condition,db,res){
  var timeLength=parseInt(timeEnd.slice(0))-parseInt(timeFrom.slice(0))+1;
  var queryEle=['%'+condition+'%'];
  var rowsContent=[];
  for(var i=0;i<timeLength;i++){
    var tableName=get_4G_Name(timeFrom,i);
    var query='SELECT * FROM '+tableName+' WHERE eNodeBName LIKE? ';
    getContent(query,queryEle,db,rowsContent,res);
  }
  setTimeout(function(){
    showResult(condition,rowsContent,res);
  },1000)
}
//根据查询的值，和分公司名称，返回一个可以进行模糊匹配的数组
function getDimEle(screening,name){
  //var newScreening='%'+screening+'%';//模糊匹配值
  var name=name||'';
  var queryEle=[screening+'%',name];//匹配小数点后几位，如原来1.00不匹配1.0,现在可匹配
  console.log(queryEle);
  return queryEle;
}

//返回查询条件中的最小值，最大值，分公司名称
function getRangeEle(min,max,name){
  name=name||'';
  //min=parseFloat(min).toFixed(3)
  //max=parseFloat(max).toFixed(3)
  console.log(min,max,name,'min,max,name');
  return [min,max,name];
}
//根据查询语句和查询值从数据库中返回所需信息，放在rowsContent数组中
function getContent(query,queryEle,db,rowsContent,res){
      db.query(query,queryEle,function(err,rows){
          if(err){           
            console.log(err);
           }
           //console.log('rows',rows);
          try{
              for(var i=0;i<rows.length;i++){
              rowsContent.push(rows[i]);
             } 
          }
          catch(err){
            return res.redirect('/notFound');
          }        
           //console.log('数据库信息',rowsContent);                     
         });
      //console.log('数据库信息2',rowsContent);     
}
//根据查询的指标名称（可能不准确），返回4G指标数组中的标准数据库表的键的名称
function get_4G_Dim(element){
  var tmp=Fourth.filter(function(item,index,array){
            var pattern=new RegExp('^.*'+element+'.*$','i');
            return (pattern.test(item));
         })
  return tmp;
}

//根据输入的element的模糊名称，返回在3G指标数组中的标准名称
function getThirdDim(element){
  var tmp=Third.filter(function(item,index,array){
            var pattern=new RegExp('^.*'+element+'.*$','i');
            return (pattern.test(item));
         })
  return tmp;
}
//获取4G数据库中表的名称
function get_4G_Name(prev,i){
  var newPrev=parseInt(prev)+i;
  return '4G_'+newPrev;
}

//将查询结果渲染在页面上
function showResult(condition,rowsContent,res){
  console.log('rowsContent[0]',rowsContent[0]);
  if(rowsContent[0]!=null){
           res.render('searchContent',{
             title:'Search for '+condition,//查询值
             content:rowsContent//查询结果
            })
       }else{
           res.redirect('/notFound');//如果未查询到跳转至notFound页面
       }      
}
//返回需要查询的表的名称如3G_20150709
function getThirdName(prev,i){
  var newPrev='3G_'+parseInt(parseInt(prev)+i);
  console.log(newPrev)
  return newPrev;
}

