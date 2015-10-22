<?php


return array(
	    'service_manager' => array(
        'factories' => array(
                   'Zend\Db\Adapter\Adapter' => 'Zend\Db\Adapter\AdapterServiceFactory',
                ),
          ),
       'db' => array(
                 'driver' => 'pdo',
                'dsn' => 'mysql:dbname=db_app2;host=localhost',
                 'username' => 'root',
                 'password' => '1234',
),
);
