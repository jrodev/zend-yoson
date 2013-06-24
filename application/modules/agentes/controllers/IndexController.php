<?php
/*
 * 
 */
class Admin_IndexController extends Zend_Controller_Action
{
    public function init()
    {
        Zend_Layout::getMvcInstance()->setLayout('admin');
        $ctrlDir = $this->getFrontController()->getControllerDirectory('admin');
        //echo "ctrlDir->".$ctrlDir;
        $this->view->addBasePath($ctrlDir . '/../views');//echo "INIT";
    }

    public function indexAction()
    {
        echo "<br>Action_Index";
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