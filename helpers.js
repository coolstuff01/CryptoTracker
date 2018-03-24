function in_array_partial(x,search_array){
	
	var res=false;
	for(key in search_array){	
		
		if(search_array[key].indexOf(x) !== -1){
			res=true;
			break;
		}
	
	}
	return(res);	
}


function ajax_live_search(i_target_id,i_selector,i_json_source,i_name_name,i_id_name,i_additional_search_cols,i_limit){
	
	i_additional_search_cols = i_additional_search_cols || [];
	i_limit = i_limit || 20;
	
	
	var options = {
		ajax          : {
			url     : i_json_source, 
			type    : 'GET',
			//async: false,
			dataType: 'json',
			data    : {
				q: '{{{q}}}'
			}
		},
		locale        : {
			emptyTitle: 'Type at least 3 characters'
		},
		log           : 3,
		preprocessData: function (data) {
			var i, l = data.length, array = [];
			if (l) {
				cur_search=$(i_selector).val().toLowerCase();
				
				if(cur_search.length>2){
					for (i = 0; i < l; i++) {	
						
						var cur_search_list=[];
					
						cur_text=data[i][i_name_name].toLowerCase();
						cur_valu=data[i][i_id_name].toLowerCase();
						
						cur_search_list.push(cur_text,cur_valu);
						
						
						for(key in i_additional_search_cols){
							cur_search_list.push(data[i][i_additional_search_cols[key]].toLowerCase());
						}
						
						console.log(cur_search_list);
						
						//cur_id=data[i]['id'].toLowerCase();
						//if(cur_text.indexOf(cur_search) !== -1 || cur_valu.indexOf(cur_search) !== -1){
						if(in_array_partial(cur_search,cur_search_list)){
							array.push($.extend(true, data[i], {
								text : data[i][i_name_name],
								value: data[i][i_id_name], 
								data : {
									subtext: data[i][i_id_name]
								}
							}));
							if(array.length>i_limit){break}
						}
					}
				}
			}
			
			return array;
		}
	};

	$('#'+i_target_id).selectpicker().filter('.with-ajax').ajaxSelectPicker(options);
	
}


function toggle_menu(){
	$("#wrapper").toggleClass("toggled");
	var cur=$("#menu-toggle").html();
	if(cur=="Hide Menu"){
		$("#menu-toggle").html("Toggle Menu");		
		$("#contact_info").hide();
	}else{
		$("#menu-toggle").html("Toggle Menu");				
		$("#contact_info").show();
	}
}





function loadSelectItems(select, items) {

    var options = '';
    for (i = 0; i < items.length; ++i) {
		
		options += '<option data-subtext=' + items[i]['id'] + '>' + items[i]['name']+' ('+items[i]['symbol']+') </option>';
    };
    select.empty();
    select.append(options);
    select.selectpicker('refresh');
}


function make_up_charts(w,h){
	
	
	w=w || $(".x_content").css("width");
	h=h || $(".x_panel.tile.fixed_height_320").css("height");
	console.log(h+" x "+w);
	
	$("#pieChart").css("width",w)
	$("#pieChart").css("height",h)
	$("#percChangeChart").css("width",w)
	$("#percChangeChart").css("height",h)
	$("#valueChart").css("width",w)
	$("#valueChart").css("height",h)
	$("#volumeChart").css("width",w)
	$("#volumeChart").css("height",h)
	$("#livePriceChart").css("width",w*2)
	$("#livePriceChart").css("height",h)
	
}



function render_template(args,path_to_templ,target_id,callback,append){
	
	callback = callback || function(){console.log("rendering "+path_to_templ+": no callback")};
	append = append || false;
	
	var r = $.Deferred();

	$.get({url: path_to_templ,cache: false}).then(function(x) {
		if(!append){$("#"+target_id).empty()};
		$.tmpl(x, args).appendTo("#"+target_id);
		callback()
		
	});

	return r;		
}		




function send_protfolio(x_json,usr){
	
	if(usr==0){
		console.log("user not logged, did not log portfolio")
	}else{
		
		data=encodeURIComponent(JSON.stringify(x_json))
		//out=$.get("send_port.php?t=1&v="+data+"&u="+usr)
		

		$.ajax({
			url: "send_port.php",
			method: 'GET',
			cache: false,
	//		dataType : "html",
//			async: true,			
			data: {t: 1, v: data, u:usr},
			success: function(out) {
				out=out.replace(/\s/g,'');
				if(out!="succ"){
					console.log("user '"+usr+"' logged, but did not log portfolio: "+out)
				}else{					
					console.log("user '"+usr+"' logged: "+data)
				}
			}
		})
			
			
		
	}
}


function read_protfolio(usr){
	
	//out
		
	if(usr==0){
		console.log("user not logged, no porfolio to pull")
		return("NA")
	}else{		
		
		out=$.ajax({
			url: "send_port.php",
			method: 'GET',
			cache: false,
	//		dataType : "html",
			async: false,			
			data: {t: 2, v:"dumm", u:usr},
			success: function(x) {
				return(x)
			}
		})
		
		out=out.responseText;
		out=out.replace(/\s/g,'');
		if(out.substring(0,4)=="succ"){
			port=out.substring(4);
			if(port==""){
				console.log("user '"+usr+"' - no log data found")
				res="NA";
				return(res)
			}
			console.log("user '"+usr+"' - log data found: "+port)
			res=JSON.parse(decodeURIComponent(port));
			return(res)
		}else{					
			console.log("error: "+out)
			res="NA";
			return(res)
		}		
	}		
	
}


function test(usr) {
    res=read_protfolio(usr,function(d) {
        //processing the data
        console.log(d)
    });
	return(res)
}


function on_add(){
	chart_actions('add'); // add the currency
	$('#main_content_span').show();	// show widgets (ignored if already shown)
	make_up_charts($('.x_content').css('width'),'250px'); // ensure charts are adapted to widget size (in case if screen size changed), current CSS has a constant widget height of 320px, thus making chart height also constant at 250px
	send_protfolio(currs,g_u); // send new currency mix to the DB (ignored if user is not logged)
			
}


function on_rem(){
	chart_actions('remove') // remove 
	send_protfolio(currs,g_u); // send new currency mix to the DB (ignored if user is not logged)
			
}


function token_search(input_path, button_path, element_id){
		/* handler for token search START */
	var inp_selector;
	inp_selector = input_path;
	//inp_selector="#menu_bar > div > nav > div > div > div:nth-child(1) > div > div > div > input";	  

	$(document).on('click', button_path, function() {
		$(inp_selector).attr("placeholder","Start typing token name")	
	})			
	// $(document).on('click', "#menu_bar > div > nav > div > div > div:nth-child(1) > div > button", function() {
	// 	$(inp_selector).attr("placeholder","Start typing token name")	
	// })
	
	$(document).on('input', inp_selector, function() {
		cur_search=$(inp_selector).val().toLowerCase();

		var array=[];
		for (i = 0; i < response.length; i++) {	
			
			var cur_search_list=[
				response[i]['id'].toLowerCase(),
				response[i]['name'].toLowerCase(),
				response[i]['symbol'].toLowerCase()			
			];	
			/*
			cur_search_list.push(response[i]['id'].toLowerCase());
			cur_search_list.push(response[i]['name'].toLowerCase());
			cur_search_list.push(response[i]['symbol'].toLowerCase());
			*/
			
			if(in_array_partial(cur_search,cur_search_list)){
				array.push(response[i])		
				if(array.length>20){break}				
			}
					
		};
		//console.log(array)
		loadSelectItems($("#" + element_id),array)	
		// loadSelectItems($("#token_name"),array)	
		
	});	

	
	
	/* handler for token search END */
}
