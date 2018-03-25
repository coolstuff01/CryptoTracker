<?php 
session_start(); 
require("common.php");
$g_admin_logged=false;

if(empty($_SESSION['user'])){ 	
    $g_your_email="Welcome!";
	$usr_id=0;
}else{
	$g_your_email="Profile: ".htmlentities($_SESSION['user']['email'], ENT_QUOTES, 'UTF-8');
	
	if($_SESSION['user']['email']=='kirill.savine@gmail.com' | $_SESSION['user']['email']=='nsitnikov1@gmail.com'){
		$g_admin_logged=true;		
	}
	
	$usr_id=$_SESSION['user']['id'];	
}
	// update tockenlist if it is older than 24 hrs
		
	//include('save_tocken_list.php'); // no longer used
	
	
?> 

<!doctype html>
<html class="no-js" lang="">
    <head>

	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
	<meta http-equiv="Pragma" content="no-cache"/>
	<meta http-equiv="Expires" content="0"/>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>CoinTork Dashboard</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="manifest" href="site.webmanifest">

    <!-- Bootstrap -->
    <link href="vendor/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">	
    <!-- Font Awesome -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="vendor/nprogress/nprogress.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="vendor/iCheck/skins/flat/green.css" rel="stylesheet">
	
    <!-- bootstrap-progressbar -->
    <link href="vendor/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
    <!-- JQVMap -->
    <!--<link href="vendor/jqvmap/dist/jqvmap.min.css" rel="stylesheet"/>-->
    <!-- bootstrap-daterangepicker -->
    <!--<link href="vendor/bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet">-->

    <!-- Custom Theme Style -->
    <link href="vendor/gentelella/css/custom.min.css" rel="stylesheet">
    
	

    <!-- jQuery -->
    <script src="vendor/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
	
	<!-- JQuery UI-->
	<link rel="stylesheet" href="vendor/jquery-ui/jquery-ui.min.css">
	<script src='vendor/jquery-ui/jquery-ui.min.js'></script>

	
    <!-- Bootstrap -->
    <script src="vendor/bootstrap/dist/js/bootstrap.min.js"></script>

	<!-- BS Select-->
	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.3/css/bootstrap-select.min.css" />
	<script src='//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.6.3/js/bootstrap-select.min.js'></script>	
	
    <!-- FastClick -->
    <script src="vendor/fastclick/lib/fastclick.js"></script>
    <!-- NProgress -->
    <script src="vendor/nprogress/nprogress.js"></script>
    <!-- Chart.js -->
    <!--<script src="vendor/Chart.js/dist/Chart.min.js"></script>-->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
    <!-- gauge.js -->
    <!--<script src="vendor/gauge.js/dist/gauge.min.js"></script>-->
    <!-- bootstrap-progressbar -->
    <script src="vendor/bootstrap-progressbar/bootstrap-progressbar.min.js"></script>
    <!-- iCheck -->
    <script src="vendor/iCheck/icheck.min.js"></script>
    <!-- Skycons -->
    <script src="vendor/skycons/skycons.js"></script>
	
	
	<link rel="stylesheet" href="charting/vendor/Ajax-Bootstrap-Select-master/css/ajax-bootstrap-select.css"/>
	<script type="text/javascript" src="charting/vendor/Ajax-Bootstrap-Select-master/js/ajax-bootstrap-select.js"></script>			
	<script src="charting/vendor/modernizr/modernizr-3.5.0.min.js"></script>		
	
<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/responsive/2.2.1/js/dataTables.responsive.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/buttons/1.4.2/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" language="javascript" src="//cdn.datatables.net/buttons/1.4.2/js/buttons.html5.min.js"></script>
<link href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.4.2/css/buttons.dataTables.min.css">


		
	<link rel="stylesheet" href="vendor/jQRangeSlider-5.7.2/css/iThing.css" type="text/css" />
	<script src="vendor/jQRangeSlider-5.7.2/jQDateRangeSlider-min.js"></script>

	<script src="vendor/date.js"></script>

	
    <!-- Flot -->
    <!--<script src="vendor/Flot/jquery.flot.js"></script>
    <script src="vendor/Flot/jquery.flot.pie.js"></script>
    <script src="vendor/Flot/jquery.flot.time.js"></script>
    <script src="vendor/Flot/jquery.flot.stack.js"></script>
    <script src="vendor/Flot/jquery.flot.resize.js"></script>
    <!-- Flot plugins -->
    <!--<script src="vendor/flot.orderbars/js/jquery.flot.orderBars.js"></script>
    <script src="vendor/flot-spline/js/jquery.flot.spline.min.js"></script>
    <script src="vendor/flot.curvedlines/curvedLines.js"></script>
    <!-- DateJS -->
   <!-- <script src="vendor/DateJS/build/date.js"></script>
    <!-- JQVMap -->
    <!--<script src="vendor/jqvmap/dist/jquery.vmap.js"></script>
    <script src="vendor/jqvmap/dist/maps/jquery.vmap.world.js"></script>
    <script src="vendor/jqvmap/examples/js/jquery.vmap.sampledata.js"></script>
    <!-- bootstrap-daterangepicker -->
   <!-- <script src="vendor/moment/min/moment.min.js"></script>
    <script src="vendor/bootstrap-daterangepicker/daterangepicker.js"></script>

    <!-- Custom Theme Scripts -->
    <!--<script src="vendor/gentelella/js/custom.min.js"></script>-->
	
		
	<link href="//cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet">	
	<script src="//cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>		
	
	
	<!-- global variables -->
	
	
	<script>
	var g_u=<?php echo $usr_id; ?>;
	</script>
	
	
	<!-- LOCAL REFERENCES -->
	<script src="helpers.js"></script>		
	<script src="charting/js/main.js"></script>
	<script src="charting/js/line_chart.js"></script>				
	<link rel="stylesheet" href="charting/css/normalize.css">
	<link rel="stylesheet" href="charting/css/main.css">
	<link rel="stylesheet" href="charting/css/design.css">	


	<link rel="stylesheet" href="style_private.css">
	<link rel="stylesheet" href="vendor/loader1/loader.css">
	

	
	
	
	

		
<script>



$(document).ready(function(){
		

	// Progressbar START
	if ($(".progress .progress-bar")[0]) {
		$('.progress .progress-bar').progressbar();
	}
	// /Progressbar END


	// NProgress START
	if (typeof NProgress != 'undefined') {
		$(document).ready(function () {
			NProgress.start();
		});

		$(window).load(function () {
			NProgress.done();
		});
	}
	// NProgress END
		
	
	$('#stats_table_div').css("height","auto");
	
		
	$("#left_menu").hide();
	$("#main_content").css("margin-left","0px");	
	$("#menu_bar").css("margin-left","0px");	
	loadSelectItems($("#token_name"),response.slice(0,10))		 // load 10 most popular tokens 
	loadSelectItems($("#token_name_live"),response.slice(0,10))		 // load 10 most popular tokens 
	
	$("#loading_id").hide();
	$("#loader").hide();
	$("#register").hide();
	$("#edit_account").hide();

	$("#logout").hide();
	$("#login").hide();
	
	if("<?php echo $g_your_email; ?>"=="Welcome!"){$("#login").show();$("#register").show();}else{$("#logout").show();$("#edit_account").show();}
	
	
	setTimeout(function(){$("#wrapper").toggleClass("toggled","slow")}, 250);  		
	
	$("#token_amount").spinner();
	$("#chart_perc_timefr").selectpicker();
	$("#chart_base_cur").selectpicker();
	$("#chart_theme").selectpicker();

	token_search("#menu_bar > div > nav > div > div > div:nth-child(1) > div > div > div > input", "#menu_bar > div > nav > div > div > div:nth-child(1) > div > button", "token_name");
	token_search("#main_content_span > div:nth-child(6) > div.x_panel.tile.fixed_height_320 > div.x_title > ul > div > div > div > input", "#main_content_span > div:nth-child(6) > div.x_panel.tile.fixed_height_320 > div.x_title > ul > div > button", "token_name_live");

	// make up menu START
	$( "#token_name" ).parents('div').find(".btn-group").css("width","100%");
	$( "#token_name_live" ).parents('div').find(".btn-group").css("width","100%");
	$( ".ui-spinner" ).css("width","100%");
	$( ".btn.btn-default" ).css("margin-bottom","0px");
	$( ".btn.btn-default" ).css("width","100%");
	$( "#token_amount" ).css("height","25px");
	// make up menu END
	
	
	
	$('#main_content_span').hide(); // hide charts 
	
	
	/* Read portfolio from DB START */
	port=read_protfolio(g_u);
	if(port=="NA"){
		console.log("no past profolio logs found for user "+g_u)
	}else{
		currs=port;	
		$('#main_content_span').show();	// show widgets (ignored if already shown)		
		populate_val_dicts(); // from main.js populate global ticker dictionary
		countdown = ref_freq;
		clearInterval(countdownTimerID);
		countdownTimerID = setInterval(countMeDown, 1000);
		make_up_charts($('.x_content').css('width'),'250px'); // ensure charts are adapted to widget size (in case if screen size changed), current CSS has a constant widget height of 320px, thus making chart height also constant at 250px		
		console.log("found profolio logs for user "+g_u);	
		coinMarketCap(); // draw charts
		update_chart();
		
		
		

	}	

	/* Read portfolio from DB END */
	
})


// adapt main menu depending on screen width
$(document).ready(function() {
	if($( window ).width()<768){
		$('#men1').append($("#men3").html())
		$('#men2').prepend($("#men4").html())
		$("#men3").remove()
		$("#men4").remove()
		$("#men1").attr("class","col-sm-6");
		$("#men2").attr("class","col-sm-6");		
		$("#men1").css("width","50%");		
		$("#men2").css("width","50%");				
	}
	
})


$(document).ready(function() {
	
	$("#showBtn").click(function() {
		
		render_template(
			{ "i_ttl" : '123',"i_content" : 'test_chart_canv1'  },
			"templates/chart.html",
			'gohere',
			function(){
				//test_chart();
			}
		)
		
		render_template(
			{ "i_ttl" : '123',"i_content" : 'test_chart_canv2'  },
			"templates/chart.html",
			'gohere',
			function(){
				test_chart();
			}
		)		
			
	});

});	


$(document).ready(function() {
	$('.selectpicker').selectpicker({
    	dropupAuto: false
	});

	$("#main_content_span > div:nth-child(6) > div.x_panel.tile.fixed_height_320 > div.x_title > ul > div > div > ul").on("click", function(){
		$("#token_name_live").trigger("change");
	})
	$("#token_name_live").on("change", function(){
		update_line();
	})
})	  




</script>

<style>

.bootstrap-select.btn-group .dropdown-menu li a:hover {
	color: black !important; 
}

</style>

		
</head>

  <body class="nav-md">
  
  <div id='loader'><div id='loader_anim'></div></div>
  
    <div class="container body">
      <div class="main_container">
	  
        <div class="col-md-3 left_col" id='left_menu'>
          <div class="left_col scroll-view">
            <div class="navbar nav_title" style="border: 0;">
              <a href="index.html" class="site_title"><i class="fa fa-paw"></i> <span>Gentelella Alela!</span></a>
            </div>

            <div class="clearfix"></div>

            <!-- menu profile quick info -->
            <div class="profile clearfix">
              <div class="profile_pic">
                <!--<img src="images/img.jpg" alt="..." class="img-circle profile_img">-->
              </div>
              <div class="profile_info">
                <span>Welcome,</span>
                <h2>John Doe</h2>
              </div>
            </div>
            <!-- /menu profile quick info -->

            <br />

            <!-- sidebar menu -->
            <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
              <div class="menu_section">
                <h3>General</h3>
                <ul class="nav side-menu">
                  <li><a><i class="fa fa-home"></i> Home <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="index.html">Dashboard</a></li>
                      <li><a href="index2.html">Dashboard2</a></li>
                      <li><a href="index3.html">Dashboard3</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-edit"></i> Forms <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="form.html">General Form</a></li>
                      <li><a href="form_advanced.html">Advanced Components</a></li>
                      <li><a href="form_validation.html">Form Validation</a></li>
                      <li><a href="form_wizards.html">Form Wizard</a></li>
                      <li><a href="form_upload.html">Form Upload</a></li>
                      <li><a href="form_buttons.html">Form Buttons</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-desktop"></i> UI Elements <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="general_elements.html">General Elements</a></li>
                      <li><a href="media_gallery.html">Media Gallery</a></li>
                      <li><a href="typography.html">Typography</a></li>
                      <li><a href="icons.html">Icons</a></li>
                      <li><a href="glyphicons.html">Glyphicons</a></li>
                      <li><a href="widgets.html">Widgets</a></li>
                      <li><a href="invoice.html">Invoice</a></li>
                      <li><a href="inbox.html">Inbox</a></li>
                      <li><a href="calendar.html">Calendar</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-table"></i> Tables <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="tables.html">Tables</a></li>
                      <li><a href="tables_dynamic.html">Table Dynamic</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-bar-chart-o"></i> Data Presentation <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="chartjs.html">Chart JS</a></li>
                      <li><a href="chartjs2.html">Chart JS2</a></li>
                      <li><a href="morisjs.html">Moris JS</a></li>
                      <li><a href="echarts.html">ECharts</a></li>
                      <li><a href="other_charts.html">Other Charts</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-clone"></i>Layouts <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="fixed_sidebar.html">Fixed Sidebar</a></li>
                      <li><a href="fixed_footer.html">Fixed Footer</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="menu_section">
                <h3>Live On</h3>
                <ul class="nav side-menu">
                  <li><a><i class="fa fa-bug"></i> Additional Pages <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="e_commerce.html">E-commerce</a></li>
                      <li><a href="projects.html">Projects</a></li>
                      <li><a href="project_detail.html">Project Detail</a></li>
                      <li><a href="contacts.html">Contacts</a></li>
                      <li><a href="profile.html">Profile</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-windows"></i> Extras <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                      <li><a href="page_403.html">403 Error</a></li>
                      <li><a href="page_404.html">404 Error</a></li>
                      <li><a href="page_500.html">500 Error</a></li>
                      <li><a href="plain_page.html">Plain Page</a></li>
                      <li><a href="login.html">Login Page</a></li>
                      <li><a href="pricing_tables.html">Pricing Tables</a></li>
                    </ul>
                  </li>
                  <li><a><i class="fa fa-sitemap"></i> Multilevel Menu <span class="fa fa-chevron-down"></span></a>
                    <ul class="nav child_menu">
                        <li><a href="#level1_1">Level One</a>
                        <li><a>Level One<span class="fa fa-chevron-down"></span></a>
                          <ul class="nav child_menu">
                            <li class="sub_menu"><a href="level2.html">Level Two</a>
                            </li>
                            <li><a href="#level2_1">Level Two</a>
                            </li>
                            <li><a href="#level2_2">Level Two</a>
                            </li>
                          </ul>
                        </li>
                        <li><a href="#level1_2">Level One</a>
                        </li>
                    </ul>
                  </li>                  
                  <li><a href="javascript:void(0)"><i class="fa fa-laptop"></i> Landing Page <span class="label label-success pull-right">Coming Soon</span></a></li>
                </ul>
              </div>

            </div>
            <!-- /sidebar menu -->

            <!-- /menu footer buttons -->
            <div class="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings">
                <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock">
                <span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                <span class="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
            </div>
            <!-- /menu footer buttons -->
          </div>
        </div>

        <!-- top navigation -->
        <div class="top_nav" id="menu_bar">
          <div class="nav_menu">
            <nav>
				
					<div class="container-fluid">
						<div class="row" id='main_navigation'>
							<div class="col-sm-3" id='men1'>
								<p class='control_ttl'>Token name:</p> 
								<!--<select id='token_name' name="token_name" class="selectpicker with-ajax" data-live-search="true" data-actions-box="false" ></select>-->						
								<select style='width:100%' class="selectpicker" id='token_name' data-show-subtext="true" data-live-search="true"></select>						
								<p class='control_ttl'>Token amount:</p> 
								<input style='width:100%' type="number" min="0" id="token_amount" name="token_amount" >															
							</div>
							<div class="col-sm-3" id='men2'>
								<p class='control_ttl'>Action:</p> 
								<a class="btn btn-default green_but"  href='#' onclick="on_add();">Add</a>
								<p class='control_ttl'>&nbsp;</p> 
								<a class="btn btn-default red_but" href='#' onclick="on_rem();">Remove</a>									
							</div>

							<div class="col-sm-3" id='men3'>
								<!-- <p class='control_ttl'>Percent change:</p> -->
								<p class='control_ttl'>Base currency:</p>
								<select id='chart_base_cur' onchange="change_base_curr(this.value)"><?php include('parts/base_cur.php'); ?></select> 	
								<p class='control_ttl'>Colour theme:</p>
								<select id='chart_theme' onchange="theme_colour(this)"><?php include('parts/themes.php'); ?></select>			
							
							</div>
							<div class="col-sm-3" id='men4'>
							<!--<div class="col-sm-4 " >-->
								
								
								
								  <p class='control_ttl'>&nbsp;</p>
								  <a href="javascript:;" class="btn btn-default dropdown-toggle blue_but" data-toggle="dropdown" aria-expanded="false">
									<!--<img src="images/img.jpg" alt="">-->
									<?php echo $g_your_email; ?>
									<span class=" fa fa-angle-down"></span>
								  </a>
								  <ul class="dropdown-menu dropdown-usermenu pull-right">
									<li><a href="edit_account.php" id='edit_account'>Edit Account</a></li>
									<li><a href="logout.php" id='logout'>Logout</a></li>
									<li><a href="login.php" id='login'>Login</a></li>
									<li><a href="register.php" id='register'>Register</a></li>
									<li>	
										<?php	
										if($g_admin_logged){
											echo '<a class="btn btn-default menu_but" href="memberlist.php">Who already registered</a> <small>';											
										}
										?>
															
									</li>																	
								  </ul>	
								
							</div>
							
						</div>
						<hr>
					</div>
							
			
									  
									  
            </nav>
          </div>
        </div>
        <!-- /top navigation -->



 <!-- Settings Modal -->
  <div class="modal fade" id="settings_modal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Crypto Charter Settings!</h4>
        </div>
        <div class="modal-body">
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-6">					
						<p lass='control_ttl'>Theme:</p>
						<select id='chart_theme' onchange="theme_colour(this)"><?php include('parts/themes.php'); ?></select>	
					</div>
				</div>
			</div>
		
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default red_but" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
  

<!-- /Settings Modal -->

        
		<!-- page content -->
        <div class="right_col" role="main" id='main_content'>
          <!-- top tiles -->
          <span id='kpis_tile'></span>
          <!-- /top tiles -->


          <br >
			
		<div style='max-width:1400px;margin: auto;' id='main_row_wrap' >
          <div class="row" >

	  

		
			<span id='main_content_span'>
<p id="Countdown"></p>
			
	
<div class="col-md-6 col-sm-6 col-xs-12">
  <div class="x_panel tile fixed_height_320">
	<div class="x_title">
	  <h2>Value in base currency</h2>
	  <div class="clearfix"></div>
	</div>
	<div class="x_content">			
		<div><canvas id="valueChart" style="width: 100%; height: 100%;"></canvas></div>
	</div>
  </div>
</div>		

	
<div class="col-md-6 col-sm-6 col-xs-12">
  <div class="x_panel tile fixed_height_320">
	<div class="x_title">
	  <h2>Value change</h2>
	  <ul class="nav navbar-right panel_toolbox">
		<select id='chart_perc_timefr' onchange="change_perc_timefr(this.value)"><?php include('parts/perc_timefr.php'); ?></select>
	  </ul>
	  <div class="clearfix"></div>
	</div>
	<div class="x_content">			
		<canvas id="percChangeChart" style="width: 100%; height: 100%;"></canvas>
	</div>
  </div>
</div>		

		
<div class="col-md-6 col-sm-6 col-xs-12">
  <div class="x_panel tile fixed_height_320">
	<div class="x_title">
	  <h2>Portfolio breakdown</h2>
	  <div class="clearfix"></div>
	</div>
	<div class="x_content">			
		<canvas id="pieChart" style="width: 100%; height: 100%;"></canvas>
	</div>
  </div>
</div>		


<div class="col-md-6 col-sm-6 col-xs-12">
  <div class="x_panel tile fixed_height_320">
  <div class="x_title">
    <h2>Volume in base currency</h2>
    <div class="clearfix"></div>
  </div>
  <div class="x_content">     
    <canvas id="volumeChart" style="width: 100%; height: 100%;"></canvas>
  </div>
  </div>
</div>  

<div class="col-md-12 col-sm-12 col-xs-12">
<div id="date_slider"></div>
  <div class="x_panel tile fixed_height_320">
  <div class="x_title">
    <h2>Live price (USD)</h2>
    <ul class="nav navbar-right panel_toolbox">
    	<select style='width:100%' class="selectpicker" id='token_name_live' data-show-subtext="true" data-live-search="true"></select>
    </ul>	
    <div class="clearfix"></div>
  </div>
  <div class="x_content">     
    <canvas id="livePriceChart" style="width: 100%; height: 100%;"></canvas>
  </div>
  </div>
</div>  


<div class="col-md-12 col-sm-12 col-xs-12">
  <div class="x_panel tile fixed_height_320" id='stats_table_div'>
	<div class="x_title">
	  <h2>Portfolio Stats</h2>
	  <div class="clearfix"></div>
	</div>
	<div class="x_content">			
		<table id="stats_table" style='width:100%'>
			
		</table>
	</div>
  </div>
</div>		


</span>			


	
			

        <!-- /page content -->

        <!-- footer content -->
        <footer style='background:#F7F7F7'>
          <div class="pull-left">
            Help us by <b>donating:</b><br />
            <b>Bitcoin</b> 16bdZXQxijhbUfPAW5MTCNG8EeYdYh3rnd<br />
            <b>Ethereum</b> 0x9354c044A77bc6AabAE3a6a8A7501F6C83CF4580<br /><br />
          </div>
          <div class="pull-left" style="clear:left">
            Partnership/Inquiries: <a href="mailto:support@cointork.com"><b>Contact Us</b></a>
          </div>
          
        </footer>
        <!-- /footer content -->
      </div>
    </div>
	
	</div>


	
  </body>

   
</html>
