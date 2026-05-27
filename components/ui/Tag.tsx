interface TagProps {
  label: string
}

export function Tag({ label }: TagProps) {
  return (
    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
      {label}
    </span>
  )
}
