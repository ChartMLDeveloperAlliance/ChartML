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

function prepareGraph(high_id, width) {
//	insertStructure(high_id);
	var file = "./data/"+high_id+".csv";
	var csv = $.ajax({
        url: file,
        async: false
     }).responseText;
	var data = CSV.csvToArray(csv);
	
	var text = "The line graph shows a steadily increasing line, starting at (0,1), and moving to the right until x=6. At x=5, there is a jump.";
	
	var rows = data.length;
	var columns = data[0].length;
	var column_width = (width/columns)|0;
	var tablecontents = '<table cellspacing="0" cellpadding="0" border="0" width="325"><tr><td>';
	tablecontents += '<table cellspacing="0" cellpadding="1" border="1" width="'+width+'px" >';
	tablecontents += '<tr>';
	for(index=0; index<columns; index++) {
		tablecontents += '<td>';
		tablecontents += 'data'+index;
		tablecontents += '</td>';
	}
	tablecontents += '</tr>';
	tablecontents += '</table>';
	tablecontents += '</td></tr><tr><td>';
	tablecontents += '<div style="width:600px; height:330px; overflow:auto;">';
	tablecontents += '<table cellspacing="0" cellpadding="1" border="1" width="'+width+'px" >';
	for(row_index=0; row_index<rows; row_index++) {
		tablecontents += '<tr>';
		for(column_index=0; column_index<columns; column_index++) {
			tablecontents += '<td width='+column_width+'px>';
			tablecontents += data[row_index][column_index];
			tablecontents += '</td>';
		}
		tablecontents += '</tr>';
	}
	tablecontents += '</table>'
	tablecontents += '</div></td></tr></table>';
	
	// actual loading of visual charts and table.
	prepareVisualCharts(data, high_id);
	prepareTable(tablecontents, high_id);

	// prefab audio and text
	prepareAudio(high_id);
	prepareTextDescription(text, high_id);

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
	// HACK: force use of 'audio_Stocks.mid'.
	var html ='<embed src="./res/audio_'+'Stocks'+'.mid" autostart="false" width="600px" height="360px"></embed>';
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
	var chart = new dhtmlXChart( {
		view: "line",
		container: id,
		value: "#data1#",
		tooltip: "#data1#",
		item:{
			borderColor:"#0075ab",
            color:"#0075ab",
            width: 0
    	},
        line:{
        	color:"#0075ab",
            width:2
        },
		xAxis:{
		     title:"x",
		     template:"#data0#"
		},
        yAxis:{
		     title:"y"
	    },
	});

	var length = data[0].length;

	for(index=2; index<length; index++) {
		var datalabel = "#data"+index+"#";
		chart.addSeries({
			value: datalabel,
			color: "#00ff00"
		});
	}

	chart.parse(data,"jsarray");
}

function chartPrepEnhanced(data, id) {
	var chart = new dhtmlXChart( {
		view: "line",
		container: id,
		value: "#data1#",
		tooltip: "#data1#",
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
		     template:"#data0#"
		},
        yAxis:{
		     title:"y"
	    },
	});

	var length = data[0].length;

	for(index=2; index<length; index++) {
		var datalabel = "#data"+index+"#";
		chart.addSeries({
			value: datalabel,
			color: "#00ff00"
		});
	}

	chart.parse(data,"jsarray");
}

function chartPrepReversed(data, id) {
	var chart = new dhtmlXChart( {
		view: "line",
		container: id,
		value: "#data1#",
		tooltip: "#data1#",
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
		     template:"#data0#"
		},
        yAxis:{
		     title:"y"
	    },
	});


	var length = data[0].length;

	for(index=2; index<length; index++) {
		var datalabel = "#data"+index+"#";
		chart.addSeries({
			value: datalabel,
			color: "#00ff00"
		});
	}

	chart.parse(data,"jsarray");
}

