<?php

$x=$_GET['act'];



require("activation.php"); 


activation($x);

header("Location: login.php?m=Thank you for activating your account, you can now login!");


#

