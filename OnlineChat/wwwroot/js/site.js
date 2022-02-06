$(document).ready(function () {
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/chat")
        .build();

    // получение сообщения от сервера
    hubConnection.on('Receive', function (message) {

        let elem = $("<a>");
        elem.text(message);

        let list = $(".chat_list");
        list.append(elem);

    });
    hubConnection.on('Notify', function (message) {
        document.getElementById("status").innerText = message;
    });

    // отправка сообщения на сервер
    $(".SendMes").click(function(){
        let mes = $("#product").val();
        hubConnection.invoke('NewMessage', mes);
        $("#product").val("");
    });

    hubConnection.start();
});