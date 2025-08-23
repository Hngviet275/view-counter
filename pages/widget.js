import { useEffect, useState } from 'react'

export default function Widget() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const slug = urlParams.get('slug') || '/'

    fetch(`/api/view?slug=${slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug })
    })
      .then(res => res.json())
      .then(data => setCount(data.count))
  }, [])

  return (
    <div style={{
      fontSize: '14px',
      fontFamily: 'sans-serif',
      background: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #ddd',
      display: 'inline-block'
    }}>
      👁️ {count !== null ? count : '...'} lượt xem
    </div>
  )
}
