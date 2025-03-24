import { render, screen } from '@testing-library/react'
import Button from '../Button'

describe(`Component: ${Button.name}`, () => {
  test('should render', () => {
    const { container } = render(<Button>Click me!</Button>)
    expect(container).toBeInTheDocument()
    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="sc-FEMpB hJhYXv"
        >
          Click me!
        </button>
      </div>
    `)
  })

  test('should be in the document', () => {
    render(<Button>Click me!</Button>)
    const btn = screen.getByText('Click me!')
    expect(btn).toBeInTheDocument()
    expect(btn).toBeInstanceOf(HTMLButtonElement)
  })
})