<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

    public function __construct($appIni){ //echo "APP:"; var_dump($appIni); exit();

        parent::__construct($appIni);
        $paths     = $this->getOption('paths'); //var_dump($paths); exit;
        $resources = $this->getOption('resources'); //var_dump($paths); exit;
        
        defined('STAT_URL')     || define('STAT_URL'    , $paths['statUrl']);
        defined('BASE_URL')     || define('BASE_URL'    , $paths['baseUrl']);
        defined('CSS_URL')      || define('CSS_URL'     , $paths['cssUrl']);
        defined('JS_URL')       || define('JS_URL'      , $paths['jsUrl']);
        defined('PORTAL_VIEWS') || define('PORTAL_VIEWS', $paths['portalViews']);
        
        $pars=$this->getOption('pars'); defined('MIN')||define('MIN',$pars['min']);

        Zend_Registry::set('layouts', array('portal'=>$resources['layout']['layout'], 'admin'=>$resources['layout']['admin']));
    }

    /*Registrando los plugin que vayamos creando*/
    function _initPlugins() {
        /*Registrando plugin de : application/plugins*/
        Zend_Controller_Front::getInstance()->registerPlugin(new Application_Plugin_SetLayout());
        Zend_Controller_Front::getInstance()->registerPlugin(new Application_Plugin_SchemaAdmin());
        Zend_Controller_Front::getInstance()->registerPlugin(new Zend_Controller_Plugin_ErrorHandler(
            array('module'=>'admin', 'controller' =>'error', 'action'=>'error')
        ));
    }
    
    /**
     * Ruteo de urls 990974967
     */
    function _initRoute() {
        $config = new Zend_Config_Ini(APPLICATION_PATH . "/configs/routes.ini");
        $routerExternal = new Zend_Controller_Router_Rewrite();
        $routerExternal->addConfig($config->main,'routes');
        Zend_Controller_Front::getInstance()->setRouter($routerExternal);
        /*
        $options = $this->getOptions();
        $host = substr($options['resources']['ZExtraLib_Application_Resource_Server']['content']['host'],7,-1);

        $routeMaster = $this->bootstrap('frontController')->getResource('frontController')->getRouter();
        $hostnameRoute = new Zend_Controller_Router_Route_Hostname(':tienda.' . $host,
                array('controller' => 'tienda'));
        $routeMaster->addRoute('tienda', $hostnameRoute);

        $routerShop = new Zend_Controller_Router_Rewrite();
        $routerShop->addConfig($config->shop,'routes');
        foreach($routerShop->getRoutes() as $key => $route)
            $routeMaster->addRoute('hostname' . $key , $hostnameRoute->chain($route));*/
    }

}