<?php
 error_reporting(E_ALL | E_ERROR | E_STRICT & ~E_NOTICE);
// Define path to application directory
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    realpath(APPLICATION_PATH . '/../library'),
    //get_include_path(),
)));
//var_dump(implode(PATH_SEPARATOR, array(realpath(APPLICATION_PATH . '/../library'), get_include_path(),)));
//http://stackoverflow.com/questions/5314957/zend-warning-is-readable-function-is-readable-open-basedir-restriction
set_include_path(
    APPLICATION_PATH.'/../library'.PATH_SEPARATOR.
    //APPLICATION_PATH.'/../library/Firelogger'.PATH_SEPARATOR.
    APPLICATION_PATH.'/../library/Zend'
);
//var_dump(APPLICATION_PATH.'/../library'.PATH_SEPARATOR. APPLICATION_PATH.'/../library/Zend');

/** Firelogger */
require_once 'Firelogger/Core.php';
/** Zend_Application */
require_once 'Zend/Application.php';

// Create application, bootstrap, and run
$application = new Zend_Application(
    APPLICATION_ENV,
    APPLICATION_PATH . '/configs/application.ini'
);
$application->bootstrap()
            ->run();