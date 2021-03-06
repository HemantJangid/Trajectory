import React, { useRef } from "react";
import { BallMovement } from "./ballmovement";

const Trajectory = (props) => {
  const canvasRef = useRef(null);
  let canvas;
  let ctx;
  const ballObj = {
    x: 0,
    y: props.height * 50,
    dx: (props.calcDrift() * 5) / props.height,
    dy: -5,
    rad: 2,
    speed: 10,
  };

  const plotTrajectory = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    const render = () => {
      BallMovement(ctx, ballObj);

      if (ballObj.y <= 0) {
        ballObj.dy = 0;
        ballObj.dx = 0;
      }

      requestAnimationFrame(render);
    };
    render();
  };


  return (
    <div>
      <canvas
        ref={canvasRef}
        height={props.height * 50}
        width="800"
        id="canvas"
      ></canvas>
      <div>
        <button
          className="submitButton"
          onClick={() => {
            props.calcDrift();
            props.calcTotalTime();
            plotTrajectory();
          }}
        >
          Plot Trajectory
        </button>
        <button
          className="submitButton"
          onClick={() => {
            canvas = canvasRef.current;
            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Trajectory;
