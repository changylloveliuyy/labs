=ͨ���������=

//TODO
//��delegate cell��Ԫ��ʱ��͵��С��
//��һ��Сbug,Ӧ�ò���Ӱ������
//��ʹ�õ����Լ���һ�����bug�ͺ�

1.�������������ص��ǳ���������Զ����¼�.�ṩ�������Զ����¼�:
var _selectEvents = 'select', 						//ѡ�����ڵ��¼�
	_drawEvents   = 'beforedraw,drawing,afterdraw',	//��������ʱ���¼�,���������������
	_baseEvents   = 'cellin,cellout',				//��Ԫ���mouseover/mouseout
	_changeEvents = 'change,outofdate',            	//�����ı�ʱ,���������趨����Сֵ�����ֵ�¼�
	_uiEvents     = 'beforeshow,show,aftershow,beforehide,hide,afterhide';
����¼������ʹ�������ά��,Ҳ��������չ.

2.��ʽ��������,������ҵ��������Լ�ȥдcss.

3.ͨ�����������Ժܷ������չ
* ��������(�Դ�)
* ��������
* ��������
* ũ������(�Ѿ�д�ò��),������չ����

4.������ԱȽ����,���Ժܺõ���������ܶԽ�,ֻ��Ҫ���������adpter����.

5.samples�ļ������м���ʾ��.
* calendar-framework ��չʾ��һ����Ϊ���ӵ�����ϵͳ���,�Ѿ��ֲ�Ϊmvc.
* calendar-sample չʾ��������Ĺ���.

6.design�ļ����������ͼ
��Ϊmac��û��̫���ʵ�UML��ͼ���,����㻭һ��,�������ܿ�����Ƶ�˼·�ͽӿ�.
ͼ���ñȽ����п��ܴ���ʵ������Щ�仯,������̫��.

7.һЩ�����Ĳ���
* ������,��ֻ��mac leopard�µ�chrome 17dev���Բ���һ��.û����IE.
* calendar-framework.html�µİ汾��õķֱ��ʲ鿴��1440px.
* ����ȥ��һ���򵥰��google calendar,��mvc�ṹ.

8.�ӿ�˵��
���Խӿ�
initDayIndex: 0,	//��displayDays�������,��ʼ����һ�����ܼ�
displayDays: ['����','��һ','�ܶ�','����','����','����','����'],
startDate: null,	//������ڴ�����,ÿ����Ԫ�����not-the-month����ʽ��
endDate: null,		//������ڴ�����,ÿ����Ԫ�����not-the-month����ʽ��
displayRows: 5,		//��ʾ����,���autoRowsΪtrue,�����ʧЧ
autoRows: true, 	//�Զ��趨����,displayRowsΪ5����6
displayHeader: true,	//�Ƿ���ʾ��ͷ
baseClass: 'calendar-base-class',	//������className��ʽ��
className: {
	days:  ['day-sunday calendar-day', 
			'day-monday calendar-day', 
			'day-tuesday calendar-day', 
			'day-wednesday calendar-day', 
			'day-thursday calendar-day', 
			'day-friday calendar-day', 
			'day-saturday calendar-day'],

	dates: ['date-sunday calendar-date', 
			'date-monday calendar-date', 
			'date-tuesday calendar-date', 
			'date-wednesday calendar-date', 
			'date-thursday calendar-date', 
			'date-friday calendar-date', 
			'date-saturday calendar-date'],
	header     : 'calendar-header',
	today      : 'calendar-today',
	invalid    : 'calendar-invalid',
	notTheMonth: 'calendar-not-the-month',
	hover      : 'calendar-hover'
}
�����ӿ�:
render(),
draw([Date]),
checkDateOutOfRange(Date)
setAutoDisplayRows()
show()
hide()
getDateFirstDayOffset([Date])	//�õ�һ����������ƫ����
getCurrentDate(),
drawNextMonth(),
drawPreviousMonth(),
drawNextYear(),
drawPreviousYear()

�¼��б�:
var _selectEvents = 'select', 						//ѡ�����ڵ��¼�
	_drawEvents   = 'beforedraw,drawing,afterdraw',	//��������ʱ���¼�,���������������
	_baseEvents   = 'cellin,cellout',				//��Ԫ���mouseover/mouseout
	_changeEvents = 'change,outofdate',            	//�����ı�ʱ,���������趨����Сֵ�����ֵ�¼�
	_uiEvents     = 'beforeshow,show,aftershow,beforehide,hide,afterhide';
		