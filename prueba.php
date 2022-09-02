<?php

$correo = 'oli@3452v77777777777777777777777er.erazo1@ricaldone.edu.sv';

$comienzo = substr($correo, 0, strlen($correo)- (strlen($correo)-3));
$final = substr($correo, strripos($correo, '@')-strlen($correo));
$restante = substr($correo, (strlen($correo)- (strlen($correo)-3)), (strripos($correo, '@')-strlen($correo)));
$total = str_pad($comienzo, strlen($restante), "*",STR_PAD_RIGHT);

//echo "Lo que queda es: ". substr($correo, (strlen($correo)- (strlen($correo)-3)), (strripos($correo, '@')-strlen($correo)));
