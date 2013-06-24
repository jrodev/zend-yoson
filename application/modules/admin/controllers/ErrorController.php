<?php
/*
 * 
 */
class Admin_ErrorController extends Zend_Controller_Action
{
    function init(){
        //$this->_helper->layout->setLayout('layout_404');
    }
    
    public function errorAction()
    {
        $errors = $this->_getParam('error_handler');
        echo "<br>ERROR route: ".$errors->type; //exit;
        
        switch ($errors->type) {
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ROUTE:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_CONTROLLER:
            case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ACTION:
                // 404 error -- controller or action not found
                $this->getResponse()->setHttpResponseCode(404);
                $this->view->errCode = 404;
                break;
            default:
                // application error
                $this->getResponse()->setHttpResponseCode(500);
                $this->view->errCode = 500;
                break;
        }
        // conditionally display exceptions
        if ($this->getInvokeArg('displayExceptions') == true) {
            $this->view->exception = $errors->exception;
        }
        $this->view->request = $errors->request;
    }

}

