<?php 


    require("common.php"); 
    session_start();  

    if(empty($_SESSION['user'])){ 
        header("Location: login.php"); 
        die("Redirecting to login.php"); 
    } 
     
    if(!empty($_POST))    { 

        if($_POST['username']=="" | empty($_POST['username']) ) { 
            die("Ensure you entered a valid name"); 
        } 
         
        
        if($_POST['username'] != $_SESSION['user']['username']){ 
            
            $query = "SELECT  1 FROM users WHERE username = :username";              
            $query_params = array(':username' => $_POST['username'] ); 
             
            try  { 
                
                $stmt = $db->prepare($query); 
                $result = $stmt->execute($query_params); 
            } 
            catch(PDOException $ex){                 
				die("error 5, contact support");
            } 
                         
            $row = $stmt->fetch(); 
            if($row)  { 
                die("This E-Mail address is already in use"); 
            } 
        } 
         
        if(!empty($_POST['password'])) { 
            $salt = dechex(mt_rand(0, 2147483647)) . dechex(mt_rand(0, 2147483647)); 
            
            $password=$_POST['password'] ;
			/*$password = hash('sha256', $_POST['password'] . $salt); 
			for($round = 0; $round < 65536; $round++) { 
                $password = hash('sha256', $password . $salt); 
            } */
        } 
        else{             
            $password = null; 
            $salt = null; 
        } 
         
        $query_params = array( 
            ':username' => $_POST['username'], 
            ':user_id' => $_SESSION['user']['id'],
			':updated' => date("Y-m-d H:i:s")				
        ); 
         

        if($password !== null){ 
            $query_params[':password'] = $password; 
            $query_params[':salt'] = $salt; 
        } 
         

        $query = "UPDATE users SET updated = :updated, username = :username "; 
         

        if($password !== null) { 
            $query .= " 
                , password = :password 
                , salt = :salt 
            "; 
        } 
         

        $query .= "WHERE id = :user_id "; 
         
        try{ 
            // Execute the query 
            $stmt = $db->prepare($query); 
            $result = $stmt->execute($query_params); 
        } 
        catch(PDOException $ex){ 

            //die("Failed to run query: " . $ex->getMessage()); 
			die("error 6, contact support");
        } 
         

        $_SESSION['user']['username'] = $_POST['username']; 
        header("Location: private.php");       
        die("Redirecting to private.php"); 
    } 
     
?> 
<h1>Edit Account</h1> 
<form action="edit_account.php" method="post"> 
    E-mail:<br /> 
    <b><?php echo htmlentities($_SESSION['user']['email'], ENT_QUOTES, 'UTF-8'); ?></b> 
    <br /><br /> 
    Change Your Name:<br /> 
    <input type="text" name="username" value="<?php echo htmlentities($_SESSION['user']['username'], ENT_QUOTES, 'UTF-8'); ?>" /> 
    <br /><br /> 
    Change Your Password:<br /> 
    <input type="password" name="password" value="" /><br /> 
    <i>(leave blank if you do not want to change your password)</i> 
    <br /><br /> 
    <input type="submit" value="Update Account" /> 
	
	<br><br><a href='private.php'>Go back</a>
	
</form>

