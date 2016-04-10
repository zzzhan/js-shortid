var shortid=require('../lib/shortid');
//may duplicated within one millisecond,default "salts" is 2.
//equal to "shortid.gen({salts:4})"
console.log(shortid.gen());
//adding more "salts" will be more closed to global unique, but more longer id
console.log(shortid.uuid());//equals to shortid.gen({salts:4})
//more shorter,but may duplicated within one second
console.log(shortid.gen({interval:1000}));

var func1 = function(loopCount,opt) {
  var inst = shortid.inst(opt),
  store={},duplicated=false;
  for(var i=0;i<loopCount;i++) {
  //console.log(inst.gen());
    var sid = inst.gen();
    if(!!store[sid]) {
	  console.log('duplicated:'+sid+':'+i);
	  duplicated = true;
	} else {
	  store[sid]=i+"";
	}
  }
  if(!duplicated) {
	console.log('unfound!');  
  }
  return store;	
};
console.log('check duplicated within 1000000 visiteds in the same time(4 salts):')
func1(1000000,{salts:4,interval:-1});
console.log('check duplicated within 10000 visiteds in the same time(2 salts):')
func1(10000,{interval:-1});
console.log('check duplicated within 10000 visiteds in the same time(3 salts):')
func1(10000,{salts:3,interval:-1});
console.log('Samples:');
for(var i=0;i<10;i++) {
  setTimeout(function(){
	  console.log(shortid.gen());
	},
    Math.floor(Math.random()*1000));
}