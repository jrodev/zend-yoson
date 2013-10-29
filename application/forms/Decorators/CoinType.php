<?php
/**
 * Description of GmapMarker
 * @author jrodev
 */
class Application_Form_Decorators_CoinType extends Zend_Form_Decorator_Abstract
{
    protected $_format = '
        <select id="precioInm" name="precioInm" class="%s"><option value="1">S/.</option><option value="2">USD.</option></select>
        &nbsp;<input type="text" id="%s" value="" name="%s" class="%s" />
    ';
    
    public function render($content)
    {
        $ele   = $this->getElement();
        $id    = htmlentities($ele->getAttrib('id'));
        $class = htmlentities($ele->getAttrib('class'));
        $type  = htmlentities($ele->getAttrib('type'));
        $name  = htmlentities($ele->getName());
        //var_dump($ele->getType()); exit;
        $markup  = sprintf($this->_format, $class, $id, $name, $class);
        return $markup;
    }
}