const router = require('koa-router')()

const fs = require('fs');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// 创建list路由 
// ctx 表示执行上下文，它包含请求对象和响应对象
router.get('/list', async (ctx, next) =>{
  // 随便返回一个字符串
  // ctx.body = "List Data";

  // ctx下面有一个request对象的query方法
  // 作用：接收get传输的数据
  // console.log(ctx.request.query);

  // 在koa框架中，只要使用{}就可以访问JSON格式数据“koa自动转换JSON”
  ctx.body = {
    errcode:0,
    errmsg:'ok',
    list:[
      {"username":'LISA',"age":18,gender:"女"}
    ]
  }

  ctx.body = {
    errcode:0,
    errmsg:'ok',
    list:[
      {"username":'LISA',"age":18888,gender:"女"},
      {"username":'bbbb',"age":128,gender:"男"},
      {"username":'cccc',"age":156,gender:"女"},
      {"username":'dddd',"age":181,gender:"男"}
    ]
  }






// POST
})
router.post('/list2', async (ctx, next) =>{
  ctx.body = "List2 Data";
  console.log(ctx.request.body);
})

router.post('/list3', async (ctx,next) =>{
  var args = [
    {field:'page',type:"number"},
    {field:'page',type:"number"}
  ]
    var body =ctx.request.body;
    for(var i = 0 ;i <args.length ;i++){
      var item = args[i];
      if(!Object.keys(body).includes(item.field)){
        ctx.body = {
          errcode:-1,
          errmsg:"参数个数有误"
        };
        return;
      }else{
        if(typeof body[item.field] != item.type){
          ctx.body = {
            errcode:-2,
            errmsg:"参数数据类型有误"
          };
          return;
        }
      }
    }
    ctx.body = "ok!";
    //获取json文件数据，返回字符串类型的数据
    var data = fs.readFileSync("./data/list.json");
    //转换为引用类型数据
    data = JSON.parse(data);
    var list = data.splice(body.page * body.count, body.count);
    ctx.body = {
      errcode:0,
      errmsg:"ok",
      list
    };

})
module.exports = router
