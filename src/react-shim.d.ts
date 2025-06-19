declare namespace React {
  type FC<P = {}> = (props: P) => any
  interface CSSProperties {
    [key: string]: string | number
  }
}

declare module 'react' {
  export = React
  export function useState<T>(init: T): [T, (val: T) => void]
  export function useEffect(fn: () => void | (() => void), deps?: unknown[]): void
}
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
