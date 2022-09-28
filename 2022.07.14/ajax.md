# HTTP请求与相应的组成：
- RequestHeaders：HTTP请求头信息，用来描述一些元数据
- HTTP请求体。也就是请求的正文
- ResponseHeaders：HTTP响应头信息，用来描述一些元数据
- HTTP响应体，也就是响应的正文

# HHTP请求方法：
   **GET**：常用语向服务器查询某些信息，必要时，可以将查询字符串参数追加到UTL末尾，以便将信息发送给服务器。
   **POST**：常用于指定资源提交数据进行处理请求(例如提交表单或者上传文件)，数据被包含在请求体中(body体)。请求可能会导致新的资源的建立或已有的资源的修改。

# 响应状态码：
 - 它以“清晰明确”的语言告诉客户端(浏览器)本次请求的处理结果，一般由3位数字代码组成。
 ### HTTP状态码：
- 1XX 接收信息正在处理
- 2XX 正常处理完毕 （200 ok请求成功）
- 3XX 附加操作  （301 永久重定向。 302 临时重定向）
- 4XX 无法处理  （400 语法错误。 401 未认证。 403 禁止访问。404 资源未找到）
- 5XX 请求出错  （500 服务器故障。503服务器繁忙）

# 请求的过程

1. web ：页面的内容及数据展示
2. 数据库 ：管理的数据仓库“管理大量的数据”
3. nodeJS：后端服务器，向前端提供需要显示在网页内容的数据

#### 关系

	- 前端 : 没办法和数据库直接通信，前端发起请求
	- 后端 ：请求来到后端的程序文件中，通过后端的逻辑处理去到数据库”操作数据库，获取操作结果“
	- 数据库 ： 数据库返回操作的结果，把结果响应给前端进行展示
# AJAX技术

- Ajax即 Asynchronous Javascript And XML(异步JavaScript 和 XML)，是指一种创建交互式，快速动态网页应用的网页开发技术，无需重新加载整个网页的情况下，能够更新部分网页的技术。
- 通过与后台与服务器进行少量数据交换，Ajax可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
- 局部刷新技术：部分网页内容进行刷新(例如:下拉刷新列表，上拉加载更多列表，用户名是否被注册，地图“放大局部时加载数据”，等……)，不用刷新整个网页
- 异步：Ajax在http响应没有结束的时候，可以继续进行后续操作，从而提高用户体验。

# KOA框架搭建后端环境

原因：前端不能直接操作数据库，得通过先访问后端，通过后端操作数据库 

选择使用nodeJS作为后端环境，因为nodeJS的底层语言也是JS“使用方便，易懂”

Ajax主要是是前后端进行通信交互的技术，先不涉及数据库

KOA：基于Node.js平台的下一代web框架“利用koa可以快速搭建一个web后台环境”

koa环境搭建：

```
 	1. 安装Node.js  ,10以上的版本就行
 	2. 安装脚手架：npm i -g koa-generator    
 	3. 安装成功后输入命令 koa2 qqsports    (koa2是koa第2版本，qqsports是文件名)，创建一个项目文件夹(创建一些初始的代码)
 	4. 输入命令 cd qqsports   进入文件夹
 	5. 输入命令 npm i  安装依赖
 	6. 输入命令  npm run dev  来启动koa框架
 	7. 打开浏览器再地址栏输入  localhost:3000  （页面出现hello koa2，说明运行成功）
 	8. 走到这一步说明我们已经拥有了一个后端环境，端口号是localhost ，域名是3000   
 	9. "http://localhost:3000" 访问koa2应用
 	10. 访问资源：在public目录下有3个文件夹(是脚手架自己创建的)，可以随意的在此目录下放资源，我们可以通过我们的url访问到。
 		例如：在public文件的image文件中放入一张图片，在地址栏“localhost:3000/images/图片名“，查看图片。
 			 在public文件内添加一个html文件在地址栏”localhost:3000/文件名”，运行文件。
```

# 路由

概念：如何定义应用的端口及如何响应客户端的请求“也就是说我们浏览器发起一个请求到我们的服务器上面，其实呢就是先要保证有一个请求地址也就是我们的url，而这个url也就是路由,在koa框架中路由系统已经被搭建好在文件的routes文件中”

总结：
	KOA框架：快速搭建一个后端环境，这样后端可以编写相关代码，前端也能发起各种http请求。
	KOA框架是基于Node.js开发的，而Node.js只是作为后端执行环境使用“Node.js后端语言是JS”

# Ajax的基本框架
### 创建XMLHttpRequest
Ajax通过原生的XMLHttpRequest对象发出HTTP请求，得到服务器返回的数据后，再进行处理。XMLHTTPRequest对象是Ajax的主要接口，用于浏览器与服务器之间的通信
1. 创建,实例化xhr对象
	var xhr = new XMLHTTPRequest();
2. xhr实例下的load事件，用来监听请求是否已经成功完成
	xhr. onload =  function( ){ console.log('请求已经完成') ；}
3. 发出HTTP请求
	xhr实例创建成功后，使用open() 和 send() 方法发出HTTP请求
	open:连接 ，参数1请求的方式，参数2请求的url，参数3是否异步true异步false异步“可省略默认值为true” 
	send:发送数据
	xhr.open('GET','http://localhost/list','true')
	xhr.send()
4. 去routes的index.js文件中编写一下list路由
	// 根据上面变写
	// ctx 是表示执行上下文，它包含请求对象和响应对象
	router.get('/list', async (ctx, next)=>{
		//随便返回一个字符串测试

  		ctx.body = "list Data";
  	})

5. 刷新浏览器，在控制台查看请求状态“输出结果，查看list状态码，response响应的结果”
6. 发送POST请求，发送请求方式相同把GET改为POST
	
###  总结
基本框架，步骤1：创建xhr对象 “所有的Ajax操作都是通过这个实例来完成的”
基本框架，步骤2：监听请求是否完成 “onload触发代表请求完成，可以在事件函数中操作，比如页面的渲染工作”
基本框架，步骤3：发出HTTP请求  “在浏览器端如何发送一个HTTP请求访问指定的服务端，通过xhr的open方法连接 和 send方法发送”

# 请求操作
### GET发送数据
原理：GET请求通过哦查询字符串参数的方式把请求体内容传输给后端，要求通过附加url后面进行传输。
xhr.open('GET','http://localhost/list?type=phone&count=20',true)
xhr.send();
演示：
html文件

```
// GET请求传输数据
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        console.log("请求完成");
    };
    xhr.open('GET','/list?type=phone&count=20',true);
    xhr.send();
```

接口文件：

```
router.get('/list', async (ctx, next)=>{
	// 接收get传输的数据
  	// 通过ctx下面有一个request对象的query
  		console.log(ctx.request.query);
	})
```

![](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220709101040068.png)

通过命令行窗口，koa框架会把发过来的查询字符换进行解析，解析为对象的格式
![](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220709101240646.png)

### POST发送数据
POST请求默认通过纯文本的方式把请求体内容传给后端，要求通过send()方法参数进行传输
xhr.open('POST','http://localhost/register',true);
xhr.send('James'); //方法内是纯文本数据
但是前后端交互不建议使用纯文本，还是推荐使用key，value组合的方式发送数据。
POST如果想发送key，value组合的数据可以通过 “名称/值”对的方式吧请求体内容穿给后端，要求通过	setRequestHeader()方法进行设置
	xhr.open('OPST','http://localhost/register',true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.send('username=James&password=123456');
演示：
html文件

```
// POST请求传输数据
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        console.log("请求完成");
    };
    xhr.open('POST','/list2',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.send('username=James&password=123456');
```

接口文件：

```
// post请求
	router.post('/list2', async (ctx, next)=>{
  		ctx.body = "list2 Data";
  		// 接收post传输的数据
  		// 通过ctx下面有一个request对象的body
  		console.log(ctx.request.body);
	})
```

打开浏览器发送请求，数据通过请求体查看内容，在终端中查看返回的数据。
### 总结：
GET发送数据：url?后面，通过查询字符串参数形式发送。
POST发送数据：send()方法参数，类型为纯文本，转换为“名称/值”对 或 文件 或 JSON等。

# Ajax的响应操作
status是XMLHttpRequest对象的一个属性，表示响应的HTTP状态码

responseText响应字符串
返回从服务器接收到的字符产，该属性为只读。只有HTTP请求完成接收后，该属性才会包含完整的数据。
例如：
	if(xhr.status == 200){
			console.log(xhr.responseText)
	}
演示：

```
// 请求的响应判断
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            console.log(xhr.responseText);
        }
    };
    xhr.open('GET','/list',true);
    xhr.send('username=James&password=123456');
```

### responseXML响应XML文档

概念：返回从服务器接收到的XML文档对象，该属性为只读

文档：和html相似都是标签组成的数据，XML标签是自定义的，复杂，建议使用JSON

l过程如图所示：

![](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220709110833909.png)

### 总结：

响应数据：类型可以是字符串，XML文档，二进制数据，JSON数据

# JSON

概念：JSON（JavaScirpt Object Notation）是一种轻量级的数据交换格式。它使人们容易的进行阅读和编写。同时也方便了机器的解析和生成。

格式：

```
// 单租JSON
{"username":"James","password":'123456'}
// 多组JSON
[
	{"username":"James","password":'123456'},
	{"username":"Hero","password":'111111'},
	{"username":"LISA","password":'666666'}
]
```


### JSON规范

- key属性和字符串类型值，必须使用双引号。
- 指的类型范围有限：string，number，object，array，boolean，null ，其他类型不支持。
- 最后一组数据，不能够添加逗号结束。

演示：

```
   // JSON格式数据
    var json = {
        "username": "James",
        "foo": null
    };
    // 作为对象，数据很容易拿到数据，但是在后端往浏览器响应数据的时候是字符串类型的JSON，所以需要解析JSON字符串
    console.log(json.username);

    // 拿到的JSON字符串长这样，没办法通过属性获取到值
    var json = '{"username":"James"}';
    // 所以要利用JSON的parse方法解析JSON字符串
    json = JSON.parse(json);
    console.log(json.username);
    
    // 如果是多组JSON操作，字符串编辑麻烦可以使用转换
    var json = [
        { "username": "James", "password": '123456' },
        { "username": "Hero", "password": '111111' },
        { "username": "LISA", "password": '666666' }
    ];
    // 把引用类型的数据转换为JSON字符串
    // stringify()方法和parse()方法，操作相反。
    json = JSON.stringify(json); 
    json = JSON.parse(json);
    console.log(json[2].username);
```

JSON数据发送请求演示：

```
// 使用JSON数据，请求传输数据
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            // 1.输出查看，控制台返回的数据
            // console.log(xhr.responseText);

            // 2.根据数据获取数据
            var data = JSON.parse(xhr.responseText);
            console.log(data.list[0].username);
            console.log(data.list[0].age);
        }
    };
    xhr.open('GET','/list',true);
    xhr.send();
```

接口文档：

```
router.get('/list', async (ctx, next)=>{
  ctx.body = "list Data";

  // 接收get传输的数据
  // 通过ctx下面有一个request对象的query
  // console.log(ctx.request.query);

  // 在koa框架中，只要使用{}就可以访问JSON格式数据了“koa自动进行了转换”
  ctx.body = {
    errcode:0,
    errmsg:'ok',
    list:[
      {"username": "James", "age": '30',gender:'男'}
    ]
  };
})
```

### 总结：
JSON：一种轻量级的数据交换格式，比XML要简单，灵活，高效。
JSON规范：双引号，类型限制，逗号
JSON方法：JSON.stringify( )   JSON.parse( )    前后端数据通信的便捷转换神器。

# 响应JSON数据到页面
## 1.DOM方式
DOM是HTML文档的编程接口。DOM将文档解析为一个由节点和对象组成的结构集合，也叫DOM树。简言之它会将web页面和脚本或程序语言连接起来。
操作语法：节点的操作
演示：
html文件
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table border="1">
        <thead>
            <tr>
                <th>姓名</th>
                <th>年龄</th>
                <th>性别</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</body>
<script>
    // 响应数据到页面
    // 方式一：DOM
    var tbody = document.querySelector('tbody');
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            // 拿到数据进行解析
            var data = JSON.parse(xhr.responseText);
            // 遍历数据数组
            for(var i = 0;i<data.list.length;i++){
                var tr = document.createElement('tr');
                // 遍历数组中的对象
                for(var key in data.list[i]){
                    var td = document.createElement('td');
                    td.innerHTML = data.list[i][key];
                    tr.append(td);
                }
                tbody.append(tr);
            }
        }
    };
    xhr.open('GET','/list',true);
    xhr.send();
</script>
</html>
```
接口文件：随意的数据
```
router.get('/list', async (ctx, next)=>{
  ctx.body = "list Data";

  // 接收get传输的数据
  // 通过ctx下面有一个request对象的query
  // console.log(ctx.request.query);

  // 在koa框架中，只要使用{}就可以访问JSON格式数据了“koa自动进行了转换”
  ctx.body = {
    errcode:0,
    errmsg:'ok',
    list:[
      {"username": "James", "age": '30',gender:'男'},
      {"username": "LASA", "age": '20',gender:'女'},
      {"username": "TOM", "age": '28',gender:'男'}
    ]
  };
})

```
## 2.模板拼接字符串
概念：末班字符串使用反引号来代替普通字符串的双引号和单引号，可以使用多行字符串和字符串插值功能，直接在字符串中渲染数据变量，ES6提供的语法。
例如：
	var username = ‘James’;
	var info = 'Mm name is ${username}';
演示：
```
// 方式二：末班字符串
    var tbody = document.querySelector('tbody');
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // 拿到数据进行解析
            var data = JSON.parse(xhr.responseText);
            // 渲染数据
            // tbody.innerHTML = data.list.map((item,i)=>{
            //     return `
            //         <tr>
            //             <td>${item.username}</td>
            //             <td>${item.age}</td>
            //             <td>${item.gender}</td>
            //         </tr>
            //     `
            // }).join(' ');
            for (var i = 0; i < data.list.length; i++) {
                tbody.innerHTML += `
                    <tr>
                        <td>${data.list[i].username}</td>
                        <td>${data.list[i].age}</td>
                        <td>${data.list[i].gender}</td>
                    </tr>
                `
            }
        }
    };
    xhr.open('GET', '/list', true);
    xhr.send();
```
注意：这种方式渲染，比较繁琐，因为逻辑代码和视图层混合在一起使用了，最好把逻辑代码和视图层分离写法。

## 3.前端模板引擎的使用
概念：模板引擎可以让(网站)程序实现界面与数据分离，业务代码与逻辑代码的分离，提升开发效率，良好的设计也提高了代码的复用性。
网站资源：art-template ，mustache ，ejs ，Handlebar.js , jQuery tmpl  ……
** art-template 模板引擎使用 **
1.下载模板引擎js文件放置到项目
![](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220709151406895.png)
2.在html文件内引入JS文件
3.改写JS代码
演示：
3.1 添加模板引擎代码块

```
<!-- 在js上方添加莫版块： id名随意。 type:是固定的表示使用自定义模板-->
<script  id = "tpl-tibody"  type = "text/html" >
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</script>

```
3.2 js文件的语法使用
```
  // 方式三：使用模板引擎
    var tbody = document.querySelector('tbody');
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            // 拿到数据进行解析
            var data = JSON.parse(xhr.responseText);
            // 根据模板名称渲染模板
            // 参数1:模板引擎的id名。参数2数据名
            tbody.innerHTML = template('tpl-tibody', data);

        }
    };
    xhr.open('GET', '/list', true);
    xhr.send();
```
![](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220709152314909.png)
3.3 模板中数据渲染逻辑处理
```
<script id="tpl-tibody" type="text/html">
    {{ each list}}
    <tr>
        <td>{{ $value.username }}</td>
        <td>{{ $value.age }}</td>
        <td>{{ $value.gender }}</td>
    </tr>
    <!-- 代表结束，否则会报错 -->
    {{ /each}} 
</script>
```
### 总结
如何把JSON数据渲染到页面：DOM操作，拼接模板字符串，前端模板引擎，或后面学习的vue，React等框架。
# 发送JSON数据
概念：GET请求不能发送JSON数据，POST请求可以发送JSON数据
POST通过修改请求头信息，进行JSON数据发送，通过setRequestHeader( )方法进行设置。
例如：
	xhr.open('POST','http://localhost/list2',true);
	xhr.serRequestHeader('Content-Type','application/json');
	xhr.send(JSON.stringify({"username":"James","age:30}));
演示：
```
    // post请求发送JSON数据
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log("请求发送")
        }
    };
    xhr.open('POST', '/list2', true);
    xhr.setRequestHeader('Conten-Type','application/json');
    xhr.send(JSON.stringify({"username":"LISA","agqe":"30"}));
```
接口文件不变
### 总结：
发送JSON数据：保证了前后端数据格式的统一，方便其前后端操作，并且可以发送更加复杂的数据结构给后端。

# API接口文档
### 什么是接口文档？
在项目开发中，web项目的前后端是分离开发的。应用程序的开发，需要由前后端工程师共同定义跌口，编写接口文档，之后大家根据这个接口文档进行开发，到项目结束前都要一直维护。
### 编写接口文档
接口文档大概需要编写内容为：接口说明，请求方式，请求URL，请求参数，返回参数等
例如：
https://developers.weixin.qq.com/miniprogram/dev/framework/liveplayer/studio-api.html

# 案例：初始化渲染页面

1. 体育新闻页进行复制。

2. 删减原来页面内容。

   ```
   <header id="sports-header">
           腾讯 | 体育
       </header>
       <div id="loadingDown"></div>
       <main id="sports-main">
           <div>
               <ul class="sports-list">
                   <!-- 待渲染列表 -->
                   <!-- <li>
                       <div class="sports-list-text">
                           <p>詹姆斯一分半钟拿下6分1盖帽 这就是联盟第一人的水准</p>
                           <p><span>50评</span></p>
                       </div>
                       <div class="sports-list-img">
                           <img src="./images/James1.webp" alt="">
                       </div>
                   </li> -->
               </ul>
               <div id="loadingUp"></div>
           </div>
           <div id="loading"></div>
       </main>
   ```

3. 保留模板，页面与逻辑分离( 可用其他渲染方式 )。

   ```
   <script src="./javascripts/template-web.js"></script>
   ```

4. 根据API接口文档编辑代码(前后端同时编写)。

   ```
   var sportsList = document.querySelector('.sports-list');
       // 创建对象
       var xhr = new XMLHttpRequest();
       // 添加onload事件，监听请求是否完成，触发则完成
       xhr.onload = function () {
           // 判断响应的HTTP状态码 是否为200
           if (xhr.status == 200) {
               // 获取响应字符串
               console.log(xhr.responseText);
           }
       }
       // 发送POST请求，路径为list3，异步的
       xhr.open('POST','/list3',true);
       // 请求参数是一个json格式的，需要设置Conten-Type
       xhr.setRequestHeader('Conten-Type','application/json');
       // 发送数据把数据转换为JSON字符串
       xhr.send(JSON.stringify({"page":0,"count":10}));
   ```
   
5. 刷新浏览器，查看控制台状态，返回404“ 没有响应内容”，可以在终端查看返回的数据

   ![](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220711115412652.png)

6. 编写后端内容（错误码）

   ```
   router.post('/list3', async (ctx,next)=>{
     // 编辑错误信息,参数集合
     var args = [
       { field:'page',type:'number'},
       { field:'count',type:'number'}
     ];
     var body = ctx.request.body;
     for(var i = 0;i<args.length;i++){
       var item = args[i];
       // Object.keys获取body的对象的，includes判断是否包含指定的字符串
       // ！取反
       if(!Object.keys(body).includes(item.field)){
         ctx.body = {
           errcode : -1,
           errmsg:'参数个数错误'
         };
         return;
       }
       else{
         // 判断参数类型
         if( typeof body[item.field] != item.type){
           ctx.body = {
             errcode : -2,
             errmsg:'参数类型错误'
           };
           return;
         }
       }
     }
     ctx.body = "ok";
   })
   ```
   
7. 使用json文件渲染数据

   新建data文件夹，把 list.json文件放进来 （注意：这里未操作数据库，json文件内为假数据，写死的数据）

   ![](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220711161138863.png)

   **响应json文件内的数据**

   - 先在接口文件中的顶部定义

     ```
     // node.js 提供的内置模块fs，可以读取文件
     
     const fs = require('fs')
     ```
     
   - 后端获取数据
   
     ```
       // ctx.body = "ok";
      // 字符串类型的数据
       var data = fs.readFileSync('./data/list.json'); //路径都是相对于根路径查找
       // 转换为数据类型的
       data = JSON.parse(data);
       var list = data.splice(body.page * body.count , body.count);
     
       ctx.body = {
         errcode : -0,
         errmsg:'ok',
         list
       }
     ```
     
   - 刷新浏览器，工具栏查看数据
   
     ![](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20220711163127669.png)
     
   - 拿到数据后就渲染到前台
   
     1.1 先写引擎模板
   
     ```
     <script id="tpl-sportsList" type="text/html">
         {{ each list }}
         <li>
             <div class="sports-list-text">
                 <p>
                     {{ $value.title }}
                 </p>
                 <p>
                     <span>{{ $value.comment }}评</span>
                 </p>
             </div>
             <div class="sports-list-img">
                 <img src="{{ $value.img }}" alt="">
             </div>
         </li>
         {{ /each }}
     </script>
     ```
   
     1.2 渲染数据
   
     ```
     // 添加onload事件，监听请求是否完成，触发则完成
         xhr.onload = function () {
             // 判断响应的HTTP状态码 是否为200
             if (xhr.status == 200) {
                 // 获取响应字符串
                 // console.log(xhr.responseText);
                 // 转换为数据格式
                 var data = JSON.parse(xhr.responseText)
                 // 使用模板引擎渲染数据
                 if(data.errcode == 0){
                     sportsList.innerHTML = template('tpl-sportsList',data);
                 }
             }
         }
     ```
   
     
   

# 渲染成功 886

