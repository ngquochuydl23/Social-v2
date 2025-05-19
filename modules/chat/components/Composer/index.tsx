import { useEffect, useRef, useState } from 'react';
import styles from './chatComposer.module.scss';
import ReactTextareaAutosize from "react-textarea-autosize";
import classNames from 'classnames';
import { IcMediaChatComposer } from '@assets/icons';

interface ComposerProps {
  onTyping: () => any;
  onStopTyping: () => any;
  onSendMessage: (message: any) => any;
}
var typingTimer: any;

const Composer: React.FC<ComposerProps> = ({
  onTyping,
  onStopTyping,
  onSendMessage
}) => {
  const [content, setContent] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const [isMaxHeight, setIsMaxHeight] = useState(false);
  const [typing, setTyping] = useState(false);
  const [timer, setTimer] = useState<any>();
  const contentInputRef = useRef(null);
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target))
        setOnFocus(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const onTypingMessage = (e: any) => {
    const { current } = contentInputRef;
    if (contentInputRef && current) {
      console.log((current as any).clientHeight);
    }

    if (!typing) {
      onTyping();
    }
    setTyping(true);
    setContent(e.target.value);
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      setTyping(false);
      onStopTyping();
    }, 1000);

    setTimer(newTimer);
  }

  const onReceiveFiles = () => {

  }

  const SendMediaDialog = () => {
    return null;
  }


  return (
    <div className={styles.composer}>
      <input
        id='chatPickFiles'
        type='file'
        style={{ display: 'none' }} />
      <div
        className={classNames(
          styles.enterComment,
          // onFocus && styles?.isFocus
        )}>
        <button
          onClick={() => {
            document?.getElementById('chatPickFiles')?.click();
          }}>
          <IcMediaChatComposer />
        </button>
        <ReactTextareaAutosize
          ref={contentInputRef}
          value={content}
          onChange={onTypingMessage}
          onFocus={(e) => setOnFocus(true)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage(content);
            }
          }}
          className={styles.enterCommentInput}
          placeholder={"Submit your comment"}
        />
        <IcMediaChatComposer />
        <IcMediaChatComposer />
        <IcMediaChatComposer />
        <button onClick={() => {
          onSendMessage({
            type: 'message',
            content: content
          })
        }}>
          Send
        </button>
      </div>

      <SendMediaDialog />
    </div>
  )
}

export default Composer;
