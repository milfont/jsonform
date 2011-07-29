/*!
 * jsonform.js: for jQuery JsonForm Plugin 1.0.1
 * Create standard JSON from Forms or populate form with json using jQuery.
 * Requires jquery.js
 * https://github.com/milfont/jsonform
 *
 * Copyright Milfont Consulting.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function ($) {

    $.fn.extend({
        version:"1.0.1",
        /**
         *
         * @example
         * $('#form_id').getJSON(true);
         *
         * @example with name [default]
         * $("[name='formname']").getJSON();
         *
         * @desc Create standard JSON from Forms with jQuery.
         * Resolve nested objects.
         *
         * @name getJSON
         * @param Boolean byId find inputs with query by id
         * @return json
         * @type jQuery
         * @cat Plugins/jsonform
         */
        getJSON: function(byId) {
            var json = {}, self = this;
            var config;
            if(typeof byId === 'object') {
                config = byId;
                byId = false;
            }
            self.find("input,textarea,select").each( function(index, item) {
                var name = (byId) ? $.trim(item.id) : $.trim(item.name);
                if(name !== "") {
                    self.merge(json, self.buildJson(name, item.value, config));
                }
            });
            return json;
        },
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
         * $('#form_id').populate(lancamento, true);
         *
         * @example with name [default]
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
         * $("[name='form_name'").populate(lancamento);
         *
         *
         * @desc Populate form with json using jQuery.
         * Resolve nested objects.
         *
         * @name populate
         * @param Object json Standard JSON to populate FORM
         * @param Boolean byId find inputs with query by id
         * @return jQuery
         * @type jQuery
         * @cat Plugins/jsonform
         */
        populate: function(json, byId) {
            var self = this;
            (function roam(el, father) {
                for(var property in el) {
                    if(el[property] || el[property] === 0) {
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
                            var name = (father)? father + "\\." + property : property;
                            var query = "[name='" + name + "']";
                            if(byId) {
                                query = ("#" + name);
                            }
                            self.find(query).val(value);
                        }
                    }
                }
            })(json);
            return this;
        },
        buildJson: function(id, valor, config) {
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
                        if(config && config.prefix) arrayName = config.prefix + arrayName;
                        var position = name.substring(arrayIndex+1, name.indexOf("]"));
                        var arr = temp[arrayName] = [];
                        for(var i = 0; i < position; i++) {
                            arr[i] = {};
                        }
                        arr[position] = json;
                    } else {
                        if(config && config.prefix) {
                            temp[config.prefix + name] = json;
                        } else {
                            temp[name] = json;
                        }
                    }
                }
                json = temp;
            }
            return json;
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