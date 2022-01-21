import { type Writable, writable } from "svelte/store"

type DefaultValueStore<T> = Writable<T> & {
  defaultValue: T,
  setToDefault: () => void
}

export const defaultValue = <T>(defaultValue: T) => {
  const store = writable(defaultValue)

  // if the store turns undefined, set it back to the default value
  store.subscribe((val) => {
    if (!val) store.set(defaultValue)
  })

  return {
    defaultValue: defaultValue,
    setToDefault: () => store.set(defaultValue),
    ...store,
  } as DefaultValueStore<T>
}
