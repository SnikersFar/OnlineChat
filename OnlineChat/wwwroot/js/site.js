$(document).ready(function () {
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/chat")
        .build();

    // получение сообщения от сервера
    hubConnection.on('Receive', function (message, key, name) {
        if (name == "") {
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
            $(".chat_list").animate({ scrollTop: topPosition }, 300);
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
        if (myKey == "") {
            hubConnection.invoke('NewMessage', mes, "0", myNick);
        } else {
            hubConnection.invoke('NewMessage', mes, $("#MyKey").val(), $("#MyNick").val() );
        }

        $("#product").val("");
    }






    hubConnection.start();
});