  $paginator->addDecorator('Application_Model_Cupon', 'cuponListDecorator');
        $paginator->generateForm();
        $paginator->setViewCheckColumn(false);
        //$paginator->setCheckColumnValue('codigo');
        $paginator->setFiltersData($filters);
        $paginator->tuneStatement($ord, $typeOrd);
        //$paginator->setHeadTabs($headTabs);
        $paginator->setFootButtons($footButtons);
        $paginator->setTopButtons($topButtons);
        //$paginator->setCustomElements('hola <a href="">data pe</a>');
        $paginator->setItemIcons($itemIcons);
        $paginator->setCustomElements('<label class="cant-regs">/ de ' . $paginator->getAdapter()->count() . ' resultado(s)</label>');
        $paginator->setTitle("Listado de Cupones");
        $paginator->setCurrentPageNumber($page);
        //$paginator->setItemCountPerPage($nPage);

        return $paginator;
    }

    function exportPdfAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender();

        $orders = $this->_getParam('id', null);

        $name = 'cupon';

        if (!is_array($orders)) {
            $name = 'cupon-' . $orders;
            $orders = array($orders);
        }

        $modelOrder = new Application_Model_Orden();
        $modelUsuario = new Application_Model_Usuario();

        require_once('tcpdf/config/lang/eng.php');
        require_once('tcpdf/tcpdf.php');

        $pdf = new TCPDF("P", "mm", "A4", true, 'UTF-8', false);
        $pdf->setFontSubsetting(true);
        $pdf->SetFont('dejavusans', '', 10, '', true);

        foreach ($orders as $idOrder) {
            $pdf->AddPage();
            $orderData = $modelOrder->getOrderDetail($idOrder);
            $orderData['items'] = $modelOrder->getOrderItems($idOrder);
            $orderData['extraItems'] = $modelOrder->getOrderExtraItems($idOrder);
            $orderData['giftcard'] = $modelOrder->getOrderGiftCard($idOrder);
            $orderData['user'] = $modelUsuario->getUsuario($orderData['id_customer']);
            $html = $this->view->partial('cupon/_cuponpdf.phtml', array('order' => $orderData));
            $pdf->writeHTML($html, false, true, false);
        }

        $pdf->Output($name . '.pdf');
        exit;
    }

    function getDirigido($name)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from(array('c' => 'ps_customer'), array('firstname', 'lastname', 'id_customer'))
                ->where("CONCAT(firstname,' ',lastname) like ?", '%' . $name . '%');
        $stmt = $db->query($select);
        $row = $stmt->fetchAll();
        $stmt->closeCursor();
        return $row;
    }

    function getCategoryByCoupon($id)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from(array('c' => 'ps_category_coupon'), array(
                    'id_category'))
                ->where('c.id_coupon = ?', $id);

        $stmt = $db->query($select);
        $result = $stmt->fetchAll();

        $stmt->closeCursor();
        return $result;
    }

    function getCouponData($idCupon)
    {
        $db = Zend_Db_Table::getDefaultAdapter();
        $select = new Zend_Db_Select($db);
        $select->from(array('c' => 'ps_coupon'), array('id_coupon', 'code',
                    'all_categories', 'date_from', 'date_to', 'quantity',
                    'quantity_user', 'used_quantity', 'value', 'type',
                    'state' => "IF(date_from <= now() AND date_to >= now(), 'Activo', 'Inactivo')",
                    'active', 'description'))
                ->joinLeft(array('cu' => 'ps_customer'), 'c.id_customer = cu.id_customer', array('id_customer', 'firstname', 'lastname'))
                ->where('id_coupon = ?', $idCupon);
        $result = $db->fetchRow($select);

        $selectCategories = new Zend_Db_Select($db);
        $selectCategories->from(array('c' => 'ps_category_coupon'), ar��:�}B��*   �                   P r o g r a m   F i l e s   ( x 8 6 )    P 1     �@g Google  :   �'?V�@g*   �                   G o o g l e    P 1     �Bܤ Chrome  :   �'?b�Bܤ*   �                   C h r o m e    \ 1     �Bۤ APPLIC~1  D   �'?e�Bۤ*                       A p p l i c a t i o n    \ 2 � uBR�  chrome.exe  B   �'?e�B"�*   ��                  c h r o m e . e x e      u            8       t         ��<   TI106282W0A C:\Program Files (x86)\Google\Chrome\Application\chrome.exe  %   h t t p : / / t w i t t e r . g i t h u b . c o m / b o o t s t r a p / T C : \ U s e r s \ j r o d e v \ A p p D a t a \ L o c a l \ G o o g l e \ C h r o m e \ U s e r   D a t a \ D e f a u l t \ J u m p L i s t I c o n s \ E 7 0 1 . t m p     �%USERPROFILE%\AppData\Local\Google\Chrome\User Data\Default\JumpListIcons\E701.tmp                                                                                                                                                                                  % U S E R P R O F I L E % \ A p p D a t a \ L o c a l \ G o o g l e \ C h r o m e \ U s e r   D a t a \ D e f a u l t \ J u m p L i s t I c o n s \ E 7 0 1 . t m p                                                                                                                                                                                                                                                                                                                                                                     i   	  �   1SPS�XF�L8C���&�m�    A   1SPS�����Oh�� +'��%          
   B o o t s t r a p           `     �X       jrodev-pc        Hgn_��J�|��#��������h����ʔ�{B Hgn_��J�|��#��������h����ʔ�{B         �      FL        �      F�@      �os��l�I�/����&��                    � P�O� �:i�� +00� /C:\                   l 1     }B�� PROGRA~2  T   ��:�}B��*   �                   P r o g r a m   F i l e s   ( x 8 6 )    P 1     �@g Google  :   �'?V�@g*   �                   G o o g l e    P 1     �Bܤ Chrome  :   �'?b�Bܤ*   �                   C h r o m e    \ 1     �Bۤ APPLIC~1  D   �'?e�Bۤ*                       A p p l i c a t i o n    \ 2 � uBR�  chrome.exe  B   �'?e�B"�*   ��                  c h r o m e . e x e      u            8       t         ��<   TI106282W0A C:\Program Files (x86)\Google\Chrome\Application\chrome.exe     h t t p : / / w w w . d r a k e n s a n g . c o m / T C : \ U s e r s \ j r o d e v \ A p p D a t a \ L o c a l \ G o o g l e \ C h r o m e \ U s e r   D a t a \ D e f a u l t \ J u m p L i s t I c o n s \ E 7 0 2 . t m p     �%USERPROFILE%\AppData\Local\Google\Chrome\User Data\Default\JumpListIcons\E702.tmp                                                                                                                                                                                  % U S E R P R O F I L E % \ A p p D a t a \ L o c a l \ G o o g l e \ C h r o m e \ U s e r   D a t a \ D e f a u l t \ J u m p L i s t I c o n s \ E 7 0 2 . t m p                                                                                                                                                                                                                                                                                                                                                                     �   	  �   1SPS�XF�L8C���&�m�    �   1SPS�����Oh�� +'�١          H   D r a k e n s a n g   O n l i n e :   E l   j u e g o   d e   f a n t a s � a   o n l i n e   e n   t u   n a v e g a d o r   �   I n i c i o           `     �X       jrodev-pc        Hgn_��J�|��#��������h����ʔ�{B Hgn_��J�|��#��������h����ʔ�{B         �      FL        �      F�@      �os��l�I�/����&��                    � P�O� �:i�� +00� /C:\                   l 1     }B�� PROGRA~2  T   ��:�}B��*   �                   P r o g r a m   F i l e s   ( x 8 6 )    P 1     �@g Google  :   �'?V�@g*   �                   G o o g l e    P 1     �Bܤ Chrome  :   �'?b�Bܤ*   �                   C h r o m e    \ 1     �Bۤ APPLIC~1  D   �'?e�Bۤ*                       A p p l i c a t i o n    \ 2 � uBR�  chrome.exe  B   �'?e�B"�*   ��                  c h r o m e . e x e      u            8       t         ��<   TI106282W0A C:\Program Files (x86)\Google\Chrome\Application\chrome.exe     h t t p : / / h o m a i l . c o m / T C : \ U s e r s \ j r o d e v \ A p p D a t a \ L o c a l \ G o o g l e \ C h r o m e \ U s e r   D a t a \ D e f a u l t \ J u m p L i s t I c o n s \ E 7 1 2 . t m p     �%USERPROFILE%\AppData\Local\Google\Chrome\User Data\Default\JumpListIcons\E712.tmp                                                                                                                                                                                  % U S E R P R O F I L E % \ A p p D a t a \ L o c a l \ G o o g l e \ C h r o m e \ U s e r   D a t a \ D e f a u l t \ J u m p L i s t I c o n s \ E 7 1 2 . t m p                                                                                                                                                                                                                                                                                                                                                                     u   	  �   1SPS�XF�L8C���&�m�    M   1SPS�����Oh�� +'��1             I n i c i a r   s e s i � n             `     �X       jrodev-pc        Hgn_��J�|��#��������h����ʔ�{B Hgn_��J�|��#��������h����ʔ�{B         �      FL        �      F�       �os��l�I�/����&��                    � P�O� �:i�� +00� /C:\                   l 1     }B�� PROGRA~2  T   ��:�}B��*   �                   P r o g r a m   F i l e s   ( x 8 6 )    P 1     �@g Google  :   �'?V�@g*   �                   G o o g l e    P 1     �Bܤ Chrome  :   �'?b�Bܤ*   �                   C h r o m e    \ 1     �Bۤ APPLIC~1  D   �'?e�Bۤ*                       A p p l i c a t i o n    \ 2 � uBR�  chrome.exe  B   �'?e�B"�*   ��                  c h r o m e . e x e      u            8       t         ��<   TI106282W0A C:\Program Files (x86)\Google\Chrome\Application\chrome.exe     h t t p : / / c o m p u t r a b a j o . p e / �   	  �   1SPS�XF�L8C���&�m�    �   1SPS�����Oh�� +'�م          9   B o l s a   d e   t r a b a j o   y   O f e r t a s   d e   e m p l e o   -   C o m p u T r a b a j o   P e 