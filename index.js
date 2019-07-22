var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var _ = require('underscore')

io.on('connection', function(socket){
  // console.log('a user connected');

  // 注册一个socket 并给一个唯一标记
  socket.on('registry', function(user){
    socket.name = user.userId;
  });

  socket.on('playWith',function(user){
    const users = Object.values(io.sockets.sockets);
    const list = users.filter(u => u.name != user.userId);
    const { floor, random } = Math;
    // 随机找一个对手
    const to = list[floor(random() * list.length)];
    if(to){
      const val = [-1,1][floor(random() * 2)];
      to.emit('from',{userId:user.userId,role:val});
      socket.emit('from',{userId:to.name,role:-val})
    }
    
  })

  socket.on('move', function(data){
    // 找到对手并将数据发给他
    const users = Object.values(io.sockets.sockets);
    const to = _.findWhere(users,{name:data.toId})
    if(to)
      to.emit('move',data)
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});