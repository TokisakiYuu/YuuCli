yuucli
.screen
`
<line>你好，我是有鱼</line>
<line>你是谁呢？<green>(请选择下面其中一个)</green></line>
<line>A.张三</line>
<line>B.李四</line>
`
.line(`你好`)
.line(`我是有鱼`)
.line(`你是谁呢？(请选择下面其中一个)`)
.line(`A.张三`)
.line(`B.李四`)
.data({

})
.keypress("up", () => {
    this.data
});