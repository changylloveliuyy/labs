/**
 * ����תũ��, ���еĸ����������תΪ����
 * @param
 * @return {String}
 * @seealso http://songshuhui.net/archives/16640
			http://blog.zol.com.cn/795/article_794898.html
 * @remarmks ���ű���
	1. ������ʮһ�£�Ϊ�˱�֤���³�һ����������������ʮһ��Ҳ�ƶ��£�
	2. ��һ����û����������������ϸ��µ����£���ʮ�Ľ���������ʮ������Ϊ��������ʮ������Ϊ���������������ǽ������������������������������������������µĿ����Եͣ�
	3. �����������»������£���������ǰ��ʮһ�£���Ϊ���£���ֻ֤��һ�����ڣ�
 */
var EnhanceDate = (function() {

	//��˵����ũ���ı�150���Ӧ1900��-2049����150��
	var LUNAR_INFO =[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,0x14b63];
	
	
	//�뱱��ʱ���ʱ���������
	var _tzo = ((new Date()).getTimezoneOffset()+480)*60000,
		TimezoneOffset = _tzo >=0 ? _tzo : 0;

	
	var CHINESE_TIAN_GAN   = "���ұ����켺�����ɹ�",		//���
		CHINESE_DI_ZHI     = "�ӳ���î������δ�����纥",	//��֧
		CHINESE_SHENG_XIAO = "��ţ������������Ｆ����",	//��Ф
		CHINESE_JIE_QI     = ["С��","��","����","��ˮ","����","����","����","����","����","С��","â��","����","С��","����","����","����","��¶","���","��¶","˪��","����","Сѩ","��ѩ","����"]; //����
		
	var TERM_INFO = [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];//��˵����ũ�������ı�
	
	//һЩ����
	var CHINESE_NUMBER     = '��һ�����������߰˾�ʮ',
		LUNAR_NUMBER_MONTH = ['��','��','��','��','��','��','��','��','��','ʮ','ʮһ','��'],
		LUNAR_DAY_UNIT     = '��ʮإئ';
	
	//��������
	//*1Ԫ����,����ż�1��
	var SOLAR_FESTIVAL = {"0101":"*1Ԫ����","0214":"���˽�","0305":"ѧ�׷������","0308":"��Ů��","0312":"ֲ����","0315":"������Ȩ����","0401":"���˽�","0501":"*1�Ͷ���","0504":"�����","0601":"���ʶ�ͯ��","0701":"�й�����������","0801":"������","0910":"��ʦ��","1001":"*3�����","1224":"ƽ��ҹ","1225":"ʥ����"};
	
	//��������
	var LUNAR_FESTIVAL = {"0101":"*2����","0115":"Ԫ����","0505":"*1�����","0815":"*1�����","0909":"������","1208":"���˽�","0100":"��Ϧ"};
	
	//�������ӱ�
	//[��������,��������,����,ũ����������,��Ϣ����
	//"20130203":["","","","إ��",1]
	var FIXED_DAYS = {"20071229":["","","","",0],"20071231":["","","","",1],"20080202":["","","","",-2],"20080211":["","","","",2],"20080502":["","","","",1],"20080504":["�����","","","�����",0],"20080609":["","","","",1],"20080915":["","","","",1],"20080927":["","","","",-2],"20080929":["","","","",2],"20090102":["","","","",1],"20090104":["","","","",0],"20090124":["","","","",0],"20090128":["","","","",3],"20090201":["","","","",0],"20090406":["","","","",1],"20090529":["","","","",1],"20090531":["","","","",0],"20090927":["","","","",0],"20091005":["","","","",4],"20091010":["","","","",0],"20100216":["","","","",4],"20100220":["","","","",-2],"20100503":["","","","",1],"20100612":["","","","",-2],"20100614":["","","","",2],"20100807":["","","����","����",0],"20100808":["","","","إ��",0],"20100919":["","","","",0],"20100923":["","","���","���",2],"20100925":["","","","",-2],"20101004":["","","","",4],"20101009":["","","","",0],
					"20110103":["","","","",1],
					"20110105":["","","","����",0],
					"20110106":["","","С��","С��",0],
					"20110130":["","","","",-1],
					"20110202":["","","","",1],
					"20110207":["","","","",2],
					"20110212":["","","","",-1],
					"20110402":["","","","",-1],
					"20110404":["","","","",1],
					"20110502":["","","","",1],
					"20110606":["","","","",1],
					"20111004":["","","","",4],
					"20111008":["","","","",-2],
					"20111122":["","","","إ��",0],
					"20111123":["","","Сѩ","Сѩ",0],
					"20130203":["","","","إ��",1]
					};	
							
	function padding(s) {
		return s < 10 ? '0' + s : s;
	};
	
	function format(oDate, pattern) {
       pattern=pattern||"yyyy-MM-dd";
        var y=oDate.getFullYear();
        var o = { 
            "M" : oDate.getMonth()+1, //month
            "d" : oDate.getDate(),    //day
            "h" : oDate.getHours(),   //hour
            "m" : oDate.getMinutes(), //minute
            "s" : oDate.getSeconds() //second
        }   
        pattern=pattern.replace(/(y+)/ig,function(a,b){var len=Math.min(4,b.length);return (y+"").substr(4-len);});
        for(var i in o){ 
            pattern=pattern.replace(new RegExp("("+i+"+)","g"),function(a,b){return (o[i]<10 && b.length>1 )? "0"+o[i] : o[i]});
        }   
        return pattern;
	};
	
	function getChineseDate(lunarMonth, lunarDate){
		var msg;
		switch (lunarDate) {
			case 10:
				msg = '��ʮ'; 
				break;
			case 20:
				msg = '��ʮ';
				break;
			case 30:
				msg = '��ʮ';
				break;
			default :
				msg  = LUNAR_DAY_UNIT.charAt(Math.floor(lunarDate / 10));
				msg += CHINESE_NUMBER.charAt(lunarDate % 10);
		}
		return msg;
	}

	//===== ĳ��ĵ�n������Ϊ����(��0С������)
	function sTerm(y,n) {
	   var offDate = new Date( ( 31556925974.7*(y-1900) + TERM_INFO[n]*60000  ) + Date.UTC(1900,0,6,2,5) )
	   return(offDate.getUTCDate());
	}
	
	// ����ũ�� y���������
	function lYearDays(y) {
	   var i, sum = 348;
	   for(i=0x8000; i>0x8; i>>=1) sum += (LUNAR_INFO[y-1900] & i)? 1: 0
	   return(sum+leapDays(y));
	}
	// ���� offset ���ظ�֧, 0=����
	function cyclical(num) {
	   return(CHINESE_TIAN_GAN.charAt(num%10)+CHINESE_DI_ZHI.charAt(num%12));
	}
	// ����ũ�� y�����µ�����
	function leapDays(y) {
	   if(leapMonth(y))  return((LUNAR_INFO[y-1900] & 0x10000)? 30: 29)
	   else return(0);
	}
	
	// ����ũ�� y�����ĸ��� 1-12 , û�򷵻� 0
	 function leapMonth(y) {
	   return(LUNAR_INFO[y-1900] & 0xf);
	}
	
	// ����ũ�� y��m�µ�������
	function monthDays(y, m) {
	   return( (LUNAR_INFO[y-1900] & (0x10000>>m))? 30: 29 )
	} 
	
	//---������ũ�����㷨����ȫcopy�����ҵ��㷨��--//
	//����Ƚ���Ҫ��ũ������Ҫ�㷨
	function Lunar(objDate) {
	
		var i, leap=0, temp=0;
		var baseDate = new Date(1900,0,31);
		//offset��objDate����1900��1��31���ж�����
		var offset =((objDate - baseDate)+TimezoneOffset)/86400000;
	
		this.dayCyl = offset + 40;
		this.monCyl = 14;
	 
		for(i=1900; i<2050 && offset>0; i++) {
			temp = lYearDays(i);
			offset -= temp;
			this.monCyl += 12;
		}
	 
		if(offset<0) {
			offset += temp;
			i--;
			this.monCyl -= 12;
		}
	 
		this.year = i;
		this.yearCyl = i-1864;
	 
		leap = leapMonth(i); //���ĸ���
		this.isLeap = false;
	 
		for(i=1; i<13 && offset>0; i++){
			if(leap>0 && i==(leap+1) && this.isLeap==false){
				--i;
				this.isLeap = true;
				temp = leapDays(this.year);
			}else{
				temp = monthDays(this.year, i);
			}
			if(this.isLeap==true && i==(leap+1)){
				this.isLeap = false;
			}
			offset -= temp;
			if(this.isLeap == false){
				this.monCyl ++;
			}
		}
		
		if(offset==0 && leap>0 && i==leap+1){
			if(this.isLeap){
				this.isLeap = false;
			}else{
				this.isLeap = true;
				--i;
				--this.monCyl;
			}
		}
	 
	   if(offset<0){
		   offset += temp;
			--i;
			--this.monCyl;
		}
		this.month = i;
		this.day = offset + 1;
	}
	//-----------------------ũ���㷨����, copy���ݽ��� -----------//

	
		


	
	//--------------------------------------------------------------------------------//
	
	/**
	 * CustomDate
	 *	date Date����
	 * solarYear ������
	 * solarMonth ������
	 * solarDate ������
	 * solarWeekDay ������
	 * solarWeekDayInChinese ���������ģ��磺������
	 * solarFestival ��������
	 * lunarYear ������
	 * lunarMonth ������
	 * lunarDate ������
	 * lunarMonthInChinese
	 * lunarDateInChinese ���������ģ������
	 * lunarIsLeap �����Ƿ�������
	 * ganzhiYear ��֧��
	 * shengxiao ��Ф
	 * ganzhiMonth ��֧��
	 * ganzhiDate ��֧��
	 * jieqi ����
	 *
	 */
	function CustomDate(date){

		//format(date, 'M');
		var lunarDate = new Lunar(date);
		
		this.date         = date;
		this.isToday      = false;
		this.solarYear    = format(date, 'yyyy');
		this.solarMonth   = format(date, 'M');
		this.solarDate    = format(date, 'd');
		this.solarWeekDay = date.getDay();
		this.solarWeekDayInChinese = '����' + CHINESE_NUMBER.charAt(this.solarWeekDay);
		
		this.lunarYear  = lunarDate.year;
		this.shengxiao  = CHINESE_SHENG_XIAO.charAt((this.lunarYear-4)%12);
		this.lunarMonth = lunarDate.month;
		this.lunarIsLeapMonth    = lunarDate.isLeap;
		this.lunarMonthInChinese = this.lunarIsLeapMonth ? 
									'��' + LUNAR_NUMBER_MONTH[lunarDate.month-1] : 
									LUNAR_NUMBER_MONTH[lunarDate.month-1];
		
		this.lunarDate   = Math.floor(lunarDate.day);
		this.showInLunar = this.lunarDateInChinese = getChineseDate(this.lunarMonth, this.lunarDate);
		
		if(this.lunarDate == 1) {
			this.showInLunar = this.lunarMonthInChinese + '��';
		}
		
		this.ganzhiYear    = cyclical(lunarDate.yearCyl);
		this.ganzhiMonth   = cyclical(lunarDate.monCyl);
		this.ganzhiDate    = cyclical(lunarDate.dayCyl++);
		this.solarFestival = '';
		this.lunarFestival = '';
		this.jieqi         = '';
		this.restDays      = 0;
		
		//Ĭ���������շż�
		if(this.solarWeekDay==0 || this.solarWeekDay==6){
		    this.restDays=1;
		}
		
		if (format(date) == format(new Date())) {
			isToday = true;
		}
		
		if(sTerm(this.solarYear,(this.solarMonth-1)*2) == format(date, 'd')){
			this.showInLunar = this.jieqi = CHINESE_JIE_QI[(this.solarMonth-1)*2];
		}
		
		if(sTerm(this.solarYear,(this.solarMonth-1)*2+1) == format(date, 'd')){
			this.showInLunar = this.jieqi = CHINESE_JIE_QI[(this.solarMonth-1)*2+1];
		}
		
		//�����ڵĽ��������ж�
		if(this.showInLunar == '����'){
			this.showInLunar = this.jieqi = '������';
			this.restDays = 1;
		}
		
		
		this.solarFestival = SOLAR_FESTIVAL[format(date,'MMdd')||''];
		if(/\*(\d)/.test(this.solarFestival)){
			this.restDays = parseInt(RegExp.$1);
			this.solarFestival = this.solarFestival.replace(/\*\d/, '');
		}
		
		this.showInLunar   = this.solarFestival ? this.solarFestival : this.showInLunar;
		this.lunarFestival = LUNAR_FESTIVAL[this.lunarIsLeapMonth ? '00':padding(this.lunarMonth)+padding(this.lunarDate)]||'';
		
		if(/\*(\d)/.test(this.lunarFestival)){
			this.restDays      = (this.restDays > parseInt(RegExp.$1)) ? this.restDays : parseInt(RegExp.$1);
			this.lunarFestival = this.lunarFestival.replace(/\*\d/, '');
		}
		
		if(this.lunarMonth == 12 && this.lunarDate == monthDays(this.lunarYear, 12)){
			this.lunarFestival = LUNAR_FESTIVAL['0100'];
			this.restDays = 1;
		}
		
		this.showInLunar = this.lunarFestival ? this.lunarFestival : this.showInLunar;
		this.showInLunar = (this.showInLunar.length>5) ? this.showInLunar.substr(0, 5) + '...' : this.showInLunar;
		
		//Ϊ���ֲ��������������������Ҫ�ݼٵ�����,��fixedDay��������
		var fixedDays = FIXED_DAYS[format(date,'yyyyMMdd')];
		if (fixedDays) {
			this.solarFestival = fixedDays[0] || '';
		    this.lunarFestival = fixedDays[1] || '';
		    this.jieqi         = fixedDays[2] || '';
		    this.showInLunar   = fixedDays[3] || this.showInLunar;
		    this.restDays      = fixedDays[4] || 0;
		}
	}
	
	return CustomDate;
})();
