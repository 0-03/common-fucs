# 工具函数库

> 方法里用 jsdoc 进行注释，运行下面两条命令，在控制台生成 md 格式的注释输出
> `npm i jsdoc-to-markdown` > `jsdoc2md example.js`

## Functions

<dl>
<dt><a href="#downloadFile">downloadFile(data, fileName)</a></dt>
<dd></dd>
<dt><a href="#copyToClipboard">copyToClipboard(text, sucFuc, failFuc)</a></dt>
<dd></dd>
<dt><a href="#throttle">throttle(fn, wait)</a> ⇒ <code>function</code></dt>
<dd></dd>
<dt><a href="#sizeTostr">sizeTostr(size)</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#flatTreeArray">flatTreeArray(array)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
<dt><a href="#baseIdFindTree">baseIdFindTree(id, list)</a> ⇒ <code>object</code></dt>
<dd></dd>
<dt><a href="#rebuildTree">rebuildTree(value, arr)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd></dd>
</dl>

<a name="downloadFile"></a>

## downloadFile(data, fileName)

**Kind**: global function

| Param    | Type                | Description |
| -------- | ------------------- | ----------- |
| data     | <code>blob</code>   | 二进制文件  |
| fileName | <code>string</code> | 文件名      |

<a name="copyToClipboard"></a>

## copyToClipboard(text, sucFuc, failFuc)

**Kind**: global function

| Param   | Type                  |
| ------- | --------------------- |
| text    | <code>string</code>   |
| sucFuc  | <code>function</code> |
| failFuc | <code>function</code> |

<a name="throttle"></a>

## throttle(fn, wait) ⇒ <code>function</code>

**Kind**: global function
**Returns**: <code>function</code> - 返回节流后的函数

| Param | Type                  | Description            |
| ----- | --------------------- | ---------------------- |
| fn    | <code>function</code> | 传入要作节流处理的函数 |
| wait  | <code>number</code>   | 节流时间               |

<a name="sizeTostr"></a>

## sizeTostr(size) ⇒ <code>string</code>

**Kind**: global function
**Returns**: <code>string</code> - 文件大小字符串

| Param | Type                |
| ----- | ------------------- |
| size  | <code>number</code> |

<a name="flatTreeArray"></a>

## flatTreeArray(array) ⇒ <code>Array.&lt;Object&gt;</code>

**Kind**: global function
**Returns**: <code>Array.&lt;Object&gt;</code> - array 把树平铺后的数组

| Param | Type                              |
| ----- | --------------------------------- |
| array | <code>Array.&lt;Object&gt;</code> |

<a name="baseIdFindTree"></a>

## baseIdFindTree(id, list) ⇒ <code>object</code>

**Kind**: global function
**Returns**: <code>object</code> - 叶子带枝的对象

| Param | Type                                       | Description       |
| ----- | ------------------------------------------ | ----------------- |
| id    | <code>string</code> \| <code>number</code> | 待查找树的叶子 id |
| list  | <code>Array.&lt;Object&gt;</code>          | 树的列表          |

<a name="rebuildTree"></a>

## rebuildTree(value, arr) ⇒ <code>Array.&lt;Object&gt;</code>

**Kind**: global function
**Returns**: <code>Array.&lt;Object&gt;</code> - arr 过滤后的树列表

| Param | Type                              | Description |
| ----- | --------------------------------- | ----------- |
| value | <code>string</code>               | 关键字      |
| arr   | <code>Array.&lt;Object&gt;</code> | 树列表      |
