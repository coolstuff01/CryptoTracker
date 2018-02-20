<?php 

    require("common.php"); 
    session_start(); 		
	$message=""; 
	
	if(!empty($_GET['m'])){		
		echo htmlentities($_GET['m'], ENT_QUOTES, 'UTF-8');
	}
	
    $submitted_username = ''; 
     

    if(!empty($_POST)){ 

        $query = " 
            SELECT 
                id, 
                username, 
                password, 
                salt, 
                email,
				bal,
				active
            FROM users 
            WHERE 
                email = :username
        "; 
         
        // The parameter values 
        $query_params = array(':username' => $_POST['username']); 
         
        try{ 
            // Execute the query against the database  
            $stmt = $db->prepare($query); 
            $result = $stmt->execute($query_params); 
        } 
        catch(PDOException $ex){die("Failed to run");} 
         
        
        $login_ok = false;         
        $row = $stmt->fetch(); 
        if($row){ 

			$check_password=$_POST['password'];
			
			echo $row['password'];
			echo "<br>";
			echo $check_password;
			
            if($check_password === $row['password']){ 
                $login_ok = true;				
            }else{
				$message = $message.'<br>please make sure you enter correct password!';			
			}
            
			if($row['active'] === "0"){ 
                $login_ok = false; 
				$message = $message.'<br>please make sure you have acivated your account! Check your e-mail for the activation link.';
            }
			
        }else{
			$login_ok = false; 
			$message = $message.'<br><b>ошиба:</b> Are you sure you registered with that e-mail? Please double-check! If you have not registered yet, I invite you to do that using the below link!';
		}
         
        if($login_ok){ 
			
            unset($row['password']); // remove sensitive info
            $_SESSION['user'] = $row;  // save logged user data to a session variable

            header("Location: private.php"); 
            die("redirecting"); 
        }else{ 
            
            print($message); // dump the message on them
            $submitted_username = htmlentities($_POST['username'], ENT_QUOTES, 'UTF-8');  // fillout the username for their convenience
        } 
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
		<h1>Login</h1>
		<form action="login.php" method="post"> 
			<input type="text" value="<?php echo $submitted_username; ?>" placeholder="e-mail" id="username" name="username" />
			<input type="password" value="" placeholder="Password" id="password" name="password" />
			<!--<button>Submit</button>-->
			<p style='color:red'><?php echo $message; ?></p>
			<input type="submit" value="Login" class='login_button'/> 
			
		</form> 
		<input type="submit" value="Register" class='login_button'  onclick='window.location.href="register.php"';/>
	</div>





