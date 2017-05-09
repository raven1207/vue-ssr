const Vue=require('vue')
const server=require('express')()
const renderer=require('vue-server-renderer').createRenderer()

server.get('*',(req,res)=>{
	const app = new Vue({
		data:{
			url:req.url
		},
		template:`<div>The visited URL is:{{url}}</div>`
	})
	renderer.renderToString(app,(err,html)=>{
		if(err){
			res.status(500).end('Internal Server Error')
			return
		}
		res.end(`
			<!DOCTYPE html>
			<html lang="en">
			<head><title>Hello</title></head>
			<body>${html}</body>
			</html>
			`)
	})
})
const port = process.env.PORT || 8000
server.listen(port, '0.0.0.0', () => {
	console.log(`server started at localhost:${port}`)
})