<?php

class Portal_ContactController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        //$this->_helper->removeHelper($name)
        $ctrlDir = $this->getFrontController()->getControllerDirectory('portal');
        //echo "ctrlDir->".$ctrlDir;
        $this->view->addBasePath($ctrlDir . '/../views');//echo "INIT";
    }

    public function indexAction()
    {
        // action body
        $this->view->headLink()->appendStylesheet(CSS_URL.'/bst.datepicker/base'.MIN.'.css');
        $this->view->headLink()->appendStylesheet(CSS_URL.'/bst.datepicker/clean'.MIN.'.css');
        //$this->view->headScript()->appendFile(JS_URL.'/library/class/jq.FileReader'.MIN.'.js');
        $this->view->headScript()->appendFile(JS_URL.'/library/datepicker'.MIN.'.js');
        $this->view->headScript()->appendFile('http://maps.google.com/maps/api/js?sensor=false');
        $this->view->headScript()->appendFile(JS_URL.'/library/class/utilMaps.js');
        //Zend_Debug::dump($this->getRequest()->getParams());
        $this->view->assign('var', "indexAction");

    }


}