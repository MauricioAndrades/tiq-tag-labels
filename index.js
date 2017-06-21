// 20170621.010699
function extra_info() {
	return (function() {
		// fastom
		!function(t){"use strict";function e(){var e=this;e.reads=[],e.writes=[],e.raf=u.bind(t)}function n(t){t.scheduled||(t.scheduled=!0,t.raf(i.bind(null,t)))}function i(t){var e,i=t.writes,o=t.reads;try{r(o),r(i)}catch(s){e=s}if(t.scheduled=!1,(o.length||i.length)&&n(t),e){if(!t["catch"])throw e;t["catch"](e)}}function r(t){for(var e;e=t.shift();)e()}function o(t,e){var n=t.indexOf(e);return!!~n&&!!t.splice(n,1)}function s(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])}var u=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(t){return setTimeout(t,16)};e.prototype={constructor:e,measure:function(t,e){var i=e?t.bind(e):t;return this.reads.push(i),n(this),i},mutate:function(t,e){var i=e?t.bind(e):t;return this.writes.push(i),n(this),i},clear:function(t){return o(this.reads,t)||o(this.writes,t)},extend:function(t){if("object"!=typeof t)throw new Error("expected object");var e=Object.create(this);return s(e,t),e.fastdom=this,e.initialize&&e.initialize(),e},catch:null};var exports=t.fastdom=t.fastdom||new e;"f"==(typeof define)[0]?define(function(){return exports}):"o"==(typeof module)[0]&&(module.exports=exports)}("undefined"!=typeof window?window:this);
		// todo: remove unecessary exposure to window obj.
		window.csm = {};
		csm.prime_css=function(){var stylesheet=document.createElement("style");document.head.appendChild(stylesheet);stylesheet.sheet.addRule(".container_info::-webkit-scrollbar","display: none;");stylesheet.sheet.addRule(".container_info","overflow: scroll; max-width: 300px; font-size: 11px; vertical-align: middle; margin-top: -12px; white-space:nowrap;");stylesheet.sheet.addRule(".med","max-width: 150px !important");stylesheet.sheet.addRule(".long","max-width: 300px !important");stylesheet.sheet.addRule(".hidden","display: none;");stylesheet.sheet.addRule(".container_variables","max-width: 22px !important;");stylesheet.sheet.addRule(".px-width","width: 1px !important;");$(".container_variables").css("max-width","22px");$(".container_loadRules").css("width","150px !important");$("div[id*='_mappedVars']").css("width","12px")};
			//Define object that will contain all extensions scoped to a tag
		csm.parseHTML = function parseHTML(str) {var tmp = document.implementation.createHTMLDocument();tmp.body.innerHTML = str;return tmp.body.children;};
		csm.get_current_tab = function() {return utui.config.currentTab;}
		csm.labels = {
			find: function(element) {
				if (!element) return null;
				return $(element).find('.container_label').get(0);
			},
			get_selector: function() {
				return '.container_label' + '[data-type="' + csm.get_current_tab() + '"]'
			},
			hide: function() {
				var labels = document.querySelectorAll(csm.labels.get_selector());
				for (let i = 0; i < labels.length; i++) {
					window.requestAnimationFrame(function() {
						labels[i].classList.add('hidden');
					})
				}
			},
			show: function() {
				var labels = document.querySelectorAll(csm.labels.get_selector());
				for (let i = 0; i < labels.length; i++) {
					labels[i].classList.remove('hidden');
				}
			}
		}
		csm.remove_info = function() {return document.querySelectorAll('.container_info').forEach(function(o) {o.parentNode.removeChild(o)});}
		csm.has_info = function() {return document.querySelector('.container_info') === null ? false : true;}
		csm.chkbox={get_state:function(){var checked=false;var curr_tab=csm.get_current_tab();if(curr_tab==="manage"){if(csm.chkbox.tags.lr.firstChild.checked||csm.chkbox.tags.ext.firstChild.checked){checked=true}}else if(curr_tab==="customizations"){if(csm.chkbox.extensions.scope.firstChild.checked){checked=true}}return checked},tags:{},extensions:{}};
		csm.create_checkbox={tags:function(){document.querySelectorAll(".tab-menu-item.chkbox.manage").forEach(function(elem,i){elem.parentNode.removeChild(elem)});var selector="#manageContainer_headerControls";var node=document.querySelector(selector);var chkboxes={lr:'<div class="tab-menu-item chkbox manage"><input class="chkbox_manage" id="loadrules_chkbox" type="checkbox" value="loadrules"><label for="loadrules_chkbox"><i class="icon-book mapping-icon"></i></label></div>',ext:'<div class="tab-menu-item chkbox manage"><input class="chkbox_manage" id="ext_chkbox" type="checkbox" value="ext"><label for="ext_chkbox"><i class="icon-cog mapping-icon"></i></label></div>'};csm.chkbox.tags.lr=csm.parseHTML(chkboxes.lr)[0];csm.chkbox.tags.ext=csm.parseHTML(chkboxes.ext)[0];csm.chkbox.tags.lr.onchange=function(){if(this.firstChild.checked||csm.chkbox.tags.ext.childNodes[0].checked){$(".container_info").remove();csm.add_info()}else{$(".container_info").remove();csm.labels.show()}};csm.chkbox.tags.ext.onchange=function(){if(this.firstChild.checked||csm.chkbox.tags.lr.childNodes[0].checked){$(".container_label").addClass("hidden");$(".container_label").addClass("px-width");$(".container_info").remove();csm.add_info()}else{csm.remove_info();$(".container_label").removeClass("hidden")}};node.appendChild(csm.chkbox.tags.lr);node.appendChild(csm.chkbox.tags.ext)},customizations:function(){document.querySelectorAll(".tab-menu-item.chkbox.customizations").forEach(function(elem,i){elem.parentNode.removeChild(elem)});var selector="#customizeContainer_headerControls";var node=document.querySelector(selector);var chkboxes={scope:'<div class="tab-menu-item chkbox customizations"><input class="chkbox_customizations" id="customizations_chkbox" type="checkbox" value="customizations"><label for="customizations_chkbox"><i class="icon-book mapping-icon"></i></label></div>'};csm.chkbox.extensions.scope=csm.parseHTML(chkboxes.scope)[0];if(node)node.appendChild(csm.chkbox.extensions.scope);csm.chkbox.extensions.scope.onchange=function(){var self=this;if(self.hasChildNodes()&&self.firstChild.id==="customizations_chkbox"&&self.firstChild.checked){$(".container_info").remove();$(".container_label").addClass("px-width");csm.add_info();$(".container_label").addClass("hidden")}else{csm.remove_info();$(".container_label").removeClass("hidden")}};csm.checkbox_customizations=1}};
		csm.get_checkbox_state=function(){var current_tab=utui.config.currentTab;var selector=".chkbox"+"_"+current_tab;var checked=false;var check_boxes=document.querySelectorAll(selector);if(check_boxes){for(let i=0;i<check_boxes.length;i++){if(check_boxes[i].checked){checked=true;break}}}return checked};
		csm.InfoContainer= class InfoContainer{constructor(ext,lr){if(lr&&lr!=="all"&&document.querySelector("#loadrules_chkbox").checked)this.lr=['<div class="mapping-item mapping-lr"><i class="icon-book mapping-icon"></i><div class="lr" style="margin-left: 3px; width: auto; max-width:280px;">'+lr+"</div></div>"];if(ext&&document.querySelector("#ext_chkbox").checked)this.ext=['<div class="mapping-item mapping-ext"><i class="icon-cog mapping-icon"></i><div class="ext" style="margin-left: 3px; width: auto; max-width:280px;">'+ext+"</div></div>"]}get content(){return this.buildContent()}buildContent(){function create_elem(type,value){var css={div:{display:"inline-block",fontSize:"11px"},loadrule:{marginLeft:"3px",marginRight:"5px",paddingLeft:"3px",display:"inline-block",height:"14px"},extension:{marginLeft:"3px",marginRight:"5px",paddingLeft:"3px","display:":"inline-block",height:"14px"}};var element;if(type==="div"){element=document.createElement("div");element.classList.add("container_info");for(var key in css[type]){element.style[key]=css[type][key]}return element}if(type==="loadrule"){element=csm.parseHTML(value.join(""))[0];for(var key in css[type]){element.style[key]=css[type][key]}return element}if(type==="extension"){element=csm.parseHTML(value.join(""))[0];for(var key in css[type]){element.style[key]=css[type][key]}return element}}var div=create_elem("div");if(this.lr){div.appendChild(create_elem("loadrule",this.lr))}if(this.ext){div.appendChild(create_elem("extension",this.ext))}return div}};
		csm.ExtensionsInfoContainer=class ExtensionsInfoContainer{constructor(scope){if(scope){this.scope=['<div class="mapping-item mapping-ext"><i class="icon-cog mapping-icon"></i><div class="ext" style="margin-left: 3px; width: auto">'+scope+"</div></div>"]}}get content(){return this.buildContent()}buildContent(){function create_elem(type,value){var css={div:{display:"inline-block",fontSize:"11px"},scope:{marginLeft:"3px",marginRight:"5px",paddingLeft:"3px","display:":"inline-block",height:"14px"}};var element;if(type==="div"){element=document.createElement("div");element.classList.add("container_info");for(var key in css[type]){element.style[key]=css[type][key]}return element}if(type==="scope"){element=csm.parseHTML(value.join(""))[0];for(var key in css[type]){element.style[key]=css[type][key]}return element}}var div=create_elem("div");if(this.scope){div.appendChild(create_elem("scope",this.scope))}return div}};
		csm.build_info_container=function(element){if(element.dataset.extensions===""&&element.dataset.loadRules==="all")return;var info_container=new csm.InfoContainer(element.dataset.extensions,element.dataset.loadRules);var new_elem=info_container.buildContent();if(new_elem.hasChildNodes()){let anchor=element.children[0].children[1].children[5];anchor.parentNode.insertBefore(new_elem,anchor)}};
		csm.build_scope=function(type){function build_extension_scope(elem){var curr_scope=utui.data.customizations[elem.dataset.id].scope.split();return curr_scope[0].split(",").map(function(scope){if(scope==="global"){let new_scope="AT";let exec_option=utui.data.customizations[elem.dataset.id].advExecOption?utui.data.customizations[elem.dataset.id].advExecOption:"";if(exec_option){exec_option=":"+exec_option.toUpperCase();new_scope=new_scope+exec_option}return new_scope}else if(scope==="preload"){return"PRE"}else if(scope==="domready"){return"DOM"}else{return scope}})}var scope={};if(type==="manage"){var ext=utui.data.customizations;Object.keys(ext).forEach(function(extension){if(ext[extension].scope){let curr_scope=ext[extension].scope.split(",");curr_scope.forEach(function(e,i){scope[e]=scope[e]||[];scope[e].push(extension)})}});return scope}else if(type==="customizations"){$(".customize_container").each(function(i,elem){scope[elem.dataset.id]=build_extension_scope(elem)});return scope}};
		csm.add_info=function(){if(csm.chkbox.get_state()===false){return}var curr_tab=csm.get_current_tab();if(curr_tab==="manage"){let tags=function(){return{elems:jQuery(".manage_container").toArray(),scope:csm.build_scope(curr_tab)}}();tags.elems.map(function(elem){elem.dataset.loadRules=utui.data.manage[elem.dataset.id].loadrule;if(tags.scope[elem.dataset.id]){elem.dataset.extensions=tags.scope[elem.dataset.id].join(", ")}else{elem.dataset.extensions=""}return elem});tags.elems.forEach(function(elem){fastdom.mutate(()=>{csm.build_info_container(elem)})})}else if(curr_tab==="customizations"){let extensions=function(){return{elems:jQuery(".customize_container").toArray(),scope:csm.build_scope(curr_tab)}}();extensions.elems.forEach(function(elem,i){if(extensions.scope[elem.dataset.id]){elem.dataset.scope=extensions.scope[elem.dataset.id].join(",");let info_container=new csm.ExtensionsInfoContainer(elem.dataset.scope).buildContent();fastdom.mutate(()=>{let anchor=elem.children[0].children[1].children[5];anchor.parentNode.insertBefore(info_container,anchor)})}})}};
		csm.add_restore_callback=function(){$(".tabLabel").on("mouseup",function(e){csm.remove_info();window.requestIdleCallback(function(){csm.chkbox.get_state()?$(".container_label").addClass("hidden"):$(".container_label").removeClass("hidden");if(csm.has_info()){csm.remove_info()}csm.add_info()})})};
		csm.prime_css();
		if (!csm.checkbox_manage) {csm.create_checkbox.tags();}
		if (!csm.checkbox_customizations) {csm.create_checkbox.customizations();}
		csm.add_restore_callback();
	})();
}
