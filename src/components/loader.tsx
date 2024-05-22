import { Loader2 } from 'lucide-react'

export function Loader() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Loader2 className="animate-spin w-6 h-6" />
    </div>
  )
}
