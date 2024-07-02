import React, { useEffect, useRef } from "react";
import { Vex } from "vexflow";

const NotesRenderer: React.FC = () => {
  const divRef = useRef(null);

  useEffect(() => {
    if (!divRef.current) return;

    let curDivRef = divRef.current as HTMLElement;
    curDivRef.innerHTML = "";

    const VF = Vex.Flow;
    const renderer = new VF.Renderer(divRef.current, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 200);
    const context = renderer.getContext();

    // Create a stave at position 10, 40 of width 400 on the canvas.
    const stave = new VF.Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Create notes
    const notes = [
      new VF.StaveNote({ keys: ["c/4"], duration: "q" }),
      new VF.StaveNote({ keys: ["d/4"], duration: "q" }),
      new VF.StaveNote({ keys: ["e/4"], duration: "q" }),
      new VF.StaveNote({ keys: ["f/4"], duration: "q" }),
    ];

    // Create a voice in 4/4
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    const formatter = new VF.Formatter()
      .joinVoices([voice])
      .format([voice], 400);

    // Render voice
    voice.draw(context, stave);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return <div ref={divRef} />;
};

export default NotesRenderer;
