import React, { useRef, useEffect } from "react";

const DrawBubbles = (context, up) => {
  var firstRand = Math.random() / 10;
  var secondRand = Math.random() / 10;
  var thirdRand = Math.random() / 10;

  context.beginPath();

  if (up > 380) {
    up = 0;
  }

  context.arc(200, 410 - (up + firstRand), 10, 0, 2 * Math.PI, false);
  context.fillStyle = "#BBF8F8";
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = "#ffffff";
  context.stroke();
  context.closePath();

  context.beginPath();
  context.arc(170, 430 - (up + secondRand), 4, 0, 2 * Math.PI, false);
  context.fillStyle = "#BBF8F8";
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = "#ffffff";
  context.stroke();
  context.closePath();

  context.beginPath();
  context.arc(210, 450 - (up + thirdRand), 8, 0, 2 * Math.PI, false);
  context.fillStyle = "#BBF8F8";
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = "#ffffff";
  context.stroke();
  context.closePath();
};

const Porthole = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let requestId;
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 350;
    const context = canvas.getContext("2d");

    var up = 0;
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // This is a background on the whole canvas
      /* context.beginPath();
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath(); */

      // Draw the porthole background
      context.beginPath();
      context.arc(200, 180, 170, 0, 2 * Math.PI, false);
      context.fillStyle = "#001a33";
      context.fill();
      context.closePath();

      DrawBubbles(context, up);
      up += 0.25;
      requestId = window.requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return <canvas className="porthole-canvas" ref={canvasRef} {...props} />;
};

export default Porthole;
