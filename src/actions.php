<?php

include ('../vendor/autoload.php');
require_once ('../src/config.php');


use App\library\QueryToDB;
use App\library\Validate;


if(isset($_POST['search'])){
//https://www.leboncoin.fr/voitures/offres/ile_de_france/?f=p

putenv(PHANTOMJS_EXECUTABLE);
$command = exec(CASPERJS . ' ..\leboncoin.js '. $_POST['search'], $res1);

$view = '../src/views/results.phtml';
include('../src/views/tamplate.phtml');
exit();
}

if(isset($_POST['send'])){

putenv(PHANTOMJS_EXECUTABLE);
$command = exec(CASPERJS . ' ..\sendMassages.js '. $_POST['send'], $res2);

$view = '../src/views/send_success.phtml';

include('../src/views/tamplate.phtml');
exit();
}

if(isset($_GET['count'])){

    $query = new QueryToDB();

    $today =date('Y-m-d');

    $sql= "SELECT massage, COUNT(*) AS count FROM leboncoin_voitures WHERE date_publish = '$today' GROUP BY massage";
    $result = $query->queryToDB($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
        $count[$row['massage']] = $row['count'];
        }
    }

    $sql= "SELECT * FROM leboncoin_voitures WHERE date_publish = '$today' LIMIT 50";
    $list = $query->queryToDB($sql);

$view = '../src/views/results.phtml';
include('../src/views/tamplate.phtml');
exit();
}


$view = '../src/views/index.phtml';
include('../src/views/tamplate.phtml');
