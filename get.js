const util = require('util')
const Promise = require("bluebird")
const _ = require('lodash')
const golos = require('steem')
const fs = require('fs')
golos.config.set('websocket','wss://ws.golos.io');

const account = "sxiii"
let l = 2000
let f = l
let blogs = []


const getStat = (f) =>{
	golos.api.getAccountHistory(account, f, l, function(err, result) {
	if (err){console.log(err)}
	
	for (name of result){
		let block = name[1].block
		
		 if(name[1].op[0] === 'comment'){
			if (name[1].op[1]['parent_author'] === ""){
		 
			let blogposts = name[1].op[1]['title']
		 
			blogs.push(blogposts)
			console.log(blogposts)
			
			}
		}
	 }
let last = result[result.length - 1][0]
if(last === f){
		
	f = f + l
	getStat(f)

	}
	else if	(last < f) {
		console.log(`=============== БЛОГ ОБРАБОТАН ПОЛНОСТЬЮ =================`)
		
		fs.appendFile('blog.txt', blogs, function (err) {
		  if (err) {
			console.log(err)
		  } else {
			
		  }
		  })
		
			
		  
	} 

});

}
getStat(f)
