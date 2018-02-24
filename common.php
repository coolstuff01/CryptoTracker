<?php 

    $username = "cryptuxa"; 
    $password = "cryptuxA1!"; 
    $host = "li691-76.members.linode.com"; 
    $dbname = "cryptuxa"; 

    $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'); // encoding
     
    try{ 
        $db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password, $options); 
    } 
    catch(PDOException $ex){ 
        // die("Failed to connect to the database: " . $ex->getMessage()); // uncoment when debuging
        die("Error 1: contact support"); // uncoment in production
    } 
     
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  // make sure to throw exceptions
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC); // make sure recordssets returned are valid arrays
     
   
    if(function_exists('get_magic_quotes_gpc') && get_magic_quotes_gpc()){  // take care of magic quotes (in case if PHP ver is old)   
        function undo_magic_quotes_gpc(&$array){ 
            foreach($array as &$value){ 
                if(is_array($value)){ 
                    undo_magic_quotes_gpc($value); 
                }else{ 
                    $value = stripslashes($value); 
                } 
            } 
        }      
        undo_magic_quotes_gpc($_POST); 
        undo_magic_quotes_gpc($_GET); 
        undo_magic_quotes_gpc($_COOKIE); 
    } 
    //  header('Content-Type: text/html; charset=utf-8'); 
    ?>