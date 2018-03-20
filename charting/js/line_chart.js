var today_date = new Date();
var price_first_date = "2013-04-28";
var price_last_date = today_date.getFullYear() + "-" + pad_zero(today_date.getMonth() + 1) + "-" + pad_zero(today_date.getDate());
//price_last_date = "2013-05-09";
// var months_between = 0; 
// if (price_last_date.split("-")[0] === price_first_date.split("-")[0]) {
//     months_between = (parseInt(price_last_date.split("-")[1]) + 1) - parseInt(price_first_date.split("-")[1]);
// } else {
//     months_between = (parseInt(price_last_date.split("-")[1]) + 1) + ((parseInt(price_last_date.split("-")[0]) - 1) - parseInt(price_first_date.split("-")[0])) * 12 + (12 - (parseInt(price_first_date.split("-")[1]) - 1));
// }
var response_live_price = [];
var response_data = {};
var response_date_range = [];


var live_price_curr = "bitcoin";
var prev_curr = "";
var live_price_url_base = "https://factoroom.com/20180206_cryptuxa/hist.php?c=CCCCC&f=FFFFF&t=TTTTT";
var live_price_url = "";
var date_range_url_base = "https://factoroom.com/20180206_cryptuxa/hist.php?c=CCCCC&a=3";
var date_range_url = "";



// this function adds a leading zero for the months 1-9
function pad_zero(month_or_day) {
    if (month_or_day < 10) {
        return "0" + month_or_day;
    } else {
        return month_or_day;
    }
}

// function that pulls live price data
function pullLivePriceData(url){
    var reqq = new XMLHttpRequest();
    reqq.open("GET", url, false);
    reqq.send(null);
    var r = JSON.parse(reqq.response);
    return r;
}


function get_line_chart_data() {
    live_price_url = live_price_url_base.replace("CCCCC", live_price_curr).replace("FFFFF", price_first_date).replace("TTTTT", price_last_date);
    response_live_price = pullLivePriceData(live_price_url);
    response_data = {};
    for (var j = 0; j < response_live_price.length; j++) {
        response_data[response_live_price[j].dat + " " + response_live_price[j].tim] = response_live_price[j].usd;
    }
    return response_data;
}

// get date range
function get_date_range() {
    date_range_url = date_range_url_base.replace("CCCCC", live_price_curr);
    response_date_range = pullLivePriceData(date_range_url);
    price_first_date = response_date_range[0].min;
    price_last_date = today_date.getFullYear() + "-" + pad_zero(today_date.getMonth() + 1) + "-" + pad_zero(today_date.getDate());
    prev_curr = live_price_curr;
}


// Calculate number of days between 2 dates
function days_diff (firstDate, secondDate) {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(firstDate);
    var secondDate = new Date(secondDate);

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}
