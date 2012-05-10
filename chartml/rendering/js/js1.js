// js1.js

function updateMain(high_id, type) {
	var id = "cmlrmain_"+high_id+"_"+type;
	hideall(high_id);
	$("#"+id).fadeIn();
}

function hideall(high_id) {
	$("#cmlrmain_"+high_id+"_visual").hide();
	$("#cmlrmain_"+high_id+"_enhance").hide();
	$("#cmlrmain_"+high_id+"_reverse").hide();
	$("#cmlrmain_"+high_id+"_audio").hide();
	$("#cmlrmain_"+high_id+"_text").hide();
	$("#cmlrmain_"+high_id+"_table").hide();
}

function loadAtBody() {
	prepareGraph("Stocks");
}

function prepareGraph(high_id) {
//	insertStructure(high_id);
	
	var data = [
		{x: 0, y: 1},
		{x: 1, y: 2},
		{x: 2, y: 2.5},
		{x: 3, y: 3.0},
		{x: 4, y: 4.0},
		{x: 5, y: 10},
		{x: 6, y: 12}
	];
	var text = "The line graph shows a steadily increasing line, starting at (0,1), and moving to the right until x=6. At x=5, there is a jump.";
	var tablecontents = '<table cellspacing="0" cellpadding="0" border="0" width="325"><tr><td>'
	+ '<table cellspacing="0" cellpadding="1" border="1" width="600px" ><tr><th width="50%">x</th><th width="50%">y</th></tr></table>'
	+ '</td></tr><tr><td><div style="width:600px; height:330px; overflow:auto;">'
	+ '<table cellspacing="0" cellpadding="1" border="1" width="600px" >'
	+ '<tr><td width="50%">1</td><td width="50%">2</td></tr><tr><td>2</td><td>2.5</td></tr><tr><td>3</td><td>3</td></tr><tr><td>4</td><td>4</td>'
	+ '</tr><tr><td>5</td><td>10</td></tr><tr><td>6</td><td>12</td></tr></table>'
	+ '</div></td></tr></table>';
	prepareAudio(high_id);
	prepareVisualCharts(data, high_id);
	prepareTextDescription(text, high_id);
	prepareTable(tablecontents, high_id);
	
	updateMain(high_id, "visual");
}

function insertStructure(high_id) {
//	<!-- Just assuming width of 600px for now.. -->
//<!--	<div id="cmlrmain" class="ChartMLRenderingMain" style="width:600px; height:360px; border:1px solid #A4BED4;"></div> -->
	var html = "";
	html += '<div class="ChartMLRenderingMainHolder">';
	html += '<div id="cmlrmain_'+high_id+'_visual" class="ChartMLRenderingMain" style="width:600px; height:360px;"></div>';
	html += '<div id="cmlrmain_'+high_id+'_enhance" class="ChartMLRenderingMain" style="width:600px; height:360px;"></div>';
	html += '<div id="cmlrmain_'+high_id+'_reverse" class="ChartMLRenderingMain" style="width:600px; height:360px;"></div>';
	html += '<div id="cmlrmain_'+high_id+'_audio" class="ChartMLRenderingMain" style="width:600px; height:360px;"></div>';
	html += '<div id="cmlrmain_'+high_id+'_text" class="ChartMLRenderingMain" style="width:600px; height:360px;"></div>';
	html += '<div id="cmlrmain_'+high_id+'_table" class="ChartMLRenderingMain" style="width:600px; height:360px;"></div>';
	html += '</div>';
	html += '<div class="ChartMLRenderingGrossControls">';
	html += '<ul class="ChartMLRenderingGrossControls">';
	html += '<li><button type="submit" onclick="updateMain('+high_id+', '+"visual"+')"><img src="./res/icon_visual.png" alt-text="Visual Graph" height="32px" /><br/>Visual</button></li>';
	html += '<li><button type="submit" onclick="updateMain('+high_id+', '+"enhance"+')"><img src="./res/icon_enhanced.png" alt-text="Enhanced Visuals" /><br />Enhanced</button></li>';
	html += '<li><button type="submit" onclick="updateMain('+high_id+', '+"reverse"+')"><img src="./res/icon_reversed.png" alt-text="Reversed Visuals" /><br />Reversed</button></li>';
	html += '<li><button type="submit" onclick="updateMain('+high_id+', '+"audio"+')"><img src="./res/icon_audio.png" alt-text="Auditory Graph" /><br />Audio</button></li>';
	html += '<li><button type="submit" onclick="updateMain('+high_id+', '+"text"+')"><img src="./res/icon_text.png" alt-text="Text Description" /><br />Text</button></li>';
	html += '<li><button type="submit" onclick="updateMain('+high_id+', '+"table"+')"><img src="./res/icon_table.png" alt-text="Data Table" /><br />Table</button></li>';
	html += '</ul>';
	html += '</div>';
	
	$("#"+high_id).html(html);
}

function prepareAudio(high_id) {
	var html ='<embed src="./res/audio_'+high_id+'.mid" autostart="false" width="600px" height="360px"></embed>';
	$("#cmlrmain_"+high_id+"_audio").html(html);
}

function prepareTable(tablecontents, high_id) {
	$("#cmlrmain_"+high_id+"_table").html(tablecontents);
}

function prepareTextDescription(text, high_id) {
	var html='<textarea readonly style="width:600px; height:360px; font-size:inherit;resize:none;">'+text+'</textarea>';
	
	$("#cmlrmain_"+high_id+"_text").html(html);
}

function prepareVisualCharts(data, high_id) {
	var id_prefix = "cmlrmain_"+high_id;
	var visualChart, enhancedChart, reversedChart;
	chartPrepVisual(data, "cmlrmain_"+high_id+"_visual");
	chartPrepEnhanced(data, "cmlrmain_"+high_id+"_enhance");
	chartPrepReversed(data, "cmlrmain_"+high_id+"_reverse");
}

function chartPrepVisual(data, id) {
//	if(chart) chart.destructor();
	
	var chart = new dhtmlXChart( {
		view: "line",
		container: id,
		value: "#y#",
		tooltip: "#y#",
		item:{
			borderColor:"#ffffff",
            color:"#000000"
    	},
        line:{
        	color:"#ff9900",
            width:3
        },
		xAxis:{
		     title:"x",
		     template:"#x#"
		},
        yAxis:{
		     title:"y"
	    },
	});

	chart.parse(data,"json");
}

function chartPrepEnhanced(data, id) {
	var chart = new dhtmlXChart( {
		view: "line",
		container: id,
		value: "#y#",
		tooltip: "#y#",
		item:{
			borderColor:"#000000",
            color:"#000000"
    	},
        line:{
        	color:"#000000",
            width:3
        },
		xAxis:{
		     title:"x",
		     template:"#x#"
		},
        yAxis:{
		     title:"y"
	    },
	});

	chart.parse(data,"json");
}

function chartPrepReversed(data, id) {
	var chart = new dhtmlXChart( {
		view: "line",
		container: id,
		value: "#y#",
		tooltip: "#y#",
		item:{
			borderColor:"#eeeeee",
            color:"#eeeeee"
    	},
        line:{
        	color:"#eeeeee",
            width:3
        },
		xAxis:{
		     title:"x",
		     template:"#x#"
		},
        yAxis:{
		     title:"y"
	    },
	});

	chart.parse(data,"json");
}

