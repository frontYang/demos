;(function (window, factory) {
  if (typeof exports === 'object') {

    module.exports = factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {

    define(['jquery'], factory);
  } else {

    window.timeTable = factory(window.jQuery);
  }
})(this, function ($) {

  var box_id;
  var StartTD = null;
  var StartIndex = null;
  var EndTD = null;
  var EndIndex = null;
  var Selected = 'Selected';
  var Start_x = null;
  var Start_y = null;
  //点击中表格的小时值
  var hour;   
  //点击选中的星期值
  var week;   
  //1为这个格子在此次鼠标拖拽过程中被选中（不执行选中方法），0为没选中过
  var td_state = 0;   
  //生成星期数组
  var num = ['一','二','三','四','五','六','日'];
  //生成时间值数组
  var arr_hour = get_hour_arr();


  //按下鼠标左键拖动选中单元格
  function SelectTD(StartIndex, EndIndex,Selected) {
    var MinX = null;
    var MaxX = null;
    var MinY = null;
    var MaxY = null;

    var coordinate = get_coordinate(StartIndex, EndIndex);
    MinX = coordinate[0];
    MaxX = coordinate[1];
    MinY = coordinate[2];
    MaxY = coordinate[3];

    for (var i = MinY; i <= MaxY; i++) {
      for (var j = MinX; j <= MaxX; j++) {
        var SelectTR = $('#' + box_id + ' table tbody tr ').eq(i);
        var td_class = $("td", SelectTR).eq(j).attr('class');
        td_state = $("td", SelectTR).eq(j).attr("td_state");

        //在同一次鼠标按下的过程中，选中过的表格不进行选中或取消操作
        if (!td_state) {
          if (td_class == Selected) $("td", SelectTR).eq(j).removeClass(Selected);

          //筛选掉标明为星期的表格
          else $("td", SelectTR).eq(j).attr("class", Selected);

          $("td", SelectTR).eq(j).attr("td_state", '1');
        }

      }
    }

    //改变二进制值
    get_time_val();
    //改变日期显示
    convert_date();
  }

  //点击选中或去掉选中整行、整列
  function SelectTD_click(StartIndex, EndIndex,Selected) {
    var MinX = null;
    var MaxX = null;
    var MinY = null;
    var MaxY = null;
    var Selected_true = 0;
    var Selected_false = 0;

    var coordinate = get_coordinate(StartIndex, EndIndex);
    MinX = coordinate[0];
    MaxX = coordinate[1];
    MinY = coordinate[2];
    MaxY = coordinate[3];

    //列出此列当中的表格选中状态
    for (var i = MinY; i <= MaxY; i++) {
      for (var j = MinX; j <= MaxX; j++) {
        var SelectTR = $('#' + box_id + ' table tbody tr ').eq(i);
        var td_class = $("td", SelectTR).eq(j).attr('class');

        //表格里存在已选中的元素
        if (td_class == Selected) Selected_true = 1;

        //表格里存在未选中的元素
        else Selected_false = 1;
      }
    }

    //执行选中或去掉选中方法
    for (var i = MinY; i <= MaxY; i++) {
      for (var j = MinX; j <= MaxX; j++) {
        var SelectTR = $('#' + box_id + ' table tbody tr ').eq(i);
        var td_class = $("td", SelectTR).eq(j).attr('class');

        //一列当中存在已选中与未选中的表格处理:整列全部选中
        if (Selected_true == 1 && Selected_false == 1)  $("td", SelectTR).eq(j).attr("class", Selected);

        //一列当中只存在未选中的表格处理:整列全部选中    
        else if(Selected_false == 1) $("td", SelectTR).eq(j).attr("class", Selected); 

        //一列当中只存在已选中的表格处理:整列全部去掉选中
        else $("td", SelectTR).eq(j).removeClass(Selected);
      }
    }

    //改变二进制值
    get_time_val();
    //改变日期显示
    convert_date();

  }

  //获取选中范围的开始与结束的坐标
  function get_coordinate(StartIndex, EndIndex){
    var MinX = null;
    var MaxX = null;
    var MinY = null;
    var MaxY = null;

    if (StartIndex.x < EndIndex.x) {
      MinX = StartIndex.x; 
      MaxX = EndIndex.x;
    }else {
      MinX = EndIndex.x; 
      MaxX = StartIndex.x;
    }
    if (StartIndex.y < EndIndex.y) {
      MinY = StartIndex.y; 
      MaxY = EndIndex.y;
    } else {
      MinY = EndIndex.y; 
      MaxY = StartIndex.y;
    }
    return [MinX, MaxX, MinY, MaxY];
  }

  //改变二进制值
  function get_time_val(){
    var time_type = '';

    $('#' + box_id + ' table tbody').find('td').each(function(k){
      var Selected_type = $(this).attr('class');
      var week = $(this).attr('week');
      time_type += (Selected_type == Selected && !week) ? '1' : '0'
    });

    $('#'+box_id+'_time_num').val(time_type);
  }

  //二进制数转换日期
  function convert_date(external_binary){
      //初始化周数数组
      var time_week_arr = [];
      if (!external_binary) {
          //内部调用，进行选中表格和输出时间操作。
          var binary = $('#'+box_id+'_time_num').val();
      }else{
          //存在外部参入传入，此函数进行返回时间操作。
          var date_html = '';
          var binary = external_binary;
      }

      for (var y = 0; y < 7; y++) {
        //初始化小时数组
        var time_hour_arr = [];

        for (var x = 0; x < 48; x++) {
          //获取当前点击元素的位置
          var index = (y == 0) ? x : ((y * 48) + x)
          
          //获取td对应的二进制值
          var Selected_val = binary.charAt(index);

          if (Selected_val ==1) {
            //组装保存进数组里
            if (time_hour_arr == []) {
              //表格的第一个位置的值
                time_hour_arr = arr_hour[x];
            }else if(binary.charAt(index-1) == 1 && binary.charAt(index-2) == 1 ){
              //此位置（包含上一行）的前两个都为选中时

              if (x==0 && binary.charAt(index+1) == 0) {
              //选中行里第一个，后一个表格没选中，加逗号
                  time_hour_arr[time_hour_arr.length] = arr_hour[x] + ', ';
              }else if(x==0 && binary.charAt(index+1) == 1){
              //选中行里第一个，后一个表格已选中，不加逗号
                  time_hour_arr[time_hour_arr.length] = arr_hour[x];
              }else if(x==1 && binary.charAt(index-1) == 0){
              //选中行里第二个，上一个表格没选中，加逗号
                  time_hour_arr[time_hour_arr.length] = arr_hour[x] +', ';
              }else if(x==1 && binary.charAt(index-1) == 1){
              //选中行里第二个，上一个表格已选中，前加-号，后加逗号
                  time_hour_arr[time_hour_arr.length] = '-' + arr_hour[x] +', ';
              }else{
              //选中行里除第一、二的表格以外，前一个表格已经选中，此元素前加- 后加逗号
                  time_hour_arr[time_hour_arr.length-1] = '-' + arr_hour[x] +', ';
              }
                
            }else if(binary.charAt(index-1) == 1 && x>0){
            //选中的前一个已选中，且此次选中的不是行里第一个，此次选中的元素前加-后加逗号
              time_hour_arr[time_hour_arr.length] = '-' + arr_hour[x] + ', ';
            }else if(binary.charAt(index+1) != 1 || x==47){
            //选中的后一个没选中，或者此次选中的是行里最后一个，此次选中的元素加逗号
              time_hour_arr[time_hour_arr.length] = arr_hour[x] + ', ';
            }else{
              //选中的后一已选中，此次选中的元素不加逗号
              time_hour_arr[time_hour_arr.length] = arr_hour[x] ;
            }
          } 
        }
        time_week_arr[y] = time_hour_arr;
      }
  
      if (!external_binary) $('#'+box_id+'_time_seled').html('');

      //再次组装并输出数组
      var time_html = [];
      for(var y = 0; y < 7; y++){
        for(var x = 0; x < time_week_arr[y].length; x++){
          if (!time_html[y]) {
              time_html[y] = time_week_arr[y][x];
          }else{
              time_html[y] += time_week_arr[y][x];
          }
        }

        if (time_html[y]) {
          time_html[y]=  time_html[y].substring(0,time_html[y].length-2);

          if (!external_binary) {
              $('#'+box_id+'_time_seled').append('<div>星期'+num [y] + ' (' +time_html[y] + ')' + '</div>');
          }else{
              date_html += '星期'+num [y] + ' (' +time_html[y] + ')' + ', ';
          }
        }
      }

      if (external_binary) return date_html;      
  }

  //生成时间值数组
  function get_hour_arr(){
      var arr_hour = [];
      var oDate = new Date("2016/07/01 00:00:00"); //实例一个时间对象；
      var oDate_hour = oDate.getHours();
      var oDate_minute = oDate.getMinutes();

      for(i = 0; i < 48; i ++){
          if(oDate_minute<10){
            var oDate_minute = "0"+oDate_minute;
          }
          if (i >=1) {
              oDate.setMinutes(oDate.getMinutes() + 30);
              oDate_hour = oDate.getHours();
              oDate_minute = oDate.getMinutes();
              if(oDate_minute<10){
                  var oDate_minute = "0"+oDate_minute;
              }
          }
          arr_hour[i] = oDate_hour + ':' + oDate_minute;
      }
      return arr_hour;
  }

  //更新操作
  function renewal(id){
      if (id) box_id = id;
      
      //解绑鼠标移动监听事件
      $('#' + box_id + ' table tbody tr td').unbind("mouseover"); 
      //初始化表格的在此次选中状态
      $('#' + box_id + ' table tbody tr td').attr("td_state", '');
      //改变二进制值
      get_time_val();
      //改变日期显示
      convert_date();
  }

  //二进制数赋值选中表格
  function binary_selected(){
      var default_time_val = $('#'+box_id+' .default_time_val').val();
      if (default_time_val) {
          for(i=0 ; i<336; i++){
              var td_selected = default_time_val.charAt(i);
              if (td_selected != 0 ) {
                  $('#' + box_id + ' table tbody tr td').eq(i).attr('class','Selected');
                  //更新操作，显示文字形日期
                  renewal();
              }
                  
          }
      }
  }


  //实例化程序
  function load_time_table(id){
      //包住table的元素id
      box_id = id;
      var html;
      html = '<table cellspacing="0" cellpadding="0" border="0" class="plug-timer-grid"  onselectstart="return false" onselect="document.selection.empty()">';
      html += '<thead>';
      html += '<tr>';
      html += '<th></th>';
      html += '<th colSpan="24">上午</th>';
      html += '<th colSpan="24">下午</th>';
      html += '</tr>';
      html += '<tr class="hour">';
      html += '<th></th>';
      html += '</tr>';
      html += '</thead>';
      html += '<tbody></tbody>';
      html += '</table>';
      html += '<input class="focus" style="opacity: 0;">';
      html += '<div id="'+box_id+'_time_seled"></div>';
      html += '<input type="hidden" id="'+box_id+'_time_num" name="time" caption="每日投放时段" switchname="selectTime"  value="">';
      html += '<button class="btn clear">清除全部</button>';
      $('#'+box_id).append(html);

      var html_tbody_td = '';
      var html_thead_td = '';

      //创建表格
      for (var i = 0; i < 7; i++) {
          var week = i+1;
          html_tbody_td += '<tr>';
          for (var j = 0; j < 49; j++){ 
              if (j==0) {
                  html_tbody_td += '<th week="'+week+'">周' + num[i] +  '</th>';
              }else{
                  html_tbody_td += '<td>'  +  '</td>';
              }
          }
          html_tbody_td += '</tr>';
      }

      //创建表格小时栏目
      for(var i =0; i<= 23; i++){
          html_thead_td += '<td colSpan="2" hour="'+i+'">'+ i + '</td>';
      }
      $('#' + box_id + ' table thead .hour').append(html_thead_td);
      $('#' + box_id + ' table tbody').html(html_tbody_td);

      //检查是否有赋有二进制值，如有，将选中相应的表格
      binary_selected();

      //控制器，控制当前在哪个表格进行操作
      $('.plug-timer-grid').hover(function (e) {
          if(1 != e.which){    //判断是否为左击
              var id = $(this).parent().attr('id');
              box_id = id;
          }
      });

      //清除所有选中项
      $('.clear').click(function(){
          $(this).parent().find('td').removeClass(Selected);
          var id =$(this).parent().attr('id');
          renewal(id);
      });

      //点击小时选中或去掉整列处理块
      $('#' + box_id + ' table thead tr td').click(function(){
          hour = $(this).attr('hour');
          if (hour>=0) {
              var rows = $('#' + box_id + ' table tbody tr').length;
              Start_x = ($(this).index())*2-1;
              Start_y = 0;

              StartIndex = { x: Start_x, y: Start_y };

              EndTD = $(this);
              var x = ($(this).index())*2-2;
              var y = rows -1;    //为了配合for计算公式-1
              
              EndIndex = { x: x, y: y };
              //改变第一次按下鼠标时候的改变选中状态
              SelectTD_click(StartIndex, EndIndex, Selected); 
          }
      });

      //点击星期选中或去掉整行处理块
      $('#' + box_id + ' table tbody tr th').click(function(){
          var week = $(this).attr('week');
          if (week>=0) {
              var line = $('#' + box_id + ' table tbody tr td').length/$('#' + box_id + ' table tbody tr').length;

              Start_x = 0;
              Start_y = $(this).parent().index();

              StartIndex = { x: Start_x, y: Start_y };

              EndTD = $(this);
              var y = $(this).parent().index();
              var x = line-1;     //为了配合for计算公式-1
              
              EndIndex = { x: x, y: y };

              //改变第一次按下鼠标时候的改变选中状态
              SelectTD_click(StartIndex, EndIndex, Selected); 
          }
      });

      //监听鼠标按下事件(鼠标按下左键拖动选中处理块)
      $('#' + box_id + ' table tbody tr td').unbind("mousedown").bind("mousedown", function () {
          //记录刚开始点击的元素位置
          Start_x = $(this).index()-1;
          Start_y = $(this).parent().index();
          StartIndex = { x: Start_x, y: Start_y };

          EndTD = $(this);
          var x = $(this).index()-1;
          var y = $(this).parent().index();
          EndIndex = { x: x, y: y };
          //改变第一次按下鼠标时候的改变选中状态
          SelectTD(StartIndex, EndIndex, Selected); 
                  
          StartTD = $(this);

          StartIndex = { x: Start_x, y: Start_y };                    
          
          //监听鼠标移动事件，实现改变后续鼠标拖拽时候的表格选中状态
          $('#' + box_id + ' table tbody tr td').mouseover(function(e){
              EndTD = $(this);
              var x = $(this).index()-1;
              var y = $(this).parent().index();
              EndIndex = { x: x, y: y };
              if(1 != e.which){    //判断是否为左击
                  $('#' + box_id + ' table tbody tr td').unbind("mouseover"); 
              }
              //去除停留在td上的光标
              $('#' + box_id + ' .focus').focus();
              SelectTD(StartIndex, EndIndex, Selected); 
          });
          

          //放开鼠标左键时，初始化相关参数和解绑相关监听h
          $('html').unbind("mouseup").bind("mouseup", function () {
              renewal();
          });

      });

  }

    /*外部调用接口*/

    //解绑鼠标松开监听事件
    function unbundle_mouseover(){
        $('html').unbind("mouseup");
    }

    /*二进制获取转换后的时间*/
    function get_time_html(binary){
        return convert_date(binary);
    }

    return {
      init: load_time_table,
      unbundle_mouseover: unbundle_mouseover,
      get_time_html: get_time_html
    }
})


