<?php

class Portal_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        //$this->_helper->removeHelper($name)
    }

    public function indexAction()
    {
        // action body
        $this->view->title = "indexAction";
    }


}
