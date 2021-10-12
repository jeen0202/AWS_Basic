<?php
$username = "janjanlearner";
$password = "janjanlearner";
$hosthame = "yourhostnameaddress";
$dbname = "janjanlearner";

$dbhandle = mysql_connect($hostname, $username, $password) or die('연결 실패');
echo "MySQL 접속 성공! username - $username, password - $password, host - $hostname<br>";
$selected = mysql_select_db('$dbname',$dbhandle) or die("MySQL DB 연결 실패... -다시 시도하세요");
