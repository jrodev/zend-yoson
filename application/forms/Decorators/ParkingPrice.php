<?php
/**
 * Description of GmapMarker
 * @author jrodev
 */
class Application_Form_Decorators_ParkingPrice extends Zend_Form_Decorator_Abstract
{
    protected $_format = '
        <select id="parkingInm" name="parkingInm" class="%s"><option value="0">No</option><option value="1">Si</option></select>
        &nbsp;&nbsp;&nbsp; precio: <input type="text" id="%s" value="" name="%s" class="%s" style="display:inline; width:150px;" />
    ';
    
    public function render($content)
    {
        $ele   = $this->getElement();
        $id    = htmlentities($ele->getAttrib('id'));
        $class = htmlentities($ele->getAttrib('class'));
        $type  = htmlentities($ele->getAttrib('type'));
        $name  = htmlentities($ele->getName());
        $ele->getDecorator('Description')->setEscape(false);
        //var_dump($ele->getType()); exit;
        $markup  = sprintf($this->_format, $class, $id, $name, $class);
        return $markup;
    }
}