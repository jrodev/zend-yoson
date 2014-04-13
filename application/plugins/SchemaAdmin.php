<?php
/**
 * Description of Application_Plugin_SchemaAdmin
 *
 * Esto se esta ejecutando para cada modulo ...!!!
 */
class Application_Plugin_SchemaAdmin extends Zend_Controller_Plugin_Abstract {

    protected $_viewRenderer;
    protected $_view;
    
    public function preDispatch (Zend_Controller_Request_Abstract $request)
    {
        //Secciones y acciones
        $SeccAcc = array(
            'admin' => array(
                'index' => array(
                    'text' => 'Inicio',
                    'acts' => array(
                        'index' => array('text'=>'Iniciar sesion' ,'menu'=>true, 'active'=>false),
                        //'login' => array('text'=>'Iniciar sesion' ,'menu'=>true, 'active'=>false),
                        'passw' => array('text'=>'Recuperar clave','menu'=>true, 'active'=>false),
                    ),
                    'active' => false,
                ),
                'agentes' => array(
                    'text' => 'Listado Agentes',
                    'acts' => array(
                        'index'  => array('text'=>'Listar agentes' ,'menu'=>true , 'active'=>false),
                        'create' => array('text'=>'Nuevo agente'   ,'menu'=>true , 'active'=>false),
                        'edit'   => array('text'=>'Editar agente'  ,'menu'=>false, 'active'=>false),
                        'delete' => array('text'=>'Eliminar agente','menu'=>false, 'active'=>false),
                    ),
                    'active' => false,
                ),
                'inmuebles'=> array(
                    'text' => 'Listado Inmuebles',
                    'acts' => array(
                        'index' => array('text'=>'Listar inmuebles' ,'menu'=>true , 'active'=>false),
                        'order' => array('text'=>'Ordenar por'      ,'menu'=>false, 'active'=>false),                        
                    ),
                    'active' => false,
                ),
            ),
            'agentes' => array(
                'index' => array(
                    'text' => 'Inicio',
                    'acts' => array(
                        'index' => array('text'=>'Iniciar sesion' ,'menu'=>true, 'active'=>false),
                        'passw' => array('text'=>'Recuperar clave','menu'=>true, 'active'=>false),
                    ),
                    'active' => false,
                ),
                'inmuebles'=> array(
                    'text' => 'Listado Inmuebles',
                    'acts' => array(
                        'index'  => array('text'=>'Listar inmuebles' ,'menu'=>true , 'active'=>false),
                        'create' => array('text'=>'Nuevo inmueble'   ,'menu'=>false, 'active'=>false),
                        'edit'   => array('text'=>'Editando inmueble','menu'=>false, 'active'=>false),
                    ),
                    'active' => false,
                ),
                'perfil'   => array(
                    'text' => 'Perfil',
                    'acts' => array(
                        'index'  => array('text'=>'Editar perfil' ,'menu'=>true , 'active'=>false),                   
                    ),
                    'active' => false,
                ),
            ),
        );
        
        /* Esto es un singleton de la vista para que no lo reinicie */
        $this->_viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper('viewRenderer');
        $this->_viewRenderer->initView();
        $this->_view = $this->_viewRenderer->view;

        $modu=$request->getModuleName();    
        if($modu!='portal'){
            $ctrl=$request->getControllerName(); $acti=$request->getActionName();
            $SeccAcc[$modu][$ctrl]['active']=true;         //adicionando seccion activa
            $SeccAcc[$modu][$ctrl]['acts'][$acti]['active']=true;  //adicionando accion activa
            $this->_view->ctrl = $ctrl;
            $this->_view->plg_secc=$SeccAcc[$modu];
            $this->_view->plg_acci=$SeccAcc[$modu][$ctrl]['acts'];
            //var_dump($SeccAcc[$modu][$ctrl]['acts']);
        }
    }
}

?>
