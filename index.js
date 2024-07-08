// 下载blob文件接口
/**
 * @param {blob} data 二进制文件 
 * @param {string} fileName 文件名
 */
export function downloadFile(data, fileName = '下载文件') {
  const blob = new Blob([data]);
  var aEl = document.createElement("a");
  aEl.href = URL.createObjectURL(blob);
  aEl.download = fileName;
  aEl.style.display = "none";
  document.body.appendChild(aEl);
  aEl.click();
  aEl.remove();
  window.URL.revokeObjectURL(aEl.href)
}

// 复制文本到剪切板
// navigator.clipboard.writeText() 必须在用户交互的上下文中调用，比如在按钮点击事件处理器中。这是因为出于安全和隐私考虑，浏览器不允许脚本在没有用户触发的情况下读取或写入剪贴板。
//若点击复制后，调用接口获取数据，然后才复制到剪切板会无效。必须点击时里面调用复制这段代码，才能生效 (实测，chrome没这个限制，点了之后等1分钟再到剪切板没问题)
/**
 * @param {string} text 
 * @param {function} sucFuc 
 * @param {function} failFuc 
 */
export async function copyToClipboard(text, sucFuc, failFuc) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      sucFuc && sucFuc()
    } catch (err) {
      failFuc && failFuc(err)
    }
  } else {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    // 它可以用来选中文本框中的特定文本范围，然后通过 execCommand('copy') 将选定的文本复制到剪贴板。
    dummy.setSelectionRange(0, text.length) //兼容苹果
    try {
      if (document.execCommand('copy')) {
        sucFuc && sucFuc()
      } else {
        failFuc && failFuc('复制失败')
      }
    } catch (err) {
      failFuc && failFuc(err)
    }
    document.body.removeChild(dummy);
  }
}

/**
 * @param {function} fn 传入要作节流处理的函数
 * @param {number} wait 节流时间
 * @returns {function} 返回节流后的函数
 */
export function throttle(fn, wait = 2000) {
  let pre = 0;
  return function () {
    let now = Date.now();
    if (now - pre >= wait) {
      fn.apply(this, arguments);
      pre = Date.now();
    }
  };
}

export function debounce(fn, delay = 200) {
  let timer = null
  // 原始函数的参数args
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }

  return _debounce
}

/**
 * @param {number} size 
 * @returns {string} 文件大小字符串
 */
export function sizeTostr(size) {
  var data = "";
  if (size < 0.1 * 1024) {
    //如果小于0.1KB转化成B
    data = size.toFixed(2) + "B";
  } else if (size < 0.1 * 1024 * 1024) {
    //如果小于0.1MB转化成KB
    data = (size / 1024).toFixed(2) + "KB";
  } else if (size < 0.1 * 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    data = (size / (1024 * 1024)).toFixed(2) + "MB";
  }
  var sizestr = data + "";
  var len = sizestr.indexOf(".");
  var dec = sizestr.substr(len + 1, 2);
  if (dec == "00") {
    //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}

// 把树平铺
/**
 * @param {Object[]} array 
 * @returns {Object[]} array 把树平铺后的数组
 */
export function flatTreeArray(array) {
  let flatArray = [];
  circlePick(array, flatArray);
  return flatArray;
}

function circlePick(inArry, outArry) {
  inArry.forEach((el) => {
    if (el.child?.length > 0) {
      circlePick(el.child, outArry);
    } else {
      outArry.push(el);
    }
  });
}

// 从标签树的列表里 把点击项id对应的树抽出来
// 本项目里 是list含有多个tree
/**
 * @param {string|number} id 待查找树的叶子id
 * @param {Object[]} list 树的列表
 * @returns {object} 叶子带枝的对象
 */
export function baseIdFindTree(id, list) {
  let obj = null
  let totalList = JSON.parse(JSON.stringify(list))
  totalList.forEach((tree) => {
    // 数组每一项是 个人标签 / 企业标签 的树
    const result = findParentTree(tree, id)
    if (result) {
      obj = result
    }
  })
  return obj
}

function findParentTree(tree, targetId) {
  function search(node, targetId) {
    if (node.id === targetId) {
      return node
    }
    if (node.child) {
      for (let child of node.child) {
        let result = search(child, targetId)
        if (result) {
          // child找到了目标值，就把child里的其它兄弟节点删了
          node.child = node.child.filter((el) => el.id === result.id)
          return node
        }
      }
    }
    return null
  }
  return search(tree, targetId)
}

// 搜索关键字，把对应的枝干从树里过滤出来 
// 若树只有一个根，格式化[tree]
/**
 * @param {string} value 关键字
 * @param {Object[]} arr 树列表
 * @returns {Object[]} arr 过滤后的树列表
 */
export function rebuildTree(value, arr) {
  if (!arr) {
    return []
  }
  let newarr = []
  arr.forEach((el) => {
    const keyReg = new RegExp(value, 'i')
    const dot = rebuildTree(value, el.child)
    if (keyReg.test(el.name)) {
      // 最后一层节点 匹配到关键字，push进去
      if (dot.length === 0 && el.child.length === 0) {
        const obj = {
          ...el,
          child: dot,
        };
        newarr.push(obj);
      }
    }
    // 后代有匹配到的，该树留着
    if (dot.length > 0) {
      const obj = {
        ...el,
        child: dot,
      };
      newarr.push(obj);
    }
  })
  return newarr
}