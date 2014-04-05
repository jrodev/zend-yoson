<?php
/**
 * Description of Application_Plugin_SchemaAdmin
 *
 * Esto se esta ejecutando para cada modulo ...!!!
 */
class Application_Plugin_Proclogin extends Zend_Controller_Plugin_Abstract {

    public function routeStartup (Zend_Controller_Request_Abstract $req) 
    {
 
    }

    public function preDispatch (Zend_Controller_Request_Abstract $req)
    {
        $MOD = $req->getModuleName();
        $CTR = $req->getControllerName();
        $ACT = $req->getActionName();     //var_dump($req->getModuleName());
        $rsp = $this->getResponse();
        
        // Condicion de bloqueo para modulo admin si no esta logueado
        $this->blockingModules(array($MOD, $CTR, $ACT), $rsp);
    }
    
    /**
     * Bloquea el ingreso a las secciones y procesos de los modulos para usuarios 
     * no logueados.
     * @param array $mca contiene los nombres de: Modulo , controler y action
     * @param Zend_Controller_Response_Abstract $rsp Objeto response.
     * @return void
     */
    private function blockingModules($mca=array('agentes','index','index'), $rsp=FALSE)
    {
        if(!$rsp){ throw new Exception('Response is null.'); return; }
        // Module, Controller, Action
        list($m,$c,$a) = $mca;
        // Condicion de bloqueo para modulo admin si no esta logueado
        if($m=='admin' || $m=='agentes') {
            // Si ya se esta en /index/index ya no verficamos logueo
            if($c=='index' && $a=='index') return;
            // si no verificamos 
            $auth = Zend_Auth::getInstance();
            $data = $auth->getStorage()->read();  //var_dump($data); exit;
            // Rol admin desea entrar a agentes o Rol agente desea entrar a admin
            if(!is_null($data) && ( ($data->rol=='admin'&&$m=='agentes')||($data->rol=='agente'&&$m=='admin') ) ) { 
                $rsp->setRedirect("/$m/index/index")->sendResponse(); // que se logue
            }
            // Si no esta en sesion siempre redirecciona al index/index
            if(!$auth->hasIdentity()) {
                $rsp->setRedirect("/$m/index/index")->sendResponse();
            }            
        }
    }
    
}
