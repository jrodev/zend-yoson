<?php
/**
 * Description of GmapMarker
 * @author jrodev
 */
class Application_Form_Decorators_GmapMarker extends Zend_Form_Decorator_Abstract
{
    protected $_format = '<div id="gmap_%s" class="%s"></div><input type="hidden" id="%s" value="" name="%s" />';
    
    public function render($content)
    {
        $ele   = $this->getElement();
        $id    = htmlentities($ele->getAttrib('id'));
        $class = htmlentities($ele->getAttrib('class'));
        $type  = htmlentities($ele->getAttrib('type'));
        $name  = htmlentities($ele->getName());
        //var_dump($ele->getType()); exit;
        $markup  = sprintf($this->_format, $id, $class, $id, $name);
        return $markup;
    }
}