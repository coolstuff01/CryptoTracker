<?php 


    require("common.php"); 
    session_start();  

    if(empty($_SESSION['user'])){ 
        header("Location: login.php"); 
        die("Redirecting to login.php"); 
    } 
        
    $query = "SELECT id, username, email FROM users "; 
     
    try{ 
        $stmt = $db->prepare($query); 
        $stmt->execute(); 
    } 
    catch(PDOException $ex){ 
        //die("Failed to run query: " . $ex->getMessage()); 
        die("Error 4, contact support"); 
    } 
         
    $rows = $stmt->fetchAll(); 
?> 
<h1>Memberlist</h1> 
<table> 
    <tr> 
        <th>ID</th> 
        <th>Username</th> 
        <th>E-Mail Address</th> 
    </tr> 
    <?php foreach($rows as $row): ?> 
        <tr> 
            <td><?php echo $row['id']; ?></td> <!-- htmlentities is not needed here because $row['id'] is always an integer --> 
            <td><?php echo htmlentities($row['username'], ENT_QUOTES, 'UTF-8'); ?></td> 
            <td><?php echo htmlentities($row['email'], ENT_QUOTES, 'UTF-8'); ?></td> 
        </tr> 
    <?php endforeach; ?> 
</table> 
<a href="private.php">Go Back</a><br />