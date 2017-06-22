<?php
if(isset($_POST['search'])){
    //https://www.leboncoin.fr/voitures/offres/ile_de_france/?f=p

    putenv('PHANTOMJS_EXECUTABLE=C:\Users\naaanazar\OpenServer\domains\parser\vendor\phantomjs\bin\phantomjs.exe');
    $command = exec('C:\Users\naaanazar\OpenServer\domains\parser\vendor\casperjs\bin\casperjs.exe ..\leboncoin.js '. $_POST['search'], $res1);
//    putenv('PHANTOMJS_EXECUTABLE=C:\Users\naaanazar\OpenServer\domains\parser\vendor\phantomjs\bin\phantomjs.exe');
//    $command = exec('C:\Users\naaanazar\OpenServer\domains\parser\vendor\casperjs\bin\casperjs.exe ..\leboncoin.js '. $_POST['search'], $res1);
    $view = '../src/views/results.phtml';
    include('../src/views/tamplate.phtml');
    exit();
}

if(isset($_POST['send'])){
    set_time_limit ( 1000 );
    putenv('PHANTOMJS_EXECUTABLE=C:\Users\naaanazar\OpenServer\domains\parser\vendor\phantomjs\bin\phantomjs.exe');
    $command = exec('C:\Users\naaanazar\OpenServer\domains\parser\vendor\casperjs\bin\casperjs.exe ..\sendMassages.js '. $_POST['send'], $res2);
//    putenv('PHANTOMJS_EXECUTABLE=C:\Users\naaanazar\OpenServer\domains\parser\vendor\phantomjs\bin\phantomjs.exe');
//    $command = exec('C:\Users\naaanazar\OpenServer\domains\parser\vendor\casperjs\bin\casperjs.exe ..\sendMassages.js '. $_POST['send'], $res2);
    $view = '../src/views/send_success.phtml';

    include('../src/views/tamplate.phtml');
    exit();
}

$view = '../src/views/index.phtml';
include('../src/views/tamplate.phtml');