// js1.js


function updateMain(high_id, type) {
	var id = "cmlrmain_"+high_id+"_"+type;
//	$("#"+high_id).children(".ChartMLRenderingMainHolder").html("test");
	$("#"+high_id).children(".ChartMLRenderingMain").attr('style',"visibility:hidden; height:0; width:0;"); //.css("visibility", "hidden");
//	$("#"+id).attr('style','visibility:visible; width:"600px"; height:"360px"; border="1px solid blue";');//.css("visibility", "visible");
	$("#debug").html(id);
	hideall(high_id);
	$("#"+id).show();
//	$("#"+id).html(content);
}

function hideall(high_id) {
	$("#cmlrmain_"+high_id+"_visual").hide();
	$("#cmlrmain_"+high_id+"_enhance").hide();
	$("#cmlrmain_"+high_id+"_reverse").hide();
	$("#cmlrmain_"+high_id+"_audio").hide();
	$("#cmlrmain_"+high_id+"_text").hide();
	$("#cmlrmain_"+high_id+"_table").hide();
}

// The interesting stuff happens here.
function updateChartMLMain(id, type) { // 2.0 code.
	var content = "";
	var timestamp = new Date().getTime();
	var runChartPrep = false;
	switch(type) {
		case "visual":
			chartPrep("chart_container");
			break;
		case "enhance":
			content = '<img src="./res/graph1_enhanced.png" width="600px" />';
			break;
		case "reverse":
			content = '<img src="./res/graph1_reversed.png" width="600px" />';
			break;
		case "audio":
			content = '<embed src="./res/graph1_audio.mid" autostart="false" width="600px" height="360px"></embed>';
			break;
		case "text":
			content = '<textarea style="width:600px; height:360px; font-size:inherit;">The line graph shows the real personal consumption expenditures increasing from $8,421 to $9,443 between the years 2004 and 2011. We can observe a steady increase from $8,421 in 2004 to $9,340 in the first quarter of 2008. At the end of the first quarter of 2008, it decreases to $9,114 until the first quarter of 2009. From that point on, the expenditures steadily rise to $9,443 in 2011.</textarea>';
			break;
		case "data":
			content = "Data";
			break;
		default:
			content = "Could not find content..";
	}
	$("#"+id).children(".ChartMLRenderingMain").html(content);
	// also may have to change settings in the fine grained area...
}

function loadAtBody() {
	chartPrep("cmlrmain_Stocks_visual");
	chartPrep2("cmlrmain_Stocks_enhance");
	chartPrep3("cmlrmain_Stocks_reverse");
	updateMain("Stocks", "visual");
}


var data = [
	{x: 0, y: 1},
	{x: 1, y: 2},
	{x: 2, y: 2.5},
	{x: 3, y: 3.0},
	{x: 4, y: 4.0},
	{x: 5, y: 10},
	{x: 6, y: 12}
];

function chartPrep(id) {
	if(chart) chart.destructor();
	
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

function chartPrep2(id) {
	if(chart2) chart2.destructor();
	
	var chart2 = new dhtmlXChart( {
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

	chart2.parse(data,"json");
}

function chartPrep3(id) {
	if(chart3) chart3.destructor();
	
	var chart3 = new dhtmlXChart( {
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

	chart3.parse(data,"json");
}

