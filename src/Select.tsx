import { useEffect, useState } from "react"
import styles from "./select.module.css"

export type SelectOption = {
  label: string
  value: string | number
}

type MultipleSelectProps = {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

type SingleSelectProps = {
  multiple?: false
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined)
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value
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
      <span className={styles.value}>
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                className={styles["option-badge"]}
                onClick={(e) => {
                  e.stopPropagation()
                  selectOption(v)
                }}
              >
                {v.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
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
