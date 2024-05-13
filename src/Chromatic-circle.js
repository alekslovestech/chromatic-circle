import React, { useRef, useEffect, useState, createContext } from "react";

import { notes, isBlackKey } from "./chromatic-utils.js";

import { Constants, CircleMath } from "./circle-math.js";

let audioBuffer = null; // This will hold the loaded buffer

const ChromaticCircle = () => {
  const canvasRef = useRef(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const loadAudio = async (url) => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    console.log(arrayBuffer);
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  };

  window.onload = async () => {
    try {
      audioBuffer = await loadAudio("/piano-shot.wav");

      console.log("Audio loaded successfully");
    } catch (error) {
      console.error("Failed to load sound:", error);
      throw error;
    }
  };

  useEffect(() => {
    const HandleCanvasClick = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const [pureX, pureY] = CircleMath.ViewportToCartesian(
        event.clientX,
        event.clientY,
        rect
      );

      const [radius, angle] = CircleMath.CartesianToCircular(pureX, pureY);

      const angleInDegrees = CircleMath.ToDegrees(angle);
      console.log(
        `radius=${Math.round(radius)}; angle (deg)=${angleInDegrees}`
      );

      const index = CircleMath.AngleToNoteIndex(angle);
      setSelectedNoteIndex(index);
      if (CircleMath.IsRadiusInRange(radius)) {
        playSound(index);
      }
      return;
    };

    function playSound(index) {
      const playbackRate = CircleMath.GetMultiplierFromIndex(index);

      var source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = playbackRate;
      source.connect(audioContext.destination);
      source.start(0);
    }

    const canvas = canvasRef.current;
    canvas.addEventListener("click", HandleCanvasClick);

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const drawText = (noteText, index) => {
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "blue";

      const innerRadius = CircleMath.getInnerRadius(index);
      const outerRadius = CircleMath.getOuterRadius(index);

      const radius = (outerRadius + innerRadius) / 2;

      ctx.save();
      ctx.translate(Constants.centerX, Constants.centerY);
      ctx.rotate(
        index * Constants.FULL_KEY_ANGLE + Constants.FULL_KEY_ANGLE / 2
      );
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(noteText, 0, -radius);
      ctx.restore();
    };

    const DrawWedge = (index) => {
      ctx.beginPath();
      const isBlack = isBlackKey(index);
      const isSelected = selectedNoteIndex === index;

      let keyColor = CircleMath.GetKeyColor(isBlack, isSelected);

      const startAngle = CircleMath.NoteIndexToLeftAngle(index);
      const endAngle = startAngle + Constants.FULL_KEY_ANGLE;

      const innerRadius = CircleMath.getInnerRadius(index);
      const outerRadius = CircleMath.getOuterRadius(index);
      ctx.arc(
        Constants.centerX,
        Constants.centerY,
        outerRadius,
        startAngle,
        endAngle
      );
      ctx.arc(
        Constants.centerX,
        Constants.centerY,
        innerRadius,
        endAngle,
        startAngle,
        true
      );
      ctx.closePath();
      ctx.fillStyle = keyColor;
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
      return <canvas />;
    };

    notes.forEach((note, index) => {
      DrawWedge(index);
      drawText(note, index);
    });
  }, [selectedNoteIndex, audioContext]);

  return (
    <canvas
      ref={canvasRef}
      width={2 * Constants.CANVAS_RADIUS}
      height={2 * Constants.CANVAS_RADIUS}
    />
  );
};

export default ChromaticCircle;
