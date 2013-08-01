<?php
/*
 * 
 */
class Agentes_IndexController extends Zend_Controller_Action
{
    private $defAdp;
    private $autAdp;
    private $auth;
    private $rowUser = false;
    
    public function init()
    {
        $this->defAdp  = Zend_Db_Table::getDefaultAdapter();
        $this->autAdp  = new Zend_Auth_Adapter_DbTable($this->defAdp, 'user');
        $this->auth    = Zend_Auth::getInstance(); 
        $this->rowUser = null;        //Zend_Controller_Action_Helper_Redirector::    $this->_redirect($url);
    }

    public function indexAction()
    {
        //echo "hasIdentity: |"; var_dump($this->auth->hasIdentity()); echo "|";
        if($this->auth->hasIdentity()){
            $data = $this->auth->getStorage()->read();
            if($data->rol=='admin') $this->_redirect('/admin/index/index');
            echo "<br>Role:$data->rol - User: $data->username | <b>[sesion]</b>";
            return;
        }
        //$user = new Application_Model_Admin_User(); //$user->getAdapter() <> $this->defAdp
        $form = new Application_Form_Login();
        $rqst = $this->getRequest();
        $this->view->form = $form;

        if( $rqst->isPost() && $form->isValid($rqst->getPost()) ){
            
            $this->auth->clearIdentity(); // Cerrando sesion si existiese
            $data = $form->getValues(); //$auth = Zend_Auth::getInstance();
            $this->autAdp->setIdentityColumn('username')
                         ->setCredentialColumn('password');
            $this->autAdp->setIdentity($data['username'])
                         ->setCredential($data['password']);

            $result = $this->auth->authenticate($this->autAdp);

            if($result->isValid()){
                
                $this->rowUser = $this->autAdp->getResultRowObject(null, 'password');
                //Si no es del rol asociado
                if($this->rowUser->rol!='agente'){
                    $this->logout();
                    $this->view->loginMsg = "Usuario o password invalido.";
                    return;
                }
                $this->auth->getStorage()->write($this->rowUser);
                $this->_redirect('/admin/index/index');
            } else {
                $this->view->loginMsg = "Usuario o password invalido";
            }         
        }
    }
    
    public function passwAction()
    {

    }
    
    public function logoutAction()
    {
        $this->logout();
        $this->_redirect('/admin/index/index');
    }
    
    private function logout()
    {
        $this->auth->clearIdentity();
        $this->auth->getStorage()->clear();
    }
}