$(document).ready(function () {
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/chat")
        .build();

    // получение сообщения от сервера
    hubConnection.on('Receive', function (message, key) {
        let common = false;
        let myKey = $("#MyKey").val();
        if ((myKey == "" || myKey == "0") && key == "0") {
            common = true;
        }
        if (myKey == key || common) {


            let elem = $("<a>");
            elem.addClass('message');
            elem.text(message);

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
        if (myKey == "") {
            hubConnection.invoke('NewMessage', mes, "0");
        } else {
            hubConnection.invoke('NewMessage', mes, $("#MyKey").val());
        }

        $("#product").val("");
    }






hubConnection.start();
});