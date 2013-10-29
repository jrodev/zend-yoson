<?php
/**
 * Description of Application_Plugin_SchemaAdmin
 *
 * Esto se esta ejecutando para cada modulo ...!!!
 */
class Application_Plugin_Proclogin extends Zend_Controller_Plugin_Abstract {

    public function routeStartup (Zend_Controller_Request_Abstract $req) {
 
    }

    public function preDispatch (Zend_Controller_Request_Abstract $req)
    {
        
        $MOD = $req->getModuleName();
        $CTR = $req->getControllerName();
        $ACT = $req->getActionName();     //var_dump($req->getModuleName());
        $rsp = $this->getResponse();
        
        // Condicion de bloqueo para modulo admin si no esta logueado
        if($MOD=='admin' || $MOD=='agentes'){

            // Si ya se esta en /index/index ya no verficamos logueo
            if($CTR=='index' && $ACT=='index') return;

            // si no verificamos 
            $auth = Zend_Auth::getInstance();
            $data = $auth->getStorage()->read();  //var_dump($data); exit;
            // Rol admin desea entrar a agentes o Rol agente desea entrar a admin
            if(!is_null($data) && ( ($data->rol=='admin'&&$MOD=='agentes')||($data->rol=='agente'&&$MOD=='admin') ) ){ 
                $rsp->setRedirect("/$MOD/index/index")->sendResponse(); // que se logue
            }

            // Si no esta en sesion siempre redirecciona al index/index
            if(!$auth->hasIdentity()){
                $rsp->setRedirect("/$MOD/index/index")->sendResponse();
            }            
        }
    }
}
