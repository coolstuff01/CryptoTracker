<?php


function activation($x){

require_once(dirname(__FILE__) . "/common.php"); 



// Now we perform a check for the email address, in order to ensure that it is unique. //
$query = "UPDATE users SET active = 1 WHERE act = :act"; 
  
$query_params = array(':act' => $x); 
 
try{ 
	$stmt = $db->prepare($query); 
	$result = $stmt->execute($query_params); 
}catch(PDOException $ex){ 
	//die("Failed to run query: " . $ex->getMessage()); 
	die("Error 7, contact support"); 
} 
 
print("Success");

//header("Location: ../login.php"); 

}
