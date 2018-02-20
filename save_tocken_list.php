<?php

# checks if tockenlis.json is older than 24 hours, than downloads a fresh one

if (time()-filemtime('tocken_list.json') > 24*60*60) {
  // if file older than 24 hours
	$json = file_get_contents('https://api.coinmarketcap.com/v1/ticker/?start=0&limit=0&convert=USD');
	$obj = json_decode($json);

	$fp = fopen('tocken_list.json', 'w');
	fwrite($fp, json_encode($obj));
	fclose($fp);
	 	  
} 



