
//实时K线
window.onload = function(){
	var kline1 = document.getElementById("KChart1");
	var kline2 = document.getElementById("KChart2");
	var kline3 = document.getElementById("KChart3");
	var kline4 = document.getElementById("KChart4");
	var kline5 = document.getElementById("KChart5");
	var myChart1 = echarts.init(kline1);
	var myChart2 = echarts.init(kline2);
	var myChart3 = echarts.init(kline3);
	var myChart4 = echarts.init(kline4);
	var myChart5 = echarts.init(kline5);

	var app = {};
	option = null;

	function randomData() {
		now = new Date(+now + oneDay);
		value = value + Math.random() * 21 - 10;
		return {
			name: now.toString(),
			value: [
			[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
			Math.round(value)
			]
		}
	}

	var data = [];
	var now = +new Date(2011, 5, 3);
	var oneDay = 24 * 3600 * 1000;
	var value = Math.random() * 1600;
	for (var i = 0; i < 1000; i++) {
		data.push(randomData());
	}

	option = {
		title: {
			left: 'center',
			top: '10px'
		},
		grid: {
			x: 45,
			y: 45,
			x2: 20,
			y2: 40,
			borderWidth: 1
		},
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				params = params[0];
				var date = new Date(params.name);
				return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params
				.value[1];
			},
			axisPointer: {
				animation: false
			}
		},
		xAxis: {
			type: 'time',
			splitLine: {
				show: false
			}
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%'],
			splitLine: {
				show: false
			}
		},
		series: [{
			name: '模拟数据',
			type: 'line',
			color: new echarts.graphic.LinearGradient(
				0, 1, 0, 0,
				[{
					offset: 0,
					color: 'rgb(233, 214, 214)'
				},
				{
					offset: 0.5,
					color: 'rgb(247, 117, 30)'
				},
				{
					offset: 1,
					color: 'rgb(248, 0, 54)'
				}
				]
				),
			showSymbol: false,
			hoverAnimation: false,
			data: data
		}]
	};
	setInterval(function () {
		for (var i = 0; i < 5; i++) {
			data.shift();
			data.push(randomData());
		}
		myChart1.setOption(option)
		myChart1.setOption({
			title: {
				text: "上证指数"
			},
			series: [{
				data: data
			}]
		});
		myChart2.setOption(option)
		myChart2.setOption({
			title: {
				text: "深证成指"
			},
			series: [{
				data: data
			}]
		});
		myChart3.setOption(option)
		myChart3.setOption({
			title: {
				text: "创业板指数"
			},
			series: [{
				data: data
			}]
		});
		myChart4.setOption(option)
		myChart4.setOption({
			title: {
				text: "沪深300"
			},
			series: [{
				data: data
			}]
		});
		myChart5.setOption(option)
		myChart5.setOption({
			title: {
				text: "恒生指数"
			},
			series: [{
				data: data
			}]
		});
	}, 1000);
}
