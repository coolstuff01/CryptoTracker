<?php

function send_mail($from_addr, $from_name, $to_array_addr, $subj, $body, $bcc=null){
	
	require 'PHPMailerAutoload.php';

	$mail = new PHPMailer;

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = "sv62.ifastnet11.org";  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	
	//$mail->Username = "cryptuxa@gmail.com";                 // SMTP username
	$mail->Username = "support@cointork.com";                 // SMTP username
	$mail->Password = "vh{@}cCBO)(.%";                           // SMTP password
	$mail->SMTPSecure = "ssl";                            // Enable TLS encryption, `ssl` also accepted
	//$mail->SMTPSecure = "tls";                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 290;      
	//$mail->Port = 587;      

	
	
	// for google only <
	
	$mail->SMTPOptions = array(
		'ssl' => array(
			'verify_peer' => false,
			'verify_peer_name' => false,
			'allow_self_signed' => true
		)
	);
	
	// for google only >
	
	if(!is_null($bcc)){$mail->AddBCC($bcc, "bcc_rec");};

	$mail->setFrom($from_addr, $from_name);

	$reccounts=count($to_array_addr)-1;
	
	for ($x = 0; $x <= $reccounts; $x++) {
		$mail->addAddress($to_array_addr[$x]);     // Add a recipient
	}	
	
	//$mail->addAddress('kirill.savine@gmail.com');     // Add a recipient
	//$mail->addAddress('ellen@example.com');               // Name is optional
	//$mail->addReplyTo('info@example.com', 'Information');
	//$mail->addCC('cc@example.com');
	//$mail->addBCC('bcc@example.com');

	//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = $subj;
	$mail->Body    = $body;
	//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	if(!$mail->send()) {
		echo 'Message could not be sent.';
		echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
		//echo 'Message has been sent';
	}
}


