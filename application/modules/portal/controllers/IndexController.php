<?php

class Portal_IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        //$this->_helper->removeHelper($name)
        $ctrlDir = $this->getFrontController()->getControllerDirectory('portal');
        //echo "ctrlDir->".$ctrlDir;
        $this->view->addBasePath($ctrlDir . '/../views');
    }

    public function indexAction()
    {
        // action body
        $this->view->headLink()->appendStylesheet(CSS_URL.'/datepicker'.MIN.'.css');
        //$this->view->headScript()->appendFile(JS_URL.'/library/class/jq.FileReader'.MIN.'.js');
        $this->view->headScript()->appendFile(JS_URL.'/library/datepicker'.MIN.'.js');
        //$this->view->headScript()->appendFile(JS_URL.'/application/modules/portal/pages/index'.MIN.'.js');
        //Zend_Debug::dump($this->getRequest()->getParams());
        $this->view->assign('var', "indexAction");

    }
    
    public function uploadAction()
    {
        $this->view->headScript()->appendFile(JS_URL.'/library/class/jq.FileReader'.MIN.'.js');
    }

    public function foojsonAction()
    {
        $this->_helper->layout->disableLayout();
        $response = Zend_Controller_Front::getInstance()->getResponse();
        $response->setHeader('Content-Type', 'application/json', true);
        return Zend_Json::encode(array('val1'=>'value1', 'val2'=>'value2'));
    }

}