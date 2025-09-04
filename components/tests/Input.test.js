import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { User } from '@phosphor-icons/react'
import Input from '../form/Input'

// Mock clsx
jest.mock('clsx', () => ({
  __esModule: true,
  default: (...classes) => classes.filter(Boolean).join(' ')
}))

describe('Input Component', () => {
  test('renders input with label', () => {
    render(<Input label="Test Label" />)
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  // with icon
  test('renders with icon when provided', () => {
    render(<Input label="Email" icon={User} />)
    
    const iconElement = document.querySelector('svg')
    expect(iconElement).toBeInTheDocument()
  })

  // without icon
  test('renders without icon when not provided', () => {
    render(<Input label="Email" />)
    
    const iconElement = document.querySelector('svg')
    expect(iconElement).not.toBeInTheDocument()
  })

  // check error state
  test('displays error message and styling when error prop is provided', () => {
    render(<Input label="Email" error="This field is required" />)
    
    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('border-myRed')
    
    const errorIcon = document.querySelector('.text-myRed svg')
    expect(errorIcon).toBeInTheDocument()
  })

  // check valid state
  test('displays success styling and icon when isValid is true', () => {
    render(<Input label="Email" isValid={true} />)
    
    expect(screen.getByRole('textbox')).toHaveClass('border-myGreen')
    
    const successIcon = document.querySelector('.text-myGreen svg')
    expect(successIcon).toBeInTheDocument()
  })

  // neutral state
  test('renders normal state when no error or valid state', () => {
    render(<Input label="Email" />)
    
    const input = screen.getByRole('textbox')
    expect(input).not.toHaveClass('border-myRed')
    expect(input).not.toHaveClass('border-myGreen')
    
    const statusIcons = document.querySelectorAll('.field-status')
    expect(statusIcons).toHaveLength(0)
  })

  // check props passing properly
  test('passes through input props correctly', () => {
    render(
      <Input 
        label="Email" 
        placeholder="Enter your email"
        type="email"
        disabled={true}
        data-testid="email-input"
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter your email')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute('data-testid', 'email-input')
  })

  // check user interaction 
  test('handles user input correctly', async () => {
    const user = userEvent.setup()
    render(<Input label="Name" />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'John Doe')
    
    expect(input).toHaveValue('John Doe')
  })

  // check onChange
  test('calls onChange when user types', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    
    render(<Input label="Name" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'A')
    
    expect(handleChange).toHaveBeenCalled()
  })

  // prioritization of error and valid states
  test('prioritizes error over valid state when both are provided', () => {
    render(<Input label="Email" error="Invalid email" isValid={true} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-myRed')
    expect(input).not.toHaveClass('border-myGreen')
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    
    // check corrects icon exists
    const errorIcon = document.querySelector('.text-myRed svg')
    const successIcon = document.querySelector('.text-myGreen svg')
    expect(errorIcon).toBeInTheDocument()
    expect(successIcon).not.toBeInTheDocument()
  })

  // check classNames 
  test('applies correct CSS classes', () => {
    render(<Input label="Test" />)
    
    const label = screen.getByText('Test').closest('label')
    expect(label).toHaveClass('form-line', 'flex', 'flex-col', 'w-full')
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('textbox')
  })

  // check basic accessibility
  test('has proper accessibility attributes', () => {
    render(<Input label="Email Address" />)
    
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Email Address')
    
    expect(input).toHaveAccessibleName('Email Address')
    expect(label.closest('label')).toContainElement(input)
  })

  // check equired attribute
  test('supports required attribute', () => {
    render(<Input label="Email" required />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })
})