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

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, []);

    return savedCallback.current;
}


export default useInterval;