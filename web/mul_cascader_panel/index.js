;(function (layui, window, factory) {
  if (typeof exports === 'object') {

    module.exports = factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {

    define(['jquery'], factory);
  }else if (window.layui && layui.define) {
		//layui加载
		layui.define(function (exports) {
			exports('MulCascaderPanel', factory());
		});
	} else {

    window.MulCascaderPanel = factory();
  }
})(typeof layui == 'undefined' ? null : layui, window, function () {

  function ajax(opts){
    //实例化XMLHttpRequest，如果兼容ie7-需要加 ActiveXObject判断
    var createXHR = function(){
        if(typeof XMLHttpRequest != 'undefined'){ // ie7 +
            return new XMLHttpRequest();
        }else if(typeof ActiveXObject != 'undefined'){ // ie7 -
            var versions = [
                'MSXML2.XMLHTTP.6.0',
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP'
            ]

            for(var verson of versons){
                try{
                    new ActiveXObject(verson);
                    arguments.callee.activeXString = verson;
                    break;

                }catch{ /* 跳过 */ }
            };

            return new ActiveXObject(arguments.callee.activeXString);
        }else{
            throw new Error('没有可用的XHR对象');
        };
    };

    // 字符串编码
    var addURLParam = function(data){
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        };
        return query.join('&');
    };

    var xhr = createXHR();

    //onreadystate事件
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
                // 请求成功,获取响应数据
                opts.success && opts.success(JSON.parse(xhr.responseText));
            }else{
                // 请求失败
                opts.error && opts.error(xhr);
            };
        };
    };
    xhr.open(opts.type, opts.url, true);
    if(opts.type == 'POST'){
        var query = addURLParam(opts.data);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(query);
    }else{
        xhr.send(null);
    };
  };


  if (!Array.prototype.filter){
    Array.prototype.filter = function(func, thisArg) {
      'use strict';
      if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
          throw new TypeError();
     
      var len = this.length >>> 0,
          res = new Array(len), // preallocate array
          t = this, c = 0, i = -1;
      if (thisArg === undefined){
        while (++i !== len){
          // checks to see if the key was set
          if (i in this){
            if (func(t[i], i, t)){
              res[c++] = t[i];
            }
          }
        }
      }
      else{
        while (++i !== len){
          // checks to see if the key was set
          if (i in this){
            if (func.call(thisArg, t[i], i, t)){
              res[c++] = t[i];
            }
          }
        }
      }
     
      res.length = c; // shrink down array to proper size
      return res;
    };
  }

  Object.assign && Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (target, firstSource) {
      "use strict";
      if (target === undefined || target === null)
        throw new TypeError("Cannot convert first argument to object");
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) continue;
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
        }
      }
      return to;
    }
  });

  if (!Object.keys) {
    Object.keys = (function () {
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;
  
      return function (obj) {
        if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
  
        var result = [];
  
        for (var prop in obj) {
          if (hasOwnProperty.call(obj, prop)) result.push(prop);
        }
  
        if (hasDontEnumBug) {
          for (var i=0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
          }
        }
        return result;
      }
    })()
  };

  function MulCascaderPanel(params){
    this.config = Object.assign({
      // li模块  
      tplItem: '<li data-haschild="{{haschild}}" data-index="{{index}}">' +
                '<input type="checkbox" value="{{value}}" id="j_input_{{value}}" {{checked}}/>' +
                '<span>{{label}}</span>' +
                '<i class="arrow icon-arr-bd icon-arr-r {{hide}}"></i>' + 
              '</li>',
      intf: 'http://192.168.3.24:7300/mock/5d883f0f6805113020730b50/api/level', // 接口名
      wrap: 'mulCascaderPanel', // 外层
      selected: [], // 选中数据
      header: [], // 标题数据
      value: 'value', // value 键名
      label: 'label', // label 键名
      level: 'level', // level 键名
      haschild: 'haschild', // level 键名
      data: [], // 存放数据
    }, params);

    this.init();

    return this;
  }

  MulCascaderPanel.prototype = {
    // 初始化
    init(){
      this.config.obj = this.getId(this.config.wrap)
      this.render() 
      this.bind()     
      this.getSelected()
    },
    
    getId(id) {
      return Object.prototype.toString.call(id) === "[object Object]" ? id : document.getElementById(id)
    },

    qs(ele, parent) {
      var d = parent || document;
      return ele ? d.querySelector(ele) : null
    },

    qsAll(ele, parent) {
      var d = parent || document;
      return ele ? d.querySelectorAll(ele) : null
    },

    hasCls(el, cls) {
      return el.classList && el.classList.contains(cls) || !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },
    
    addCls(el, cls) {
      el.classList ? el.classList.add(cls) : !hasCls(el, cls) && (el.className += (!el.className ? '' : ' ') + cls);
    },
    
    rmCls(el, cls) {
      el.classList ? el.classList.remove(cls) : hasCls(el, cls) && (el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ''));
    },   
    
    objDeepCopy(source) {
      var sourceCopy = source instanceof Array ? [] : {};
      for (var item in source) {
          sourceCopy[item] = typeof source[item] === 'object' ? this.objDeepCopy(source[item]) : source[item];
      }
      return sourceCopy;
    },

    // 获取数据
    getData(value, callback){
      ajax({
        url: this.config.intf,
        type: 'GET',
        data: {
          value: value
        },
        success(res){
          callback && callback(res.data)
        }
      })
    },

    // 改变选中状态
    setChecked(data, checked){
      for(var i = 0 ; i < data.length; i++){
        data[i].checked = checked;
      }
      return data
    },

    // 渲染数据
    render(params){      
      var self = this;
      params = params || {};
      var value = params.value;
      var index = params.index;
      var checked = params.checked;
      var haschild = params.haschild || '0';
      var level = value ? params.level : '0';
      var index = params.index ? params.index : '0';

      if(this.config.data[level] && this.config.data[level][value]){
        // 数据已经加载
        var data = this.config.data[level][value]
        if(checked != undefined) data = this.setChecked(data, checked)

        self.renderHtml(data, {
          value: value, 
          level: level, 
          index: index,
          haschild: haschild
        })
      }else {
        // 数据初次加载
        this.getData(value || '', function(data){ 
          if(checked != undefined) data = self.setChecked(data, checked);

          self.renderHtml(data, {
            value: value, 
            level: level, 
            index: index,
            haschild: haschild
          })
        })
      } 
    },

    // 创建外层item
    createHtml(params){
      var pid = params.pid; // 父级value
      var pindex = params.pindex; // 父级索引
      var level = params.level; // 第几层
      var item = params.item; // li结构
      var div = document.createElement('div');

      div.className = 'mul-cascader-panel__item mul-cascader-panel__item' + level;
      div.setAttribute('data-pid', pid);
      div.setAttribute('data-pindex', pindex);
      div.setAttribute('data-level', level);
      div.innerHTML = '<ul>' + item + '</ul>';
      return div;
    },

    /**
     * 渲染html
     * @param { Array } data 数据    
     * @param { Object } params 其余参数，方便后期扩展
     */
    renderHtml(data, params){      
      var self = this;
      var value = params.value; // 值
      var level = params.level; // 第几层
      var index = params.index; // 索引      
      var haschild = params.haschild; // 索引      
      var getLevelDiv = this.getLevelDiv(level); // 获取外层DOM
      var pid = value ? value : '0';  
      var str = '';

      for(var i =0 ; i < data.length; i++){
        var hideCls = data[i][self.config.haschild] == 1 ? '' : 'hide';

        str += self.config.tplItem.replace(/{{label}}/g, data[i][self.config.label])
                              .replace(/{{value}}/g, data[i][self.config.value])
                              .replace(/{{haschild}}/g, data[i][self.config.haschild])
                              .replace(/{{index}}/g, i)
                              .replace(/{{checked}}/g, data[i].checked ? 'checked' : '')
                              .replace(/{{hide}}/g, hideCls);
      }

      if(getLevelDiv){
        // 存在该层则覆盖
        var ul = self.qs('ul', getLevelDiv);
        getLevelDiv.setAttribute('data-pid', pid);
        getLevelDiv.setAttribute('data-pindex', index);        
        ul.innerHTML = str;
        if(haschild) this.rmCls(getLevelDiv, 'hide');
      }else {
        // 不存在该层则叠加
        var itemWrap = self.createHtml({
          level: level,
          pid: pid,
          pindex: index,
          item: str,
        });

        self.config.obj.appendChild(itemWrap)
      }

      // 存储数据
      if(!this.config.data[level] || !this.config.data[level][value ? value : 0]){
        this.config.data[level] = this.config.data[level] || [];
        for(var i = 0; i < data.length; i++){
          data[i].parentid = pid;
        }
        this.config.data[level][value ? value : 0] = this.objDeepCopy(data);
      }
      
      console.log('已加载存储数据', this.config.data)
    },
    
    getLevelDiv(level){
      var item = this.qsAll('.mul-cascader-panel__item', this.config.obj);
      var elem = null;

      for(var i = 0; i < item.length; i++){
        var itemLevel = item[i].getAttribute('data-' + this.config.level)
        if(itemLevel == level){
          elem = item[i]
          break;
        }
      }
      return elem;
    },

    // 事件代理
    bind(){
      var self = this;
      this.config.obj.addEventListener('click', function(e){
        var target = e.target;
        var nodeName = target.nodeName.toUpperCase();

        switch (nodeName) {
          case 'SPAN':
            // 展开下一级
            self.renderNext(target)

            break;

          case 'INPUT':
            // 选中
            self.checked(target)
            break;
        
          default:
            break;
        }

        self.getSelected()
      })
    },

    // 隐藏多余的层
    hideOtherLevel(level, haschild){
      var items = this.qsAll('.mul-cascader-panel__item', this.config.obj)
      if(items.length > 0){
        var index = parseInt(level) + 1;
        for(var i = index; i < items.length; i++){
          this.addCls(items[i], 'hide');
        }
      }
    },

    // 渲染下一级
    renderNext(target){
      var li = target.parentNode;
      var ul = li.parentNode;
      var index = li.getAttribute('data-index');
      var item = ul.parentNode;
      var level = item.getAttribute('data-' + this.config.level);
      var value = this.qs('input', li).value;
      var checked = this.qs('input', li).checked;
      var haschild = li.getAttribute('data-' + this.config.haschild);

      this.hideOtherLevel(level, haschild);

      if(haschild == 1){
        // 有子级，展示下一级
        this.render({
          value: value, 
          level: parseInt(level) + 1, 
          index: index,
          checked: checked,
          haschild: haschild
        });
      }
    },

    // 单选绑定
    checked(target){
      var li = target.parentNode
      var ul = li.parentNode;
      var item = ul.parentNode;
      var level = item.getAttribute('data-' + this.config.level);
      var value = this.qs('input', li).value;
      var haschild = li.getAttribute('data-' + this.config.haschild);
      var index = li.getAttribute('data-index');
      var isChecked = target.checked;
      var pid = level == 0 ? '0' : item.getAttribute('data-pid');
      var span = this.qs('span', li);
      var pindex = level == 0 ? '0' : item.getAttribute('data-pindex');
      // console.log(pindex)

      switch (isChecked) {
        case true: // 选中
          this.checkedData({
            value: value,            
            index: index,
            level: level,
            pid: pid,
            pindex: pindex,
            item: item
          });
          break;
      
        default: // 取消选中
          this.unCheckedData({
            value: value,
            pid: pid,
            level: level,
            pindex: pindex,
            item: item
          });
          break;
      }

      // 取消 or 选中
      span.click();
      
      console.log("选中数据", this.config.selected);
    },

    checkedDeepSelect(params){
      var level = params.level; // 选中的第几层
      var pid = params.pid; // 父层value
      var value = params.value; // 当前value
      var wrap = params.wrap; // 当前面板DOM
      var index = params.index; // 当前面索引
      var inputObj = this.qsAll('input', wrap);
      var inputLen = inputObj.length;
      var checkedNum = 0;
      

      for(var i = 0; i < inputLen; i++){
        if(inputObj[i].checked) checkedNum++;
      }

      switch (level) {
        case 0:
          delete this.config.selected[value].child;
          break;
      
        default:
          if(checkedNum == inputLen){
            delete this.config.selected[pid].child;
          }else {
            this.config.selected[pid].child = this.config.selected[pid].child || []
            this.config.selected[pid].child.push(this.objDeepCopy(this.config.data[level][pid][index]))
          }
          break;
      }

    },

    // 存储选中数据(待完善，需要关联子级和父级....)
    checkedData(params){
      var value = params.value;
      var index = params.index;
      var pid = params.pid;
      var level = params.level;
      var item = params.item;
      var pindex = params.pindex;

      this.config.data[level][pid][index].checked = true;
      // this.config.data[level][pid][index].parentid = pid;

      this.config.selected[value] = this.objDeepCopy(this.config.data[level][pid][index]);

      while(level > 0){
        // 更新DOM显示
        item = this.qs('.mul-cascader-panel__item' + level);
        var prevItem = this.qs('.mul-cascader-panel__item' + (level - 1))
        var prevPIndex = prevItem.getAttribute('data-pindex');
        var prevPId = prevItem.getAttribute('data-pid');
        var input = this.getId('j_input_'+ pid, item);
        
        pid = item.getAttribute('data-pid');
        var inputAll = this.qsAll('input', item);
        
        var inputLen = inputAll.length;
        var checkedNum = 0;
        for(var i = 0; i < inputLen; i++){
          if(inputAll[i].checked) checkedNum ++;

          if(checkedNum == inputLen) {
            // 去掉父级下的元素并选中input
            input.checked = true;            
            console.log(this.config.selected)
            
            this.config.selected = this.config.selected.filter(function(obj){
              console.log(obj, pid)
              return obj.parentid != pid
            });

            this.config.selected[pid] = this.objDeepCopy(this.config.data[level - 1][prevPId][pindex]);
            
          }
        }
        level --;
      }
    },

    // 删除对应选中数据(待完善，取消选中关联父子级)
    unCheckedData(params){
      var value = params.value;
      var pid = params.pid;
      var level = params.level;
      var pindex = params.pindex;

      delete this.config.selected[value];
      
      while(level >= 0){
        // 更新DOM显示
        var item = this.qs('.mul-cascader-panel__item' + level);
        var input = this.getId('j_input_'+ pid, item);
        input.checked = false;
        pid = item.getAttribute('data-pid');
        var inputAll = this.qsAll('input', item);    

        // 从selected中找到parentid 并删掉selectedkey=parentid的数据
        if(this.config.selected[pid]) delete this.config.selected[pid];

        // 添加其余选中项到selected
        for(var i = 0; i < inputAll.length; i++){
          if(inputAll[i].checked){
            var arr = this.objDeepCopy(this.config.data[level][pid]);
            arr = arr.filter(function(obj){
              return obj.value == inputAll[i].value
            })
            this.config.selected[inputAll[i].value] = arr[0];
          }
        }
        level --;
      }
    },

    // 渲染已选择数据结构
    renderSelectedHtml(){
      var selected = this.config.selected;
      var str = ''
      var selectedWrap = this.getId('mulCascaderPanelSelected')

      for(var obj in selected){
        var item = selected[obj];
        str += '<li data-value="'+ item.value +'">'+ item.label +' <span>删除</span></li>'
      }

      selectedWrap.innerHTML =  str;

    },

    // 处理数据逻辑
    getSelected(){
      var JgetData = this.getId('JgetData');
      var showSelected = this.getId('showSelected');
      var self = this
      var str = '';
      var selected = this.config.selected;

      for(var obj in this.config.selected){
        str += `<div>${obj}: ${JSON.stringify(selected[obj])}</div>`;
      }
      showSelected.innerHTML = str;
      self.renderSelectedHtml();
    }
  };

  return MulCascaderPanel;
})

