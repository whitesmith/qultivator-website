var qultivatorUser = new QultivatorUser({
    endpoint: 'wss://qultivator.whitesmith.co/ws/user'
    //endpoint: 'ws://192.168.0.9:8080/user'
})
.onData(function (data) {
    p01.soilTemperatureChart.update(data.sT);
    p01.soilHumidityChart.update((data.sH/10));
    p01.environmentHumidityChart.update(data.eH);
    p01.environmentTemperatureChart.update(data.eT);
    p01.lightTemperatureChart.update(data.lT);
    p01.lightIntensityChart.update(data.lI);
});
qultivatorUser.connect();

var defaultOptions = {
    diameter: 50,
    stroke: { width: 12 },
    shadow: { width: 0 },
    animation: { duration: 1000},
    round: false,
    center: { y: 80, },
};
var DISTANCELABELCENTER = 8;


function drawCharts(plant_id, plant_var){
    plant_var.soilTemperatureOptions = $.extend( {}, defaultOptions, {
        max: 40,
        series: [{ value: 0, color: ['#8BC34A', '#FF5722'] } ],
        center: { content: [function (d) { return d.toFixed(0) + '°C' }, 'temperature','soil'], y: DISTANCELABELCENTER },
    } );

    plant_var.soilTemperatureChart = new RadialProgressChart(plant_id + '.soil_temperature', plant_var.soilTemperatureOptions);

    plant_var.environmentHumidityOptions = $.extend( {}, defaultOptions, {
        max: 100,
        series: [ { value: 0, color: ['#8BC34A', '#FF5722'] } ],
        center: { content: [function (d) { return d.toFixed(0) + '%' }, 'humidity','air'], y: DISTANCELABELCENTER },
    } );

    plant_var.environmentHumidityChart = new RadialProgressChart(plant_id + '.environment_humidity', plant_var.environmentHumidityOptions);


    plant_var.environmentTemperatureOptions = $.extend( {}, defaultOptions, {
        max: 40,
        series: [ { value: 0, color: ['#8BC34A', '#FF5722'] } ],
        center: { content: [function (d) { return d.toFixed(0) + '°C' }, 'temperature', 'air' ], y: DISTANCELABELCENTER },
    } );

    plant_var.environmentTemperatureChart = new RadialProgressChart(plant_id + '.environment_temperature', plant_var.environmentTemperatureOptions);


    plant_var.lightTemperatureOptions = $.extend( {}, defaultOptions, {
        max: 15000,
        series: [ { value: 0, color: ['#8BC34A', '#FF5722'] } ],
        center: { content: [function (d) { return d.toFixed(0) + 'K' }, 'temperature', 'light' ], y: DISTANCELABELCENTER },
    } );

    plant_var.lightTemperatureChart = new RadialProgressChart(plant_id + '.light_temperature', plant_var.lightTemperatureOptions);


    plant_var.lightIntensityOptions = $.extend( {}, defaultOptions, {
        max: 1000,
        series: [ { value: 0, color: ['#8BC34A', '#FF5722'] } ],
        center: { content: [function (d) { return d.toFixed(0) + 'lux' }, 'intensity', 'light' ], y: DISTANCELABELCENTER },
    } );

    plant_var.lightIntensityChart = new RadialProgressChart(plant_id + '.light_intensity', plant_var.lightIntensityOptions);


    plant_var.soilHumidityOptions = $.extend( {}, defaultOptions, {
        max: 100,
        series: [ { value: 0, color: ['#8BC34A', '#FF5722'] } ],
        center: { content: [function (d) { return (d).toFixed(0) + '%' }, 'humidity', 'soil' ], y: DISTANCELABELCENTER },
    } );


    plant_var.soilHumidityChart = new RadialProgressChart(plant_id + '.soil_humidity', plant_var.soilHumidityOptions);

    $(plant_id + '.water-icon').click(function(){
        qultivatorUser.water("p01", 1);
    })

    $(plant_id + '.light-icon').click(function(){
        qultivatorUser.light("p01", 1);
    })
}

var p01={}, p02={}, p03={};
drawCharts(".p01 ", p01);
drawCharts(".p02 ", p02);
drawCharts(".p03 ", p03);

setTimeout(function(){
    $.each( $('.garden svg'), function( key, el ) {
        el.setAttribute('height','120px');
        $(el).find('.rbc-center-text-line1')[0].setAttribute('dy','44px');
        $(el).find('.rbc-center-text-line2')[0].setAttribute('dy','1.3em');
    });
},0);

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


// (function loop() {
//     calories.update(Math.round(getRandom(50, 800)));
//     gpa.update(getRandom(0.5, 3.8));
//     setTimeout(loop, 3000);
// })();
