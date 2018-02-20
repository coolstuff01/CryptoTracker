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
	
	
}



/*
$(document).ready(function() {
var inp_selector;
inp_selector="#menu_bar > div > nav > ul.nav.navbar-nav.navbar-left > li:nth-child(1) > div.btn-group.bootstrap-select.open > div > div > input";
			  
	$(document).on('input', inp_selector, function() {
		cur_search=$(inp_selector).val().toLowerCase();

		var array=[];
		for (i = 0; i < test_opts.length; i++) {	
			
			var cur_search_list=[];	
			cur_search_list.push(test_opts[i]['v'].toLowerCase());

			
			if(in_array_partial(cur_search,cur_search_list)){
				array.push($.extend(true, test_opts[i], {
					text : test_opts[i]['v'],
					value: test_opts[i]['v'], 
					data : {
						subtext: test_opts[i]['v']
					}
				}));				
			}
			
		
		//loadSelectItems($("#token_name_test"),test_opts)
		};
		//alert(array)
	});

});




*/