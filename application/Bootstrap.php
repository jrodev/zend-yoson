<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

    public function __construct($appIni){ //echo "APP:"; var_dump($app); exit();
        
        parent::__construct($appIni);
        $paths = $this->getOption('paths');
        defined('STAT_URL') || define('STAT_URL', $paths['statUrl']);
        defined('BASE_URL') || define('BASE_URL', $paths['baseUrl']);
        defined('CSS_URL')  || define('CSS_URL' , $paths['cssUrl']);
        defined('JS_URL')   || define('JS_URL'  , $paths['jsUrl']);
        
        $pars=$this->getOption('pars'); defined('MIN')||define('MIN',$pars['min']);
        
    }

}