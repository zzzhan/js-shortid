(function(root, factory){
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if(typeof(module) !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    var _previousRoot = root.shortid;
	var self = factory();
    self.noConflict = function() {
      root.shortid = _previousRoot;
      return self;
    };
    root.shortid = self;
  }	
}(this, function(){
  var __initime = 1460332800000,//2016-04-11
    __symbols = ['0','1','2','3','4','5','6','7','8','9',
	  'a','b','c','d','e','f','g','h','i','j',
	  'k','l','m','n','o','p','q','r','s','t',
	  'u','v','w','x','y','z','A','B','C','D',
	  'E','F','G','H','I','J','K','L','M','N',
	  'O','P','Q','R','S','T','U','V','W','X','Y','Z'],
	__base = 62,
	__paddingLeft = function(padding, val) {
	  return (padding+val).slice(-padding.length);	
	},
    ShortId = function(opt) {
	  this._opt = opt||{};
    };
	ShortId.prototype = {
	  _toBase: function (decimal, base) {
		var opt=this._opt,
		  symbols=opt.symbols||__symbols,
		  conversion = "";
		if (base > symbols.length || base <= 1) {
			return false;
		}
		while (decimal >= 1) {
		  conversion = symbols[(decimal - (base * Math.floor(decimal / base)))] + 
		    conversion;
		  decimal = Math.floor(decimal / base);
		}
		return (base < 11) ? parseInt(conversion) : conversion;
	  },
	  _salts: function() {
	    var self=this,opt=self._opt,salts=opt.salts||2,
		  ret='';
		for(var i=0;i<salts;i++) {
		  var salt = Math.floor(Math.random()*3844);
		  ret += __paddingLeft('00',self._toBase(salt, __base));
		}
		return ret;
	  },
	  gen: function() {
	    var self=this,opt=self._opt,interval=opt.interval||1,
		  initime = opt.initTime||__initime,
		  //default millisecond since init time
		  elapsed = interval>0?Math.floor((new Date().getTime()-initime)/interval):0,
		  salts = self._salts();
		return elapsed===0?salts:(self._toBase(elapsed, __base)+salts);
	  }
	};
	return {
	  inst:function(opt){
		return new ShortId(opt);
	  },
	  gen: function(opt) {
		return new ShortId(opt).gen();
	  },
	  uuid: function() {
		return new ShortId({salts:4}).gen();
	  }
	};
}));