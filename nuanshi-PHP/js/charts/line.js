$(function () {
    var sin = [], cos = [];
    for (var i = 0; i < 24; i += 1) {
        sin.push([i, Math.sin(i)]);
        cos.push([i, Math.cos(i)]);
    }

    var plot = $.plot($("#line-chart"),
           [ { data: sin, label: "昨天(x)"}, { data: cos, label: "今天(x)" } ], {
               series: {
                   lines: { show: true },
                   points: { show: true },
				   hoverable: boolean
               },
               
               grid: { hoverable: true, clickable: true },
               yaxis: { min: -1, max: 60 },
			   xaxis: { min: 0, max: 23 },
			  colors: ["#F90", "#3C4049", "#666", "#BBB"]
		
             });
	 
});