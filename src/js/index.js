require('../css/base.less')
require('../css/page_index.less')
require("expose-loader?$!jquery")
function sleep(msg='',timer=1000){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(msg)
        },timer)
    })
}

sleep('webpack').then((msg)=>{
    console.log(1,msg)
    return sleep(`打包`,2000)
}).then((data)=>{
    console.log(2,data)
})
console.log(111,$(".copyright")[0]) //使用jquery