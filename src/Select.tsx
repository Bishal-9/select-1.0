import { useEffect, useState } from "react"
import styles from "./select.module.css"

export type SelectOption = {
  label: string
  value: string | number
}

type SelectProps = {
  options: SelectOption[]
  value: SelectOption | undefined
  onChange: (value: SelectOption | undefined) => void
}

const Select = ({ value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  function clearOptions() {
    onChange(undefined)
  }

  function selectOption(option: SelectOption) {
    if (option !== value) onChange(option)
  }

  function isOptionSelected(option: SelectOption) {
    return option === value
  }

  useEffect(() => {
    if (!isOpen) setHighlightedIndex(0)
  }, [isOpen])

  return (
    <div
      tabIndex={0}
      className={styles.container}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((p) => !p)}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        className={styles["clear-btn"]}
        onClick={(e) => {
          e.stopPropagation()
          clearOptions()
        }}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen && styles.show}`}>
        {options.map((option, index) => (
          <li
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) && styles.selected
            } ${highlightedIndex === index && styles.highlighted}`}
            onMouseEnter={() => setHighlightedIndex(index)}
            onClick={(e) => {
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select
