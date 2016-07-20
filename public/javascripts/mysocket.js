var socket = io.connect('http://localhost');
socket.on('wow', function (data) {
  console.log(data.hello);
});
