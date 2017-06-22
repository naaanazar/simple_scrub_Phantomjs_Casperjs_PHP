<?php
include ('../vendor/autoload.php');
require_once ('../src/config.php');

use App\library\Database;
use App\library\QueryToDB;

$query = new QueryToDB();

$sql = "CREATE TABLE leboncoin_voitures (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
product_id VARCHAR(255) NOT NULL,
title VARCHAR(255),
price VARCHAR(255),
image VARCHAR(255),
massage BOOLEAN,
reg_date TIMESTAMP
)";

$result = $query->queryToDB($sql);