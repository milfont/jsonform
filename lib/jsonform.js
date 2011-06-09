/*!
 * jsonform.js: for jQuery JsonForm Plugin 0.1.2
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
        /**
         *
         * @example
         * var lancamento = {
         *   empresa: {id: 2, name: "Teste"},
         *   partidas: [
         *     {conta: {codigo:"1.02.0002", nome: "Compras"}, natureza: "1"},
         *     {conta: {codigo:"1.02.0001", nome: "Banco"}, natureza: "-1"}
         *   ],
         *   description: "Teste",
         *   value: "125,67",
         *   date: "12/03/1999"
         * };
         * $('#form_id').jsonform(lancamento);
         *
         * @example
         * var callback = function(json) {
         *   //manipulate json data
         * };
         * $('#form_id').jsonform(callback);
         *
         * @example
         * var lancamento = {
         *   empresa: {id: 2, name: "Teste"},
         *   partidas: [
         *     {conta: {codigo:"1.02.0002", nome: "Compras"}, natureza: "1"},
         *     {conta: {codigo:"1.02.0001", nome: "Banco"}, natureza: "-1"}
         *   ],
         *   description: "Teste",
         *   value: "125,67",
         *   date: "12/03/1999"
         * };
         * var callback = function(json) {
         *   //manipulate json data
         * };
         * $('#form_id').jsonform(lancamento, callback);
         *
         * @desc Create standard JSON from Forms or populate form with jQuery.
         * Resolve nested objects.
         *
         * @name jsonform
         * @param Object json Standard JSON to populate FORM
         * @param Function callback to processing created JSON.
         * @return jQuery
         * @type jQuery
         * @cat Plugins/jsonform
         */
        jsonform: function (json, callback) {

            var _json = {},
            self = this,
            _callback = function(json) {
                _json = json;
            };

            if(typeof json === "function") {
                _callback = json;
                json = null;
            } else {
                _json = json;
            }
            if(typeof json === "object" && typeof callback === "function") {
                _callback = callback;
            }

            self.populate(_json);
            _callback(self.getJSON());

            return this;
        },
        getJSON: function(byName) {
            var json = {}, self = this;
            self.find("input,textarea,select").each( function(index, item) {
                if(byName) {
                    self.merge(json, self.buildJson(item.name, item.value));
                } else {
                    self.merge(json, self.buildJson(item.id, item.value));
                }
            });
            return json;
        },
        buildJson: function(id, valor) {
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
                        for(var i = 0; i < position; i++) {
                            arr[i] = {};
                        }
                        arr[position] = json;
                    } else {
                        temp[name] = json;
                    }
                }
                json = temp;
            }
            return json;
        },
        populate: function(json, byName) {
            var self = this;
            (function roam(el, father) {
                for(var property in el) {
                    if(el[property]) {
                        var value = el[property];
                        if( typeof value == "object") {
                            var parent = (!father)? property : father + "\\." + property;
                            if($.isArray(value)) {
                                for(var item in value) {
                                    if(value[item]) {
                                        parent_arr = parent + "\\["+item+"\\]";
                                        roam(value[item], parent_arr);
                                    }
                                }
                            } else {
                                roam(value, parent);
                            }
                            parent = null;
                        } else {
                            var query = (father)? "#"+father+"\\."+property : "#"+property;
                            if(byName) {query = query.replace("#", "[name='") + "']";}
                            self.find(query).val(value);
                        }
                    }
                }
            })(json);
            return this;
        },
        merge: (function merge(merged, source) {
            for(var property in source) {
                if(typeof source[property] === 'object' &&
                typeof merged[property] !== "undefined") {
                    merge(merged[property], source[property]);
                } else {
                    merged[property] = source[property];
                }
            }
            return merged;
        }),
        clone: function(source) {
            return this.merge({}, source);
        }
    });

})(jQuery);