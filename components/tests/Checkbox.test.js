import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Checkbox from "../form/Checkbox";


// Mock clsx
jest.mock('clsx', () => ({
  __esModule: true,
  default: (...classes) => classes.filter(Boolean).join(' ')
}))

describe('Checkbox Component', () => {
  const defaultProps = {
    label: 'Test Checkbox',
    val: 'test-value',
    hasError: false
  }

  // basic render
  test('renders checkbox with label and value', () => {
    render(<Checkbox {...defaultProps} />)
    
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Test Checkbox')
    
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('value', 'test-value')
    expect(checkbox).toHaveAttribute('type', 'checkbox')
    expect(label).toBeInTheDocument()
  })

  // check cypress data attribute exists
  test('has correct data-cy attribute', () => {
    render(<Checkbox {...defaultProps} />)
    
    const labelElement = screen.getByRole('checkbox').closest('label')
    expect(labelElement).toHaveAttribute('data-cy', 'chItem')
  })

  // check neutral state 
  test('renders normal state without error', () => {
    render(<Checkbox {...defaultProps} />)
    
    const customLabel = document.querySelector('.custom-ch-label')
    expect(customLabel).not.toHaveClass('border-myRed')
    
    // check success and neutral icons exist
    const successIcon = document.querySelector('.success')
    const neutralIcon = document.querySelector('.neutral')
    expect(successIcon).toBeInTheDocument()
    expect(neutralIcon).toBeInTheDocument()
    
    // error icons does not
    const errorIcon = document.querySelector('.text-myRed')
    expect(errorIcon).not.toBeInTheDocument()
  })

  // check error state
  test('renders error state correctly', () => {
    render(<Checkbox {...defaultProps} hasError={true} />)
    
    const customLabel = document.querySelector('.custom-ch-label')
    expect(customLabel).toHaveClass('border-myRed')
    
    // should be an Error icon
    const errorIcon = document.querySelector('svg.text-myRed')
    expect(errorIcon).toBeInTheDocument()
    
    // should not be success and neutral icons
    const successIcon = document.querySelector('.success')
    const neutralIcon = document.querySelector('.neutral')
    expect(successIcon).not.toBeInTheDocument()
    expect(neutralIcon).not.toBeInTheDocument()
  })

  // check checkbox interaction
  test('handles checkbox checking/unchecking', async () => {
    const user = userEvent.setup()
    render(<Checkbox {...defaultProps} />)
    
    const checkbox = screen.getByRole('checkbox')
    
    // at first, its not checked
    expect(checkbox).not.toBeChecked()
    
    // then click it
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    
    // click again
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  // check onChange event
  test('calls onChange when clicked', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    
    render(<Checkbox {...defaultProps} onChange={handleChange} />)
    
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    expect(handleChange).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        checked: true,
        value: 'test-value'
      })
    }))
  })

  // check props passing properly
  test('passes through checkbox props correctly', () => {
    render(
      <Checkbox 
        {...defaultProps}
        disabled={true}
        checked={true}
        name="test-checkbox"
        data-testid="custom-checkbox"
      />
    )
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
    expect(checkbox).toBeChecked()
    expect(checkbox).toHaveAttribute('name', 'test-checkbox')
    expect(checkbox).toHaveAttribute('data-testid', 'custom-checkbox')
  })

  // check classNames 
  test('applies correct CSS classes', () => {
    render(<Checkbox {...defaultProps} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass('custom-ch', 'w-0', 'h-0', 'inline', 'float-left', 'opacity-0')
    
    const customLabel = document.querySelector('.custom-ch-label')
    expect(customLabel).toHaveClass('custom-ch-label')
  })

  // check label-click
  test('checkbox toggles when label is clicked', async () => {
    const user = userEvent.setup()
    render(<Checkbox {...defaultProps} />)
    
    const checkbox = screen.getByRole('checkbox')
    const labelText = screen.getByText('Test Checkbox')
    
    expect(checkbox).not.toBeChecked()
    
    // click on label
    await user.click(labelText)
    expect(checkbox).toBeChecked()
  })

  // basic accessibility test
  test('has proper accessibility attributes', () => {
    render(<Checkbox {...defaultProps} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAccessibleName('Test Checkbox')
    
    const label = checkbox.closest('label')
    expect(label).toContainElement(checkbox)
  })

  // check required attribute support
  test('supports required attribute', () => {
    render(<Checkbox {...defaultProps} required />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeRequired()
  })

  test('provides correct value for form submission', () => {
    render(<Checkbox {...defaultProps} val="custom-value" />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('value', 'custom-value')
  })
})


describe('Checkbox Component Edge Cases', () => {
  test('handles special characters in label', () => {
    const specialLabel = 'Test & Special <> Characters "quotes"'
    render(<Checkbox label={specialLabel} val="test" hasError={false} />)
    
    expect(screen.getByText(specialLabel)).toBeInTheDocument()
  })

  test('handles empty value', () => {
    render(<Checkbox label="Test" val="" hasError={false} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('value', '')
  })

  test('renders correctly with defaultChecked', () => {
    render(<Checkbox label="Test" val="test" hasError={false} defaultChecked />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  test('hasError state change updates styling', () => {
    const { rerender } = render(
      <Checkbox label="Test" val="test" hasError={false} />
    )
    
    let customLabel = document.querySelector('.custom-ch-label')
    expect(customLabel).not.toHaveClass('border-myRed')
    
    // make hasError true 
    rerender(<Checkbox label="Test" val="test" hasError={true} />)
    
    customLabel = document.querySelector('.custom-ch-label')
    expect(customLabel).toHaveClass('border-myRed')
  })

  test('works with form validation', async () => {
    const user = userEvent.setup()
    const onInvalid = jest.fn()
    
    render(
      <form>
        <Checkbox 
          label="Terms" 
          val="terms" 
          hasError={false} 
          required 
          onInvalid={onInvalid}
        />
        <button type="submit">Submit</button>
      </form>
    )
    
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    await user.click(submitButton)
    

    expect(onInvalid).toHaveBeenCalled()
  })
})

describe('Checkbox Icons', () => {
  test('renders success and neutral icons in normal state', () => {
    render(<Checkbox label="Test" val="test" hasError={false} />)
    
    const successIcon = document.querySelector('.success')
    const neutralIcon = document.querySelector('.neutral')
    
    expect(successIcon).toBeInTheDocument()
    expect(neutralIcon).toBeInTheDocument()
    expect(successIcon.tagName.toLowerCase()).toBe('svg')
    expect(neutralIcon.tagName.toLowerCase()).toBe('svg')
  })

  test('renders only error icon in error state', () => {
    render(<Checkbox label="Test" val="test" hasError={true} />)
    
    const errorIcon = document.querySelector('svg.text-myRed')
    const successIcon = document.querySelector('.success')
    const neutralIcon = document.querySelector('.neutral')
    
    expect(errorIcon).toBeInTheDocument()
    expect(successIcon).not.toBeInTheDocument()
    expect(neutralIcon).not.toBeInTheDocument()
  })
})