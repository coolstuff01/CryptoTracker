
<?php 
	
	
	$g_url_to_app=pathinfo($_SERVER["REQUEST_SCHEME"]."://".$_SERVER["SERVER_ADDR"]."/".$_SERVER["REQUEST_URI"])['dirname'];


	
    
    require("common.php"); 
	require("vendor/phpmailer/send_mail.php"); 
	session_start();
	
	$message="";
	
	if(empty($_POST)){
		include("vendor/simple_php_captcha/simple-php-captcha.php");  
		$_SESSION['captcha'] = simple_php_captcha();	
	};
	
    if(!empty($_POST)){ 
	
		
		
		//initiate a captcha
		
		$message="";
		$reg_ok=true;
		
		if(strtolower($_SESSION['captcha']['code'])!=strtolower($_POST['capt'])){$reg_ok=false;$message=$message."<br> make sure you enetered correct characters from image.";}
		
        // Ensure that the user has entered a non-empty username 
        if(empty($_POST['username'])){$reg_ok=false;$message=$message."<br> enter a username.";} ;
        
        // Ensure that the user has entered a non-empty password 
        if(empty($_POST['password1'])){$reg_ok=false;$message=$message."<br> enter a password.";} ;
        if(empty($_POST['password2'])){$reg_ok=false;$message=$message."<br> enter a password the second time."; } ;
        if(empty($_POST['capt'])){$reg_ok=false;$message=$message."<br> enter characters from image."; } ;

		if($_POST['password1']!=$_POST['password2']){$reg_ok=false;$message=$message."<br> make sure your passwords match.";}
		
		
        // Make sure the user entered a valid E-Mail address 
        if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
			$reg_ok=false;$message=$message."<br>Invalid E-Mail Address";
		}else{
			// Now we perform a check for the email address, in order to ensure that it is unique. 
			$query = "SELECT 1 FROM users WHERE email = :email"; 
			 
			$query_params = array(':email' => $_POST['email']); 
			 
			try{ 
				$stmt = $db->prepare($query); 
				$result = $stmt->execute($query_params); 
			}catch(PDOException $ex){ 
				//die("Failed to run query: " . $ex->getMessage()); 
				die("Error 2, contact support"); 
			} 
			 
			$row = $stmt->fetch(); 

			
			if($row){
				$reg_ok=false;
				$message=$message."<br>This E-Mail address is already registered.";
			} ;
		};
		
		
		if($reg_ok==true){
 
			$query = " 
				INSERT INTO users ( 
					username, 
					password, 
					salt, 
					email,
					created,
					updated,
					act
				) VALUES ( 
					:username, 
					:password, 
					:salt, 
					:email,
					:created,
					:updated,
					:act
				) 
			"; 
			
			
			$salt = dechex(mt_rand(0, 2147483647)) . dechex(mt_rand(0, 2147483647));  // соль не нужна, но потом возможно добавим
			$act = md5( rand(0,1000) );

			$password =  $_POST['password1'] ;        

				
			$query_params = array( 
				':username' => $_POST['username'], 
				':password' => $password, 
				':salt' => $salt, 
				':email' => $_POST['email'],
				':created' => date("Y-m-d H:i:s"),
				':updated' => date("Y-m-d H:i:s"),
				':act' => $act
			); 
			

			
			
			try{ 
				$stmt = $db->prepare($query); 
				$result = $stmt->execute($query_params); 
			}catch(PDOException $ex){ 
				die("Error 3, contact support"); 
				//die("Failed to run query: " . $ex->getMessage()); 
			} ;
			
			
			
			$activation_link="<a href='".$g_url_to_app."/act.php?act=".$act."'>".$g_url_to_app."/act.php?act=".$act."</a>";
			//echo $activation_link;
			//echo $_POST['email'];
			//die();
			
			send_mail(
				"cryptuxa@gmail.com", 
				"Thank you for signing up with Crypta", 
				Array($_POST['email']), 
				"THANK YOU! ACTIVATE!", 
				"Dear ".$_POST['username']."!<Br><br>Thank you for signing up with our Crypto Charter!<br><br> Click the following link to activate your account:<br>".$activation_link."<br><br><hr><small>If this e-mail was sent to you in error, disregard it!<br><br>We are committed to providing simple and straightforward crypto monitoring at your fingertips!</small>",
				$bcc=null
			);
			
			
			$message=$message."<br>Thank you for your registration,  activate your account by clicking the link sent to your e-mail: ".$_POST['email'];
			include("vendor/simple_php_captcha/simple-php-captcha.php");  
			$_SESSION['captcha'] = simple_php_captcha();				
			
		}else{
			include("vendor/simple_php_captcha/simple-php-captcha.php");  
			$_SESSION['captcha'] = simple_php_captcha();			
		}
		
		//print($message);
	
    } 
     
?> 

<!-- BS and JQuery-->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>


<link href="style_login.css" rel="stylesheet">

<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
<div class="logo"></div>

	<div class="login-block">
		<h1>Register</h1>
		<form action="register.php" method="post" onsubmit="document.getElementById('subm').disabled = true;document.getElementById('subm').value = 'HANG ON!';"> 
			<input type="text" name="username" value="" placeholder="Your Name"/> 
			<input type="text" name="email" value="" placeholder="Your E-Mail"/> 
			<input type="password" name="password1" value="" placeholder="Password"/> 
			<input type="password" name="password2" value="" placeholder="Repeat Password"/> 					
			<input type="text" name="capt" value="" placeholder="Enter characters from the image below"/> 
			<img src="<?php echo $_SESSION['captcha']['image_src']; ?>"></img><br>			
			<p style='color:red'><?php echo $message; ?></p>
			<input type="submit" value="Register" class='login_button' id="subm"/> 			
		</form> 
		<input type="submit" value="Back to Login" class='login_button' onclick='window.location.href="login.php";'/>
	</div>



