import { IcEmoji, IcImageComment, IcSendMessageActive, IcSendMessageDisable } from "@assets/icons";
import { AvatarWithoutStory } from "@components/Avatar";
import classNames from "classnames";
import { useSession } from "context/SessionHook";
import { useEffect, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { createComment } from "services/CommentService";
import { uploadMedia } from "services/UploadService";
import styles from './commentComposer.module.scss'
import { CommentDto } from "services/CommentService/dtos";
import { Subject } from "rxjs";

export const composerReply = new Subject<CommentDto>();

const CommentComposer = ({ feedId, onNewComment, idView }: { feedId?: number, onNewComment: (data: CommentDto) => any; idView?: any }) => {
  const contentInputRef = useRef(null);
  const { session } = useSession();
  const [onFocus, setOnFocus] = useState(false);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<any>(null);

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

  const onReceiveMedia = (event: any) => {
    const file = event.target.files[0];
    if (Boolean(file)) {
      setOnFocus(true);
      setFile(file);
    }
  };

  const _createComment = (mediaUrl?: string | null) => {
    createComment(feedId!, null, { mediaUrl: mediaUrl, content: content })
      .then((res) => console.log(res.result))
      .catch((err) => console.log(err))
      .finally(() => {

      })
  }

  const sendComment = () => {
    if (content !== "" || file !== null) {
      onNewComment({
        creator: {
          ...session?.user!,
          fullName: session?.user.fullname,
        },
        owned: true,
        content: content,
        mediaUrl: file ? URL.createObjectURL(file) : undefined,
      });

      if (contentInputRef.current)
        (contentInputRef.current as any).blur();

      setOnFocus(false);
      setContent("");
      setFile(null);
      if (file !== null) {
        uploadMedia(file)
          .then((res) => _createComment(res.result?.medias[0].url))
          .catch((err) => console.log(err));
      } else _createComment(null);
    }
  };

  const onReplyClick = (comment: CommentDto) => {
    if (comment.feedId === feedId) {
      if (comment.creator?.fullName && !content.includes(comment.creator?.fullName)) {
        setContent(`@"${comment.creator?.fullName}" ` + content);
      }
      setOnFocus(true);
      (contentInputRef.current as any)?.focus();
    }
  }

  composerReply.subscribe({ next: onReplyClick });

  return (
    <div
      className={styles.enterComment}
      ref={ref}>
      <AvatarWithoutStory
        imageClassName={styles.avatar}
        fullName={session?.user?.fullname}
        url={session?.user?.avatar}
        onClick={() => { }} />
      <div
        className={classNames(
          styles.enterComment,
          onFocus && styles?.isFocus
        )}>
        <ReactTextareaAutosize
          ref={contentInputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={(e) => setOnFocus(true)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendComment();
            }
          }}
          className={styles.enterCommentInput}
          placeholder={"Submit your comment"}
        />
        {file && (
          <div className={styles.mediaContain}>
            <img className={styles.media} src={URL.createObjectURL(file)} />
          </div>
        )}
        {onFocus ? (
          <div className={styles.mediaMenu}>
            <div className={styles.mediaWrap}>
              <div className={styles.button} onClick={() => { }}>
                <IcEmoji width={20} height={20} />
              </div>
              <div
                className={styles.button}
                onClick={() => document?.getElementById("pickMedia" + idView)?.click()}>
                <IcImageComment width={20} height={20} />
              </div>
            </div>
            <div
              className={classNames(
                styles.sendButton,
                (content !== "" || file !== null) && styles.enable
              )}
              onClick={() => sendComment()}>
              {content === "" && file == null
                ? <IcSendMessageDisable width={22} height={19} />
                : <IcSendMessageActive width={22} height={19} />
              }
            </div>
          </div>
        ) : <IcEmoji width={24} height={24} />}
      </div>
      <input
        id={"pickMedia" + idView}
        type="file"
        accept="image/*"
        onChange={onReceiveMedia}
      />
    </div>
  );
};

export default CommentComposer;