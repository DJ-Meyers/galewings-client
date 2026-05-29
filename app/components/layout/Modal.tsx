import { useEffect, useRef, type ReactNode } from 'react'

interface Properties {
  open: boolean
  onClose: () => void
  title?: ReactNode
  headerRight?: ReactNode
  children: ReactNode
}

export const Modal = ({
  open,
  onClose,
  title,
  headerRight,
  children,
}: Properties) => {
  const dialogReference = useRef<HTMLDialogElement>(null)
  const closingProgrammatically = useRef(false)

  useEffect(() => {
    const dialog = dialogReference.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      closingProgrammatically.current = true
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      className="bg-detail-bg m-auto flex max-h-[85vh] w-full max-w-[min(640px,90vw)] flex-col overflow-hidden rounded-lg p-0 backdrop:bg-black/50 [&:not([open])]:hidden"
      ref={dialogReference}
      onClick={(e) => {
        if (e.target === dialogReference.current) onClose()
      }}
      onClose={() => {
        if (closingProgrammatically.current) {
          closingProgrammatically.current = false
          return
        }
        onClose()
      }}
    >
      <div className="flex shrink-0 items-center justify-between p-4 pb-2">
        {title ? (
          <h2 className="text-text-dim m-0 text-sm font-semibold">{title}</h2>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-2">
          {headerRight}
          <button
            className="text-text-faint hover:text-error cursor-pointer border-none bg-none px-1 text-xl leading-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">{children}</div>
    </dialog>
  )
}
