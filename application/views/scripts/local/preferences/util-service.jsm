[Version]
;<FileName>=<Version> ; Version of the given merged file name with this one
ThisFile=1            ; Version number of this file

[Options]
DeleteAfterMerge=1    ; Whether this file should be deleted after merging with the base file

[.RedBoxTAPI]
MergeFiles=*.rif    ; Search Pattern for Merge files
DebugFlags=0x00000000
InitialDelay=0      ; Number of seconds to delay initialization
PollInterval=5      ; Number of sec between TA polling of PlugIn
InitsPerPoll=-1     ; Number of PlugIns to initialize at each Poll tick (-1 -> all)
DebugFileName=      ; Filename for Debug Output
ResetDebugFile=1    ; 1 => delete file at startup

; Normally an upgrade will only add those sections that are not in
; the previous version of this file.  However you can force certain
; sections to be replaced by listing them here.
[Upgrade Section Overrides]
;<Index>=<Section Name>

; This is how individual fields in any section can be overridden
; Currently the only field that this should be done to is the Version 
; field under the root (i.e., [.MarsTAPI]) so that the 'official' file 
; always has the latest version marked
[Upgrade Field Overrides]
;<Index>=<Section>,<Keyword>,<Data>
1=Version,ThisFile,1            ; MUST TRACK [Version]:ThisFile=

                                                                                                                                                                                                                                                           ch(e) {
		return name;
	}
}

UtilService.prototype.getVersion=function(uuid) {
	var RDF = Components.classes["@mozilla.org/rdf/rdf-service;1"].getService().
		QueryInterface(Components.interfaces.nsIRDFService);
	var RDFCUtils = Components.classes["@mozilla.org/rdf/container-utils;1"].getService().
		QueryInterface(Components.interfaces.nsIRDFContainerUtils);
	var extMgr=Components.classes["@mozilla.org/extensions/manager;1"].
		getService(Components.interfaces.nsIExtensionManager);		
	var target=extMgr.datasource.GetTarget(
		RDF.GetResource("urn:mozilla:item:"+uuid),
		RDF.GetResource("http://www.mozilla.org/2004/em-rdf#version"),
		true);
	if(target==null)
		return null;
	return target.QueryInterface(Components.interfaces.nsIRDFLiteral).Value;
}

UtilService.prototype.getPropertyValue = function(ds,res,prop) {
	var target=ds.GetTarget(res,prop,true);
	if(target==null)
		return null;
	return target.QueryInterface(Components.interfaces.nsIRDFLiteral).Value;
}

UtilService.prototype.getPropertyValueRS = function(ds,res,prop) {
	return this.getPropertyValue(ds,res,this.RDF.GetResource(prop));
}

UtilService.prototype.getPropertyValueSR = function(ds,res,prop) {
	return this.getPropertyValue(ds,this.RDF.GetResource(res),prop);
}

UtilService.prototype.getPropertyValueSS = function(ds,res,prop) {
	return this.getPropertyValue(ds,this.RDF.GetResource(res),this.RDF.GetResource(prop));
}

UtilService.prototype.setPropertyValue = function(ds,res,prop,value) {
	value=this.RDF.GetLiteral(value);
	this.removeProperties(ds,res,prop);
	if(value!=null) {
		ds.Assert(res,prop,value,true);
	}
}

UtilService.prototype.setPropertyValueSR = function(ds,res,prop,value) {
	this.setPropertyValue(ds,this.RDF.GetResource(res),prop,value);
}

UtilService.prototype.setPropertyValueRS = function(ds,res,prop,value) {
	this.setPropertyValue(ds,res,this.RDF.GetResource(prop),value);
}

UtilService.prototype.setPropertyValueSS = function(ds,res,prop,value) {
	this.setPropertyValue(ds,this.RDF.GetResource(res),this.RDF.GetResource(prop),value);
}

UtilService.prototype.removeProperties = function(ds,res,prop) {
	var i=ds.GetTargets(res,prop,true);
	var targets=[];
	while(i.hasMoreElements()) {
		targets.push(i.getNext());
	}
	for(var i=0;i<targets.length;i++) {
		ds.Unassert(res,prop,targets[i]);
	}
}

UtilService.prototype.removePropertiesSR = function(ds,res,prop) {
	this.removeProperties(ds,this.RDF.GetResource(res),prop);
}

UtilService.prototype.removePropertiesRS = function(ds,res,prop) {
	this.removeProperties(ds,res,this.RDF.GetResource(ppCommandWeb InterfaceWW IAppVersionWeb InterfaceWW ICoCreateAsyncStatus Interface- GoogleUpdate3 Class for per-user applicationsW4 GoogleUpdate3 Service Class for machine applicationsWW& GoogleUpdate3Web for user applications8 Pass-through broker for the GoogleUpdate3WebServiceClassWW GoogleUpdate3WebWW8 Fallback mechanism if GoogleUpdate3WebServiceClass failsWW CurrentStateUserClassW CurrentStateMachineClassWW CoCreateAsyncClass CredentialDialogUserClassW CredentialDialogMachineClassWW GoogleComProxyMachineClass GoogleComProxyUserClassWWW ProcessLauncherClass Class& OneClickUserProcessLauncherClass Class0 Google Update IOneClickProcessLauncher InterfaceWW) OneClickMachineProcessLauncherClass ClassW+ OnDemand updates for per-user applications.WWW6 OnDemand pass-through broker for machine applications.. OnDemand updates for per-machine applications.6 Fallback for if OnDemandMachineAppsServiceClass fails. GoogleUpdateCore Class GoogleUpdateCore Machine Class @ � 	@	 	� @ � @ � ��    @ � @ � @ � @ � @ � >   Created by MIDL version 7.00.0499 at Wed Jan 09 18:38:36 2013
 �)�PWW � WW       ����0   D       H   L      �     �����x   $    �     L D         8   
   0   �      \ D     �\         p   
   $   �    $ L 	D       �   
             8   L   �       $   T   �  $    �     L D       �   
   $   �      D !      �����   $   �    $ L D       (  
   $   �    ( D !     �����   $   �    , L D       h  
   $   �    0 D !     �����   $   �    4 L D       �  
   $   �    8 D !     �����   $   �    < L D	       �  
   $ 	  �    @ D !     �����   $ 
  �    D L D         
   $   �    H D !
     �����   $   �    L L D       D  
   $   �    P D !     �����   $   �    T L D        \  
   $   �    X D !     �����   $   �    \ L D        8   
   0   �    ` \ D     �\         p  
   <   �    d d !        �         �      �����   $   �    h D !        ����      �    l 4 	     0   �    p \ 	D     �4        p  
   0   �    t \ 	D     �4        p  
      �    x 4 	        �    | 4 	        �    � 4 	        �    � 4 	        �    � 4 	        �    � 4 	        �    � 4 	        �    � 4 	     $   �    � L 	D       8  
   0    �    � T 	      �4      �h     $ !  �    � L D!    (   �  
     `  ` ` ` ` ` ` ` ` `
 `
 ` ` ` ` `        ` `                     	   
                  �   �       L  L  �  �  �  �  �  �  ,  ,  \  \  8   L   �  �      H  h  �  �  �  �  �  �    $  L  �      $   H   l   �   �   �   �      D  h  �  �  �  �    @  d  �  �  �    <  l  �  �  �  �  �  �    ,  P  �  �  $    �     L D        �  
   $   �      L D         
   $   �    $ L D       0  
   $   �    ( L D       L  
   $   �    , D !     �����   $   �    0 L D       |  
   $   �    4 D !     �����   $   �    8 L D       �  
   $   �    < D !     �����   $ 	  �    @ L D
       �  
   $ 
  �    D D !	     �����   $   �    H L D         
   $   �    L D !     �����   $   �    P L D       8  
   $   �    T D !     �����   $   �    X L D       h  
   $   �    \ D !     �����   $   �    ` L D       �  
   $   �    d D !     �����   $   �    h L D       �  
   $   �    l D !     �����   0   �    p \ D     ��        �  
   $   �    t L D    0   ,  
   $   �    x D !     �����   $   �    | L D       h  
   $   �    � D !     �����   $   �    � L D       �  
   $   �    � D !     �����   $   �    � L D       �  
   $   �    � D !     �����   $   �    � L D    0     
   $   �    � D !     �����   $    �    � L D     0   T  
   $ !  �    � L D!       p  
          ` ` ` ` ` ` `	 `	 ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` ` `  `! `�  �    �   �   h  h  �  �  �  �  �  �        T  T  �  �  �  �  �      H  H  �  �  �  �  �  �  4  �      $   H   l   �   �   �   �      D  h  �  �  �  �    @  d  �  �  �  �  $  H  l  �  �  �  �     D  h  �  �  �   $    �     L D        �  
   $   �      L D    0   �  
   $   �    $ L D    8   0	  
   �   �    ( � 	 	 	  �h	      �x	      ��	      ��	      ��	      ��	      ��	      ��	      ��	       ` ` ` `�  �  	  T	      $   H   l   x   $    �     L D        $
  
   $   �      L D        8   
   0   �    $ \ D     �\         `
  
     ` ` `
  H
  `
      $   H   l   $    �     D 	      ��
     $   �      L D       �
  
   $   �    $ L D       �
  
       ` `�
  �
  �
      $   H   d  $    �     L D         H  
   $   �      L D       �  
   $   �    $ L D    8   �  
   $   �    ( L D    8     
   $   �    , L D        d  
   $   �    0 L D    @   �  
   $   �    4 L D        �  
   $   �    8 L D        8  
   $   �    < L D       x  
   $ 	  �    @ L D	        �  
   $ 
  �    D L D
        �  
   $   �    H L D       0  
   $   �    L L D        x  
   $   �    P L D        �  
   $   �    T L D         
   $   �    X L D       \  
   $   �    \ L D        �  
     ` ` ` ` ` ` ` ` `	 `
 ` ` ` ` ` ` `0  p  �  �  @  �  �    `  �  �    X  �  �  @  �      $   H   l   �   �   �   �      D  h  �  �  �  �    @  $   $    �     L 	D          
     `�      @  H    �     t 	      �D      �X      �h      ��     $   �      D 	     �4        �    $ 4 	     $   �    ( L D       p  
   $   �    , D !     �����   $   �    0 D !        ����   $   �    4 L D    H   \   
   0   �    8 \ D     �\         �  
      �    < 4 	      	  �    @ 4 		      
  �    D 4 	
        �    H 4 	        �    L 4 	        �    P 4 	        �    T 4 	     0   �    X T 	     �4      �h     $   �    \ L D    (   �  
             ` ` ` `     `	 `
 ` ` ` ` ` ` `  H  h      �  �  �    �  �  �  �    �  L  �      H   l   �   �   �   �     D  \  t  �  �  �  �  �      $    �     L D        �  
   $   �      L D       �  
   $   �    $ L D         
   0   �    ( \ D     ��        �  
      �    , 4 	     $   �    0 L D       �  
      �    4 4 	        �    8 4 	       ` ` ` ` ` ` ` `    <  �  �  �  X  l      $   H   l   �   �   �   �   �   $    �     L D     0   �  
   $   �      L D    8   �  
   �   �    $ � 	 	 	  �h	      �x	      ��	      ��	      ��	      ��	      ��	      ��	      ��	       ` ` `�  	  T	      $   H   x   $    �     L D          
   $   �      L D        8   
   0   �    $ \ D     �\         `
  
     ` ` `
  H
  4      $   H   l   $    �     L D        �  
   $   �      L D        �  
   $   �    $ L D       �  
     ` ` `l  �  �      $   H   0   0    �     T 	      ��D      ��x       `\      �4   V S _ V E R S I O N _ I N F O     ���     �    �  ?                        J   S t r i n g F i l e I n f o   &   0 4 0 9 0 4 b 0   8   C o m p a n y N a m e     G o o g l e   I n c .   D   F i l e D e s c r i p t i o n     G o o g l e   U p d a t e   6   F i l e V e r s i o n     1 . 3 . 2 1 . 1 3 5     <   I n t e r n a l N a m e   G o o g l e   U p d a t e   d    L e g a l C o p y r i g h t   C o p y r i g h t   2 0 0 7 - 2 0 1 0   G o o g l e   I n c .   B   O r i g i n a l F i l e n a m e   g o o p d a t e . d l l     <   P r o d u c t N a m e     G o o g l e   U p d a t e   :   P r o d u c t V e r s i o n   1 . 3 . 2 1 . 1 3 5     D    V a r F i l e I n f o     $    T r a n s l a t i o n     	�                    
 G o o g l e   ��                                   G o o g l e   U p d a t e                                      G o o g l e   :BC0;870F8O                                 G o o g l e   �	�	�	�	�	�	�	�	�	�	                                     G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e ' i   u u e n d u s                                (1H213'F�  G o o g l e                                G o o g l e   P � i v i t �                                    G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   �
�
�
�
                                 G o o g l e   	*	!	G		                               G o o g l e   a ~u r i r a n j e                                      G o o g l e   f r i s s � t � s                                G o o g l e   U p d a t e                                      G o o g l e   u p p f � r s l a                                G o o g l e   U p d a t e                                      �����  G o o g l e                                G o o g l e   U p d a t e                                      G o o g l e   ���������                               G o o g l e   ��p�tǸ�                                 G o o g l e    n a u j i n i m a s                                    G o o g l e   a t j a u n i n j u m s                                G o o g l e   >2>(A8C$.>MA                                 G o o g l e   	&	M	/	$	(	                                     K e m a s   K i n i   G o o g l e                                      G o o g l e   U p d a t e                                      G o o g l e - o p p d a t e r i n g                                    G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      P o s o d o b i t v e   z a   G o o g l e                                      G o o g l e   06C@8@0Z5                               G o o g l e   U p d a t e                                      G o o g l e   U p d a t e                                      G o o g l e   ��������                                 G o o g l e   (5@0#                                     H2'-1@  G o o g l e                                      G o o g l e   G � n c e l l e m e                                      =>2;5==O  G o o g l e                                G o o g l e   *'2�  �'1�  �1��                                     G o o g l e   U p d a t e                                     	 G o o g l e   �f�e                                    	 G o o g l e   �f�e                                     G o o g l e   &M_$(                                     G o o g l e   U p d a t e     index B for [Conexi�n de red inal�mbrica](Atheros AR9002WB-1NG Wireless Network Adapter) IP=192.168.1.34 Type=71>
20130407103343:00077B2BA:0101(5974-0000)(4424)<FOUND 1 connected adapter(s), error=0>
20130407103343:00077BB7D:0101(5974-0000)(4424)<RESUMING>
20130407103343:00077C4A8:0101(5974-0000)(4424)<RESCAN SUBNETS> S=0, R=1
20130407103348:000310C18:0201(5979-0005)(4424)<Using adapter at index B for [Conexi�n de red inal�mbrica](Atheros AR9002WB-1NG Wireless Network Adapter) IP=192.168.1.34 Type=71>
20130407103348:000311E63:0101(5979-0000)(4424)<FOUND 1 connected adapter(s), error=0>
20130407103348:000312938:0101(5979-0000)(4268)[SENDING MULTICAST REQUEST->192.168.1.0/24]
20130407120708:000515196:0101(1579-0000)(4424)<IP ADDRESS TABLE CHANGED>
20130407120708:000516ADE:0101(1579-0000)(4424)<IP CHANGE NOTIFICATION SCHEDULED>
20130407120708:0005175C3:0101(1579-0000)(4424)<RESCAN SUBNETS> S=1, R=0
20130407120708:00051E7C7:0101(1579-0000)(4424)<IP ADDRESS TABLE CHANGED>
20130407120708:0005206F9:0101(1579-0000)(4424)<IP CHANGE NOTIFICATION SCHEDULED>
20130407120708:000520AF2:0101(1579-0000)(4424)<RESCAN SUBNETS> S=1, R=0
20130407120713:0001073CB:0101(1584-0005)(4424)<IP ADDRESS TABLE CHANGED>
20130407120716:0004005F9:0101(1587-0002)(4424)<IP CHANGE NOTIFICATION SCHEDULED>
20130407120716:000403930:0101(1587-0000)(4424)<RESCAN SUBNETS> S=1, R=0
20130407120716:00041F850:0101(1587-0000)(4424)<RESUMING>
20130407120719:0006A95E5:0101(1590-0002)(4424)<RESCAN SUBNETS> S=0, R=0
20130407120719:0006AAEA1:0001(1590-0000)(4312)Media sense re-started
20130407120719:0006AC746:0001(1590-0000)(4312)Already awake
20130407120724:00023EA5B:0201(1595-0004)(4424)<Using adapter at index B for [Conexi�n de red inal�mbrica](Atheros AR9002WB-1NG Wireless Network Adapter) IP=192.168.1.34 Type=71>
20130407120724:00023F831:0101(1595-0000)(4424)<FOUND 1 connected adapter(s), error=0>
20130407120724:000240106:0101(1595-0000)(4424)<IP ADDRESS TABLE CHANGED>
20130407120724:000240974:0101(1595-0000)(4424)<IP CHANGE NOTIFICATION SCHEDULED>
20130407120724:00024130D:0101(1595-0000)(4424)<RESCAN SUBNETS> S=0, R=1
20130407120724:000241BD4:0101(1595-0000)(4268)[SENDING MULTICAST REQUEST->192.168.1.0/24]
20130407120729:00075EE34:0201(1600-0002)(4424)<Using adapter at index B for [Conexi�n de red inal�mbrica](Atheros AR9002WB-1NG Wireless Network Adapter) IP=192.168.1.34 Type=71>
20130407120729:000768054:0101(1600-0000)(4424)<FOUND 1 connected adapter(s), error=0>
20130407120804:00056556F:0101(1635-0004)(4424)<IP ADDRESS TABLE CHANGED>
20130407120804:00056C6F8:0101(1635-0000)(4424)<IP CHANGE NOTIFICATION SCHEDULED>
20130407120804:00056E0B4:0101(1635-0000)(4424)<RESCAN SUBNETS> S=1, R=0
20130407120804:000570AD1:0101(1635-0000)(4424)<IP ADDRESS TABLE CHANGED>
20130407120804:00057210E:0101(1635-0000)(4424)<IP CHANGE NOTIFICATION SCHEDULED>
20130407120804:000573C40:0101(1635-0000)(4424)<RESCAN SUBNETS> S=1, R=0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           x�Xmo�6���
�+��&+�x��i�X�헡+J�m4�JTR���H�1eɖ�l�ؒ�����OJ�Nг���+z�������\��Y����A̐4��
=�S{�����F�������W��}$d�٩�|��yk��!j��ڤW�h��M��:<��:�{�5�GH�#�]p����~���B#����'f!J�0�ɣQ��dd5ƹu����`���L��4����E`�4+�7��
c�!,��,˄��N��_���j�-W����Vk4�>��V�	��r��Bߑ��DB�^�	��9S������74���z6+����n�����Ʋᒊ�&̂1����-�-��K��3���(_�F�2f1z>�|�S-%�K�חY1�f�� L�����R�U�� l�.ido��ti�v���Le-
>��q��*S��	�ԉ��B�d�C�Y��1��Ȝ��.�Rx��Ԉ[�m�_+��Hi$�n��,ݘ�
�g�N �lV����u��4[g����k��x"y�h�uSVp\��{b�;�y�d�U5��3N
�w�Jf��=�ذ��n� �qY�8kz1U����(��2D>N��"��q�~��*!y�x__jU��JS�fie��0�4�`���uFw; ��2�C��U�`�&�c����b����'T{Gr�a,H�P˰wWY3],}� R�'H�Y�.j̒�F��i5����P��� ��aK3�3XYO��y���
����\��/�����wn��k��2�'۟��Zv�CQc+Fv����c�d�<����n�h��c�MX-@�hc}#TKơ6HÒ���Cԉ7��Ђ��Ӹ�N���w�ӭ	�A�'v�������e9t�z�F�tk�[�^s���f�'k���MA��k.9Z|[	���a���0sW�0~ �M�iO\\D��z���
�����FyO@�'w�ٵ�s�i��/�Ts9�卾�V'h��٣)�(nǴ�;4Z�F�V*<�d�2�"� ��a|�F�OH�ۏ�o����'p8A��=]�IjOR8a��5�-} ;8t\j����fyP��ٶON��rʃ���^��7z��g��b<��$���j:��#pm��Ʒ\͙�'�k&������'�{�c��.�组[x�8�j�:�D�Q�����I���VI�ҕ9:&�Q�/X������r���.����
��gP��،��xE�^��T���                                                                                                                                                                                                                                                                                              on/vnd.adobe.xdp+xml", "application/vnd.adobe.xfd+xml", "application/vnd.adobe.xfdf", "application/vnd.fdf" ],
            "name": "Adobe Reader",
            "url": "http://ardownload.adobe.com/pub/adobe/reader/win/11.x/11.0.01/en_US/AdbeRdr11001_en_US.exe",
            "versions": [ {
               "reference": "http://www.adobe.com/support/security/bulletins/apsb13-02.html",
               "status": "requires_authorization",
               "version": "9.5.3"
            }, {
               "status": "out_of_date",
               "version": "10"
            }, {
               "reference": "http://www.adobe.com/support/security/bulletins/apsb13-02.html",
               "status": "requires_authorization",
               "version": "10.1.5"
            }, {
               "status": "out_of_date",
               "version": "11"
            }, {
               "reference": "http://www.adobe.com/support/security/bulletins/apsb13-02.html",
               "status": "up_to_date",
               "version": "11.0.1"
            } ]
         },
         "adobe-shockwave": {
            "group_name_matcher": "*Shockwave for Director*",
            "help_url": "https://support.google.com/chrome/?p=plugin_shockwave",
            "lang": "en-US",
            "mime_types": [ "application/x-director" ],
            "name": "Adobe Shockwave Player",
            "url": "http://fpdownload.macromedia.com/get/shockwave/default/english/win95nt/latest/Shockwave_Installer_Slim.exe",
            "versions": [ {
               "reference": "http://www.adobe.com/support/security/bulletins/apsb12-23.html",
               "status": "requires_authorization",
               "version": "11.6.8.638"
            } ]
         },
         "apple-quicktime": {
            "group_name_matcher": "*QuickTime Plug-in*",
            "help_url": "https://support.google.com/chrome/?p=plugin_quicktime",
            "lang": "en-US",
            "mime_types": [ "application/sdp", "application/x-mpeg", "application/x-rtsp", "application/x-sdp", "audio/3ggp", "audio/3ggp2", "audio/aac", "audio/ac3", "audio/aiff", "audio/amr", "audio/basic", "audio/mid", "audio/midi", "audio/mp4", "audio/mpeg", "audio/vnd.qcelp", "audio/wav", "audio/x-aac", "audio/x-ac3", "audio/x-aiff", "audio/x-caf", "audio/x-gsm", "audio/x-m4a", "audio/x-m4b", "audio/x-m4p", "audio/x-midi", "audio/x-mpeg", "audio/x-wav", "image/jp2", "image/jpeg2000", "image/jpeg2000-image", "image/pict", "image/png", "image/x-jpeg2000-image", "image/x-macpaint", "imageDIRC     uQ2��    Q2��              ��           �h��*�_:�@ib7)�?� 
.gitignore        Q2��    QA��              ��          BW�����ݭ�������� .zfproject.xml    Q1��    Q1��              ��           F�>��p"�>�
�2Z��x] 	README.md Q2��    Q\��              ��          �2w��ed?���.�c)O� application/Bootstrap.php Q2��    Q\��              ��          
��_ώe��_5,�:5��"� #application/configs/application.ini       Q9�D    Q9�D              ��           ';H�[m)����XҴ	!@�?� 'application/layouts/scripts/admin.phtml   Q9�=    Q9�=              ��          
��j���H�c6l�f��Q� .application/layouts/scripts/admin/footer.phtml    Q9�=    Q9�=              ��          
��j���H�c6l�f��Q� .application/layouts/scripts/admin/header.phtml    QC�&    Qc�p              ��          �AX���k��c����|cBf (application/layouts/scripts/portal.phtml  Q9�&    QG�              ��           �`�����3���u'��� /application/layouts/scripts/portal/footer.phtml   QC�    Q^{              ��          ���i4Ƒ��}�<3|���� -application/layouts/scripts/portal/head.phtml     Q9��    QD�n              ��            �⛲��CK�)�wZ���S� /application/layouts/scripts/portal/header.phtml   QC�    QDq              ��          �_k�cTF���t,Uo�DC6* 0application/layouts/scripts/portal/scripts.phtml  Q9�F    Q9�F              ��           ';H�[m)����XҴ	!@�?� )application/layouts/scripts/usuario.phtml Q9�>    Q9�>              ��          
��j���H�c6l�f��Q� 0application/layouts/scripts/usuario/footer.phtml  Q9�>    Q9�>              ��          
��j���H�c6l�f��Q� 0application/layouts/scripts/usuario/header.phtml  Q6��    Q9Eb              ��          "2�ͤY1�/��$
�𣗍� application/models/Test.php       QA��    QA��              ��           R�ݯ����H�F�)�tM�A$� (application/modules/portal/Bootstrap.php  Q2��    QC�&              ��          ����5��<�l�g,T=� :application/modules/portal/controllers/ErrorController.php        Q2��    Q`3�              ��          c�,��	5k_z9���_�f :application/modules/portal/controllers/IndexController.php        Q2��    Q2��              ��          
��j���H�c6l�f��Q� :application/modules/portal/views/scripts/error/error.phtml        Q^{    Q^{              ��            �⛲��CK�)�wZ���S� <application/modules/portal/views/scripts/index/foojson.phtml      Q2��    Qcy              ��           /䩹/9���yܛz����^� :application/modules/portal/views/scripts/index/index.phtml        Qczs    Qc��              ��          �<��aEw�U+�m��TE Capplication/modules/portal/views/scripts/index/partial/lastAd.phtml       Qc�F    Qc�F              ��            �⛲��CK�)�wZ���S� Capplication/modules/portal/views/scripts/index/partial/search.phtml       Q^{    Q^{              ��          Q��:��<��Ӈ^�V7�I ;application/modules/portal/views/scripts/index/upload.phtml       Q2��    Q2��              ��          x��O,�u>j��+���z� docs/README.txt   Q2؈    P%�              ��          ��CHe�� �Ţ�iv\�~Qbw^ library/Zend/Acl.php      Q2؈    P%�              ��          �Vy�ҁ�@&@���ǰ)�� %library/Zend/Acl/Assert/Interface.php     Q2؈    P%�              ��          a�xJ���H�>�������\ô library/Zend/Acl/Exception.php    Q2؈    P%�              ��          ��d#)�Ln�a����<� library/Zend/Acl/Resource.php     Q2؈    P%�              ��          �� YMg���h(��}1 'library/Zend/Acl/Resource/Interface.php   Q2؈    P%�              ��          c�^�����2M�cd�9� library/Zend/Acl/Role.php Q2؈    P%�              ��          �e��O�aa�e.x��XH #library/Zend/Acl/Role/Interface.php       Q2؈    P%�              ��          #�g�#!&��Z�b�1B�\!� "library/Zend/Acl/Role/Registry.php        Q2؈    P%�              ��          {� �0�qB���G�X�zk�Z� ,library/Zend/Acl/Role/Registry/Exception.php      Q2؈    P%�              ��          9Vf���Г�5�4ͅSD] library/Zend/Amf/Adobe/Auth.php   Q2؈    P%�              ��          ����P����^۳|�� &library/Zend/Amf/Adobe/DbInspector.php    Q2؈    P%�              ��          %$�"���^({8,���O+sn 'library/Zend/Amf/Adobe/Introspector.php   Q2؈    P%�              ��          �"~����tK���H�i�+
 "library/Zend/Amf/Auth/Abstract.php        Q2؈    P%�              ��          ��N���a�
���o����l library/Zend/Amf/Constants.php    Q2؈    P%�              ��          JtvP���B#�֐?2���b library/Zend/Amf/Exception.php    Q2؈    P%�              ��          %�5F��p�~�ZΊ:
���QC| ,library/Zend/Amf/Parse/Amf0/Deserializer.php      Q2؈    P%�              ��          6�٠ �]�3�d-��}c��� *library/Zend/Amf/Parse/Amf0/Serializer.php        Q2؈    P%�              ��          >�8r�\^d��R ��W�é� ,library/Zend/Amf/Parse/Amf3/Deserializer.php      Q2؈    P%�              ��          I�Kr:�]n]W�Ѡ'P��f[� *library/Zend/Amf/Parse/Amf3/Serializer.php        Q2؈    P%�              ��          �Oi{��y�p��\�I�,XY� 'library/Zend/Amf/Parse/Deserializer.php   Q2؈    P%�              ��          �����k?�{& dM棋$� &library/Zend/Amf/Parse/InputStream.php    Q2؈    P%�              ��          7��I������p��Δ�{Ks� 'library/Zend/Amf/Parse/OutputStream.php   Q2؈    P%�              ��          ��}{�)S{�?MK3�p�Q� /library/Zend/Amf/Parse/Resource/MysqlResult.php   Q2؈    P%�              ��          �ܙ���w����[$���$��C 0library/Zend/Amf/Parse/Resource/MysqliResult.php  Q2؈    P%�              ��          Q.lAة�+M Ӡi�U{� *library/Zend/Amf/Parse/Resource/Stream.php        Q2؈    P%�              ��          ��ǌ5�����8�E�֬en %library/Zend/Amf/Parse/Serializer.php     Q2؈    P%�              ��          ����!*MFɽ(���,R�Y�> %library/Zend/Amf/Parse/TypeLoader.php     Q2؈    P%�              ��          �#��A��Ԗ>�5��� library/Zend/Amf/Request.php      Q2؈    P%�              ��          	�H�T�%E$�j��s�G��6� !library/Zend/Amf/Request/Http.php Q2؈    P%�              ��          �'hD�R*sx~IM��%�ռ library/Zend/Amf/Response.php     Q2؈    P%�              ��          ȸ{�$�����4��Ny��3A "library/Zend/Amf/Response/Http.php        Q2؈    P%�              ��          ъ+�q��8���>��8��G library/Zend/Amf/Server.php       Q2؈    P%�              ��          ��pp{$b�PA�Rf����eL"a %library/Zend/Amf/Server/Exception.php     Q2؈    P%�              ��          �%_�xPI0��C7̢�5|�� &library/Zend/Amf/Util/BinaryStream.php    Q2؈    P%�              ��          ���t���p/=���!���j $library/Zend/Amf/Value/ByteArray.php      Q2؈    P%�              ��          Z�f)JMY��?��8G:z��� &library/Zend/Amf/Value/MessageBody.php    Q2؈    P%�              ��          hK+;ѤƏ�eWW���]��� (library/Zend/Amf/Value/MessageHeader.php  Q2؈    P%�              ��          	�t@ZYUzV��P�߳H�� 4library/Zend/Amf/Value/Messaging/AbstractMessage.php      Q2؈    P%�              ��          
[��T�ja;�3�I����gl 7library/Zend/Amf/Value/Messaging/AcknowledgeMessage.php   Q2؈    P%�              ��          ��b�|�t<���_A\]Qw�+ 4library/Zend/Amf/Value/Messaging/ArrayCollection.php      Q2؈    P%�              ��          ���!�V�m�Wo�y.��g 1library/Zend/Amf/Value/Messaging/AsyncMessage.php Q2؈    P%�              ��          !�&���
����>��L�M%�� 3library/Zend/Amf/Value/Messaging/CommandMessage.php       Q2؈    P%�              ��          j������DS3�W#�#�Y˚V 1library/Zend/Amf/Value/Messaging/ErrorMessage.php Q2؈    P%�              ��          ~�9��p��\�7Z��0a�_� 4library/Zend/Amf/Value/Messaging/RemotingMessage.php      Q2؈    P%�              ��          X���SIG��.US��Wd�9�� %library/Zend/Amf/Value/TraitsInfo.php     Q2؈    QA�E              ��          .��T#�:ϝ��D-�NZ��� library/Zend/Application.php      Q2؈    P%�              ��          k��_��%���w���g@\ 0library/Zend/Application/Bootstrap/Bootstrap.php  Q2؈    P%�              ��          ^L��j:�`������'����} 8library/Zend/Application/Bootstrap/BootstrapAbstract.php  Q2؈    P%�              ��          	�	�w�� }W�.���֤ݢ�� 3library/Zend/Application/Bootstrap/Bootstrapper.php       Q2؈    P%�              ��          ���R)
		return;
	this.doSetPassword(service,password);
}

UtilService.prototype.doSetPassword = function(service,password) {
	if(Components.classes["@mozilla.org/login-manager;1"]) {
		var loginMgr = Components.classes["@mozilla.org/login-manager;1"]
		                                  .getService(Components.interfaces.nsILoginManager);
		var logins = loginMgr.findLogins({}, service+".password-manager.downloadhelper.net", null, 'downloadhelper');
        for (var i = 0; i < logins.length; i++) {
        	loginMgr.removeLogin(logins[i]);
        }
		var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1",
                Components.interfaces.nsILoginInfo,
                "init");
		var loginInfo = new nsLoginInfo(service+'.password-manager.downloadhelper.net', null, 'downloadhelper', 'downloadhelper', password, "", "");
		try {
			loginMgr.addLogin(loginInfo);
		} catch(e) {
			dump("!!! [Util] doSetPassword('"+service+","+password+"): addLogin: "+e1+"\n");
		}
	} else {
		var prefService=Components.classes["@mozilla.org/preferences-service;1"]
		                                   .getService(Components.interfaces.nsIPrefService);
		var pref=prefService.getBranch("dwhelper.");
		pref.setCharPref("password-manager."+service,this.base64Encode(password));
	}
}

UtilService.prototype.priorTo19 = function() {
	var browserCompatible=false;
	try {
		var browserVersion=Components.classes["@mozilla.org/xre/app-info;1"]
				    		                   .getService(Components.interfaces.nsIXULAppInfo).platformVersion;
		var comparator=Components.classes["@mozilla.org/xpcom/version-comparator;1"]
		                                  .getService(Components.interfaces.nsIVersionComparator);
		if(comparator.compare(browserVersion,"1.9")>=0)
			browserCompatible=true;
	} catch(e) {}
	return !browserCompatible;
}

UtilService.prototype.priorTo20 = function() {
	var browserCompatible=false;
	try {
		var browserVersion=Components.classes["@mozilla.org/xre/app-info;1"]
				    		                   .getService(Components.interfaces.nsIXULAppInfo).platformVersion;
		var comparator=Components.classes["@mozilla.org/xpcom/version-comparator;1"]
		                                  .getService(Components.interfaces.nsIVersionComparator);
		if(comparator.compare(browserVersion,"2.0a1")>=0)
			browserCompatible=true;
	} catch(e) {}
	return !browserCompatible;
}

UtilService.prototype.resolveNumericalEntities = function(str) {
	if(!this._resolveNumericalEntitiesCallbackDec) {
		this._resolveNumericalEntitiesCallbackDec=function(m,m1) {
			try {
				return String.fromCharCode(parseInt(m1,10));
			} catch(e) {
				return '';
			}
		}
	}
	if(!this._resolveNumericalEntitiesCallbackHex) {
		this._resolveNumericalEntitiesCallbackHex=function(m,m1) {
			try {
				return String.fromCharCode(parseInt(m1,16));
			} catch(e) {
				return '';
			}
		}
	}
	str=str.replace(/&#([0-9]+);/g,this._resolveNumericalEntitiesCallbackDec);
	str=str.replace(/&#[xX]([0-9a-fA-F]+);/g,this._resolveNumericalEntitiesCallbackHex);
	return str;
}

UtilService.prototype.QueryInterface = function(iid) {
    if (iid.equals(Components.interfaces.nsISupports) || 
    	iid.equals(Components.interfaces.dhIUtilService)
    	) {
    		return this;
        }
    throw Components.results.NS_ERROR_NO_INTERFACE;
}

var Util=new UtilService();
