var countdown; // seconds counter
var countdownTimerID; // countdown instance
const cmc_url = "https://api.coinmarketcap.com/v1/ticker/?start=0&limit=0&convert=XXXXX"; // coinmarketcap general url
var cmc_url_active; // coinmarketcap specific url
var url_completion_curr = "CAD"; // the currency for url
var curr_sign_beg = "$"; // currency sign before
var curr_sign_end = ""; // currency sign after
var det_curr_sign_beg = "$"; //detailed currency sign before
var det_curr_sign_end = ""; //detailed currency sign end
var base_currency = "BTC"; // base currency for charts
var price_attr = "price_" + base_currency.toLowerCase(); // price_ attribute defining which key-value pair from response gets called
var market_cap_attr = "market_cap_" + "usd"; // base currency for market cap is usd
var volume_attr = "24h_volume_" + "usd"; // base currency for 24h volume is usd
var logic_currency = "btc"; // base currency for underlying logic
var response = []; // variable to store response from coinmarketcap
var valid_tks = []; // valid tokens

var currs = {}; // list for all currencies in portfolio

var amounts_btc = {}; // amounts of all currencies in bitcoin
var amounts_loc = {}; // amounts of all currencies in local currency
var amounts_usd = {}; // amounts of all currencies in usd
var sorting_dict = {}; // sorting dictionary
var change_1h = {}; // changes in the last hour
var change_24h = {}; // changes in the last 24 hours
var change_7d = {}; // changes in the last 7 days
var change_sorted = {}; //changes highest positive to lowest negative
var volume_usd = {}; // trading volume 24h in usd
var volume_base = {}; // trading volume 24h in base currency
var volume_sorted = {}; // highest trading volume to lowest
var volume_curr = "usd"; // volume currency for charts - usd vs base

var tm_frame = "1h"; // timeframe option for percent change graph

var total_btc; // total value of holdings in BTC
var total_usd; // total value of holdings in USD
var total_loc; // total value of holdings in other local currency
var total_change_1h; // change of total holdings in the last 1h
var total_change_24h; // change of total holdings in the last 24h
var total_change_7d; // change of total holdings in the last 7d

var token; // token variable for addition and removal
var amount; // amount of token for addition and removal

var num_tokens; // how many different tokens person owns

var no_refresh = 0; // flag to avoid refresh
const ref_freq = 60; // refresh frequency in seconds

const precision = 100;

var stats_table; // set the table variable. 

var charts_first_call = 0; // tells whether the charts have ever been drawn


// COLOURS
var white = "rgba(255, 255, 255, 1)";
var black = "rgba(0, 0, 0, 0.5)";
const warm_flame_left = [255, 154, 158, "rgba(255, 154, 158, 1)"];
const warm_flame_right = [250, 208, 196, "rgba(250, 208, 196, 1)"];
var warm_flame_grad = [warm_flame_left, warm_flame_right];
const morning_salad_left = [80, 167, 194, "rgba(80, 167, 194, 1)"];
const morning_salad_right = [183, 248, 219, "rgba(183, 248, 219, 1)"];
var morning_salad_grad = [morning_salad_left, morning_salad_right];
const juicy_peach_left = [252, 182, 159, "rgba(252, 182, 159, 1)"];
const juicy_peach_right = [255, 236, 210, "rgba(255, 236, 210, 1)"];
var juicy_peach_grad = [juicy_peach_left, juicy_peach_right];
const lady_lips_left = [255, 154, 158, "rgba(255, 154, 158, 1)"];
const lady_lips_right = [254, 207, 239, "rgba(254, 207, 239, 1)"];
var lady_lips_grad = [lady_lips_left, lady_lips_right];
const winter_neva_left = [161, 196, 253, "rgba(161, 196, 253, 1)"];
const winter_neva_right = [194, 233, 251, "rgba(194, 233, 251, 1)"];
var winter_neva_grad = [winter_neva_left, winter_neva_right];
const heavy_rain_left = [207, 217, 223, "rgba(207, 217, 223, 1)"];
const heavy_rain_right = [226, 235, 240, "rgba(226, 235, 240, 1)"];
var heavy_rain_grad = [heavy_rain_left, heavy_rain_right];
const cloudy_knoxville_left = [235, 237, 238, "rgba(235, 237, 238, 1)"];
const cloudy_knoxville_right = [253, 251, 251, "rgba(253, 251, 251, 1)"];
var cloudy_knoxville_grad = [cloudy_knoxville_left, cloudy_knoxville_right];
const saint_petersberg_left = [195, 207, 226, "rgba(195, 207, 226, 1)"];
const saint_petersberg_right = [245, 247, 250, "rgba(245, 247, 250, 1)"];
var saint_petersberg_grad = [saint_petersberg_left, saint_petersberg_right];
const plum_plate_left = [118, 75, 162, "rgba(118, 75, 162, 1)"];
const plum_plate_right = [102, 126, 234, "rgba(102, 126, 234, 1)"];
var plum_plate_grad = [plum_plate_left, plum_plate_right];
const everlasting_sky_left = [226, 209, 195, "rgba(226, 209, 195, 1)"];
const everlasting_sky_right = [253, 252, 251, "rgba(253, 252, 251, 1)"];
var everlasting_sky_grad = [everlasting_sky_left, everlasting_sky_right];
const happy_fisher_left = [102, 166, 255, "rgba(102, 166, 255, 1)"];
const happy_fisher_right = [137, 247, 254, "rgba(137, 247, 254, 1)"];
var happy_fisher_grad = [happy_fisher_left, happy_fisher_right];
const fly_high_left = [72, 198, 239, "rgba(72, 198, 239, 1)"];
const fly_high_right = [111, 134, 214, "rgba(111, 134, 214, 1)"];
var fly_high_grad = [fly_high_left, fly_high_right];
const fresh_milk_left = [254, 173, 166, "rgba(254, 173, 166, 1)"];
const fresh_milk_right = [245, 239, 239, "rgba(245, 239, 239, 1)"];
var fresh_milk_grad = [fresh_milk_left, fresh_milk_right];
const great_whale_left = [105, 145, 199, "rgba(105, 145, 199, 1)"];
const great_whale_right = [163, 189, 237, "rgba(163, 189, 237, 1)"];
var great_whale_grad = [great_whale_left, great_whale_right];
const aqua_splash_left = [19, 84, 122, "rgba(19, 84, 122, 1)"];
const aqua_splash_right = [128, 208, 199, "rgba(128, 208, 199, 1)"];
var aqua_splash_grad = [aqua_splash_left, aqua_splash_right];
const clean_mirror_left = [147, 165, 207, "rgba(147, 165, 207, 1)"];
const clean_mirror_right = [228, 239, 233, "rgba(228, 239, 233, 1)"];
var clean_mirror_grad = [clean_mirror_left, clean_mirror_right];
const premium_dark_left = [0, 0, 0, "rgba(0, 0, 0, 1)"];
const premium_dark_right = [67, 67, 67, "rgba(67, 67, 67, 1)"];
var premium_dark_grad = [premium_dark_left, premium_dark_right];
const cochiti_lake_left = [147, 165, 207, "rgba(147, 165, 207, 1)"];
const cochiti_lake_right = [228, 239, 233, "rgba(228, 239, 233, 1)"];
var cochiti_lake_grad = [cochiti_lake_left, cochiti_lake_right];
const passionate_bed_left = [255, 117, 140, "rgba(255, 117, 140, 1)"];
const passionate_bed_right = [255, 126, 179, "rgba(255, 126, 179, 1)"];
var passionate_bed_grad = [passionate_bed_left, passionate_bed_right];
const mountain_rock_left = [89, 97, 100, "rgba(89, 97, 100, 1)"];
const mountain_rock_right = [134, 143, 150, "rgba(134, 143, 150, 1)"];
var mountain_rock_grad = [mountain_rock_left, mountain_rock_right];
const desert_hump_left = [199, 144, 129, "rgba(199, 144, 129, 1)"];
const desert_hump_right = [223, 165, 121, "rgba(223, 165, 121, 1)"];
var desert_hump_grad = [desert_hump_left, desert_hump_right];
const eternal_constance_left = [9, 32, 63, "rgba(9, 32, 63, 1)"];
const eternal_constance_right = [83, 120, 149, "rgba(83, 120, 149, 1)"];
var eternal_constance_grad = [eternal_constance_left, eternal_constance_right];
const healthy_water_left = [80, 201, 195, "rgba(80, 201, 195, 1)"];
const healthy_water_right = [150, 222, 218, "rgba(150, 222, 218, 1)"];
var healthy_water_grad = [healthy_water_left, healthy_water_right];
const vicious_stance_left = [41, 50, 60, "rgba(41, 50, 60, 1)"];
const vicious_stance_right = [72, 85, 99, "rgba(72, 85, 99, 1)"];
var vicious_stance_grad = [vicious_stance_left, vicious_stance_right];
const nega_left = [238, 156, 167, "rgba(238, 156, 167, 1)"];
const nega_right = [255, 221, 225, "rgba(255, 221, 225, 1)"];
var nega_grad = [nega_left, nega_right];
const night_sky_left = [30, 60, 114, "rgba(30, 60, 114, 1)"];
const night_sky_right = [42, 82, 152, "rgba(42, 82, 152, 1)"];
var night_sky_grad = [night_sky_left, night_sky_right];
const gentle_care_left = [255, 175, 189, "rgba(255, 175, 189, 1)"];
const gentle_care_right = [255, 195, 160, "rgba(255, 195, 160, 1)"];
var gentle_care_grad = [gentle_care_left, gentle_care_right];

var theme_grad = morning_salad_grad;



// set first url link
cmc_url_active = curr_url();
// Get crypto current crypto information
response = pullCryptoData(cmc_url_active);
for (var item = 0; item < response.length; item++) {
    valid_tks.push(response[item].symbol);
}


// this function completes the url for API call
function curr_url (){
    if (base_currency === "BTC" || base_currency === "USD") {
        url_completion_curr = "CAD";
        logic_currency = base_currency.toLowerCase();
        volume_curr = "usd";
        volume_attr = "24h_volume_" + volume_curr; // base currency for volume is usd
        market_cap_attr = "market_cap_usd"; // base currency for market cap is usd
    } else {
        url_completion_curr = base_currency;
        logic_currency = "loc";
    }

    set_curr_sign();
    
    return cmc_url.replace("XXXXX", url_completion_curr);
}

// this function sets currency sign
function set_curr_sign (){
    switch (base_currency) {
        case "AUD":
            curr_sign_beg = "AU$";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "BRL":
            curr_sign_beg = "R$";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "BTC":
            curr_sign_beg = "C$";
            curr_sign_end = "";
            det_curr_sign_beg = "Ƀ";
            det_curr_sign_end = "";
            break;
        case "USD":
            curr_sign_beg = "C$";
            curr_sign_end = "";
            det_curr_sign_beg = "$";
            det_curr_sign_end = "";
            break;
        case "CAD":
            curr_sign_beg = "C$";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "CHF":
            curr_sign_beg = "";
            curr_sign_end = " Fr.";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "CLP":
            curr_sign_beg = "CH$";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "CNY":
            curr_sign_beg = "¥";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "CZK":
            curr_sign_beg = "";
            curr_sign_end = " Kč";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "DKK":
            curr_sign_beg = "";
            curr_sign_end = " kr";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "EUR":
            curr_sign_beg = "€";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "GBP":
            curr_sign_beg = "£";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "HKD":
            curr_sign_beg = "HK$";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "HUF":
            curr_sign_beg = "";
            curr_sign_end = " Ft";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "IDR":
            curr_sign_beg = "Rp ";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "ILS":
            curr_sign_beg = "₪";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "INR":
            curr_sign_beg = "₹";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "JPY":
            curr_sign_beg = "¥";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "KRW":
            curr_sign_beg = "₩";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "MXN":
            curr_sign_beg = "M$";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "MYR":
            curr_sign_beg = "RM";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "NOK":
            curr_sign_beg = "";
            curr_sign_end = " kr";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "NZD":
            curr_sign_beg = "NZ$";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "PHP":
            curr_sign_beg = "₱";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "PKR":
            curr_sign_beg = "Rs. ";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "PLN":
            curr_sign_beg = "";
            curr_sign_end = " zł";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "RUB":
            curr_sign_beg = "";
            curr_sign_end = " руб";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "SEK":
            curr_sign_beg = "";
            curr_sign_end = " kr";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "SGD":
            curr_sign_beg = "S$";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "THB":
            curr_sign_beg = "฿";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "TRY":
            curr_sign_beg = "₺";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
        case "TWD":
            curr_sign_beg = "NT$";
            curr_sign_end = "";
            det_curr_sign_beg = curr_sign_beg;
            det_curr_sign_end = curr_sign_end;
            break;
    }
}

// API call to pull crypto data
function pullCryptoData(url){
    countdown = ref_freq;
    
    var reqq = new XMLHttpRequest();
    reqq.open("GET", url, false);
    reqq.send(null);
    var r = JSON.parse(reqq.response);
    return r;
}

//Add, remove token to graphs or refresh graph
function chart_actions(operation){
    token = $('#token_name').val()
	token=token.substring(token.lastIndexOf("(")+1,token.lastIndexOf(")"));
	
    amount = parseFloat(document.getElementById("token_amount").value);
    if (operation === "add"){
        addToken(token, amount);
    } else if (operation === "remove"){
        removeToken(token, amount);
    } else if (operation === "refresh"){
        ;
    }
    
    // no reason to update charts if the token that the user is trying to update is invalid
    if(no_refresh !== 1){
        update_chart();
    }
    no_refresh = 0;
}

//Add an amount of token specified to current portfolio
function addToken(token, amount){
    
    // Update the token amounts
    if(!(valid_tks.includes(token))) {
        no_refresh = 1;
        alert("The token you are trying to update is not a valid token!");
    } else if (isNaN(amount) || amount <= 0){
        no_refresh = 1;
        alert("The amount of tokens has to be a positive number!");
    } else if (!(token in currs)){
        // Check if charts have not been drawn yet
        if ($.isEmptyObject(currs)){
            if (charts_first_call === 0){
                charts_first_call = 1;
                coinMarketCap();
            }	
            // Initialize the counter
            countdown = ref_freq;
            clearInterval(countdownTimerID);
            countdownTimerID = setInterval(countMeDown, 1000);
        }
        currs[token] = amount;
    } else {
        currs[token] = currs[token] + amount;
    }
}

// Remove an amount of token specified from current portfolio
function removeToken(token, amount){
    if(!(valid_tks.includes(token))) {
        no_refresh = 1;
        alert("The token you are trying to update is not a valid token!");
    } else if (isNaN(amount) || amount <= 0){
        no_refresh = 1;
        alert("The amount of tokens has to be a positive number!");
    } else if (!(token in currs)){
        alert("Removing a token that you haven't added will not do anything!");
    } else {
        if(amount < 0){
            alert("Instead of removing a negative amount of token just add token!");
        } else {
            currs[token] = currs[token] - amount; 
            if (currs[token] <= 0) {
                delete currs[token];  
            }
        }
    }
}

// this is the function that sorts a dictionary in order
function sort_curr(dict_stat) {
    var currs_list = Object.keys(dict_stat).map(function(key) {
        return [key, dict_stat[key]];
    });
    currs_list.sort(function(first, second) {
        return second[1] - first[1];
    });
    dict_stat = {};
    for (var i = 0; i < currs_list.length; i++) {
        dict_stat[currs_list[i][0]] = currs_list[i][1];
    }
    return dict_stat;
}

//Update the chart
function update_chart(){
    parse_cmc_data();
    get_line_chart_data();

    change_sorted = sort_curr(eval("change_" + tm_frame));
    volume_sorted = sort_curr(eval("volume_" + volume_curr));

    valueChart.data = {
      labels: Object.keys(currs),
      datasets: [{
          label: "Value in " + base_currency,
          data: get_values(eval("amounts_" + logic_currency)),
          backgroundColor: gradient_color(eval("amounts_" + logic_currency), theme_grad), //generate_colors(amounts_btc),
          borderColor: white, //generate_colors(amounts_btc),
          borderWidth: 2,
          hoverBackgroundColor: black //generate_colors(amounts_btc)
      }]
    };
    //valueChart.data.datasets[0].data = get_values(eval("amounts_" + logic_currency));
    valueChart.update();

    percChangeChart.data = {
      labels: Object.keys(change_sorted),
      datasets: [{
          label: "Percent Change " + tm_frame, // + base_currency,
          data: get_values(change_sorted), //eval("amounts_" + logic_currency)),
          backgroundColor: gradient_color(change_sorted, theme_grad), //eval("amounts_" + logic_currency), theme_grad), //generate_colors(amounts_btc),
          borderColor: white, //generate_colors(amounts_btc),
          borderWidth: 2,
          hoverBackgroundColor: black //generate_colors(amounts_btc)
      }]
    };
    //percChangeChart.data.datasets[0].data = get_values(eval("amounts_" + logic_currency));
    percChangeChart.update();

    volumeChart.data = {
      labels: Object.keys(volume_sorted),
      datasets: [{
          label: "Trading Volume in " + volume_attr.split("_")[2].toUpperCase(),
          data: get_values(volume_sorted),
          backgroundColor: gradient_color(volume_sorted, theme_grad), //generate_colors(amounts_btc),
          borderColor: white, //generate_colors(amounts_btc),
          borderWidth: 2,
          hoverBackgroundColor: black //generate_colors(amounts_btc)
      }]
    };
//    pieChart.data.datasets[0].data = get_values(amounts_btc);
    volumeChart.update();

    pieChart.data = {
      labels: Object.keys(currs),
      datasets: [{
          label: "Percentage",
          data: get_values(eval("amounts_" + logic_currency)),
          backgroundColor: gradient_color(eval("amounts_" + logic_currency), theme_grad), //generate_colors(amounts_btc),
          borderColor: white, //generate_colors(amounts_btc),
          borderWidth: 2,
          hoverBackgroundColor: black //generate_colors(amounts_btc)
      }]
    };
//    pieChart.data.datasets[0].data = get_values(amounts_btc);
    pieChart.update();

    livePriceChart.data = {
      labels: [1, 2, 3],
      datasets: [{
          label: "BTC",
          data: [157.32, 20, 15], //get_values(eval("amounts_" + logic_currency)),
          backgroundColor: gradient_color([""], theme_grad), //generate_colors(amounts_btc),
          borderColor: gradient_color([""], theme_grad), //generate_colors(amounts_btc),
          fill: true
      }]
    };
//    pieChart.data.datasets[0].data = get_values(amounts_btc);
    livePriceChart.update();
}

// function responsible for calling cointmarketcap and getting currency data
function parse_cmc_data(){    
    // Clear currency array values
    sorting_dict = {};
    
    // Loop through necessary currencies and pull data from API
    for (var key in currs) {
        for (var item = 0; item < response.length; item++) {
            if (response[item].symbol === key) {
                sorting_dict[key] = response[item][price_attr] * currs[key];
                //[amounts_btc[key], amounts_loc[key], amounts_usd[key], change_1h[key], change_24h[key], change_7d[key]] = [response[item].price_btc * currs[key], response[item].price_cad * currs[key], response[item].price_usd * currs[key], response[item].percent_change_1h, response[item].percent_change_24h, response[item].percent_change_7d];
            }
        }
    }
    
    // here we soft by the value in btc - FINISH THE CODE TO UPDATE ALL DICTIONARIES NOT JUST CURR - MAKE IT MORE MODULAR TO CHOSE WHICH VALUE TO COMPARE ON AND CREATE A REFRESH ON SORT FOR ALL DICTIONARIES
    sorting_dict = sort_curr(sorting_dict);
    for (var key in sorting_dict) {
        var temp_value = currs[key];
        delete currs[key];
        currs[key] = temp_value;
    }
    
    populate_val_dicts();
}

// populate values dictionaries
function populate_val_dicts () {
    // Clear currency array values
    amounts_btc = {};
    amounts_loc = {};
    amounts_usd = {};
    change_1h = {};
    change_24h = {};
    change_7d = {};
    volume_usd = {};
    volume_base = {};

    num_tokens = 0;

    total_btc = 0;
    total_usd = 0;
    total_loc = 0;
    total_change_1h = 0;
    total_change_24h = 0;
    total_change_7d = 0;

    // kpis_table = document.getElementById("kpis_table");
    // kpis_table.innerHTML = "";
    // kpis_table.innerHTML = "<tr><th width='150px'>Total in BTC</th><th width='150px'>Total in USD</th><th width='150px'>Total in " + url_completion_curr + "</th><th width='150px'>Total Change 1h USD</th><th width='150px'>Total Change 24h USD</th><th width='150px'>Total Change 7d USD</th></tr>";

    stats_table = document.getElementById("stats_table");
    stats_table.innerHTML = "";
    stats_table.innerHTML = "<tr><th width='100px'>#</th><th width='100px'>Token</th><th width='100px'>Quantity</th><th width='100px'>Price in " + base_currency + "</th><th width='100px'>Total in " + base_currency + "</th><th width='100px'>Change 1h USD</th><th width='100px'>Change 24h USD</th><th width='100px'>Change 7d USD</th><th width='100px'>Rank</th><th width=100px'>Market Cap " + market_cap_attr.split("_")[2].toUpperCase() + "</th><th width=100px'>Volume 24h " + volume_attr.split("_")[2].toUpperCase() + "</th></tr>";

    // Loop through necessary currencies and pull data from API			
    for (var key in currs) {
        for (var item = 0; item < response.length; item++) {
            if (response[item].symbol === key) {
                [amounts_btc[key], amounts_loc[key], amounts_usd[key], change_1h[key], change_24h[key], change_7d[key], volume_usd[key], volume_base[key]] = [response[item].price_btc * currs[key], Math.round(response[item][price_attr] * currs[key] * precision) / precision, Math.round(response[item].price_usd * currs[key] * precision) / precision, response[item].percent_change_1h, response[item].percent_change_24h, response[item].percent_change_7d, response[item]["24h_volume_usd"], response[item][volume_attr]];

                num_tokens++;

                total_btc += currs[key] * response[item].price_btc;
                total_usd += currs[key] * response[item].price_usd;
                total_loc += currs[key] * response[item]["price_" + url_completion_curr.toLowerCase()];
                
                stats_table.innerHTML += "<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                setCellContents(stats_table, num_tokens, 0, num_tokens, 0);
                setCellContents(stats_table, num_tokens, 1, key, 0);
                setCellContents(stats_table, num_tokens, 2, (Math.round(currs[key] * precision) / precision).toLocaleString(), 0);
                setCellContents(stats_table, num_tokens, 3, det_curr_sign_beg + parseFloat(Math.round(response[item][price_attr] * 100) / 100).toLocaleString() + det_curr_sign_end, 0);
                setCellContents(stats_table, num_tokens, 4, det_curr_sign_beg + (Math.round(currs[key] * response[item][price_attr] * 100) / 100).toLocaleString() + det_curr_sign_end, 0);
                setCellContents(stats_table, num_tokens, 5, response[item].percent_change_1h, 1);
                setCellContents(stats_table, num_tokens, 6, response[item].percent_change_24h, 1);
                setCellContents(stats_table, num_tokens, 7, response[item].percent_change_7d, 1);
                setCellContents(stats_table, num_tokens, 8, response[item].rank, 0);
                if (base_currency === "BTC"){
                    setCellContents(stats_table, num_tokens, 9, "$" + Math.round(response[item][market_cap_attr]).toLocaleString(), 0);
                    setCellContents(stats_table, num_tokens, 10, "$" + Math.round(response[item][volume_attr]).toLocaleString(), 0);
                } else {
                    setCellContents(stats_table, num_tokens, 9, det_curr_sign_beg + Math.round(response[item][market_cap_attr]).toLocaleString() + det_curr_sign_end, 0);
                    setCellContents(stats_table, num_tokens, 10, det_curr_sign_beg + Math.round(response[item][volume_attr]).toLocaleString() + det_curr_sign_end, 0);
                }
            }
        }
    }
	
	//alert(stats_table);
	
    for (var key in amounts_usd) {
        total_change_1h += (amounts_usd[key] / total_usd) * change_1h[key];
        total_change_24h += (amounts_usd[key] / total_usd) * change_24h[key];
        total_change_7d += (amounts_usd[key] / total_usd) * change_7d[key];
    }

    // kpis_table.innerHTML += "<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    //             setCellContents(kpis_table, 1, 0, (Math.round(total_btc * precision) / precision).toLocaleString(), 0);
    //             setCellContents(kpis_table, 1, 1, "$" + (Math.round(total_usd * 100) / 100).toLocaleString(), 0);
    //             setCellContents(kpis_table, 1, 2, (Math.round(total_loc * 100) / 100).toLocaleString(), 0);
    //             setCellContents(kpis_table, 1, 3, Math.round(total_change_1h * 100) / 100, 1);
    //             setCellContents(kpis_table, 1, 4, Math.round(total_change_24h * 100) / 100, 1);
    //             setCellContents(kpis_table, 1, 5, Math.round(total_change_7d * 100) / 100, 1);
	
	
	total_change_1h_c = (total_change_1h >0 ? "green" : "red");
	total_change_24h_c = (total_change_24h >0 ? "green" : "red");
	total_change_7d_c = (total_change_7d >0 ? "green" : "red");
	
	render_template(
		{ 
			"i_val_1" : "Ƀ" + shorten_value(total_btc, 1),
			"i_val_2" : "$" + shorten_value(total_usd, 0),
			"i_val_3" : curr_sign_beg + shorten_value(total_loc, 0) + curr_sign_end,
			"i_val_4" : Math.round(total_change_1h * 100) / 100 + "%",
			"i_val_5" : Math.round(total_change_24h * 100) / 100 + "%",
			"i_val_6" : Math.round(total_change_7d * 100) / 100 + "%",
			"i_val_4_c": total_change_1h_c,
			"i_val_5_c": total_change_24h_c,
			"i_val_6_c": total_change_7d_c,
			"i_base_cur" :  url_completion_curr
		},
		"templates/kpis_tile.html",
		'kpis_tile'
	);				
}

function shorten_value(value, is_btc){
    if(is_btc){
        if (value >= 1000000000) {
            return (Math.round(value/1000000000 * 100) / 100).toLocaleString() + "B";
        } else if (value >= 1000000) {
            return (Math.round(value/1000000 * 100) / 100).toLocaleString() + "M";
        } else {
            return (Math.round(value * 100) / 100).toLocaleString();
        }
    } else {
        if (value >= 1000000000) {
            return (Math.round(value/1000000000 * 100) / 100).toLocaleString() + "B";
        } else if (value >= 1000000) {
            return (Math.round(value/1000000 * 100) / 100).toLocaleString() + "M";
        } else {
            return Math.round(value).toLocaleString();
        }
    }
}

// function that draws the charts
function coinMarketCap(){


  var valueCanvas = document.getElementById("valueChart");
  valueChart = new Chart(valueCanvas, {
      type: 'horizontalBar',
      data: {
          labels: Object.keys(currs),
          datasets: [{
              label: "Value in " + base_currency,
              data: get_values(eval("amounts_" + logic_currency)),
              backgroundColor: gradient_color(eval("amounts_" + logic_currency), theme_grad), //generate_colors(amounts_btc),
              borderColor: white, //generate_colors(amounts_btc),
              borderWidth: 2,
              hoverBackgroundColor: black //generate_colors(amounts_btc)
          }]
      },
      options: {
        tooltips: {
            callbacks: {
                label: function(tooltipItems, data) { 
                    return det_curr_sign_beg + " " + tooltipItems.xLabel.toLocaleString() + det_curr_sign_end;
                }
            }
        },
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return value.toLocaleString();
                    }
                }
            }]
        },
		responsive: true,
		maintainAspectRatio: false
      }
  });

  var percChangeCanvas = document.getElementById("percChangeChart");
  percChangeChart = new Chart(percChangeCanvas, {
      type: 'bar',
      data: {
          labels: Object.keys(currs),
          datasets: [{
              label: "Percent Change " + tm_frame, //,
              data: get_values(eval("change_" + tm_frame)), //eval("amounts_" + logic_currency)),
              backgroundColor: gradient_color(eval("change_" + tm_frame), theme_grad), //eval("amounts_" + logic_currency), theme_grad), //generate_colors(amounts_btc),
              borderColor: white, //generate_colors(amounts_btc),
              borderWidth: 2,
              hoverBackgroundColor: black //generate_colors(amounts_btc)
          }]
      },
      options: {
        tooltips: {
            callbacks: {
                label: function(tooltipItems, data) { 
                    return tooltipItems.yLabel + "%";
                }
            }
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return Math.round(value.toFixed(4) * 100) / 100 + "%";
                    }
                }
            }]
        },
    layout: {
        padding: {
            left: 10
        }
    },
		responsive: true,
		maintainAspectRatio: false
      }
  });

  var volumeCanvas = document.getElementById("volumeChart");
  volumeChart = new Chart(volumeCanvas, {
      type: 'bar',
      data: {
          labels: Object.keys(currs),
          datasets: [{
              label: "Trading Volume ",
              data: get_values(eval("volume_" + volume_curr)),
              backgroundColor: gradient_color(eval("volume_" + volume_curr), theme_grad), //generate_colors(amounts_btc),
              borderColor: white, //generate_colors(amounts_btc),
              borderWidth: 2,
              hoverBackgroundColor: black //generate_colors(amounts_btc)
          }]
      },
      options: {
        tooltips: {
            callbacks: {
                label: function(tooltipItems, data) { 
                    if (base_currency === "BTC"){
                        return "$" + tooltipItems.yLabel.toLocaleString();
                    } else {
                        return det_curr_sign_beg + tooltipItems.yLabel.toLocaleString() + det_curr_sign_end;
                    }
                }
            }
        },
        legend: {
            display: false,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        if (value >= 1000000000) {
                            return value/1000000000 + " bil";
                        } else if (value >= 1000000) {
                            return value/1000000 + " mil";
                        } else if (value >= 1000) {
                            return value/1000 + " thou";
                        } else {
                            return Math.round(value * 10) / 10;
                        }
                    }
                }
            }]
        },
        layout: {
            padding: {
                left: 10
            }
        },
        responsive: true,
        maintainAspectRatio: false
      }
  });

  var pieCanvas = document.getElementById("pieChart");
  pieChart = new Chart(pieCanvas, {
      type: 'doughnut',
      data: {
          labels: Object.keys(currs),
          datasets: [{
              label: "Percentage",
              data: get_values(eval("amounts_" + logic_currency)),
              backgroundColor: gradient_color(eval("amounts_" + logic_currency), theme_grad), //generate_colors(amounts_btc),
              borderColor: white, //generate_colors(amounts_btc),
              borderWidth: 2,
              hoverBackgroundColor: black //generate_colors(amounts_btc)
          }]
      },
      options: {
          tooltips: {
              callbacks: {
                  label: function(tooltipItems, data) { 
                      return data.labels[tooltipItems.index] + ": " + det_curr_sign_beg + " " + data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index].toLocaleString() + det_curr_sign_end;
                  }
              }
          },
          legend: {
              onClick: null
          },
          cutoutPercentage: 25,
		  responsive: true,
		  maintainAspectRatio: false
      }
  });

    var livePriceCanvas = document.getElementById("livePriceChart");
    livePriceChart = new Chart(livePriceCanvas, {
      type: 'line',
      data: {
          labels: [1, 2, 3],
          datasets: [{
              label: "BTC",
              data: [157.32, 20, 15], //get_values(eval("amounts_" + logic_currency)),
              backgroundColor: gradient_color([""], theme_grad), //generate_colors(amounts_btc),
              borderColor: gradient_color([""], theme_grad), //generate_colors(amounts_btc),
              fill: true
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
          },
          tooltips: {
            callbacks: {
                label: function(tooltipItems, data) { 
                    return "$ " + tooltipItems.yLabel.toLocaleString(); // return det_curr_sign_beg + " " + tooltipItems.xLabel.toLocaleString() + det_curr_sign_end;
                }
            }
          },
          legend: {
              onClick: null
          }
      }
  });
  //alert(Object.keys(livePriceChart.options.scales.yAxes[0].position));
}


// Get dictionary values
function get_values(dict) {
    var values = [];
    for (var key in dict) {
        values.push(dict[key]);
    }
    return values;
}

// Generate enough colours based on number of currencies in dictionary
function generate_colors(dict){
    var colours = [];
    for (var key in dict) {
        colours.push(random_color());
    }
    return colours;
}

// Random colour function
function random_color(){
  return 'rgba(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + (0.5 + Math.random()*0.3) + ')';
}

// Gradient colours function
function gradient_color(dict, grad) {
    var colours = [];
    var steps = Object.keys(dict).length - 1;
    if (steps === 0) {
        return 'rgba(' + Math.floor(grad[0][0] + (grad[1][0] - grad[0][0]) / 2) + ',' + Math.floor(grad[0][1] + (grad[1][1] - grad[0][1]) / 2) + ',' + Math.floor(grad[0][2] + (grad[1][2] - grad[0][2]) / 2) + ',' + 0.8 + ')';
    }
    
    var step_r = (grad[1][0] - grad[0][0]) / steps;
    var step_g = (grad[1][1] - grad[0][1]) / steps;
    var step_b = (grad[1][2] - grad[0][2]) / steps;
    
    for (var i = 0; i < Object.keys(dict).length; i++) {
        colours.push('rgba(' + Math.floor(grad[0][0] + i * step_r) + ',' + Math.floor(grad[0][1] + i * step_g) + ',' + Math.floor(grad[0][2] + i * step_b) + ',' + 0.8 + ')');
        
    }
    return colours;
}

// Percent change timeframe selection
function change_perc_timefr (timefr) {
    tm_frame = timefr.split(" ")[0] + timefr.split(" ")[1].charAt(0);
    update_chart();
}

// Base reporting currency
function change_base_curr (curr_select) {
    base_currency = curr_select;
    price_attr = "price_" + base_currency.toLowerCase();
    market_cap_attr = "market_cap_" + base_currency.toLowerCase();
    volume_curr = "base";
    volume_attr = "24h_volume_" + base_currency.toLowerCase();
    cmc_url_active = curr_url();
    response = pullCryptoData(cmc_url_active);
    update_chart();
}

// Skin colour change
function theme_colour (theme) {
    switch (theme.value) {
        case "warm_flame":
            theme_grad = warm_flame_grad;
            break;
        case "morning_salad":
            theme_grad = morning_salad_grad;
            break;
        case "juicy_peach":
            theme_grad = juicy_peach_grad;
            break;
        case "lady_lips":
            theme_grad = lady_lips_grad;
            break;
        case "winter_neva":
            theme_grad = winter_neva_grad;
            break;
        case "heavy_rain":
            theme_grad = heavy_rain_grad;
            break;
        case "cloudy_knoxville":
            theme_grad = cloudy_knoxville_grad;
            break;
        case "saint_petersberg":
            theme_grad = saint_petersberg_grad;
            break;
        case "plum_plate":
            theme_grad = plum_plate_grad;
            break;
        case "everlasting_sky":
           theme_grad = everlasting_sky_grad;
           break;
        case "happy_fisher":
            theme_grad = happy_fisher_grad;
            break;
        case "fly_high":
            theme_grad = fly_high_grad;
            break;
        case "fresh_milk":
            theme_grad = fresh_milk_grad;
            break;
        case "great_whale":
            theme_grad = great_whale_grad;
            break;
        case "aqua_splash":
            theme_grad = aqua_splash_grad;
            break;
        case "clean_mirror":
            theme_grad = clean_mirror_grad;
            break;
        case "premium_dark":
            theme_grad = premium_dark_grad;
            break;
        case "cochiti_lake":
            theme_grad = cochiti_lake_grad;
            break;
        case "passionate_bed":
            theme_grad = passionate_bed_grad;
            break;
        case "mountain_rock":
            theme_grad = mountain_rock_grad;
            break;
        case "desert_hump":
            theme_grad = desert_hump_grad;
            break;
        case "eternal_constance":
            theme_grad = eternal_constance_grad;
            break;
        case "healthy_water":
            theme_grad = healthy_water_grad;
            break;
        case "vicious_stance":
            theme_grad = vicious_stance_grad;
            break;
        case "nega":
            theme_grad = nega_grad;
            break;
        case "night_sky":
            theme_grad = night_sky_grad;
            break;
        case "gentle_care":
            theme_grad = gentle_care_grad;
            break;
    }
    update_chart();
}

// This function updates the stats table
function setCellContents(table, rowIndex, colIndex, newContents, percent) {
    if (percent === 1) {
        table.rows[rowIndex].cells[colIndex].innerHTML = newContents + "%";
        if (newContents > 0) {
            table.rows[rowIndex].cells[colIndex].style.color = "green";
        } else if (newContents < 0) {
            table.rows[rowIndex].cells[colIndex].style.color = "red";
        }
    } else {
        table.rows[rowIndex].cells[colIndex].innerHTML = newContents;
    }
}

// Refresh counter decrement function
function countMeDown(){
    if(countdown === 0){
        clearInterval(countdownTimerID);
        response = pullCryptoData(cmc_url_active);
        update_chart();
        countdownTimerID = setInterval(countMeDown, 1000);
    }
    
    document.getElementById("Countdown").innerHTML = "The page will refresh in " + countdown + " seconds";
    countdown--;
}


////HEX TO RGB COLOUR CONVERTER//////////////
//var name = "Juicy Peach";
//var colours = "#ffecd2 → #fcb69f";
//
//function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
//function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
//function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
//function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
//
//writeln("const " + name.split(" ")[0].toLowerCase() + "_" + name.split(" ")[1].toLowerCase() + "_left = [" + hexToR(colours.split(" ")[0].split("#")[1]) + ", " + hexToG(colours.split(" ")[0].split("#")[1]) + ", " + hexToB(colours.split(" ")[0].split("#")[1]) + ", \"rgba(" + hexToR(colours.split(" ")[0].split("#")[1]) + ", " + hexToG(colours.split(" ")[0].split("#")[1]) + ", " + hexToB(colours.split(" ")[0].split("#")[1]) + ", 1)\"];\nconst " + name.split(" ")[0].toLowerCase() + "_" + name.split(" ")[1].toLowerCase() + "_right = [" + hexToR(colours.split(" ")[2].split("#")[1]) + ", " + hexToG(colours.split(" ")[2].split("#")[1]) + ", " + hexToB(colours.split(" ")[2].split("#")[1]) + ", \"rgba(" + hexToR(colours.split(" ")[2].split("#")[1]) + ", " + hexToG(colours.split(" ")[2].split("#")[1]) + ", " + hexToB(colours.split(" ")[2].split("#")[1]) + ", 1)\"];\nvar " + name.split(" ")[0].toLowerCase() + "_" + name.split(" ")[1].toLowerCase() + "_grad = [" + name.split(" ")[0].toLowerCase() + "_" + name.split(" ")[1].toLowerCase() + "_left" + ", " + name.split(" ")[0].toLowerCase() + "_" + name.split(" ")[1].toLowerCase() + "_right];\n\ncase \"" + name.split(" ")[0].toLowerCase() + "_" + name.split(" ")[1].toLowerCase() + "\":\n\ttheme_grad = " + name.split(" ")[0].toLowerCase() + "_" + name.split(" ")[1].toLowerCase() + "_grad;\n\tbreak;\n\n<option value=\"" + name.split(" ")[0].toLowerCase() + "_" + name.split(" ")[1].toLowerCase() + "\">" + name.split(" ")[0] + " " + name.split(" ")[1]
// + "</option>");
