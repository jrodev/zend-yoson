ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffF�I�                {��   =00003�0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000� m                {��   kaaaab�aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaA�N�                {��   <1111}12�2�2�2I2j22253�3�3�3�3B3g33-0�0�0�0�0�0_0`00&1�1�1�1�1�1X1}1111)���`20�D�ި���P_�D@�f�0)���a20C�i��� �7@¶��\����X0)���~20ˬe�˶�f�o"/����c 0)���20�������c3c%��)00)���|201ȥ��Ɖ��o���Ξg0)���}20�QԹ����\��~ lT0)���z20��,���&kyM�J{��AfC�0)���{20����v���Қ��Zw��@F�0)���x20]#�j݄1����� ��0)���y20~h�O�A/����_��/�0)���320����M�t��mx|먀Wr�0)���020x3�M`=I4ֳ��3L�7�0)���120�k�����`���#d!J�X�0)���N20����X	ŏ2�:h�t��0)���O20���� ,|'�ȴ�#��Ӊ�!0)���L20��{=���~��2V�G^V��0)���M20%
3s���%�i��8��v d�0)���J20�n'��+����\�P��z�0)���K20��h�[�e����7z����0)���H20)��D�	6�;伎��N[t0)���I20S�t���qʨ���HX�%�?T0)���E20�z2>�,��\ସ%?�x��30)���B20�4ɇ�R<��+<[P��=��)0)���C20ԏ
�u8��Z����v��0)���@20��mS��T{:�=2���0)���A20p�۸a�W��ɴSn� ub0)���^20\0��!O�d��yoR\��0)���_20�D.�:��:Yo��PaD"n0)���\20ɮU�d&��@dV���J	Y0)���]20e:��!�I�~Ei��F���c0)���Z20f	>�	%i�54�I��FQ0)���[20>=��E��B��pX���_��0�t��                {��   KFFFfF
FE�E�E�E>EExEgEBD�D�D�D�D5DDDZG�G�G�G�G�G(GGrGQF�F�F�F�F�F/F
FFFF^ǒ�#ErG��=������a�U�%�G^ǒ�"ErG�mSe�F�b8�-yN2�EJG^ǒ�%ErG�L�5�s����,!#d�}�G^ǒ�$ErG���lGݤ�`����^���eG^ǒ�ErG	��xc���k������y�!�/G^ǒ�ErGV1H���r��~���X�X��G^ǒ�ErGm���[� R�T -�Ab�G^ǒ�ErGo$Y嵎�{�I�ǋ�?�^�G^ǒ�ErG�-���1��,
lg�,�:N�.G^ǒ�ErG}��{`Vr~��wis.queueDatasource,convRes,DHNS+"CreationDate",""+new Date());

	var convMethod=this.getConvMethod();
	
	switch(convMethod) {
		case CONV_METHOD_UNIX:
			this.convertUnix(sourceFile,targetFile,params,extension,convRes,autoClear,listener,entry,ctx);
			break;
		case CONV_METHOD_WIN_DH:
			try {
			if(this.checkConverterVersion()==false)
				return;
			} catch(e) {
				dump("!!! checkConverterVersion: "+e+"\n");
				return;
			}
			this.convertDH(sourceFile,targetFile,params,extension,convRes,autoClear,listener,entry,ctx);
			break;
	}
	
	} catch(e) {
		dump("!!! [ConvertMgr] convert: "+e+"\n");
	}                
}

ConvertMgr.prototype.setFFMPEGArgs=function(dEntry,params,sourceFile,targetFile,doTrace,doVhook,windows) {
	var pArgs=["args"];
	var pParams=[params];
	var passes=1;
	if(/.*\/.*/.test(params)) {
		pArgs.push("args2");
		var m=/(.*)\/(.*)/.exec(params);
		passes=2;
		pParams=[m[1],m[2]];
	}
	for(var i=0;i<passes;i++) {
		dEntry[pArgs[i]] = [ "-i", sourceFile.path,"-y","-v","0"];
		if(!windows) // add "-strict experimental" on linux/mac only 
			dEntry[pArgs[i]]=dEntry[pArgs[i]].concat(["-strict","experimental"]);			
		dEntry[pArgs[i]]=dEntry[pArgs[i]].concat(pParams[i].split(" "));
		if(doTrace) {
			dEntry[pArgs[i]].push("-Xhello");
			var convertTrace=false;
			try {
				convertTrace=this.pref.getBoolPref("convert-helper.trace");
			} catch(e) {}
			if(convertTrace) {
				dEntry[pArgs[i]].push("-Xloglevel");
				var convertShowArgs=false;
				try {
					convertShowArgs=this.pref.getBoolPref("convert-helper.show-args");
				} catch(e) {}
				if(convertShowArgs)
					dEntry[pArgs[i]].push("2");
				else
					dEntry[pArgs[i]].push("1");
				var logFile=Util.getProfileDir();
				logFile.append("cvhelper.log");
				dEntry[pArgs[i]].push("-Xlogfile");
				dEntry[pArgs[i]].push(logFile.path);
			}
		}
		if(doVhook) {
			var wmFile=Util.getExtensionDir("{b9db16a4-6edc-47ec-a1f4-b86292ed211d}");
			wmFile.append("local");
			wmFile.append("wm.png");

			dEntry[pArgs[i]].push("-Xfn83");
			dEntry[pArgs[i]].push(wmFile.path);
			dEntry[pArgs[i]].push("-vhook");
			dEntry[pArgs[i]].push("vhook/imlib2.dll -x 0 -y 0 -i *");
		}
		dEntry[pArgs[i]].push(targetFile.path);
	}

	/*
	dump("ffmpeg params="+dEntry.args.join(" ")+"\n");
	if(dEntry.args2)
		dump("ffmpeg params (pass#2)="+dEntry.args2.join(" ")+"\n");
	*/
}

ConvertMgr.prototype.convertUnix=function(sourceFile,targetFile,params,extension,convRes,autoClear,listener,entry,ctx) {
	var ffmpegFile = Components.classes["@mozilla.org/file/local;1"]
    	.createInstance(Components.interfaces.nsILocalFile);
	var ffmpegPath="/usr/bin/ffmpeg";
	try {
		ffmpegPath=this.pref.getCharPref("converter-path-ffmpeg");
	} catch(e) {
	}
	try {
		ffmpegFile.initWithPath(ffmpegPath);
		if(!ffmpegFile.exists()) {
			//dump("!!![ConvertMgr] convert(): no ffmpeg found\n");
			ffmpegFile=null;
		}
	} catch(e) {
		dump("!!![ConvertMgr] convert(): invalid ffmpeg path\n");
		ffmpegFile=null;
	}
	var avconvFile = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);
	var avconvPath="/usr/bin/avconv";
	try {
		avconvPath=this.pref.getCharPref("converter-path-avconv");
	} catch(e) {
	}
	try {
		avconvFile.initWithPath(avconvPath);
		if(!avconvFile.exists()) {
			//dump("!!![ConvertMgr] convert(): no avconv found\n");
			avconvFile=null;
		}
	} catch(e) {
		dump("!!![ConvertMgr] convert(): invalid avconv path\n");
		avconvFile=null;
	}
	var mencoderFile = Components.classes["@mozilla.org/file/local;1"]
    	.createInstance(Components.interfaces.nsILocalFile);
	var mencoderPath="/usr/bin/mencoder";
	try {
		mencoderPath=this.pref.getCharPref("converter-path-mencoder");
	} catch(e) {
	}
	try {
		mencoderFile.initWithPath(mencoderPath);
		if(!mencoderFile.exists()) {
			//dump("!!![ConvertMgr] convert(): no mencoder found\n");
			mencoderFile=null;
		}
	} catch(e) {
		dump("!!![ConvertMgr] convert(): invalid mencoder path\n");
		mencoderFile=null;
	}
	
	if(mencoderFile==null && ffmpegFile==null && avconvFile==null) {
		dump("!!![ConvertMgr] convert(): no converter found\n");
	}

	var converterFile=null;
	var preferred=this.pref.getCharPref("preferred-converter");
	switch(preferred) {
	case 'ffmpeg':
		converterFile=ffmpegFile;
		break;
	case 'avconv':
		converterFile=avconvFile;
		break;
	case 'mencoder':
		converterFile=mencoderFile;
		break;
	}
	if(converterFile==null) {
		if(ffmpegFile!=null)
			converterFile=ffmpegFile;
		else if(avconvFile!=null)
			converterFile=avconvFile;
		else if(mencoderFile!=null)
			converterFile=mencoderFile;
	}
	
	var dEntry={
		file: converterFile,
		qRes: convRes,
		autoClear: autoClear,
		sourceFile: sourceFile,
		targetFile: targetFile,
		convConf: extension+"/"+params,
		listener: listener,
		entry: entry,
		ctx: ctx
	}
	
	if(converterFile==ffmpegFile || converterFile==avconvFile) {
		//dump("[ConvertMgr] converterFile==ffmpegFile\n");
		this.setFFMPEGArgs(dEntry,params,sourceFile,targetFile,false,false,false);
	}
	if(converterFile==mencoderFile) {
		dEntry.args = [ sourceFile.path ];
		// adjust depending on bitrate
		dEntry.args=dEntry.args.concat(["-oac", "copy", "-ovc", "copy"]);			
		dEntry.args=dEntry.args.concat(["-o", targetFile.path]);
	}
	
	this.delayQueue.push(dEntry);
	this.checkConvert();
}

ConvertMgr.prototype.escapePath=function(path) {
	path=path.replace(/\\/g,"\\\\");
	path=path.replace(/ /g,"\\ ");
	path=path.replace(/"/g,"\\\"");
	return path;
}

ConvertMgr.prototype.convertDH=function(sourceFile,targetFile,params,extension,convRes,autoClear,listener,entry,ctx) {

	try {

	var file=this.getInstallDir();
	file.append("cvhelper.exe");

	var unreg=this.updateUnregistered(true);
	
	var dEntry={
		file: file,
		qRes: convRes,
		autoClear: autoClear,
		sourceFile: sourceFile,
		targetFile: targetFile,
		convConf: extension+"/"+params,
		listener: listener,
		entry: entry,
		ctx: ctx
	}

	this.setFFMPEGArgs(dEntry,params,sourceFile,targetFile,true,unreg,true);

	//dump("[ConvertMgr] push dEntry\n");
	this.delayQueue.push(dEntry);
	this.checkConvert();
	
	} catch(e) {
		dump("!!! [ConvertMgr] convertDH: "+e+"\n");
	}
}

ConvertMgr.prototype.execConvert=function(dEntry) {
	//dump("[ConvertMgr] exeConvert\n");
	this.currentEntry=dEntry;
	Util.setPropertyValueRS(this.queueDatasource,dEntry.qRes,DHNS+"Status","3");
	Util.setPropertyValueRS(this.queueDatasource,dEntry.qRes,DHNS+"ProgressMode","undetermined");
	if(Util.priorTo20()) {
		//dump("[ConvertMgr] Gecko < 2.0\n");
		var Processor=function(convMgr,dEntry) {
			try {
				this.dEntry=dEntry;
				var proxyMgr = Components. classes["@mozilla.org/xpcomproxy;1"].getService(Components.interfaces.nsIProxyObjectManager);
				var proxyFlags = Components.interfaces.nsIProxyObjectManager.FORCE_PROXY_CREATION |
					Components.interfaces.nsIProxyObjectManager.INVOKE_SYNC;
				this.convMgr=proxyMgr.getProxyForObject(null/*uiQueue*/,Components.interfaces.dhIConvertMgr, convMgr, proxyFlags );
			} catch(e) {
				dump("!!![ConvertMgr/Processor] constructor: "+e+"\n");
			}
		}
		Processor.prototype={
			run: function() {
				//dump("[ConvertMgr/Processor] execConvert [run]\n");
				try {
					var result=false;
					if(this.dEntry.args2) {
						var file = Components.classes["@mozilla.org/file/directory_service;1"]
						                     .getService(Components.interfaces.nsIProperties)
						                     .get("TmpD", Components.interfaces.nsIFile);
						file.append("passlogfile.tmp");
						file.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0666);
						var r=this.convertPass(["-pass","1","-passlogfile",file.path].concat(this.dEntry.args),false);
						if(r) {
							result=this.convertPass(["-pass","2","-passlogfile",file.path].concat(this.dEntry.args2),true);
						}
						if(file.exists())
							file.remove(false);
					} else {
						result=this.convertPass(this.dEntry.args,true);
					}
					this.convMgr.scheduleNext(result);
				} catch(e) {
					dump("!!! [ConvertMgr/Processor] execConvert [run]: "+e+"\n");
				}
			},
			convertPass: function(args,lastPass) {
				var process = Components.classes["@mozilla.org/process/util;1"]
			                        .createInstance(Components.interfaces.nsIProcess);
				process.init(this.dEntry.file);

				process.run(true, args, args.length,{});
				
				var success;
				if(process.exitValue==0) {
					success=true;
					if(lastPass && this.dEntry.autoClear) {
						var keepOriginal=false;
						try {
							keepOriginal=this.pref.getBoolPref("convert.keep-original");
						} catch(e) {}
						if(!keepOriginal)
							this.dEntry.sourceFile.remove(false);
					}
				} else {
					success=false;
					if(this.dEntry.autoClear) {
						try {
							this.dEntry.targetFile.remove(false);
						} catch(e) {
							dump("!!! [ConvertMgr/Processor] execConvert [run] failed: "+e+"\n");
						}
						var keepOriginalOnFailure=true;
						try {
							keepOriginalOnFailure=this.pref.getBoolPref("convert.keep-original-on-failure");
						} catch(e) {}
						if(keepOriginalOnFailure) {
							var filename=this.dEntry.sourceFile.leafName;
							var recoveryLeafName=null;
							if(/^.+\..*$/.test(filename)) {
								var m=/^(.+)\.(.*)$/.exec(filename);
								recoveryLeafName=m[1]+".failed-conv."+m[2];
							} else {
								recoveryLeafName=filename+".failed-conv";
							}
							var recoveryFile=this.dEntry.targetFile.parent;
							recoveryFile.append(recoveryLeafName);
							recoveryFile.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0644);
							this.dEntry.sourceFile.moveTo(this.dEntry.targetFile.parent,recoveryFile.leafName);
						}
					}
				}
				return success;
			},
			QueryInterface: function(iid) {
				if (iid.equals(Components.interfaces.nsIRunnable) ||
					iid.equals(Components.interfaces.nsISupports)) {
					return this;
				}
				throw Components.results.NS_ERROR_NO_INTERFACE;
			}
		}
		try {
			var thread = Components.classes["@mozilla.org/thread;1"].createInstance(Components.interfaces.nsIThread);
			thread.init(
			        new Processor(this,dEntry),
			        0,
			        Components.interfaces.nsIThread.PRIORITY_LOW,
			        Components.interfaces.nsIThread.SCOPE_LOCAL,
			        Components.interfaces.nsIThread.STATE_UNJOINABLE
			        );
		} catch(e) {
			try {
				//dump("!!! [ConvertMgr/Processor] execConvert [creating thread]: "+e+"\n");
				var threadMgr = Components.classes["@mozilla.org/thread-manager;1"].getService();
				var thread=threadMgr.newThread(0);
				thread.dispatch(new Processor(this,dEntry),thread.DISPATCH_NORMAL);
				//dump("[ConvertMgr/Processor] execConvert [dispatched]\n");
			} catch(e) {
				dump("!!! [ConvertMgr/Processor] execConvert [dispatching]: "+e+"\n");
			}
		}
	} else if(Components.interfaces.nsIWorkerFactory) { // < Gecko 8.0
		//dump("[ConvertMgr] Gecko 2.0\n");
		try {
			var workerFactory = Components.classes["@mozilla.org/threads/workerfactory;1"].createInstance(Components.interfaces.nsIWorkerFactory);
			var worker = workerFactory.newChromeWorker("chrome://dwhelper/content/conversion-worker.js");
			var convMgr=this;
			worker.dhcontext={
				convMgr: convMgr,
				dEntry: dEntry
			};
			worker.onmessage = function(event) {
				this.dhcontext.convMgr.scheduleNext(event.data);
			}
			worker.onerror = function(error) {
				dump("!!! [ConvertMgr/Processor] execConvert [worker.onerror]: "+error+"\n");
				this.dhcontext.convMgr.scheduleNext(false);
			}
			worker.postMessage({ 
				Components: Components,
				dEntry: {
					args: dEntry.args,
					args2: dEntry.args2,
					autoClear: dEntry.autoClear,
					filePath: dEntry.file.path,
					sourceFilePath: dEntry.sourceFile.path,
					targetFilePath: dEntry.targetFile.path
				}
			});
		} catch(e) {
			dump("!!! [ConvertMgr/Processor] execConvert [Gecko 2.0]: "+e+"\n");
		}
	} else { // Gecko >= 8  
		var Processor=function(convMgr,dEntry) {
			this.dEntry=dEntry;
			this.convMgr=convMgr;
		}
		Processor.prototype={
			run: function() {
				if(this.dEntry.args2) {
					this.pass=1;
					this.tmpFile = Components.classes["@mozilla.org/file/directory_service;1"]
					                                  .getService(Components.interfaces.nsIProperties)
					                                  .get("TmpD", Components.interfaces.nsIFile);
					this.tmpFile.append("passlogfile.tmp");
					this.tmpFile.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0666);
					this.convertPass(["-pass","1","-passlogfile",this.tmpFile.path].concat(this.dEntry.args));
				} else {
					this.pass=0;
					this.convertPass(this.dEntry.args);
				}
			},
			convertPass: function(args) {
				var process = Components.classes["@mozilla.org/process/util;1"]
			                        .createInstance(Components.interfaces.nsIProcess);
				dump("Executing "+this.dEntry.file.path+" "+args.join(" ")+"\n");
				process.init(this.dEntry.file);
				process.runwAsync(args, args.length, this);
			},
			convertPassResult: function(exitValue) {
				var success;
				if(exitValue==0) {
					if(this.pass==1) {
						this.pass=2;
						this.convertPass(["-pass","2","-passlogfile",this.tmpFile.path].concat(this.dEntry.args2));
					} else if(this.pass==0 || this.pass==2) {
						if(this.dEntry.autoClear) {
							if(this.convMgr.pref.getBoolPref("convert.keep-original")==false)
								try {
									this.dEntry.sourceFile.remove(false);
								} catch(e) {
									dump("!!! [ConvertMgr/Processor] execConvert [run] failed: "+e+"\n");
								}
						}
						if(this.tmpFile && this.tmpFile.exists())
							this.tmpFile.remove(false);
						this.convMgr.convertProcessor=null;
						this.convMgr.scheduleNext(true);
					}
				} else {
					if(this.dEntry.autoClear) {
						try {
							if(this.dEntry.targetFile.exists())
								this.dEntry.targetFile.remove(false);
						} catch(e) {
							dump("!!! [ConvertMgr/Processor] execConvert [run] failed: "+e+"\n");
						}
						if(this.convMgr.pref.getBoolPref("convert.keep-original-on-failure")) {
							var filename=this.dEntry.sourceFile.leafName;
							var recoveryLeafName=null;
							if(/^.+\..*$/.test(filename)) {
								var m=/^(.+)\.(.*)$/.exec(filename);
								recoveryLeafName=m[1]+".failed-conv."+m[2];
							} else {
								recoveryLeafName=filename+".failed-conv";
							}
							var recoveryFile=this.dEntry.targetFile.parent;
							recoveryFile.append(recoveryLeafName);
							recoveryFile.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0644);
							this.dEntry.sourceFile.moveTo(this.dEntry.targetFile.parent,recoveryFile.leafName);
						}
					}
					if(this.tmpFile && this.tmpFile.exists())
						this.tmpFile.remove(false);
					this.convMgr.convertProcessor=null;
					this.convMgr.scheduleNext(false);
				}
			},
			observe: function(subject, topic , data) {
				var success=false;
				switch(topic) {
				case 'process-finished':
					if(this.dEntry.targetFile.exists() && this.dEntry.targetFile.fileSize>0)
						success=true;
					break;
				case 'process-failed':
					break;
				}
				try {
					this.convertPassResult(success?0:-1);
				} catch(e) {
					dump("!!! [ConvertMgr/Processor] execConvert [Gecko8/convertPassResult] failed: "+e+"\n");
				}
			},
			QueryInterface: function(iid) {
				if (iid.equals(Components.interfaces.nsIObserver) ||
					iid.equals(Components.interfaces.nsISupports))
					return this;
				throw Components.results.NS_ERROR_NO_INTERFACE;
			}
		}
		this.convertProcessor=new Processor(this,dEntry);
		this.convertProcessor.run();
	}
}

ConvertMgr.prototype.checkConvert=function() {
	try {
		if(this.delayQueue.length>0 && this.currentEntry==null) {
			var dEntry=this.delayQueue.shift();
			this.execConvert(dEntry);
		}
	} catch(e) {
		dump("!!! [ConvertMgr] checkConvert(): "+e+"\n");
	}
}

ConvertMgr.prototype.addConvert=function(sourceFile,targetFile,format,autoClear,listener,entry,ctx) {

	//dump("[ConvertMgr] addConvert("+sourceFile.path+","+targetFile.path+","+format+")\n");

	if(!this.isEnabled())
		return;
	this.convert(sourceFile,targetFile,format,autoClear,listener,entry,ctx);
}

ConvertMgr.prototype.getFormat=function(filename,mediaUrl,pageUrl) {

	//dump("[ConvertMgr] getFormat("+filename+","+mediaUrl+","+pageUrl+")\n");

	if(!this.isEnabled()) {
		//dump("[ConvertMgr] getFormat(): convert not enabled\n");
		return null;
	}
	var extension=null;
	try {
		extension=/.*\.(.*?)$/.exec(filename)[1];
	} catch(e) {
		dump("!!! [ConvertMgr] getFormat(): no extension from "+filename+"\n");
		return null;
	}
	try {
	var rules=Util.getChildResourcesS(this.datasource,"urn:root",{});
	for(var i=0;i<rules.length;i++) {
		var infile=Util.getPropertyValueRS(this.datasource,rules[i],DHNS+"infile");
		if(infile=="" || infile.toLowerCase()==extension.toLowerCase()) {
			var insite=Util.getPropertyValueRS(this.datasource,rules[i],DHNS+"insite");
			var re=new RegExp("https?://(?:[^/]*\\.)?"+insite+"/.*","i");
			if(insite=="" || re.test(mediaUrl) || (pageUrl!=null && re.test(pageUrl))) {
				var action=Util.getPropertyValueRS(this.datasource,rules[i],DHNS+"action");
				if(action=="0") {
					//dump("[ConvertMgr] getFormat(): explicit no conversion\n");
					return null;
				} else {
					var format=Util.getPropertyValueRS(this.datasource,rules[i],DHNS+"outformat");
					//dump("[ConvertMgr] getFormat(): format="+format+"\n");
					return format;
				}
			}
		}
	}
	return null;
	} catch(e) {
		dump("!!! [ConvertMgr] getFormat(): "+e+"\n");
		return null;
	}
}

ConvertMgr.prototype.getDataSource=function() {
	//dump("[ConvertMgr] getDataSource()\n");
	return this.datasource;
}

ConvertMgr.prototype.setDataSource=function(datasource) {
	//dump("[ConvertMgr] setDataSource()\n");
	try {
		var serializer="@mozilla.org/rdf/xml-serializer;1";
		var s=Components.classes[serializer].createInstance(Components.interfaces.nsIRDFXMLSerializer);
		s.init(datasource);
		var stream = Components.classes['@mozilla.org/network/file-output-stream;1']
		    .createInstance(Components.interfaces.nsIFileOutputStream);
		stream.init(this.convRulesFile, 42, 0644, 0); 
	
		s.QueryInterface(Components.interfaces.nsIRDFXMLSource).Serialize(stream);
		stream.close();
	} catch(e) {
		dump("!!! [ConvertMgr] setDataSource: "+e+"\n");
	}
	this.datasource=datasource;
}

ConvertMgr.prototype.getDataSourceCopy=function() {
	//dump("[ConvertMgr] getDataSourceCopy()\n");
	var datasource=Util.getDatasourceFromRDFFile(this.convRulesFile);
	return datasource;
}

ConvertMgr.prototype.makeDefaultRule=function(datasource) {
	//dump("[ConvertMgr] makeDefaultRule()\n");
	var defRule=Util.createAnonymousNodeS(datasource,"urn:root");
	Util.setPropertyValueRS(datasource,defRule,DHNS+"label",Util.getText("conversion.default-rule-label"));
	Util.setPropertyValueRS(datasource,defRule,DHNS+"action","1");
	Util.setPropertyValueRS(datasource,defRule,DHNS+"infile","flv");
	Util.setPropertyValueRS(datasource,defRule,DHNS+"insite","");
	Util.setPropertyValueRS(datasource,defRule,DHNS+"outformat","wmv/-ab 56k -ac 2 -acodec wmav2 -ar 44100 -b 3000kbps -f asf -vcodec wmv2");
	Util.setPropertyValueRS(datasource,defRule,DHNS+"outdir","");
	Util.setPropertyValueRS(datasource,defRule,DHNS+"label",this.makeLabel(datasource,defRule.Value));
	return defRule.Value;
}

ConvertMgr.prototype.isEnabled=function() {
	//dump("[ConvertMgr] isEnabled()\n");
	var enabled=false;
	try {
		enabled=this.pref.getBoolPref("conversion-enabled");
	} catch(e) {}
	return enabled;
}

ConvertMgr.prototype.getInstallDir=function() {
	//dump("[ConvertMgr] getInstallDir()\n");
	try {
		var wrk = Components.classes["@mozilla.org/windows-registry-key;1"]
		                    .createInstance(Components.interfaces.nsIWindowsRegKey);
		if(wrk==null) {
			dump("!!![ConvertMgr] getInstallDir(): no registry service\n");
			return null;
		}
		
		var method=this.getConvMethod();
		var regPath;
		if(method==CONV_METHOD_WIN_DH)
			regPath="SOFTWARE\\DownloadHelper\\ConvertHelper";
		else {
			dump("!!![ConvertMgr] getInstallDir(): no path available\n");
			return null;
		}
		var r=wrk.open(wrk.ROOT_KEY_LOCAL_MACHINE,
		         regPath,
		         wrk.ACCESS_READ);
		//dump("[ConvertMgr] getExePath(): open returns "+r+"\n");
		var folderPath = wrk.readStringValue("InstallFolder");
		wrk.close();
		//dump("*** "+folderPath+"\n");
		if(folderPath==null)
			return null;
		var file = Components.classes["@mozilla.org/file/local;1"]
		                     .createInstance(Components.interfaces.nsILocalFile);
		file.initWithPath(folderPath);
		if(!file.exists()) {
			dump("!!![ConvertMgr] getInstallDir(): "+folderPath+" does not exist\n");
			return;
		}
		if(!file.isDirectory()) {
			dump("!!![ConvertMgr] getInstallDir(): "+folderPath+" is not a directory\n");
			return;
		}
		if(!file.isReadable()) {
			dump("!!![ConvertMgr] getInstallDir(): "+folderPath+" is not readable\n");
			return;
		}
		return file;
		
	} catch(e) {
		dump("!!![ConvertMgr] getInstallDir():"+e+"\n");
		return null;
	}
}

ConvertMgr.prototype.clearDataSource=function(datasource) {
	var i = datasource.GetAllResources();
	datasource.beginUpdateBatch();
	while(i.hasMoreElements()) {
		var source = i.getNext();
		var j = datasource.ArcLabelsOut(source);
		while(j.hasMoreElements()) {
			var predicate = j.getNext();
			var k = datasource.GetTargets(source,predicate,true);
			while(k.hasMoreElements()) {
				var target = k.getNext();
				datasource.Unassert(source,predicate,target);
			}
		}
	}
	datasource.endUpdateBatch();	
}

ConvertMgr.prototype.makeEmptyDataSource=function(datasource) {
	this.clearDataSource(datasource);
}

ConvertMgr.prototype.makeDefaultDataSource=function(datasource) {
	this.clearDataSource(datasource);
    this.makeDefaultRule(datasource);
}

ConvertMgr.prototype.makeLabel=function(datasource,ref) {
	try {
	var action=Util.getPropertyValueSS(datasource,ref,
		"http://downloadhelper.net/1.0#action");
	var insite=Util.getPropertyValueSS(datasource,ref,
		"http://downloadhelper.net/1.0#insite");
	var infile=Util.getPropertyValueSS(datasource,ref,
		"http://downloadhelper.net/1.0#infile");
	var outformat=Util.getPropertyValueSS(datasource,ref,
		"http://downloadhelper.net/1.0#outformat");
	var outdir=Util.getPropertyValueSS(datasource,ref,
		"http://downloadhelper.net/1.0#outdir");
	
	if(insite=="")
		insite=Util.getText("label.conv-rule.all-sites");
	if(infile=="")
		infile=Util.getText("label.conv-rule.all-files");
	if(outdir=="")
		outdir=Util.getText("label.conv-rule.default-directory");
	
	var label;
	if(action=="0") {
		label=Util.getFText("label.conv-rule.label.do-not-convert",[
			infile, insite
		],2);
	} else {
		var format=/^(.*?)\/.*$/.exec(outformat)[1];
		label=Util.getFText("label.conv-rule.label.convert",[
			infile, insite,
			format.toUpperCase(),
			outdir
		],4);
	}
			
	return label;
		
	} catch(e) {
		return null;
	}
}

ConvertMgr.prototype.updateUnregistered = function(doCheckLicense) {
	
	var cf=true;
	
	var method=this.getConvMethod();
	if(this.isEnabled() && method==CONV_METHOD_WIN_DH) {
		try {
			var reg=Components.classes["@mozilla.org/windows-registry-key;1"]
				.createInstance(Components.interfaces.nsIWindowsRegKey);
			try {
				reg.open(reg.ROOT_KEY_CURRENT_USER,
					         "SOFTWARE\\DownloadHelper\\ConvertHelper",
					         reg.ACCESS_READ);
			    var name=reg.readStringValue("CustomerName");
			    var email=reg.readStringValue("CustomerEmail");
			    var key=reg.readStringValue("LicenseKey");
			    var licenseCheck=this.md5("converthelper"+key+name+email);
			    var licenseCheck0=reg.readStringValue("LicenseCheck");
			    reg.close();
			    if(licenseCheck==licenseCheck0) { 
			    	var profile=Util.getProfileDir().leafName;
			    	var profileCheck=this.md5("converthelper"+profile);
					var profileCheck0="";
					try {
						profileCheck0=this.pref.getCharPref("converthelper-key");
					} catch(e) {}
					if(profileCheck!=profileCheck0 && doCheckLicense) {
						this.checkLicense(key);
					} else {
						cf=false;
					}
				}    
			} catch(e) { 
				//dump("!!![ConvertMgr] updateUnregistered: "+e+"\n"); 
			}
			try {
				reg.close();
			} catch(e) {}
		} catch(e) { 
			cf=false; 
		}
	} else if(method==CONV_METHOD_UNIX) {
		cf=false;
	}

	this.pref.setBoolPref("convert-free",cf);
	
	return cf;
}

ConvertMgr.prototype.register = function(code) {

	var method=this.getConvMethod();
	if(method==CONV_METHOD_WIN_DH) {
		try {
			this.checkLicense(code);
		} catch(e) {
			//dump("register exception: "+e+"\n");
		}
	}
}

ConvertMgr.prototype.getConvMethod = function() {
	var method=CONV_METHOD_NONE;
	try {
		var reg = Components.classes["@mozilla.org/windows-registry-key;1"]
		                    .createInstance(Components.interfaces.nsIWindowsRegKey);
		method=CONV_METHOD_WIN_DH;
	} catch(e) {
		return CONV_METHOD_UNIX;
	}
	return method;
}

ConvertMgr.prototype.checkLicense = function(key) {
	
	function XMLStreamListener(service) {
		this.service=service;
	}
	
	XMLStreamListener.prototype={
		QueryInterface: function(iid) {
		    if (!iid.equals(Components.interfaces.nsISupports) && 
		    	!iid.equals(Components.interfaces.nsIStreamListener)) {
		            throw Components.results.NS_ERROR_NO_INTERFACE;
		        }
		    return this;
		},
		onStartRequest: function(request,context) {
			this.data="";
		},
		onDataAvailable: function(request,context,inputStream,offset,count) {
			var sstream = Components.classes["@mozilla.org/intl/converter-input-stream;1"]
	               .createInstance(Components.interfaces.nsIConverterInputStream);
			sstream.init(inputStream, "utf-8", 256, 
				Components.interfaces.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
	
			var str={};
			var n=sstream.readString(128,str);
			while(n>0) {
				this.data+=str.value;
				str={};
				n=sstream.readString(128,str);
			}
		},
		onStopRequest: function(request,context,nsresult) {
			var responseStatus=request.QueryInterface(Components.interfaces.nsIHttpChannel).responseStatus;
			if(responseStatus==200) {
				try {
					var parser=Components.classes["@mozilla.org/xmlextras/domparser;1"].
						createInstance(Components.interfaces.nsIDOMParser);
					var doc=parser.parseFromString(this.data,"text/xml");
					var xml=doc.documentElement;
					var status=Util.xpGetString(xml,"/check-license-response/status/text()");
				    var name=Util.xpGetString(xml,"/check-license-response/name/text()");
				    var email=Util.xpGetString(xml,"/check-license-response/email/text()");
				    var licenseKey=Util.xpGetString(xml,"/check-license-response/license-key/text()");
				    var rejectCode=Util.xpGetString(xml,"/check-license-response/reject-code/text()");
				    try {
					    this.service.pref.setCharPref("last-conv-license-status",status);
				    } catch(e) {}
					if(status=="accepted") {
						var reg = Components.classes["@mozilla.org/windows-registry-key;1"]
	            	        .createInstance(Components.interfaces.nsIWindowsRegKey);
						reg.open(reg.ROOT_KEY_CURRENT_USER,
					         "SOFTWARE",
					         reg.ACCESS_ALL);
				    	reg=reg.createChild("DownloadHelper\\ConvertHelper",
					         reg.ACCESS_ALL);
					    var existingKey=null;
					    try {
							existingKey=reg.readStringValue("LicenseKey");
					    } catch(e) {}
					    reg.writeStringValue("CustomerName",name);
					    reg.writeStringValue("CustomerEmail",email);
					    reg.writeStringValue("LicenseKey",key);
					    var licenseCheck=this.service.md5("converthelper"+key+name+email);
					    reg.writeStringValue("LicenseCheck",licenseCheck);
					    reg.close();
					    var profile=Util.getProfileDir().leafName;
					    var profileCheck=this.service.md5("converthelper"+profile);
					    this.service.pref.setCharPref("converthelper-key",profileCheck);
					    this.service.updateUnregistered(true);
					    //if(existingKey==null) {
							this.service.promptService.alert(null,Util.getText("title.converter-registration"),
								Util.getText("message.converter-registration-succeeded"));
					    //}
					} else if(status=="need-validation") {
						var now=new Date().getTime();
						if(now-this.service.lastValidationMessage>1000) {
							this.service.lastValidationMessage = now;
							this.service.promptService.alert(null,Util.getText("title.converthelper.revalidate"),
								Util.getFText("message.converthelper.revalidate",
									[name,email],2));
						}
					} else {
						this.service.promptService.alert(null,Util.getText("title.converthelper.invalid-license"),
							Util.getText("message.converthelper.invalid-license")+"\n"+
							"status "+status+"\n"+
							"reject-code "+rejectCode+"\n"+�:�����ɿ��nB:�p��❳-6�X/.��v��5c��v/�!�2�=/L�Y��k!��NՌ��$��X�y�_?�hTJ�}My��U�d�{6o�줊�y�qpp�l�b�s�O�'	2�T�q�"[�vo)H�/"��_�>wQ��`�BH2�Ę>W}� �Lf`!�"#�unWD��L�d`��\�܉
�^�s�����e�˽�?�BŸj�g�$e�,�ޚ�fۺ0�^Y���^I�-�B��^�wJ�eLѧҬ-���.DI�K�Q���{��p���4���CVk�|@��qq����!��1ν����;?v�ĎO�;���G�t�e����n��r�ڢt�\���E�73��c��5��,Q�E�Xc�=�F�9������˽��BH�X�w���͎��=���{3#o�K ր{�$��=b��s���{3a��5�k8���W����[,d��v��٥�obo��ŷ�Q��'M�ж\h��f��N�4�'��xщ���1ٳ�Gw_��+�����8��=�yoӒ5�s=�5z��z=�db�},�xՉ�?�D���q��!���f˸����b�?po�݋R���-{��.�5.�e�K�i:q��P�{Je-FR:���]�K�����e �� �w���)�F-�Le�5Y�n����<�J��5��h3�/�yE�LU�R��ԇ�);(z�=��-A�q�E���@�*�L<�*�����1̽��$mL�G��8	�λ'<�[��^���ˢ��@W
:�R��Y�M3�{Tn������b�Z�����`�N����3+�rO��q�Z5�?�l�Ġ2�e(��2�2Ĭpo��{[I+/��{�'����@���%�nEԆ� X�!R�=~��{3�Y������E7�Y����&����fm�<r/�5o4��NX����Zd�Tv�ʪ�+�y,�di�v�{���[$��S�u݋R��u&gM�r��]���ȴD���5y�0�=Y��� ���Ǩğm��{6.�P�۽W�h8�K7��`f֮������Ռ��x׃	6��r��cN5��:��	hx�>�Ń�s힟���ԐN�q>����~�h���ǽ(���X#�{t�L](3�=����s�?�^��ް;ת���{�;�9�^�X���rox��X�͎��1�X���y0Y��X�͎<5�����z�E����o�5�ތ{~O�1�ܛ��1�{ƛ
�Mox�x�*2o?�^��#���=��_����r
ξw�M tv���a&�3-�Q�8<(�_<�إMN��u]�P]�ݻ]m����>�ډ�viqGxyI�C5x�zp��b�Ʋ���=��ܛ1y�[��;b�7�{}ql�{�5��FU��ϼ�e?������%�|��N,-[:ch �)�l�R��u�'n̄��IfP�������*_��"��ё���ǎ��Z��\���ݢ�'S�J��I���	�t>��y��t��0�=!��=�";,��OJI6ypK�m��Y�h��R�F��|�����ҖO)���sy�i95v��}A�2����7�� M��N���-/�ǽیmm���λG�Y1�T�d�vOt������EK��;2*Yz�d?��ȃ�0��1+qG(3�׹7���<`f阩~V��~rPX�%�\w�k��*��)e �=�h�S5j���e��d��"z�8I#~�f�����$�չ{"�vz�Q�F�mԸ�ݓ}9��{�t3+�+'��$���z��Ӑ��X�u��g�:��Ǡ{�y�1�4�=�l��ƒf�v�%��`x�Q�D΍�e�vO3c�3 ���H�xǃV�ܗ���W�!������6c��(�b�{�����3�]0ϻ�X�ڽ90�=�g��7F��/�X�͔1��X�ͅ�}.b�����A��XC�5���b��=�]���u��ܻ����ۋ߽k��6+|�m�g��k��0Q9���M:��q�j�,��jM�z���������{��k��ݣ���4�:���v'2���r���C�XC��=��7p��I71#�=��soc6L�|�$�\�+��ԅ��fRK�2-���S:/%5�>��rB$ޑ{ҟ}4  }o��X��*2-�%:^�W.�A�(˺��	�J��͈�l���ڽr-�ށ�X���*I�6�6�&�:��2e��1_���s/<׈�R�򸧂�ʥY	�1�fR���7�{^�/+ݣu�孒�N2uC9�@�)���,b��}�L��[�T�6|�)���Q�Q�����c��2mM�{.���5jc|��2��)G���M[��3���ʑ�fzF�)�kr�*�=UҔ�LۡYȯ�1A��^�'�V߾��=:�r�ڵ.��/�n�l,DV�'?.���~�T�V	ϨM���(��]U]�
BT9I_���� K͈1U����-QVR�����ļ��<z�f�?x�Gj�����c�b#��t���=s��s\��뺑����_c��vo��^ ���JpQ��d��w�1+3g��"�=��8��y��=�����'~���x���涳���޵�`ǅ3�����Y���3�G{��s/5�D�=�ڽ�3�=�po^�s/b�7K�X�̓��=�X���y��X�n:��M����b����sn��0b�7Cp]�b��O�������[e�۳�8f������ۏ��Mo_�o���q�c�����빈5r\׸u�7�,U}�N����u�ecQ�P!� ���w�!�����3ν��k����=��uoc6([����>R�g��DL�Ig�'�$�RIg`R�OŮ����45f�����U��Z�a��Ê!Y�"K8	*N�t�{�1�{�C�t����E�*3�>$�'�0��;�>�{4+5LM*�z3o�3pO�����7�^_�QⲔ�����0�����1�=&�!{��p���Ɂ��G�B�剛I�4�E�����h��j�ȎyP������9��f�fی�5
���M+6wL��~[��|�n��D�{f��eI�u$3T�79��8ivO R�e��n�A�)Hy �S�I1HtY�i�='��9�!;�F��w�U��"�&Ͻ��{����q���1��G,���8�Rqkw����j���?�c��߷���IkYac�{�\|�G�ؼ�3����=jW��x/��M>��\}�m��k$�J�W;�x�y�ݻ�բ]}jԉ(��A��[�֋�b��6��E��6:9R1�=��A�7;F��k�[���pO�5��.kຆ.kЍT��X�f!͸؋vO�5��.��k$�ý��Xcz����v5~+���X|�?p{�{��T�|�q���&2>�w��m�k�m�4��"ָx�q�ࣶ,�*�`�C�t1�eb�dy�73�'A���6&a#��Wo;�ebZ�z���I �!ހhݟS�`�J�d��,��[g̎��)��Te���)�tU@!�r��
�7�b_�Ƙʫ����Ϫ�,��� ��FV��HX�9�ã�ȭ>��Q���O�˿҇Ie�]�=�nu#�Z?N�
0�!K��=�k�����w����:�&s�`�:u�!y�vO�'#Od�N���{�y�m��Uӊ�w���P:e��V�7�Z�;f{�/͠{�7�W�T�Of��>J.G7Q6���L���d������	��{�0o:�"Gf��v�h�`#ܻͬ��G믞6�˝v��]g�:/�R�9K������I�+{�ڥ�œ����&W{�r���~1�M�xaTJ2ꯜ7��'��XO�J���:�x��e�z���g��,�L�@�����AG����r����#�k���,�M�0��[�p���^8�ˢb�����sk �X�����b��@��vO�5��.k�=]�!�H���b������_c���7��毾��_8	����[Q�[����sA��X#�i��(h��������2�޵:�x2��ki
�S^���l�;t������@뺯���
�5������b����q]cc6�Q*��.��zy�}�X��BY�CL��-0'���h.�0����S?����Í�,�0�4�DV�ED"K��9J�mE� �I����
��X4Jv�2{K��9�|�1���S1�=:�@�E�|l�)�L�9�����,�&�!)�E�l��ޢ��$wOIͽz0�.���L��;K��z�sto��c��ڵ���_�������_� N�l�	>s�Ad23�rO�X��0��py.K.)�I���3Y�e%��(3�si&�Ur)�|�C8/�x��wr����~'�>�4�qnn���l�x�b���j�8��#"YK����Nc#)5ì7~��h��v�2���\u�Qk�r�8q?H'}�0Jƃ�s��X�I�{Mb�o�E[_i�m/��k�N|��2�-<���&����k���*b��EK�A�QE���`4�5��.k ��b\��b���@��t1�XC-�X������_c���ݑ��;��[mY�����3�W�7��Ok��5X'
��[���O�iww
&{��]KS ָx�����O�P��
y�Z�}�{w�d*g0 b���@��t��pO�5����$l\�tV����ʼ0Y�Ef�e��e�e� }�4�b&�'��@b`+�f��~Uv�ɶ�;e�9��4U���4��A>�R7����V��h�42�{c6ta���_˶s<�y|���*�[&p�:J�z+Q�mБ�ܛ�p�8<(��싢~ܝ�~����{]����Bԉ�m�;q�yP!�b�7�_��g��� �yE!Q�f&8?��ҽd�G���+e֘�훇{�ݥ>R����ç�s:�k@��%I�	4��ڸ�ω;�!3�������sO�ɟ����Ĳß��8,�m��sW�)b���ɆV6���mW���h��Yp矝���;�����im���������Ɛ�و5�dLkd���5���/�HN0<ۺ�` �P��%��b��`�� ր{�'+������MRkk����}����^g���m�Ϣ���
͢�A��Aǽa_��5�(h�x�'�=�\�Ӯ]� �F����-��w*���i��`� � �@�� b��\�P,�=$l�%9��6�����C#~f2+ǵk�2��d��͕p�����r��\�I2t�a�.޹��d_�0IdB�wa��/L��w����@g<4Ԙҽ��.ZR-�[�pO���ˇ�=��=jW��I�ZcV�;�_5�x�4�φU7��Xpv�=]G��Fp�=��#f#p�W�E�L�f��*�����D��u?3qoϴ�O��>�*�x�q��헚E�1Q-H�,0���S���\Խ�G$�}���?ټo�C~G���LkTX֘o�c��ֶ��R������=�{ƝKa��h�40������C��� �����c�dV�4kk��1>��륋5��)w�{�b�7k������� Ir��}���6o��`�:D ��TĀT��D�(����r��P腢R1U�0k��r�ej*'���0#J�C�B�PR��UNq�m�I��>�����p(� �G�:c�w�&t��~��^�랞�=��3���������L��޷���y�Ծ����}"�A��01)��^C�x���o{����O>r�=����Ez��ul�h��ؕ���S�9g�n�P����?�g/�,��5�4�m������D"���=HZ��m\��b��}�qa,7
#܂��y����]��k��E�(��^yU�qS{~����k,Mi���&�������#��r/�Tx�6.#�c&fe��-�k�{��/��f�>���#��e�U�Rk�ᘦ�R9N��8v����PB7އ���=�M�9���0�q+�LiV�r�ۡ���5{*�g��e)O�l�L;hL���\\a?��u�»-�HMa2��6��C�jgi�M��Bvj��ij��٫s&�<Y�Vì�D������'��=2��2kx&Ä��ʕ�[�7w־��=䎭�J���@��?��?�q�7H�]�?f��,�1���et[h��S�,�NmnN*�׀(�Y���fk����-sx�O�(g?������5,Y�^�����x"��W)��v�k��J�5,3>��+�����E^c<{����x"��y�<���bE^c��5����;ogl���d�^���<<�fO�7�'k]}&X�����;�Lc}u�?;kp��m������כKI0y��4Ӹ��&Tnaa[������ބ�h��^ď�̧�ɞ��N�*"�1������k�'b/�נq����^Cg7[�q���'�'1
��h6�|�-~b=���S�S\�%}�Cu������8��uB�<�ȹ��X-(�?���2D���2C���_#��[,��ޱh��jm!��<����P�Rh*�c3�A��2�f�~ƾ�G!�[�L�<����k��@3���41��a0�`�!�/zC�{�j����w��l����qX��
�`Xɨyݓ���նQ�����l����J���,kdV��;Z�g���O�n����|����+�w��/�U�o�mn�����g�
�27+{o����v�e�zeֲ<T�>3X� ��w��-�l��y;z��Ύ"��G�p�o�z�zP����dO�Z� �1��(1	�u�&��6?�cBۚ�=Ǯ3K�����!�;��~00�˸k2��ipm���Po��P�8����+τw�=�.cG��©���{�:����|�����p����X6U�kh�.��XU�k���y��5�]��!y�����z/4��h�ט��#��y�޾�k,V�5��3�k`;���,#�1��k�����[�og�Gp�������{��m0��y���wߵam6�x��-o����cu������{O{�d."���Kq^c����.̒46�^Honlmn߻��amL�IRb�ט�����"���y��j��F:�Ѹ�b��^���_�q�B6�	��Vu��V��Ɔa�6�[���i�㵚)��ج��?�I>!����T�B�Y<�K�Gzg_F���EDR08N3r 3��o���'O����j������:��f��w����M+���l=�� ������Ϝ*��b/^5`��� �x\7,)�!ޏ�V*�ũ^��ӳW�����_�f���:�����2��#�q��p���
��/?U�I�e/�/x��n9.{}-��[D���K.�;|����Ƕ�3�6y���}�A��[�����w�H��0<y��I'�/�=uv�p������?��7����8{�	�ڭ���xU�A�,���?`B��h��ˬq�%Ґ#��k�]n�7vv�v�n۵h�����ty����R4�e���?�F ِe�8��M_$L]�7ĝ����n~�=0�&ާ�A�?�~����=�u��i��P���e����B�̕����z�p����/���K��.�萅e��ei�S�nu�FU�
^#/���5����r�cٽFU����u~^Cn��(���^>^#`=�A�Uy�E��y��D^��FQ*CO��^c�-��k�z_�.{�G����/&d��5�Ȉ����D��͆u�ot������j��:4^���-��W�2\{.{�5Ə{��۷j����[��m�[0��-X�5�k%�㲷O^#g�ט�kh/�n�טUe��_+�5��טk���j5�i�m3�RW��H��o�y�X
"e��`�@Q�6�D#d�OY�%7�K(�����cr��^��U�1;��BP� ��Ob��ӌ�����"��d=�:�8��� ��)̆��{���4�LJ�}�dv��7�r2URiٓ�:�^B��`�%�Hg�C���/[���W[�M�<ǲt��X������p���c�k�W��FmO~�r!�u�؃g������~�{!����f�J��7}�S쩗��.^��k<�Bɬ`��ȓ=�X���������'�zd�[�7������A����ɂ����=�{��y����C������c|J���`m��e�u�N#d�aK��J8K����fD�Zwd&�$�A%����6���/�m�dB���#���%�;ݴ2�f���b/��ǣ?���{?�a�y���Y�c�����b{S�/��^�؛�׀R���ٳf`�,^�ZhG���;�am��|]�;�|�c]QI�Չ�8�E�eoQ^_�ĶqڸW9�Q����^�G�L^�
*{Ex�pf�[�Q%���"��E^c��{4�A�SY�n���p�1�q�Hu�o�ebo�F8��%�1���y�����5Ǝ{���m��¯��׾�~�nm���E��S_~Շ16Hָ{�m���'o�d�(�µ_�_h�\�8Ѻ�]g����AU`����q�7~�qs��x����͝N�5��WY<�'ڿ����Ȼ�؂UZ�*�5\�S�\�U�k�^Zݒ����WY���G^c<����z���n/ϸ��	����{�>&����7Ws�x_��������n�DY�!�F%D6����ݲ���7C�We&�0 �.�`VY�	�U:D-�T����gfC��;b;�Ə���X����`�ſ��B��c֐������$�q�@6��MBG������Y�b�Be��W4�+�_�f�1�y$��Μ�8e&�d'?�#��%<����gJ�\�=�������x˪�D�Q�,�=\��� � N���W��"{�|���TL�ϯ��2a��x��.f{Z�>�.XIeָ�@���-9y�����&�˺����l���Z�����5ˬ?��;;~+��� ��W��J��IUd/�&sg/��zA����ِ�L����a{څܷ����d�}��2�V�T�r:�2�5�6;�KIt �ն���2����6�AUeO��Do�faυR���,�����)���IK7����;MY�ُ-����k�Ǐ.�~���u�:o��PF��sժh�T��c��ufr����Ž*y�E����^�\�������+��(PUd��������5��X�*{�,�k<΀��k�eb��5�"��mս��k,JUd��1�q�&�Q~�zې� ���ُ��P*�k��/�e���L������\�?}Ż��^@]c8����3��	"�P�i�pc�
nu���k2���=�I�{F�r0�_x|7�)G��r���k�,¸Ǚ�/��Mm�8�}^A��c��y�>U���CE^�*���,pU.^Cc��Fuٓ��R^C�Ĳ�kL���lD��<ia�]�2�Z=��2,!f���'~g}���B�zn`�Z�<�k,����2l���P�+|갥�� �,E���/\Z�f2������T�%2�L<�!f����t�}��(��w��|۳�oU�]u���N��SE)�x�@������0��s�M�g/�u7��b�de�`��8dɞ�Ȃ��1�Ja����х6d����2��%�P���޷��a�c��]�]��(�9c�����`/6
zO ���&�7��Sǆ�I��y�F�/<�^�e�?9{��ۛ��7l��ᘀk?h�Μ)WH����B➳��D�9�͠N��{�OcJ���M7Zg�q�z��G��y�`�C�e�
�[�FU��g��ZZc���]>����V'd��5�籁�msm'����O���p����������b��;������G�����a�X��ڟ����+�w�g�<����^R#���=};x/�����c�=���&�{��O]���{�`O���6G��U��^���z+k��g��gy���ש���F����mm��Hߝ��h�vQz�i�{�%+�5�ʲ'�ߧ���5`���>X�eY�FQ�*{��Hk���}��`��<|b���|8w��HU�����˕=}�@���=��kL����h�A������5�׀v; �QM����4o�1�q���M^#y~���@���%� �Q��Z̸��^#��W��0�v����_
����#��Wrƍ^:#���gM+�
��^�jV��M����$�-�^|>Z��?�|QȪ�G^#��q���;�m�iW�A�%�:l��&��T�x���:c;*i�5��(<���_X����yp���ez�Ρ��C� �QU��3�J�����"�QY��>�*��y�j��Tɽ�
�kL���vah� �q�T BC/�x2c�(����f�`����-����g��<,�,�t���a� 
t �a�������u,�pSȦR�f�՝�;}->�f}�5Z�g熦�A��x-� ���[�̐��w����By[U�=��J�0�i���+�����nM�� ���J�=���eF-�+�\�@v��c����X��T�m��ف�L�"�;u���0���z�+0W�=�@�a�.4g�Ǐ��c;3�)�!2��Z6���~,�C0.�^˙f�I����0���w�,1�R�r$������,��lHe<`pd>sga��Gq�����fd��_���i�G��c�L�5����Y�'�5�^jPm������� S����ί	)�������{�4�L����+;ה?�,�qΔ��3t&�{'�ً^t�u��� �x�>�ۍy�h�*{*�����K�� ;ܲ�x�0 L����bYL���J������9H�G����5�|b�:��8 �����f�=/_p�7��#\m��ʲ�j�X��5g-�^�^cd��^cު,{��U�B���������X
�P�as���5�TUٳy����k��Ġ�`o1^C�`4o��HU�=�������5p�)&�������F�ٓZ�נq��TY����~���5V`\cު,{Ey���5\�#TU��B�5Ĥ�"�5�k�����5^c�F���=�0���Z�=y�ג�ix��޳f�W�'�ם�F �,/�n���^ԍB�[G��a�<����	�|5�&YTu�@	�Q�9T�c+�k�vݳM���_ً�u|:TЀ/pؾ�:��W�|�7�����onA�&
�ʲ��P��P��1�k�m���(@�e�js��GD�y��7t��YR�a�ר,{*�a�!r�/{�x����X�D�S%lt:�Rd-M*@�b��w�/$X��3"����j؁���� �Zx�E�$�o����$����;F�`�j��r��C2ؠ�1v�e�+�3�p����nZ�, q���Z��(��/f��^EdA�4{�"������|�P
�BdO�� 6���Еbυ�G;�����8�a/�ܴ;[��ݔJt�Z��%�=�m�v+i:����q烏�w�;�}�Ƃ�~d��ٱ����J�6`�-P�^V�K���l��ld=���9��+i�
o�33�qv�L���MǽFk�)�h��aږ(��g��],y�c$�に�� �a������ﲿ�c`���|ve�w2�'�;��_���^��h}݄�D릱�k�m^ܵO\��/�;����2�p��[�F#��T�M���$m�u��x�6��+0 {���X�
Ǖ�>�T܃��<�ޙO�\�	��gg9��<��eO�����^�w\��s.���}K�c,�7	{�캮�+�5kp´��W�tl��e_�'>o� ��N�5�\Χ�^c�y�\c��!^Ǿ൏�{-�$�a�2{V<�J^��OR+g�����p�U\�ȻL^c��,{��'��0���6�Nɽ�7A)mSz��{C����5j��.��X���^(G��^#�ҿ�^�T^/d���ޘ^c�UG��-\Ez�q�5�������eRU�cq�ľ������5��#��TU�+�k���y�O@^���9��r�H_-#����-r\��mt�k���H�|+�kt��'�jo��mZ�y��ny����s	�\��]�X3�I�g\?
a��[W|X ��k�a��U����@�ɤ������5<ޯ��ܼƏ����?�~&{�ѥ������W�E�`�>���~�o���=��g/�:s���q��7����*�k���������PMsmy�s�y]Ue/1��A�b[�[�d�CE��C�2^S�9�)����y�k�O=���d�S%lTM�H�� n$�@�`�@ "`Z��ʈ2���� ���:S+!�"욒>S����04�Ш��W30k��"�q7�;xW��,���ai�02m[�w<43dj.�(����bE��J��	�Stz,��$F�Հ�C��-��`�媨5H��;V�lqW
+�[bx��v%ko�h��\��v�jI�ae�4�sc�=k��c�mþ�_�����q��e'�X��銩�^G�0��؋�n2x�.�g���L�Φ�D����	ƾ!�ř�`��7%+���'�L�������q{^���V}������/���_=�;���9��z�W�D���O�:��A��������gqL�������ئt���KO�ra����c����{,Ş��;f��;�ګV(��1�/V'@���r���L�c�0�.���FC�$�2�Zu��T��!����/�*A��柬QE)�D�ճˏ���\��~ğ�h�-G� {�>f{���$b˖���Wb$mP�8��{�>�=&ˍ�=��FB��,:da���(膰��*���Ȳ��W,�ߗe���2�$��A��k��!N�aK�5H���a*�a��ø7����F���k{�J��8�o�se�y�%?����������y�i���L1M�� ��xb~^���Y��A^�Jy�I7�k�ryX�ᄪ���x�Ċ�{L�k�3X���8��kȾ������ר�Fy�a��^~�9�kdi����F^����5̴�ȡ������Z�����b8�kd�\P�y�@%��-����0���.cwߵa��|���M#<
U�f�棏8�	�ft�v��� �e�Ƣ�:�Uü��P��\�טn\Ù��x˩?������5��;�t�e�O���ư��u�;�����B��]�<s޺u��:y/Yv�������2o��ls�H�ϡ2�9T][��טf\D^����[��>Vo޲���6f�[&�A$�^���>�$���;Y��0g~�q�I�P-��J$l@�Qv�\M�5��#�ś*� :Y�=�֭�Ch� E��r2B�g'!�������vg�C�Ӡa�=C�R�� �]��l��m�d�����2*��f;Wz���dL�(��%��av�YYb���c�ΞXACdx�J�NV���.�fb&�� �a���)q/�uȞѰ�c�l�0�˪e���ρ,8���6vx8Ε�#������Gm��_�7���ǳZ�]��Gm�������^\�	=�1��
{qO���(u�dy'h�-S���`2���쩲���#�e��_�^��TE�,Ɔ���s��#�� ]����㵝�P��"Ƚ�/x��ѽ��k0u����g��e�F�=g):�oGG�\�nx��u��E��"�wbu�^�N7���ް6W�ͯc�s��;�-�W��Yz|��%t�zIK����Z�����^������6��s��o�����Mw㢅�
>ե����^��ɬ�����\�Ņ`.��PBO^Q	`"��j�
����	\T��Zx������p��:���6��W���=Y��i�9raO<9������5��<V�=G	�+�z��
K����5�9{/4.�k�������^{�kh�������d�3K�5������\��qC��q|�<������_e�A�{��m-����R�G���u`u\��M��]��5�ᐼF����0�{��� ��Jy[L�bVb�e��ɔ��א�.�k��j|a��U?O�M^���5�I���*|zN�rg,TI�M�M.�}2�e��5�6a
���W
׈����/W�%�Qe-r\�$kL=��`{�50Z��0���8�f��g̈́����K�ȶ\��u���܆�a.���Y�v�u�a�a�����~��;%�{��5�Ե�X%��p���5n<�|t�E��պ���٦�F-�sN��]Ƕ���-$k��9��Ɠ��#�	��T���V�<,R�ͅE1`���J�}>7��Ǫ<���F��ϡ�5����5��kH"�y�r������@1{S���>��4Zi���H��B�"�5f�CU�q��x�"ăF�8�ȶ�H��q8|��aO��P��W!Q:�h��e��'O8E!���⍸:P��᝺vg]Yz����AȌ��iK��dvn�
��!l�[X�:w�fG[;N0��>!�8�_(�Ҍ����x��[Ύ�DE��)��0܉D��X	W���@���nR��m��UAe`N� {����^�:���l�*�ڿ2M�wP�Q�� \���&(��L�LN~}{׉���Gy&��X�;O����Kݓ���z��c܂�b���y���͍�����/�;����VZ��5��d
�d�C�$[�{���x�'& b偄�H�#��!]ˊ�D	��ho[�����l��_ 2C���c�������4�2����=��^�ң�:3�|���ߧ"�w��^��n�e<{��mD�{�'���ۂ��W���U�eƵdO\_Ɉ{C�\��W��&U��w�0�<J�0>qN��2L֎�p[�޹k0�sǭ	�0X��K�o�:{c3�4�6�h�a���ׯ�^�4��E��(;�urc/��M$k�E�@��L�� ����hۼM��m#�/Z������1�ʹ�x-ܶ���Vh�d��{�W�=���k��\ه���=�}�����<����o����0�a�e1yN��|�~���^����%b�_�=@���Ϩ�k�m�H����-�טD�^����:�����ϕ��>w^^CM*�k���J�^���눸��K����7���671�J�0���58WP�|"��!�Qv�����q�����k�6Vh���H���Wv/�5,m\c�^�[����}�x��L^�M^�(��V���5�9x�@��4��9D�+$�Q=e�����6u�67�q�?��I���!�Q51�1�����/�k@|M{�S��2��=ýc���nY�Y�TcL����:�����@0� ������>vT��d覆���P�j��9Ts����`��z��k��h�R]%_.����'��/������q��ۑ�	{���-��h.�L�����mk^c�<�
�k��(L��P�
��{���|�ƈq��� ��ǶY�-/|y��H�ƒ��L�ƒ�G^c��5�*aC�q�"���b�)����ypwKL����f�LeκLL²1��Ke4�A(oU�Xe������e�0�_7��*�R<4�hXx���q�!��t@g�x��dۻ�C�Ɂ��J���+W�PГJ��9�� H��A7eַ/���2b1[mJ�t	����`;`%4l���}�о4
P��19����� :��T��4����Tۙ��w��g������lmV.���<�~���/޻������݋��m���d��v���AY��?𗹤� �T܃2w>g.��p�(:S1KlH�P`VO���?9�E)c��"}r���@��s��);zmD:z~8�53a���q��y�7���nZ�گ}�����\�ӟ��މ'�16���j&3���^�kle.�js�� �SK���=u�/�hs�dv�fo�i�� `N��K��Xb���.�'�����N�+�Uh��S�{>�̵8?�.(+��ܼ�\��1Los�$�UԢ�KH���
�+�H���:�ƞ�_�s21�&U�L&/���ePW���B���k�Ǽ�S��^O��{���bR�=��G^c�����س,3�p��=�k��=�l�5����i{ ��n����t��`O_�e��H\@N<��^c\{=��s�����&|n��װD^�/��P"�z�=�~cGN��{�]X�5�q���Hz��4�N��k��5ʨQ��e����-�ħ|�K<yB�뛒ר�����Ȟ�(�׀Iy��&�w&��{����4{�^C�/�k@2��^�)����5,�U�8��BymY\ߛ������ר��ט�k�;�,��]�k@�Ƽ��q���uކ� �>��۬{�����am�e�|������c����W�e�/0L㰧ϡ��6w0�qV�q�|�{1�ޕ���}Ϊ���{w������K�����Z��{�m�7w�//7��\c��P��q��}��B�5�k,T��^C���s�>����kиƲh�67�A�k�$w��-Ӹ���S{�5�'м�6o�g���8�Q�2 �h�;v� �F�,3�!�G׭Ef���&+�u:"SFd��4[�0�������.b�AaV���u�'��Jջ�;eo\]��0�����s�@+%�r�PB0�+%� ��*C��i0Ǎ8����(��B����ACbp�A�=�j��c�ڕ+���ێL`�D�)�i����,4\P�,ʺڇ�.`��k�Ȓ�6G�*�ҧz�l�H&�V�����<�an4�e_�ڷ^��6����E������#�������3�ܰ��:;���޺�3�9PY�]�+e,�ŗQ��7R+�)��g_��FCc�	�de�8�@���I��c6.{���Q�\A<�&��\\��	t*}~<�\�f;�mV7'+�ZL��c#��]�L���3�8?���������[�{8a�������c� �m>�s��/�˺:�$q�Şjs=oҸ�m�Dfk���\)���I��.�m6�O�e�ui�߁%W�v`x����	ٛ���$�%�,KӲ�kmS������0">��(0��d"NJ�B?���ڭ-�g���Pn�?�!$�@�t�:���v6��do�4iOy�Q�e����"���k��F�e�ǘd��߃S�����������=�]nV�k�7{@��+�s�Z�\	EƽЊ�K��^�؛@�\cQm.����ܾ��kd�؛�=��1����<ao�^C�K��(N��^C<��=�H�؛�k@�O��A}�^3vU�Q#�Q��Ľp{�5�"�����5��E�3G���5���r�k���x2_żV���G��klZ�7�����+޷~qk��=����(�(�5r��RU�q�ٰ�>��^��.f ^	�[����8�J�x�7? ��}��>G��W^�7L�dG��lmn�ȼ4��ݗ�0;;����|�~y���,��i�g��#���7y����4���V�;�7y�L{�͙W^�oμ�J��I�Yʃ��U�p�ݨ��F{{Q�����@��<C�n��6y��f/3H���s����V��Kf�Zx���5�@ˎ����\q\"#W�n�e��m��|8{�e�R��*��6�m�2���@��ϲ��e���oPi�M�����z���ϥ�������qj�GXSB�'$K8k[L�^|��3�-���ш/�h��92�3����Xe���l����_+�1aB �5){������"K�(�����c0�5����w/������[���@�FdD!���6<���߽�˴R�$�ݸ%��q�d?{�V�=��S�J[X� �1�v����`c���������x�rj�e��H� ��{��������[�Ёd��6,�!.��m:��i��х�!.ΰ�.[�I���=��q#��By?��i�(]/�d�3���:��XE[v�Q�IV�0��Φ�o��J�pEOf���\0��X����js���,��޵k�0{֘�jsc�ae�4���^�|u��WJϯk�(��_4{��Y�{�T3���m������k�߈������[�{/���5�(���|�:^c����ٻ{W����Ϟ���P+�����R^c