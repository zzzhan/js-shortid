# js-shortid

> Short id generator. UUID generator. Url-friendly. Non-predictable.

## Quick Start

```shell
npm test
```
	
## Install

If you are using bower, you can download the source like this:

```shell
bower install shortid --save
```

`js-shortid` is available in the npm repository.

```shell    
npm install shortid --save
```
	
## Usage

* node.js:

	```js
	var shortid=require('shortid');	
	console.log(shortid.gen());
	```
	
* browser:

	```js
	var sid = shortid.gen();
	console.log(sid);
	```
	
## Short ID Samples

```
R6zw8Hly
R6AhD4Jw
R6Cip4M3
R6Ej09A1
R6Fjw3Q4
R6FP04jv
R6IlvZRb
R6LCSXn8
R6NT1Syx
R6O8RN67
```
	
## Overview

The solution of shortid is clearly the simplest. It is constructed by the character strings:`timeseq`+`salts`.

The `timeseq` is a time sequence since 2016-04-11(default initial time), and converted it to Base 62 string.The time sequence can be increased per millisecond, per second, per minute so on that depends on the option value `interval`, default value is `1`(increase per millisecond).

The `salts` is constructed by `salt1+salt2+...`, each `salt` is a random number and converted to Base 62 string(only two charaters).How many `salts` will be append to that depends on the option values `salts`,default is `2`(four charaters).More `salts` of the id more closed to be a UUID, but more longer of the id.

Generally,if the `timeseq` is increased per millisecond and the salts is `4`,the id is almost closed to a UUID.

## Options

#### options.salts
Type: `Integer`

Default value: `'2'`

The value that is used to generate the `salts` count.

#### options.interval
Type: `Integer`

Default value: `'1'`

The value that is the `timeseq` increased millisecond interval.`1000` is increased per second,`1000*60` is per minute, so on.If less than zero, there are not `timeseq`.

#### options.initTime
Type: `Long`

Default value: `'1460332800000'`

The value that is the epoch of the `timeseq`.The default is millisecond of `2016-04-11`.

## Options Usage Examples
### General

```js
var inst = shortid.inst({salts:3,interval:1000}),
console.log(inst.gen());
```

###	Quick Style

```js
//default option {salts:2,interval:1}
console.log(shortid.gen());
//custom option
console.log(shortid.gen({salts:3,interval:1000}));
//default option {salts:4,interval:1}
console.log(shortid.uuid());	
```