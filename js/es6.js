function sleep(msg='',timer=1000){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(msg)
        },timer)
    })
}

sleep('哈哈').then((msg)=>{
    console.log(1,msg)
    return sleep(`${msg}取到了`,2000)
}).then((data)=>{
    console.log(2,data)
})