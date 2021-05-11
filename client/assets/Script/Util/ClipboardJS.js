module.exports = {
  Copy: function (str) {
    console.log('复制');
    var textToClipboard = str; //文本到剪贴板

    var success = false;

    if (window.clipboardData) {
      // 浏览器
      window.clipboardData.setData("Text", textToClipboard);
      success = true;
    } else {
      var input = str + '';
      var el = document.createElement('textarea');
      el.value = input;
      el.setAttribute('readonly', '');
      el.style.contain = 'strict';
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      el.style.fontSize = '12pt'; // Prevent zooming on iOS

      var selection = getSelection();
      var originalRange = false;

      if (selection.rangeCount > 0) {
        originalRange = selection.getRangeAt(0);
      }

      document.body.appendChild(el);
      el.select();
      el.selectionStart = 0;
      el.selectionEnd = input.length;

      try {
        success = document.execCommand('copy', false);
      } catch (err) {
        console.error("ClipboardJS err " + err);
      }

      document.body.removeChild(el);

      if (originalRange) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
      } // var forExecElement = CreateElementForExecCommand (textToClipboard);
      // SelectContent (forExecElement);
      // try {
      //     if (window.netscape && netscape.security) {
      //         netscape.security.PrivilegeManager.enablePrivilege ("UniversalXPConnect");
      //     }
      //     //将选定内容复制到剪贴板
      //     success = document.execCommand ("copy", false, null);
      // }
      // catch (e) {
      //     success = false;
      // }
      // //移除临时元素
      // document.body.removeChild (forExecElement);

    } // return success;


    return true;
  },
}