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
    max: 800,
    series: [{ value: 100, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(0) + '°C' }, 'temperature','soil'], y: DISTANCELABELCENTER },
} );

var soilTemperatureChart = new RadialProgressChart('.soil_temperature', soilTemperatureOptions);

var environmentHumidityOptions = $.extend( {}, defaultOptions, {
    max: 4,
    series: [ { value: 1.1, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(2) + '%' }, 'humidity','air'], y: DISTANCELABELCENTER },
} );

var environmentHumidityChart = new RadialProgressChart('.environment_humidity', environmentHumidityOptions);


var environmentTemperatureOptions = $.extend( {}, defaultOptions, {
    max: 4,
    series: [ { value: 2.5, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(2) + '°C' }, 'temperature', 'air' ], y: DISTANCELABELCENTER },
} );

var environmentTemperatureChart = new RadialProgressChart('.environment_temperature', environmentTemperatureOptions);


var lightTemperatureOptions = $.extend( {}, defaultOptions, {
    max: 4,
    series: [ { value: 3.2, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(2) + '°C' }, 'temperature', 'light' ], y: DISTANCELABELCENTER },
} );

var lightTemperatureChart = new RadialProgressChart('.light_temperature', lightTemperatureOptions);


var lightIntensityOptions = $.extend( {}, defaultOptions, {
    max: 4,
    series: [ { value: 1.2, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(2) + 'lux' }, 'intensity', 'light' ], y: DISTANCELABELCENTER },
} );

var lightIntensityChart = new RadialProgressChart('.light_intensity', lightIntensityOptions);


var soilHumidityOptions = $.extend( {}, defaultOptions, {
    max: 4,
    series: [ { value: 2.2, color: ['#8BC34A', '#FF5722'] } ],
    center: { content: [function (d) { return d.toFixed(2) + '%' }, 'humidity', 'soil' ], y: DISTANCELABELCENTER },
} );

console.log(soilHumidityOptions);

var soilHumidityChart = new RadialProgressChart('.soil_humidity', soilHumidityOptions);


var plant = $('.p01').clone().removeClass('p01').addClass('p02');
plant.find('.plant__name')[0].innerText = 'Office';
plant.find('.plant__viewfinder')[0].style = "background-image: url('../images/plant2.jpg');";
$('.garden').append(plant);
var plant2 = $('.p01').clone().removeClass('p01').addClass('p03');
plant2.find('.plant__name')[0].innerText = 'Estufa';
plant2.find('.plant__viewfinder')[0].style = "background-image: url('../images/plant3.jpg');";
$('.garden').append(plant2);

$.each( $('svg'), function( key, el ) {
    el.setAttribute('height','120px');
    $(el).find('.rbc-center-text-line1')[0].setAttribute('dy','44px');
    $(el).find('.rbc-center-text-line2')[0].setAttribute('dy','1.3em');
});

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}


// (function loop() {
//     calories.update(Math.round(getRandom(50, 800)));
//     gpa.update(getRandom(0.5, 3.8));
//     setTimeout(loop, 3000);
// })();
