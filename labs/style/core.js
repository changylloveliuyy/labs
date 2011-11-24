
//�򵥵�дһ���շ廯�ַ���
function camelize(str) {
	return (str||'').toString().replace(/-([a-z])/g, function(a, m) {
		return m.toUpperCase();
	});
};

//ֻ��Ϊ�˷���,���Ǹ���
String.prototype.camelize = function() {
	return camelize(this);
};


var ua = navigator.userAgent,
	browser = {
		'ie': /msie/i.test(ua),
		'firefox': /firefox/i.test(ua),
		'webkit': /webkit/i.test(ua),
		'opera': /opera/i.test(ua)
	};



/**
 * Style Object
 * ���ݲ�ͬ�������style.get��style.set
 * ֧��css 3���ֹ���,���Խ������չ
 */
var Style = (function (el, css) {
	
	//����һ����Ա�׼���õķ�ʽ,����base2
	//ȡֵǱ����
	//1.��Ӧ��map�������������������ֵ
	//2.�����Ķ�д����һ��ҪΪ������
	//2.����map���������Ӧ��defaultֵ
	//3.����ô��ι�����Ĭ��ֵ
	//Ϊ��ͬ������������Ե�hash
	//����Ǵ�����ֵ�ṹΪ
	//'property': {
	//	'browser': 'property-value'
	//	'default': 'default-value'
	//}
	//����Ƕ�д���������ṹΪ
	//'property': {
	//	'browser': {
	//		set: function(el, css, value) {}
	//		get: function(el, css, value) {}
	//	}
	//}
	var propMap = {
	
		'transition': {
			'ie': '-ms-transition',
			'webkit': '-webkit-transition',
			'firefox': '-moz-transition',
			'opera': '-o-transition'
		},
		
		'transform': {
			'ie': '-ms-transform',
			'webkit': '-webkit-transform',
			'firefox': '-moz-transform',
			'opera': '-o-transform'
		},
		
		'float': {
			'default': 'cssFloat'
		},
		
		'rotate': {
			'ie': {
				set: function(el, css, value) {}
			},
			'default': {}
		},
		
		'opacity': {
			'ie': {
				set: function(el, css, value) {
					value = parseFloat(value) || 1;
					var styleObject = el.style;
					
					//������õ�͸����Ϊ1ʱ��IE��ȥ��alphaͨ�����˾�
					var result = (1 != value) ? 'alpha(opacity=' +(value*100)+ ')' : '';
					styleObject.filter = (styleObject.filter||'').replace(/alpha\(opacity=(.*)\)/gi, '') +result;
					
					//IE��filter��Ҫ����hasLayout����
					styleObject.zoom = 1; 
					return value;
				},
				get: function(el, css, presudo) {
					var result = '';
					if (result = (Style.get(el, 'filter') || '').match(/opacity=(.*)/i)) {
						if (result && result[1]) {
							return parseInt(result[1], 10)/100;
						}
					}
					return 1.0;
				}
			},
			'default': {
				get: function(el, css, presudo) {
					//�����ڷ�IE����£�û������opacityʱΪnull
					//������������opacityΪnullʱ����Ϊ1
					return Style.getCurrentStyle.apply(this, arguments) || 1;
				},
				set: function(el, css, value) {
					result = (1==value) ? null : value;
					el.style.opacity = result;
					return value;
				}
			}
		}
	};
	
	//ͨ��cssȥmap���ҵ���Ӧ�����������ȷ�����Ի���
	var _fixcssHandler = function(css, type) {
		var node   = null,
			result = css;
		
		for (browserName in browser) {
		
			//����������õ���������������cssHash����������
			if (browser[browserName] && propMap[css]) {
				
				//ȡֵǱ����
				//1.��Ӧ��map�������������������ֵ
				//2.�����Ķ�д����һ��ҪΪ������
				//2.����map���������Ӧ��defaultֵ
				//3.����ô��ι�����Ĭ��ֵ
				node = propMap[css][browserName];
				node = node || propMap[css]['default'] || css;

				//����ж�д������д��һ��Ҫ�Ǻ���
				if (node && 'function' == typeof(node[type])) {
					result = node[type];
				} else {
					//��������Ľڵ�ֵΪ�ַ����ſɸ�ֵ��������Ĭ��ֵ
					result = (typeof(node) == 'string') ? node : css;
				}
			}
		}
		
		return result;
	};
	
	
	return {
	
		/**
		 * ����Ԫ�ص���ʽ
		 * @param {HTMLElement} el HTMLԪ��
		 * @param {String} css css����
		 * @param {String} value ����ֵ
		 * @return {mixed} �������õ�����ֵ
		 */
		set: function(el, css, value) {
			css = css.camelize();
			var result = _fixcssHandler(css, 'set');
			if ('function' == typeof(result)) {
				return result.apply(this, arguments);
			} else {
				return el.style[result] = value;
			}
		},
		
		/**
		 * �õ�Ԫ�ص���ʽ
		 * @param {HTMLElement} el HTMLԪ��
		 * @param {String} css css����
		 * @param {String} presudo α��
		 * @return {mixed} ����ȡ������ʽ����ֵ
		 */
		get: function(el, css, presudo) {
		
			css = css.camelize();
			var result = _fixcssHandler(css, 'get');
			if ('function' == typeof(result)) {
				return result.apply(this, arguments);
			} else {
				return Style.getCurrentStyle(el, result, presudo);
			}
		},
		
		/**
		 * �õ�Ԫ�ص�currentStyle,ֻ֧�ֱ�׼�÷�,��ͬ������ļ���
		 * ����Style.get����
		 * @param {HTMLElement} el HTMLԪ��
		 * @param {String} css css����
		 * @param {String} presudo α��
		 * @seealso Style.get
		 * @return {mixed} ����ȡ����style����ֵ
		 */
		getCurrentStyle: function(el, css, presudo) {
			css = css.camelize();
			var styleObject = el.currentStyle;
			
			if (el.ownerDocument && el.ownerDocument.defaultView &&
				el.ownerDocument.defaultView.getComputedStyle) {
				styleObject = el.ownerDocument.defaultView.getComputedStyle(el, presudo||null);
				//return styleObject.getPropertyValue(css); 
				//����������������ר������ֵû�а취ȡ��
				//����transition��css3������
			}
			return (styleObject[css] || null);
		}
	}
})();