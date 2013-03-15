<?php

class Portal_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        //$this->_helper->removeHelper($name)
        echo "INI!<br>";
    }

    public function indexAction()
    {
        // action body
        Zend_Debug::dump($this->getRequest()->getParams());
        $this->view->assign('var', "indexAction");
        
    }


}

