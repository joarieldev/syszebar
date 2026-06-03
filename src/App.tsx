import { createSignal, onCleanup } from 'solid-js'
import { createProvider } from 'zebar'

const App = () => {
  const [time, setTime] = createSignal('')

  const initClock = async () => {
    try {
      const provider = createProvider({ type: 'date', formatting: 'HH:mm:ss' })
      provider.onOutput((output) => setTime(output.formatted))
      provider.onError(() => setTime(new Date().toLocaleTimeString()))
      onCleanup(() => provider.stop())
    } catch {
      const id = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
      onCleanup(() => clearInterval(id))
    }
  }

  initClock()

  return (
    <div class="flex h-full w-full items-center justify-center bg-black/80 text-white">
      <span class="text-sm font-mono tabular-nums">{time()}</span>
    </div>
  )
}

export default App
