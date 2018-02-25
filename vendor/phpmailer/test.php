<?php

include('send_mail.php');



		send_mail(
				"support@cointork.com", 
				"Thank you for signing up with Crypta", 
				Array("kirill.savine@gmail.com"), 
				"THANK YOU! ACTIVATE!", 
				"Dear test!<Br><br>Thank you for signing up with our Crypto Charter!<br><br> Click the following link to activate your account:<br>activation_link<br><br><hr><small>If this e-mail was sent to you in error, disregard it!<br><br>We are committed to providing simple and straightforward crypto monitoring at your fingertips!</small>",
				$bcc=null
			);