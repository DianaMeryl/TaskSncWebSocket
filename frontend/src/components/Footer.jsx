import React from 'react'

export default function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="footer">
      <small>
        &copy; {year} My Notes
      </small>
    </footer>
  )
}
