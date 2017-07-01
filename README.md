

```
Dialog.showMask(fn)
// fn遮罩完全显示后绑定的点击所触发的函数，也可以不传参数，默认不触发

Dialog.hideMask()
// 隐藏遮罩（没有参数）

Dialog.alert(content, callback)
/** 
* content 传入弹框提示的内容
* callback 点击确认按钮之后的回调函数（可选）
**/

Dialog.confirm(content, _opts)
/**
* content 为传入弹框提示的内容
* _opts['no'] 为点击取消按钮的回调函数（可选）
* _opts['yes'] 为点击确认按钮的回调函数（可选）
**/
```