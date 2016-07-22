var qultivatorUser = new QultivatorUser({
    endpoint: 'ws://qultivator.whitesmith.co/ws/user'
})
.onData(function (data) {
    console.log(data);
    soilTemperatureChart.update(data.sT);
    soilHumidityChart.update(data.sH);
    environmentHumidityChart.update(data.eH);
    environmentTemperatureChart.update(data.eT);
    lightTemperatureChart.update(data.lT);
    lightIntensityChart.update(data.lI);
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




var soilTemperatureOptions = $.extend( {}, defaultOptions, {
    max: 40,
    series: [{ value: 0, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(0) + '°C' }, 'temperature','soil'], y: DISTANCELABELCENTER },
} );

var soilTemperatureChart = new RadialProgressChart('.soil_temperature', soilTemperatureOptions);

var environmentHumidityOptions = $.extend( {}, defaultOptions, {
    max: 100,
    series: [ { value: 0, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(0) + '%' }, 'humidity','air'], y: DISTANCELABELCENTER },
} );

var environmentHumidityChart = new RadialProgressChart('.environment_humidity', environmentHumidityOptions);


var environmentTemperatureOptions = $.extend( {}, defaultOptions, {
    max: 40,
    series: [ { value: 0, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(0) + '°C' }, 'temperature', 'air' ], y: DISTANCELABELCENTER },
} );

var environmentTemperatureChart = new RadialProgressChart('.environment_temperature', environmentTemperatureOptions);


var lightTemperatureOptions = $.extend( {}, defaultOptions, {
    max: 15000,
    series: [ { value: 0, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(0) + 'K' }, 'temperature', 'light' ], y: DISTANCELABELCENTER },
} );

var lightTemperatureChart = new RadialProgressChart('.light_temperature', lightTemperatureOptions);


var lightIntensityOptions = $.extend( {}, defaultOptions, {
    max: 1000,
    series: [ { value: 0, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(0) + 'lux' }, 'intensity', 'light' ], y: DISTANCELABELCENTER },
} );

var lightIntensityChart = new RadialProgressChart('.light_intensity', lightIntensityOptions);


var soilHumidityOptions = $.extend( {}, defaultOptions, {
    max: 100,
    series: [ { value: 0, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(0) + '%' }, 'humidity', 'soil' ], y: DISTANCELABELCENTER },
} );


var soilHumidityChart = new RadialProgressChart('.soil_humidity', soilHumidityOptions);


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
