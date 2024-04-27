'use client'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

 const socket = io('http://localhost:3000'); // Replace with your server URL

const WebSocketProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
      function onConnect() {
        setIsConnected(true);
      }
      function onDisconnect() {
        setIsConnected(false);
      }
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('joinRoom', ()=>console.log('joined room'));
      socket.on('notification', (message)=>alert(message));
  
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('joinRoom');
        socket.off('notification');
      };

      }, []);

      function connect() {
        socket.connect();
      }
    
      function disconnect() {
        socket.disconnect();
      }

      const emitEventToServer = () => {
        // socket.emit('joinRoom', {schoolId: "test"});
        socket.emit('hello', 'Hey');
        console.log('test')
      };
      console.log(isConnected)

  return (
    <div>
      <div className='flex gap-4'>
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
      <button onClick={emitEventToServer}>Emit</button>
      </div>
      {children}
    </div>
  )
}

export default WebSocketProvider
