		//ֻ��singlton,��ʵ�ǿ�����Ϊclass��,
		//�������Ե��������calendar view
		var CalendarView = {
			mainbaseCls   : 'calendar-base-class',
			mainAdjustCls : 'calendar-base-rows6',
			calendar      : null,
			adjustRows    : 6,
			initialize    : function(cal) {
				//6����5�еĸ߶����ò�һ��
				this.calendar = cal;
				//��beforedraw�¼�ʱȥΪ���������ض���className
				CalendarView.calendar.on('beforedraw', function(args) {
					var cls = CalendarView.mainbaseCls;
					if (CalendarView.adjustRows==CalendarView.calendar.displayRows) { 
						cls = CalendarView.mainAdjustCls; 
					}
					CalendarView.calendar.baseClass = cls;
				});
			}
		};
		
		//��ȡ���ݵĽӿ�,�������logic����ʹ��
		//model��Ĵ�����Ը����������ط�
		var CalendarModel = {
			initialize: function() {
			}
		};
			
		var CalendarLogic = {
		
			minical  : null,
			maincal  : null,
			drawDate : new Date(),
			view     : null,
			model    : null,
		
			initialize: function() {
				this.initCalendarInstance();
				this.initEvents();
				this.initView();
				this.initModel();
				this.minical.draw(this.drawDate);
				this.maincal.draw(this.drawDate);
			},
			
			setView: function(view) {
				CalendarLogic.view = view;
			},
			
			setModel: function(model) {
				this.model = model;
			},
			
			initView: function() {
				this.view.initialize(this.maincal);
			},
			
			initModel: function() {
				this.model.initialize();
			},
			
			initEvents: function() {
				//ΪһЩbutton����¼�
				refById('maincal-next').onclick  = function() { CalendarLogic.maincal.drawNextMonth(); }
				refById('maincal-pre').onclick   = function() { CalendarLogic.maincal.drawPreviousMonth(); }
				refById('maincal-today').onclick = function() { CalendarLogic.maincal.draw(new Date()); }
				refById('minical-next').onclick  = function() { CalendarLogic.minical.drawNextMonth(); }
				refById('minical-pre').onclick   = function() { CalendarLogic.minical.drawPreviousMonth(); }
				
				//С�������ڸ�����Ҫͬ������Ϣ��
				CalendarLogic.minical.on('change', function(args) {
					refById('minical-date-info').innerHTML = args.currentDate.format('yyyy��MM��');
				});
	
				//����������֮��С����Ҳ��Ҫ����������������
				CalendarLogic.maincal.on('change', function(args) {
					CalendarLogic.minical.draw(args.currentDate);
					refById('maincal-date-info').innerHTML = args.currentDate.format('yyyy��MM��');
					location.hash=args.currentDate.format();
				});
				//���֮���ǿ��Ա༭��
				CalendarLogic.maincal.on('select', function(args) {
					alert(args.date);
				});
			},
			
			//�����������ϵ�mvc����
			//�����minical��maincal���ǹ����Ĺ�ϵ,�������ⲿʵ�������ٴ���
			//����logic�����ʵ����,������ǿ��ϵ
			//��������һ���Ӧ��,Ҳ����ν
			initCalendarInstance: function() {
				this.minical = new MonthlyCalendar({
					'container'   : refById('minical'), 
					'displayDays' : ['��','һ','��','��','��','��','��'],
					'onselect'    : function(args) { this.draw(parseDate(args.date)); }
				});
				this.maincal = new MonthlyCalendar({
					container:refById('maincal')
				});
			}
		};
		
		//���øɾ���
		icalendar = {
			initialize: function() {
	  			//��������һ��ʹ�ù�ϵ
	  			var hashDate = location.hash.slice(1);
	  			CalendarLogic.drawDate = parseDate(hashDate);
	  			CalendarLogic.setView(CalendarView);
	  			CalendarLogic.setModel(CalendarModel);
				CalendarLogic.initialize();
			}
		};