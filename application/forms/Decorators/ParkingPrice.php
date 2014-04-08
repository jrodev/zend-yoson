<?php
/**
 * Description of GmapMarker
 * @author jrodev
 */
class Application_Form_Decorators_ParkingPrice extends Zend_Form_Decorator_Abstract
{
    protected $_format = '
        <select id="parkingInm" name="parkingInm" class="%s">
            <option value="0" %s>No</option>
            <option value="1" %s>Si</option>
        </select>
        &nbsp;&nbsp;&nbsp; precio: %s
    '; //'<input type="text" id="%s" value="" name="%s" class="%s" style="display:inline; width:150px;" />'
    
    protected $_formVals = array();
    
    public function __construct($formValues=array('parkingInm'=>'0'))
    {
        $this->_formVals = is_null($formValues)?array('parkingInm'=>'0'):$formValues;
    }
    
    public function render($content)
    {
        $strInp = $content;
        $ele   = $this->getElement();
        $id    = htmlentities($ele->getAttrib('id'));
        $class = htmlentities($ele->getAttrib('class'));
        $type  = htmlentities($ele->getAttrib('type'));
        $name  = htmlentities($ele->getName());
        $ele->getDecorator('Description')->setEscape(false);
        
        // Si es Soles o Dolares
        $no = ($this->_formVals['parkingInm']=='0')?'selected':'';
        $si = ($this->_formVals['parkingInm']=='1')?'selected':'';

        $markup  = sprintf($this->_format, $class, $no, $si, $strInp/*$id, $name, $class*/);
        return $markup;
    }
}