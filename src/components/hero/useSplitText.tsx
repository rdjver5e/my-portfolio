// SplitText component for GSAP animation targets
interface SplitTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  wordClassName?: string
}

export function SplitText({
  text,
  className = '',
  as: Tag = 'h1',
  wordClassName = '',
}: SplitTextProps) {
  const words = text.split(' ')

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`split-word inline-block overflow-hidden ${wordClassName}`}
        >
          <span className="inline-block">{word}</span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  )
}
