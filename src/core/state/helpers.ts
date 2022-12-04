/**
 * Add Type definition to the action payload when using createAction()
 * e.g.
 * type MyType = { id: string; checked: boolean };
 * const SOMETHING_CHANGED = createAction( "SOMETHING_CHANGED", withPayloadType<MyType>() );
 */
export function withPayloadType<T>() {
  return (t: T) => {
    return { payload: t };
  };
}
