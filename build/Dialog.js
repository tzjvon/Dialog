require('./sass/Dialog.scss');

function noop() {

}

function hasClass(el, cl) {
    return !!(el.className.match(new RegExp('(\\s|^)(' + cl + ')(\\s|$)')));
}
function addClass(el, cl) {
    !hasClass(el, cl) && (el.className += ' ' + cl);
}
function removeClass(el, cl) {
    if (hasClass(el, cl)) {
        var arr = el.className.split(/\s+/);
        arr.splice( arr.indexOf(cl), 1 );
        el.className = arr.join(' ');
    }
}
function addOnceEvent(el, type, fn, bubble) {
    el.addEventListener(type, function () {
        el.removeEventListener(type, arguments.callee);
        typeof fn == 'function' && fn();
    })
}



var mask = document.createElement('div'),
    MBPopup = document.createElement('div');

addClass(mask, 'dialog-mask');
addClass(MBPopup, 'MB-popup');


var popHtml =
    '    <div class="MB-popup-inner">' +
    '        <div class="MB-popup-title">提示</div>' +
    '        <div class="MB-popup-text"></div>' +
    '    </div>' +
    '    <div class="MB-popup-bottons"><span class="MB-popup-button MB-popup-button-bold">确定</span></div>';

var confirmHtml =
    '<div class="MB-popup-inner">' +
    '    <div class="MB-popup-title">提示</div>' +
    '    <div class="MB-popup-text"></div>' +
    '</div>' +
    '<div class="MB-popup-bottons"><span class="MB-popup-button" alt="0">取消</span><span class="MB-popup-button mui-popup-button-bold" alt="1">确定</span></div>';

var isShowMask = false;

var Dialog = {
    showMask: function(bind_fn) {
        if (isShowMask) return;
        isShowMask = true;
        var self = this;
        document.body.appendChild(mask);

        setTimeout(function () {
            addClass(mask, 'active');
        }, 16);

        function bindFun(e) {
            if (typeof bind_fn == 'function') {
                addOnceEvent(mask, 'click', self.hideMask);
                addOnceEvent(mask, 'click', bind_fn);
            }
        }

        setTimeout(bindFun, 416);
    },
    hideMask: function() {
        if (!isShowMask && !hasClass(mask, 'active')) {return;}

        removeClass(mask, 'active');

        setTimeout(function () {
            mask.remove();
            isShowMask = false;
        }, 400);
    },

    hideMBPop: function() {
        if (!hasClass(MBPopup, 'active') && !isShowMask) return false;

        var self = this;

        removeClass(MBPopup, 'active');
        this.hideMask();

        function removeFn() {
            MBPopup.innerHTML = '';
            MBPopup.remove();
        }
        setTimeout(function() {
            removeFn();
        }, 400);

    },

    alert: function(_text, _callBack) {
        if (isShowMask) return;
        var self = this;
        MBPopup.innerHTML = popHtml;

        var tipContent = MBPopup.querySelector('.MB-popup-text'),
            btnSure = MBPopup.querySelector('.MB-popup-button-bold');
        tipContent.innerHTML = _text;
        document.body.appendChild(MBPopup);

        setTimeout(function() {
            addClass(MBPopup, 'active');
        }, 16);

        self.showMask();

        function MBPopupBindFn() {
            addOnceEvent(btnSure, 'click', function() {
                self.hideMBPop();
                if (typeof _callBack == 'function') {
                    _callBack();
                }
            });
        }

        setTimeout(function() {
            MBPopupBindFn();
        }, 416);
    },

    confirm: function(_text, _opts) {
        if (isShowMask) return;
        var self = this;
        MBPopup.innerHTML = confirmHtml;

        var options = {
            'yes': noop,
            'no': noop
        };

        for (var key in _opts) {
            options[key] = _opts[key];
        }

        var tipContent = MBPopup.querySelector('.MB-popup-text'),
            btns = MBPopup.querySelectorAll('.MB-popup-button');

        btns = Array.prototype.slice.call(btns);

        tipContent.innerHTML = _text;
        document.body.appendChild(MBPopup);

        self.showMask();

        setTimeout(function() {
            addClass(MBPopup, 'active');
        }, 16);

        function MBPopupBindFn() {
            btns.forEach(function(el, i) {
                addOnceEvent(el, 'click', function () {
                    self.hideMBPop();
                    switch (i){
                        case 0:{
                            options['no']();
                            break;
                        }
                        case 1:{
                            options['yes']();
                            break;
                        }
                    }
                });
            })
        }

        setTimeout(MBPopupBindFn, 416);
    }
};


module.exports = Dialog;