import { useEffect, useRef } from 'react'

export function useMount(mountedFn: () => any) {
  const mountedFnRef: React.MutableRefObject<any> = useRef(null)

  mountedFnRef.current = mountedFn

  useEffect(() => {
    mountedFnRef.current()
  }, [mountedFnRef])
}
