<?php


require("common.php"); 

$t=$_GET['t'];
$v=$_GET['v'];
$u=$_GET['u'];

if(empty($t)){die("provide t");}
if(empty($v)){die("provide v");}
if(empty($u)){die("provide u");}

//die();

if($t=="1"){



	$query = " 
		INSERT INTO ports ( 
			usr, 
			val
		) VALUES ( 
			:usr, 
			:val
		) 
	"; 


	$query_params = array( 
		':usr' => $u, 
		':val' => $v
	); 

	try{ 
		$stmt = $db->prepare($query); 
		$result = $stmt->execute($query_params); 
	}catch(PDOException $ex){ 
		die("Error 66, contact support"); 
		//die("Failed to run query: " . $ex->getMessage()); 
	} ;

	if($result==1){echo "succ";}
	
}else if($t=="2"){

	$query = "select val from ports where usr=:usr order by dt desc limit 1"; 

	$query_params = array(':usr' => $u); 	

	try{ 
		$stmt = $db->prepare($query); 
		$result = $stmt->execute($query_params); 
	}catch(PDOException $ex){ 
		die("Error 67, contact support"); 
		//die("Failed to run query: " . $ex->getMessage()); 
	} ;	
	
	$row = $stmt->fetch();
	echo "succ".$row['val'];
	
}else{
	
	die("t in 1,2");
	
}