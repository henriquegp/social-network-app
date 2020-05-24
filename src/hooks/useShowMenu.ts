/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';

function useShowMenu(): [
  React.MutableRefObject<any>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
  ] {
  const blockRef = useRef<any>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handle = ({ target }: MouseEvent) => {
      const cp = blockRef.current;
      if (cp !== target && !cp?.contains(target)) {
        setShow(false);
      }
    };
    document.addEventListener('click', handle);

    return () => document.removeEventListener('click', handle);
  }, []);

  return [blockRef, show, setShow];
}

export default useShowMenu;
