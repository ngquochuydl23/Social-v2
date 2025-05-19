import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./cover.module.scss";

interface CoverProps {
  cover?: string | null;
  onClick: () => any;
}

const Cover: React.FC<CoverProps> = ({ cover, onClick }) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!Boolean(cover)) {
      setError(true);
    }
  }, [cover]);

  return (
    <div
      className={classNames(styles.coverContain, error && styles.onErrorCover)}
    >
      {!error && (
        <Image
          onError={() => setError(true)}
          src={Boolean(cover) ? cover : ""}
          fill
          alt="cover"
        />
      )}
    </div>
  );
};

export default Cover;
