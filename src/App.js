import React, { useRef, useState } from "react";
import Trajectory from "./trajectory";

function App() {
  function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }
  const [values, setValues] = useState({
    vr: 1,
    vm: 2,
    rw: 3,
    angle: 90,
  });

  const [totalTime, setTotalTime] = useState(0);
  const [drift, setDrift] = useState(0);

  function calcTotalTime() {
    let time =
      values.rw / (values.vm * Math.sin(degrees_to_radians(values.angle)));
    setTotalTime(time);
    return time;
  }

  function calcDrift() {
    let drift =
      ((values.vm * Math.cos(degrees_to_radians(values.angle)) + values.vr) *
        values.rw) /
      (values.vm * Math.sin(degrees_to_radians(values.angle)));
    setDrift(drift);
    return drift;
  }

  return (
    <div className="container">
      <div className="left">
        <h1 style={{ marginBottom: "50px" }}>Visualizer</h1>
        <div className="controls-container">
          <div className="controls">
            <p>River's Velocity(m/s)</p>
            <div className="control">
              <button
                onClick={() =>
                  setValues({
                    ...values,
                    vr: values.vr === 1 ? values.vr : values.vr - 1,
                  })
                }
              >
                -
              </button>{" "}
              <h4>{values.vr}</h4>{" "}
              <button
                onClick={() => setValues({ ...values, vr: values.vr + 1 })}
              >
                +
              </button>
            </div>
          </div>
          <div className="controls">
            <p>Man's Velocity(m/s)</p>
            <div className="control">
              <button
                onClick={() =>
                  setValues({
                    ...values,
                    vm: values.vm === 1 ? values.vm : values.vm - 1,
                  })
                }
              >
                -
              </button>{" "}
              <h4>{values.vm}</h4>{" "}
              <button
                onClick={() => setValues({ ...values, vm: values.vm + 1 })}
              >
                +
              </button>
            </div>
          </div>
          <div className="controls">
            <p>Jump Angle(degrees)</p>
            <div className="control">
              <button
                onClick={() =>
                  setValues({
                    ...values,
                    angle: values.angle === 1 ? values.angle : values.angle - 1,
                  })
                }
              >
                -
              </button>{" "}
              <h4>{values.angle}</h4>{" "}
              <button
                onClick={() =>
                  setValues({
                    ...values,
                    angle:
                      values.angle === 90 ? values.angle : values.angle + 1,
                  })
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="controls">
            <p>Width of river(m)</p>
            <div className="control">
              <button
                onClick={() =>
                  setValues({
                    ...values,
                    rw: values.rw === 1 ? values.rw : values.rw - 1,
                  })
                }
              >
                -
              </button>{" "}
              <h4>{values.rw}</h4>{" "}
              <button
                onClick={() =>
                  setValues({
                    ...values,
                    rw: values.rw >= 11 ? values.rw : values.rw + 1,
                  })
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="controls">
            <p>Total time taken (s)</p>
            <div className="control">
              <h1>{totalTime}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <Trajectory
          height={values.rw}
          calcDrift={calcDrift}
          calcTotalTime={calcTotalTime}
        />
      </div>
    </div>
  );
}

export default App;
