window.csm = {};
(function() {
	csm.prime_css = function() {
		var stylesheet = document.createElement('style');
		document.head.appendChild(stylesheet);
		stylesheet.sheet.addRule('.container_info::-webkit-scrollbar', 'display: none;');
		stylesheet.sheet.addRule('.container_info', 'overflow: scroll; max-width: 152px; font-size: 11px; vertical-align: middle; margin-top: -12px; white-space:nowrap;');
		stylesheet.sheet.addRule('.container_info', 'max-width: 152px');
		stylesheet.sheet.addRule('.short', 'max-width: 47px !important');
		stylesheet.sheet.addRule('.med', 'max-width: 150px !important');
		stylesheet.sheet.addRule('.long', 'max-width: 300px !important');
		stylesheet.sheet.addRule('.hidden', 'display: none;');
		$(".container_variables.valuePositive").css('width', '22px');
		$('.container_loadRules').css('width', '150px !important');
		$("div[id*='_mappedVars']").css('width', '12px');
	}
	//Define object that will contain all extensions scoped to a tag
	csm.parseHTML = function parseHTML(str) {
		var tmp = document.implementation.createHTMLDocument();
		tmp.body.innerHTML = str;
		return tmp.body.children;
	};
	csm.get_current_tab = function() {
		return utui.config.currentTab;
	}
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
	csm.remove_info = function() {
		return document.querySelectorAll('.container_info').forEach(function(o) {
			o.parentNode.removeChild(o)
		});
	}
	csm.has_info = function() {
		return document.querySelector('.container_info') === null ? false : true;
	}
	csm.create_checkbox = {
		tags: function() {
			var selector = '#manageContainer_headerControls';
			var node = document.querySelector(selector);
			var chkboxes = {
				lr: '<div class="tab-menu-item"><input class="chkbox_manage" id="loadrules_chkbox" type="checkbox" value="loadrules"><label for="loadrules_chkbox"><i class="icon-book mapping-icon"></i></label></div>',
				ext: '<div class="tab-menu-item"><input class="chkbox_manage" id="ext_chkbox" type="checkbox" value="ext"><label for="ext_chkbox"><i class="icon-cog mapping-icon"></i></label></div>'
			}
			node.appendChild(csm.parseHTML(chkboxes.lr)[0]);
			node.appendChild(csm.parseHTML(chkboxes.ext)[0]);
			var loadrules_chkbox = document.querySelector('#loadrules_chkbox');
			var extensions_chkbox = document.querySelector('#ext_chkbox');
			loadrules_chkbox.onchange = function() {
				if (csm.get_checkbox_state()) {
					if (csm.has_info()) csm.remove_info();
					csm.add_info();
				} else {
					csm.remove_info();
				}
			}
			extensions_chkbox.onchange = function() {
				if (csm.get_checkbox_state()) {
					if (csm.has_info()) csm.remove_info();
					csm.add_info();
				} else {
					csm.remove_info();
				}
			}
		},
		customizations: function() {
			var selector = '#customizeContainer_headerControls';
			var node = document.querySelector(selector);
			var chkboxes = {
				scope: '<div class="tab-menu-item"><input class="chkbox_customizations" id="customizations_chkbox" type="checkbox" value="customizations"><label for="customizations_chkbox"><i class="icon-book mapping-icon"></i></label></div>'
			}
			node.appendChild(csm.parseHTML(chkboxes.scope)[0]);
			var customizations_chkbox = document.querySelector("input.chkbox_customizations");
			customizations_chkbox.onchange = function() {
				if (csm.get_checkbox_state()) {
					if (csm.has_info()) csm.remove_info();
					csm.add_info();
				} else {
					csm.remove_info();
				}
			}
		}
	}
	csm.get_checkbox_state = function() {
		var current_tab = utui.config.currentTab;
		var selector = '.chkbox' + '_' + current_tab;
		var checked = false;
		var check_boxes = document.querySelectorAll(selector);
		if (check_boxes) {
			for (let i = 0; i < check_boxes.length; i++) {
				if (check_boxes[i].checked) {
					checked = true;
					break;
				}
			}
		}
		return checked;
	}
	csm.InfoContainer = class InfoContainer {
		constructor(ext, lr) {
			// ecluded all pages loadrule. request @jason-paddock.
			if (lr && lr !== 'all' && document.querySelector('#loadrules_chkbox').checked)
				this.lr = ['<div class="mapping-item mapping-lr"><i class="icon-book mapping-icon"></i><div class="lr" style="margin-left: 3px; width: auto">' + lr + '</div></div>'];
			if (ext && document.querySelector('#ext_chkbox').checked)
				this.ext = ['<div class="mapping-item mapping-ext"><i class="icon-cog mapping-icon"></i><div class="ext" style="margin-left: 3px; width: auto">' + ext + '</div></div>'];
		}
		get content() {
			return this.buildContent();
		}
		buildContent() {
			function create_elem(type, value) {
				// here we can add custom css to each element in the mapping container.
				// format should be camelCalse. paddingLeft will be added as padding-left.
				var css = {
					div: {
						display: 'inline-block',
						fontSize: '11px'
					},
					loadrule: {
						'marginLeft': '3px',
						'marginRight': '5px',
						'paddingLeft': '3px',
						'display': 'inline-block',
						'height': '14px'
					},
					extension: {
						'marginLeft': '3px',
						'marginRight': '5px',
						'paddingLeft': '3px',
						'display:': 'inline-block',
						'height': '14px'
					}
				};
				var element;
				if (type === 'div') {
					element = document.createElement('div');
					element.classList.add('container_info');
					for (var key in css[type])
						element.style[key] = css[type][key];
					return element;
				}
				if (type === 'loadrule') {
					element = csm.parseHTML(value.join(''))[0];
					for (var key in css[type])
						element.style[key] = css[type][key];
					return element;
				}
				if (type === 'extension') {
					element = csm.parseHTML(value.join(''))[0];
					for (var key in css[type])
						element.style[key] = css[type][key];
					return element;
				}
			}
			var div = create_elem('div');
			if (this.lr) {
				div.appendChild(create_elem('loadrule', this.lr));
			}
			if (this.ext) {
				div.appendChild(create_elem('extension', this.ext));
			}
			return div;
		}
	};
	csm.ExtensionsInfoContainer = class ExtensionsInfoContainer {
		constructor(scope) {
			// ecluded all pages loadrule. request @jason-paddock.
			if (scope && document.querySelector('.chkbox_customizations').checked)
				this.scope = ['<div class="mapping-item mapping-ext"><i class="icon-cog mapping-icon"></i><div class="ext" style="margin-left: 3px; width: auto">' + scope + '</div></div>'];
		}
		get content() {
			return this.buildContent();
		}
		buildContent() {
			function create_elem(type, value) {
				// here we can add custom css to each element in the mapping container.
				// format should be camelCalse. paddingLeft will be added as padding-left.
				var css = {
					div: {
						display: 'inline-block',
						fontSize: '11px'
					},
					scope: {
						'marginLeft': '3px',
						'marginRight': '5px',
						'paddingLeft': '3px',
						'display:': 'inline-block',
						'height': '14px'
					}
				};
				var element;
				if (type === 'div') {
					element = document.createElement('div');
					element.classList.add('container_info');
					for (var key in css[type])
						element.style[key] = css[type][key];
					return element;
				}
				if (type === 'scope') {
					element = csm.parseHTML(value.join(''))[0];
					for (var key in css[type])
						element.style[key] = css[type][key];
					return element;
				}
			}
			var div = create_elem('div');
			if (this.scope) {
				div.appendChild(create_elem('scope', this.scope));
			}
			return div;
		}
	};
	csm.build_info_container = function(element) {
		var info_container = new csm.InfoContainer(element.dataset.extensions, element.dataset.loadRules);
		var new_elem = info_container.buildContent();
		if (new_elem.hasChildNodes()) {
			let anchor = element.children[0].children[1].children[5];
			let labels = $(element).find('.labels-list').get(0);
			if (labels) {
				labels.classList.add('hidden');
			}
			anchor.parentNode.insertBefore(new_elem, anchor);
		}
	}
	csm.build_scope = function(type) {
		function build_extension_scope(elem) {
			var curr_scope = (utui.data.customizations[elem.dataset.id].scope.split());
			return curr_scope[0].split(",").map(function(scope) {
				if (scope === "global") {
					let new_scope = "AT";
					let exec_option = utui.data.customizations[elem.dataset.id].advExecOption ? utui.data.customizations[elem.dataset.id].advExecOption : "";
					if (exec_option) {
						exec_option = ":" + exec_option.toUpperCase();
						new_scope = new_scope + exec_option;
					}
					return new_scope;
				} else if (scope === "preload") {
					return "PRE";
				} else if (scope === "domready") {
					return "DOM";
				} else {
					return scope;
				}
			});
		}
		var scope = {};
		if (type === "manage") {
			var ext = utui.data.customizations;
			Object.keys(ext).forEach(function(extension) {
				if (ext[extension].scope) {
					let curr_scope = ext[extension].scope.split(',');
					curr_scope.forEach(function(e, i) {
						scope[e] = scope[e] || [];
						scope[e].push(extension);
					});
				}
			});
			return scope;
		} else if (type === "customizations") {
			$(".customize_container").each(function(i, elem) {
				scope[elem.dataset.id] = build_extension_scope(elem);
			});
			return scope;
		}
	}
	csm.add_info = function() {
		if (csm.get_checkbox_state === false) {
			return;
		}
		var curr_tab = csm.get_current_tab();
		if (curr_tab === "manage") {
			// build the data-set
			let tags = (function() {
				return {
					elems: jQuery('.manage_container').toArray(),
					scope: csm.build_scope(curr_tab)
				};
			}());
			// add data-set to dom elements
			tags.elems.map(function(elem) {
				elem.dataset.loadRules = utui.data.manage[elem.dataset.id].loadrule;
				if (tags.scope[elem.dataset.id]) {
					elem.dataset.extensions = tags.scope[elem.dataset.id].join(', ');
				} else {
					elem.dataset.extensions = '';
				}
				return elem;
			});
			tags.elems.forEach(function(elem) {
				window.requestAnimationFrame(function() {
					csm.build_info_container(elem);
				});
			});
		} else if (curr_tab === "customizations") {
			let extensions = (function() {
				return {
					elems: jQuery('.customize_container').toArray(),
					scope: csm.build_scope(curr_tab)
				}
			})();
			extensions.elems.forEach(function(elem,i) {
				debugger;
				if (extensions.scope[elem.dataset.id]) {
					elem.dataset.scope = extensions.scope[elem.dataset.id].join(',');
					let info_container = new csm.ExtensionsInfoContainer(elem.dataset.scope).buildContent();
					// let new_container = info_container.buildContent();
					let anchor = elem.children[0].children[1].children[5];
					anchor.parentNode.insertBefore(info_container, anchor)
				}
			})
		}
	}
	csm.add_restore_callback = function() {
		$(".tabLabel").on('mouseup', function(e) {
			csm.remove_info();
			window.requestIdleCallback(function() {
				if (csm.has_info())  csm.remove_info();
				csm.add_info();
			})
		})
	}
	csm.prime_css();
	csm.create_checkbox.tags();
	csm.create_checkbox.customizations();
	csm.add_restore_callback();
})();
// $(".tabLabel").on('click', function(e) {
//  window.requestIdleCallback(function() {
//  })
// })
