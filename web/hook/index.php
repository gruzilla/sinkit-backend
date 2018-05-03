<?php

$env = json_decode(file_get_contents('../.env.json'));

$secret = header('X-Hub-Signature');
$action = header('X-GitHub-Event');

$req = json_decode($HTTP_RAW_POST_DATA);

if ($action != 'push' || $secret != $env['WEBHOOK_SECRET']) {
    file_put_contents(
        'log.txt',
        "\n" .
        '404 secret: ' . $secret .
        ' action: ' . $action .
        ' raw: ' . "\n" .
        $HTTP_RAW_POST_DATA . "\n\n--------------"
    );
    return 404;
}

file_put_contents(
    'log.txt',
    "\n" .
    'OK action: ' . $action .
    ' raw: ' . "\n" .
    $HTTP_RAW_POST_DATA . "\n\n--------------"
);