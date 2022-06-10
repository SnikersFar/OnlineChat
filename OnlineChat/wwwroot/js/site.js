$(document).ready(function () {
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/chat")
        .build();

    // получение сообщения от сервера
    hubConnection.on('Receive', function (message, key, name) {
        name = name.replace(/\s+/g, ' ');
        if (name == "" || name == " ") {
            name = "Unknown_User";
        }
        let common = false;
        let myKey = $("#MyKey").val();
        if ((myKey == "" || myKey == "0") && key == "0") {
            common = true;
        }
        if (myKey == key || common) {


            let elem = $("<a>");
            let NameElem = $("<a>");

            elem.addClass('message');
            NameElem.css("color", '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase());

            NameElem.text(name + ": ");
            elem.append(NameElem);
            elem.append(message);


            let list = $(".chat_list");
            list.append(elem);

            const topPosition = $(".message:last").position().top;
            $(".chat_list").animate({ scrollTop: $(document).height() * $(document).height() * $(document).height() }, 300);
        }

    });
    hubConnection.on('Notify', function (message) {
        document.getElementById("status").innerText = message;
    });

    // отправка сообщения на сервер
    $(".ImgSend").click(sendMes);

    $(document).keydown(function (e) {
        if (e.key == "Enter" || e.keyCode == 13) {
            sendMes();
        }
    });

    function sendMes() {
        let mes = $("#product").val();
        let myKey = $("#MyKey").val();
        let myNick = $("#MyNick").val();
        mes = mes.replace(/\s+/g, ' ');
        if (mes == "" || mes == " ") { }
        else {

            if (myKey == "") {
                hubConnection.invoke('NewMessage', mes, "0", myNick);
            } else {
                hubConnection.invoke('NewMessage', mes, $("#MyKey").val(), $("#MyNick").val());
            }
        }

        $("#product").val("");
    }


    // scrolling change height chat
    //var p = $(".pan1");
    //var d = $(".pan2");
    //var r = $("#resize");
    //var curr_height = p.height()
    //var unlock = false;
    //var linkedMouse = 0;
    //var heightMover = 1;
    //$(document).mousemove(function (e) {
    //    var WindowHeight = window.innerHeight * 0.8;
    //    /*   var change = curr_height + (e.clientY - curr_height);*/
    //    var myHeight = r.css("height").replace("px", '');

    //    console.log("Screen Y: " + window.innerHeight);
    //    console.log("Height Mover: " + heightMover);
    //    console.log("linkedMouse: " + linkedMouse);
    //    console.log("Height: " + myHeight);

    //    if (unlock) {
    //        if (myHeight < WindowHeight) {
    //            heightMover = heightMover + (e.clientY - linkedMouse)*0.05;
    //            $("#debug").text(e.clientX + " resize");
    //            p.css("height", heightMover);
    //            //d.css("margin-left", change);
    //        }
    //        else {

    //        }

    //    }
    //    if (r.css("height").replace("px", '') >= WindowHeight) {
    //        let myheight = WindowHeight - 10;
    //        r.css("height", myheight);

    //    }
    //    if (r.css("height").replace("px", '') <= 200) {
    //        r.css("height", 201);
    //    }
    //});
    //r.mousedown(function (e) {
    //    curr_width = p.width();
    //    linkedMouse = e.clientY;
    //    unlock = true;
    //    r.css("background-color", "rgba(0, 0, 0, 0.2)");
    //});
    //$(document).mousedown(function (e) {
    //    if (unlock) {
    //        e.preventDefault();
    //    }
    //});
    //$(document).mouseup(function (e) {
    //    unlock = false;
    //    $("#debug").text("");
    //    r.css("background-color", "rgba(0, 0, 0, 0.1)");
    //});
    var p = $(".pan1");
    var d = $(".pan2");
    var r = $("#resize");

    var cur_height = p.height()
    var unlock = false;
    var linked_heightMouse;
    $(document).mousemove(function (e) {

        var change = cur_height + (e.clientY - linked_heightMouse);

        //console.log("p.height(): " + p.height());
        //console.log("e.clientY: " + e.clientY);
        //console.log("cur_height: " + cur_height);
        //console.log("linked_heightMouse: " + linked_heightMouse);
        //console.log("window.innerHeight: " + window.innerHeight);

        if (unlock) {

            $("#debug").text(e.clientX + " resize");
            p.css("height", change);
        }
        if (p.height >= window.innerHeight) {
            p.height = window.innerHeight;
        }
    });

    $(window).resize(function () {
        if (p.height >= window.innerHeight) {
            p.height = window.innerHeight;
        }
    });

    r.mousedown(function (e) {
        linked_heightMouse = e.clientY;
        cur_height = p.height();
        unlock = true;
    });

    $(document).mousedown(function (e) {
        if (unlock) {
            e.preventDefault();
        }
    });

    $(document).mouseup(function (e) {
        unlock = false;
        $("#debug").text("");
    });


    hubConnection.start();
});