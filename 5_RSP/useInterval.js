import { useRef, useEffect } from 'react';

/**
 *  const [isRunning, setRunning] = useState(true);
 *  useInterval(() => {
 *    console.log('here')
 *  }, isRunning ? 1000 : null);  -> null이면  interval이 멈춤.
 *
*/

function useInterval(callback, delay) {
  const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    });

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      // tick으로 새로 정의한 함수를 쓰는 이유: 타이밍 문제 -> delay 발생.

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => {
          clearInterval(id)
        };
      }
    }, [delay]);

    return savedCallback.current;
}


export default useInterval;