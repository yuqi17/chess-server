# chess-server
- socket.io 通过 connection 和 disconnection 来监听socket 点链接情况.
- 在connection 内部 则是进一步监听客户端发来点socket.并用emit 与客户端进行通信.
- 所有socket 会放在一个叫io.sockets.sockets点对象map 中.
