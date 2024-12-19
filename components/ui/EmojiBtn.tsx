"use client";

import EmojiPicker, {Emoji} from "emoji-picker-react";
import {useTheme} from "next-themes";
import {MouseEvent, useEffect, useRef, useState} from "react";

export default function EmojiBtn({defaultEmoji, setNewData}: {defaultEmoji?: string; setNewData: any}) {
  const {theme} = useTheme();
  const [emoji, setEmoji] = useState(defaultEmoji);
  const [open, setOpen] = useState(false);
  const emojiRef = useRef<any>(null);

  const close = (e: PointerEvent) => {
    if (!emojiRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
    };
  }, []);
  return (
    <div className="relative w-10 emoji-select-card">
      <div
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Emoji unified={emoji || "1f4b3"} />
      </div>
      <div ref={emojiRef}>
        <EmojiPicker
          onEmojiClick={(e) => {
            setOpen(false);
            setEmoji(e.unified);
            setNewData((prev: any) => ({...prev, icon: e.unified}));
          }}
          open={open}
          //@ts-ignore
          theme={theme}
          className="absolute"
          width={300}
          height={400}
        />
      </div>
    </div>
  );
}
