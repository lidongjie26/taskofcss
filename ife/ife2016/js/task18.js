/**
 * Created by Administrator on 2016/10/1.
 */
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        },
        getEvent: function (event) {
            return event ? event : window.event;
        },
        getTarget: function (event) {
            return event.target || event.srcElement;
        }
    };
    var value ;
    var wrap = document.getElementsByClassName('content')[0];
    var newDiv;
    var body = document.body;
    EventUtil.addHandler(body, 'click', function (event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        switch (target.className) {
            case 'insertLeft':
                newDiv = document.createElement('div');
                newDiv.className = 'item';
                value = document.getElementsByClassName('textBox')[0].value;
                newDiv.innerHTML = '<p>' + value + '</p>';
                wrap.insertBefore(newDiv, wrap.firstChild);
                document.getElementsByClassName('textBox')[0].value='';
                document.getElementsByClassName('textBox')[0].focus();
                break;
            case 'insertRight':
                newDiv = document.createElement('div');
                newDiv.className = 'item';
                value = document.getElementsByClassName('textBox')[0].value;
                newDiv.innerHTML = '<p>' + value + '</p>';
                wrap.appendChild(newDiv);
                document.getElementsByClassName('textBox')[0].value=null;
                document.getElementsByClassName('textBox')[0].focus();
                break;
            case 'pushLeft':
                var firstChild=wrap.removeChild(wrap.firstChild);
                alert(firstChild.firstChild.innerHTML);
                break;
            case 'pushRight':
                var lastChild=wrap.removeChild(wrap.lastChild);
                alert(lastChild.firstChild.innerHTML);
                break;
            case 'item':
                wrap.removeChild(target);
                break;
        }
    });


