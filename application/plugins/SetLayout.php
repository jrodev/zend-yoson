<?php
/**
 * Description of Application_Plugin_SetLayout
 *
 * @author jrodev
 */
class Application_Plugin_SetLayout extends Zend_Controller_Plugin_Abstract {
    
    public function __construct() {
        echo "<br>Application_Plugin_SetLayout CREATE!";
    }

    public function preDispatch (Zend_Controller_Request_Abstract $request)
    {
        /*Usando: 'layouts' registrado en el bootstrap principal*/
        //$errors = $request->getParam('error_handler'); var_dump($errors); exit;
        $layouts = Zend_Registry::get('layouts');
        Zend_Layout::getMvcInstance()->setLayout($layouts[$request->getParam('module')]);
    }
}

?>
