type BrandMarkProps = { className?: string }

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <img
      className={className}
      src="/images/logo-sb-hd.png"
      alt=""
      width="1254"
      height="1254"
      decoding="async"
    />
  )
}
