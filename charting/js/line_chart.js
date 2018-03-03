var today_date = new Date();
var price_first_date = "2017-02-01";
var price_last_date = today_date.getFullYear() + "-" + pad_zero(today_date.getMonth()) + "-" + today_date.getDate();
price_last_date = "2017-02-05";
var months_between = 0; 
if (price_last_date.split("-")[0] === price_first_date.split("-")[0]) {
    months_between = (parseInt(price_last_date.split("-")[1]) + 1) - parseInt(price_first_date.split("-")[1]);
} else {
    months_between = (parseInt(price_last_date.split("-")[1]) + 1) + ((parseInt(price_last_date.split("-")[0]) - 1) - parseInt(price_first_date.split("-")[0])) * 12 + (12 - (parseInt(price_first_date.split("-")[1]) - 1));
}
var response_live_price = [];
var response_data = {};


var live_price_curr = "ethereum";
var live_price_url_base = "http://li691-76.members.linode.com/20180206_cryptuxa/hist.php?c=CCCCC&f=FFFFF&t=TTTTT";
var live_price_url = "";



// this function adds a leading zero for the months 1-9
function pad_zero(month) {
    if (month < 10) {
        return "0" + month;
    } else {
        return month;
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
    for (var j = 0; j < response_live_price.length; j++) {
        response_data[response_live_price[j].dat + " " + response_live_price[j].tim] = response_live_price[j].usd;
    }
    return response_data;
}