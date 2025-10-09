import Image, { type ImageProps } from "next/image"
import React, { useState } from "react"

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="

type ImageWithFallbackProps = Omit<ImageProps, "src"> & {
  src: string
  fallbackSrc?: string
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = ERROR_IMG_SRC,
  onError,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError: Required<ImageProps>["onError"] = (event) => {
    setDidError(true)
    onError?.(event)
  }

  const resolvedSrc = didError ? fallbackSrc : src
  const unoptimized = resolvedSrc.startsWith("data:")

  return (
    <Image
      {...rest}
      src={resolvedSrc}
      alt={alt ?? ""}
      onError={handleError}
      unoptimized={unoptimized}
    />
  )
}
