declare namespace React {
  interface FC<P = {}> {
    (props: P): any
  }
  interface CSSProperties {
    [key: string]: any
  }
  interface RefObject<T> {
    readonly current: T | null
  }
}

declare module 'react' {
  const React: any
  export function useEffect(effect: any, deps?: any[]): void
  export function useState<T = any>(initial?: T): [T, (v: T) => void]
  export const createElement: any
  export const Component: any
  export type FC<P = {}> = React.FC<P>
  export interface CSSProperties extends React.CSSProperties {}
  export interface RefObject<T> extends React.RefObject<T> {}
  export default React
}

declare namespace JSX {
  interface IntrinsicElements {
    [elem: string]: any
  }
}
