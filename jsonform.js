/*!
 * jsonform.js: for jQuery JsonForm Plugin 0.0.1
 * Create standard JSON from Forms with jQuery.
 * Requires jquery.js 
 * https://github.com/milfont/jsonform
 *
 * Copyright Milfont Consulting.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function ($) {
	
  $.fn.extend({
    jsonform: function (json, callback) {
    	
    	var __json = {}, 
    	    __form = this, 
    	    __callback = function(json) { __json = json; };
    	    
    	var __populate = function(json) {
        (function roam(el, father){
          for(var property in el) {
            var value = el[property];
            if( typeof value == "object") {
            	var parent = (!father)? property : father + "\\." + property;
              if($.isArray(value)) {
              	for(var item in value) {
              		parent_arr = parent + "\\["+item+"\\]";
              		roam(value[item], parent_arr);
              	}
              } else {
	              roam(value, parent);
              }
              parent = null;
            } else {
            	var query = (father)? "#"+father+"\\."+property : "#"+property;
            	__form.find(query).val(value);
            }
          }
        })(json)
        return this;
      };

      var buildJson = function(id, valor) {
        var hierarchy = id.split(".");
        var json = {};
        for(var index = hierarchy.length; index > 0; index--) {
          var temp = {};
          var name = hierarchy[index-1];
          if(name == hierarchy[hierarchy.length-1]) {
            temp[name] = valor;
          } else {
          	
          	var arrayIndex = name.search(/\[(\d+)\]/);
            if(arrayIndex > -1) {
              var arrayName = name.substring(0,  arrayIndex);
              var position = name.substring(arrayIndex+1, name.indexOf("]"));
              var arr = temp[arrayName] = [];
              for(var i = 0; i < position; i++) { arr[i] = {}; }
              arr[position] = json;
            } else {
            	temp[name] = json;
            }
            
          }
          json = temp;
        }
        
        return json;
      };
  
      var merge = (function merge(merged, source) {
        for(var property in source) {
          if(typeof source[property] === 'object' && 
                typeof merged[property] !== "undefined") {
        	  merge(merged[property], source[property]);
          } else {
            merged[property] = source[property];
          }
        }
      });
          
      var __getJSON = function() {
        var json = {};
        __form.find("input,textarea,select").each(function(index, item){
          merge(json, buildJson(item.id, item.value));
        });
        return json;
      };
    	
      if(typeof json === "function") {
      	__callback = json; json = null;
    	} else { 
    	  __json = json;
    	}
      if(typeof json === "object" && typeof callback === "function") {
      	__callback = callback;
      }
      
      __populate(__json);
      __callback(__getJSON());
      
      return this;
    }
  });
  
})(jQuery);