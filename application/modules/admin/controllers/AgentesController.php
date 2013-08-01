<?php

class Admin_AgentesController extends Zend_Controller_Action
{

    public function init()
    {

    }

    public function indexAction()
    {

    }
    
    public function editAction()
    {

    }
    
    public function createAction()
    {
        $this->view->form = new Application_Form_Agente();
    }
}