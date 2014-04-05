<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

    public function __construct($appIni){ //---->>>>echo "APP:"; var_dump($appIni); exit();

        parent::__construct($appIni);
        $paths     = $this->getOption('paths'); //var_dump($paths); exit;
        $resources = $this->getOption('resources'); //var_dump($paths); exit;
        
        // Definiendo constantes globales
        defined('STAT_URL')     || define('STAT_URL'    , $paths['statUrl']);
        defined('BASE_URL')     || define('BASE_URL'    , $paths['baseUrl']);
        defined('CSS_URL')      || define('CSS_URL'     , $paths['cssUrl']);
        defined('JS_URL')       || define('JS_URL'      , $paths['jsUrl']);
        defined('PORTAL_VIEWS') || define('PORTAL_VIEWS', $paths['portalViews']);
        defined('PATH_UPL')     || define('PATH_UPL'    , $paths['uploads']);
        defined('TEMP_UPL')     || define('TEMP_UPL'    , $paths['elementTemp']);
        
        $pars=$this->getOption('pars'); defined('MIN')||define('MIN',$pars['min']);

        // Registrando ruta de layouts
        Zend_Registry::set('layouts', array(
            'portal'  => $resources['layout']['layout'], 
            'admin'   => $resources['layout']['admin'],
            'agentes' => $resources['layout']['agentes']
        ));
    }

    /**
     * Get the autoloader the base path for the module (application), 
     * add a new resource autoloader for the vendors folder to include vendor classes 
     * @return void
     */
    protected function _initAutoload() 
    {   
        return ; // quitar e incluir clase para utilizar  <----------------------------
        var_dump("_initAutoload");
        $vendorsAutoloader = new Zend_Loader_Autoloader_Resource(array(
            'namespace' => 'Firelogger',
            'basePath' => APPLICATION_PATH.'/../library/Firelogger',
        ));
        $vendorsAutoloader->addResourceType('logger', 'Firelogger/', 'Firelogger');
        Zend_Loader_Autoloader::getInstance()->pushAutoloader($vendorsAutoloader);
    }    
    
    /*Registrando los plugin que vayamos creando*/
    function _initPlugins() {
        /*Registrando plugin de : application/plugins*/
        Zend_Controller_Front::getInstance()->registerPlugin(new Application_Plugin_SetLayout());
        Zend_Controller_Front::getInstance()->registerPlugin(new Application_Plugin_SchemaAdmin());
        Zend_Controller_Front::getInstance()->registerPlugin(new Application_Plugin_ProcLogin());
        /*Zend_Controller_Front::getInstance()->registerPlugin(new Zend_Controller_Plugin_ErrorHandler(
            array('module'=>'admin', 'controller' =>'error', 'action'=>'error')
        ));*/
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