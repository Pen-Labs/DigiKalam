import React, { useRef, useEffect, useState } from 'react';

const App = () => {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {

    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);            // To support the increased screen density
    context.lineCap = "round";      // For rounded strokes
    context.strokeStyle = "black";  // Color of the strokes
    context.lineWidth = 5;          // Size of the stroke

    contextRef.current = context;
  }, []);

  const startDrawing = ({nativeEvent}) => {
    
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  const endDrawing = () => {
    
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw = ({nativeEvent}) => {
    
    if(!isDrawing) return;

    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }

  return (
    <canvas 
      onMouseDown = {startDrawing}
      onMouseUp = {endDrawing}
      onMouseMove = {draw}
      ref = {canvasRef}
    />
  );
}

export default App;
