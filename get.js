const util = require('util')
const Promise = require("bluebird")
const _ = require('lodash')
const golos = require('steem')
const fs = require('fs')
golos.config.set('websocket','wss://ws.golos.io');

const account = "vik"
let l = 2000
let f = l
let blogs = []
let permlinks = []

const getStat = (f) =>{
	golos.api.getAccountHistory(account, f, l, function(err, result) {
	if (err){console.log(err)}
	
	for (item of result){
		let block = item[1].block
		
		 if(item[1].op[0] === 'comment'){
			if (item[1].op[1]['parent_author'] === ""){
		 
			let blogposts = item[1].op[1]['title']
			let link = item[1].op[1]['permlink']
		 
		 if(!permlinks.includes(link)){
			 blogs.push(blogposts)
			 console.log(blogposts)
		 }
			
			permlinks.push(link)
			
			
			}
		}
	 }
let last = result[result.length - 1][0]
if(last === f){
		
	f = f + l
	getStat(f)

	}
	else if	(last < f) {
		console.log(`=============== БЛОГ ОБРАБОТАН ПОЛНОСТЬЮ, ЗАГОЛОВКИ ЗАПИСАНЫ В ФАЙЛ blog.txt =================`)
		fs.appendFile('blog.txt', blogs, function (err) {
		  if (err) {console.log(err)}
		  })
		
			
		  
	} 

});

}
getStat(f)
