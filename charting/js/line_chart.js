var today_date = new Date();
var price_first_date = "2013-04-28";
var price_last_date = today_date.getFullYear() + "-" + pad_zero(today_date.getMonth()) + "-" + pad_zero(today_date.getDate());
//price_last_date = "2013-05-09";
var months_between = 0; 
if (price_last_date.split("-")[0] === price_first_date.split("-")[0]) {
    months_between = (parseInt(price_last_date.split("-")[1]) + 1) - parseInt(price_first_date.split("-")[1]);
} else {
    months_between = (parseInt(price_last_date.split("-")[1]) + 1) + ((parseInt(price_last_date.split("-")[0]) - 1) - parseInt(price_first_date.split("-")[0])) * 12 + (12 - (parseInt(price_first_date.split("-")[1]) - 1));
}
var response_live_price = [];
var response_data = {};


var live_price_curr = "bitcoin";
var live_price_url_base = "https://factoroom.com/20180206_cryptuxa/hist.php?c=CCCCC&f=FFFFF&t=TTTTT";
var live_price_url = "";



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
    var token = $('#token_name').val();
    token = token.substring(token.lastIndexOf("(")+1,token.lastIndexOf(")"));
    live_price_curr = symbol_to_id[token];
    live_price_url = live_price_url_base.replace("CCCCC", live_price_curr).replace("FFFFF", price_first_date).replace("TTTTT", price_last_date);
    response_live_price = pullLivePriceData(live_price_url);
    response_data = {};
    for (var j = 0; j < response_live_price.length; j++) {
        response_data[response_live_price[j].dat + " " + response_live_price[j].tim] = response_live_price[j].usd;
    }
    return response_data;
}


// Calculate number of days between 2 dates
function days_diff (firstDate, secondDate) {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(firstDate);
    var secondDate = new Date(secondDate);

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}
