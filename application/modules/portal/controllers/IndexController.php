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
        Zend_Debug::dump($this->getRequest()->getParams());
        $this->view->assign('var', "indexAction");
        
    }
    
    public function uploadAction()
    {
        $this->view->headScript()->appendFile(JS_URL.'/library/jquery/plugins/jq.FileReader'.MIN.'.js');
    }

    public function foojsonAction()
    {
        $this->_helper->layout->disableLayout();
        $response = Zend_Controller_Front::getInstance()->getResponse();
        $response->setHeader('Content-Type', 'application/json', true);
        return Zend_Json::encode(array('val1'=>'value1', 'val2'=>'value2'));
    }

}