<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail -> CharSet = 'utf-8';
    $mail -> setLanguage('ru', 'phpmailer/languge/');
    $mail -> IsHTML(true);

    //От кого письмо
    $mail->setFrom('artem.nikonov.2005@bk.ru', 'Пользователь');
    //Кому письмо
    $mail->addAddress('artem.nikonov.2005@bk.ru');
    //Тема письма
    $mail->Subject = 'Это кринж, если это письмо пришло';

    //Радио кнопки
    $hand = "Правая";
    if($_POST['hand'] == 'left'){
        $hand = "Левая";
    }

    //Тело письма
    $body = '<h1>Встрейчай письмо!</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>email:</strong> '.$_POST['email'].'</p>';
    }

    if(trim(!empty($_POST['hand']))){
        $body.='<p><strong>hand:</strong> '.$hand['hand'].'</p>';
    }

    if(trim(!empty($_POST['age']))){
        $body.='<p><strong>age:</strong> '.$_POST['age'].'</p>';
    }

    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>message:</strong> '.$_POST['message'].'</p>';
    }

    $mail->Body = $body;

    //Отправка
    if(!$mail->send()){
        $message = 'Ошибка';
    } else{
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('.Content-type: application/json');
    echo json_encode($response);
?>