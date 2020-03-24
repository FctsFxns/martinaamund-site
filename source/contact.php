<?php
/*
 *  CONFIGURE EVERYTHING HERE
 *  THIS FILE USES PHPMAILER INSTEAD OF THE PHP MAIL() FUNCTION
 *  AND ALSO SMTP TO SEND THE EMAILS
 */
require 'phpmailer/PHPMailerAutoload.php';
require 'contact-credentials.php';


/*
 *  LET'S DO THE SENDING
 */

// subject of the email
$subject = 'A new message from Martin Aamund contact form';

// form field names and their translations.
$fields = array(
    'name' => 'Name', 
    'phone' => 'Phone', // Honeypot field
    'email' => 'Email', 
    'message' => 'Message'
); 

// message that will be displayed when everything is OK :)
$okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!';

// If something goes wrong, we will display this message.
$errorMessage = 'There was an error while submitting the form. Please try again later';

// if you are not debugging and don't need error reporting, turn this off by error_reporting(0);
error_reporting(E_ALL & ~E_NOTICE);

try {
    if (count($_POST) == 0) {
        throw new \Exception('Form is empty');
    }
    
    // Message for us
    $emailTextHtml = "<h1>You have a new message from your contact form</h1><hr>";
    $emailTextHtml .= "<table>";
    // MEssage for the requester
    $emailReplyTextHtml = "<h1>Thanks for contacting us</h1><p>We've received a contact request through our website's contact form with the next information:</p><hr>";
    $emailReplyTextHtml .= "<table>";

    $honeypot = FALSE;
    
    foreach ($_POST as $key => $value) {
        // If the field exists in the $fields array, include it in the email 
        if (isset($fields[$key])) {
            // Exclude honeypot field
            if ($key != 'phone') {
                $emailTextHtml .= "<tr><th>$fields[$key]</th><td>$value</td></tr>";
                $emailReplyTextHtml .= "<tr><th>$fields[$key]</th><td>$value</td></tr>";
            } else {
                // If the honeypot field is filled get back with an error
                if ($value != '') {
                    $honeypot = TRUE;
                }
            }
        }
    }
    $emailTextHtml .= "</table><hr>";
    $emailTextHtml .= "<p>Have a nice day,<br>Best,<br><b>Martin Aamund</b>,<br>Film Director.</p>";

    $emailReplyTextHtml .= "</table><hr>";
    $emailReplyTextHtml .= "<p>Have a nice day,<br>Best,<br><b>Martin Aamund</b>,<br>Film Director.</p>";

    if (!$honeypot) {
        
        // Send email to us
        $mail = new PHPMailer;
        
        $mail->setFrom($fromEmail, $fromName);
        $mail->addReplyTo($from);
        $mail->addAddress($sendToEmail, $sendToName); // you can add more addresses by simply adding another line with $mail->addAddress();
      
        
        $mail->CharSet = 'UTF-8';

        $mail->isHTML(true);
        
        $mail->Subject = $subject;
        $mail->Body    = $emailTextHtml;
        $mail->msgHTML($emailTextHtml); // this will also create a plain-text version of the HTML email, very handy
                
        $mail->isSMTP();
        
        //Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 0;
        $mail->Debugoutput = 'html';
        
        //Set the hostname of the mail server
        // use
        // $mail->Host = gethostbyname('smtp.gmail.com');
        // if your network does not support SMTP over IPv6
        // $mail->Host = gethostbyname($smtpHost);
        $mail->Host = $smtpHost;
        
        // //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
        $mail->Port = $smtpPort ;
        
        // //Set the encryption system to use - ssl (deprecated) or tls
        $mail->SMTPSecure = 'tls';
        
        // //Whether to use SMTP authentication
        $mail->SMTPAuth = true;
        
        //Username to use for SMTP authentication - use full email address for gmail
        $mail->Username = $smtpUsername;
        
        //Password to use for SMTP authentication
        $mail->Password = $smtpPassword;

        
        if (!$mail->send()) {
            throw new \Exception('I could not send the email.' . $mail->ErrorInfo);
        }

        // Send email to requester
        $mail = new PHPMailer;
        
        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($_POST['email'], $_POST['name']); // you can add more addresses by simply adding another line with $mail->addAddress();
        $mail->addReplyTo($from);
        
        $mail->isHTML(true);
        
        $mail->Subject = 'Thanks for contacting us';
        $mail->Body    = $emailReplyTextHtml;
        $mail->msgHTML($emailReplyTextHtml); // this will also create a plain-text version of the HTML email, very handy
                
        $mail->isSMTP();
        
        //Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 0;
        $mail->Debugoutput = 'html';
        
        //Set the hostname of the mail server
        // use
        // $mail->Host = gethostbyname('smtp.gmail.com');
        // if your network does not support SMTP over IPv6
        // $mail->Host = gethostbyname($smtpHost);
        $mail->Host = $smtpHost;

        
        // //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
        $mail->Port = $smtpPort;
        
        // //Set the encryption system to use - ssl (deprecated) or tls
        $mail->SMTPSecure = 'tls';
        
        // //Whether to use SMTP authentication
        $mail->SMTPAuth = true;
        
        //Username to use for SMTP authentication - use full email address for gmail
        $mail->Username = $smtpUsername;
        
        //Password to use for SMTP authentication
        $mail->Password = $smtpPassword;

               
        if (!$mail->send()) {
            throw new \Exception('I could not send the email.' . $mail->ErrorInfo);
        } 
        $responseArray = array('type' => 'success', 'message' => $okMessage);

    } else {
        $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    }

} catch (\Exception $e) {
    // $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    $responseArray = array('type' => 'danger', 'message' => $e->getMessage());
}

// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);
    
    header('Content-Type: application/json');
    
    echo $encoded;
}
// else just display the message
else {
    echo $responseArray['message'];
}
