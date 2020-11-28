import React, { useReducer, useRef, useEffect } from 'react'

import cx from 'classnames'
import styles from './Slider.module.css'
import { useDebounce } from '../../hooks/useDebounce'
import { useFilterContext } from 'src/context/FilterContext/FilterContext'
import { SliderLabelSymbols } from 'src/utils/constants'
interface Props {
  title: string
  minRange: number
  maxRange: number
}
interface SliderState {
  firstSliderValue: number
  secondSliderValue: number
  minValue: number
  maxValue: number
  maxRange: number
  minRange: number
  sliderColor: string
}
type Action = {
  type: 'input-range-1' | 'input-range-2' | 'changed'
  payload: {
    firstSliderValue: number
    secondSliderValue: number
  }
}

const sliderReducer = (state: SliderState, action: Action): SliderState => {
  switch (action.type) {
    case 'changed':
      const { firstSliderValue, secondSliderValue } = action.payload

      let minValue = firstSliderValue
      let maxValue = secondSliderValue

      if (firstSliderValue > secondSliderValue) {
        minValue = secondSliderValue
        maxValue = firstSliderValue
      }

      const sliderColor = calculateSliderColor(minValue, maxValue, state.minRange, state.maxRange)

      const newState = {
        firstSliderValue,
        secondSliderValue,
        minValue,
        maxValue,
        sliderColor,
      }

      return { ...state, ...newState }
    default:
      return { ...state }
  }
}

function calculateSliderColor(minValue: number, maxValue: number, minRange: number, maxRange: number) {
  let ratioInputMax: number = (100 * (maxValue - minRange)) / (maxRange - minRange)
  let ratioInputMin: number = Math.abs(100 - (100 * (minValue - maxRange)) / (minRange - maxRange))

  const bgColor = '#f3f3f4'
  const rangeColor = '#1EA7FD'

  return `linear-gradient(to right, ${bgColor} 0%, ${bgColor} ${ratioInputMin}%, ${rangeColor} ${ratioInputMin}%, ${rangeColor} ${ratioInputMax}%, ${bgColor} ${ratioInputMax}%, ${bgColor} 100%)`
}

const init = (value: string, minRange: number, maxRange: number) => {
  const firstValue = parseFloat(value?.split(',')[0]) || minRange
  const secondValue = parseFloat(value?.split(',')[1]) || maxRange

  return {
    firstSliderValue: firstValue,
    secondSliderValue: secondValue,
    minValue: firstValue,
    maxValue: secondValue,
    minRange: minRange,
    maxRange: maxRange,
    sliderColor: calculateSliderColor(firstValue, secondValue, minRange, maxRange),
  }
}
const Slider = ({ title, minRange, maxRange }: Props) => {
  const { filterDispatch } = useFilterContext()

  const [sliderState, dispatchSlider] = useReducer(sliderReducer, {}, () => init(title, minRange, maxRange))

  const firstSlider = useRef<HTMLInputElement>(null)
  const secondSlider = useRef<HTMLInputElement>(null)

  const { firstSliderValue, secondSliderValue, minValue, maxValue, sliderColor } = sliderState

  const debouncedValue = useDebounce(`${sliderState.minValue},${sliderState.maxValue}`, 100)

  const dispatchChanged = () => {
    if (firstSlider.current === null || secondSlider.current === null) {
      return
    }

    dispatchSlider({
      type: 'changed',
      payload: {
        firstSliderValue: parseFloat(firstSlider.current.value),
        secondSliderValue: parseFloat(secondSlider.current.value),
      },
    })
  }

  useEffect(() => {
    const values = debouncedValue.split(',')

    if (parseFloat(values[0]) === minRange && parseFloat(values[1]) === maxRange) {
      filterDispatch({ type: 'delete-string', payload: { category: title, value: debouncedValue } })
    } else {
      filterDispatch({ type: 'add-string', payload: { category: title, value: debouncedValue } })
    }
  }, [debouncedValue])

  return (
    <div className={cx(styles.slider)}>
      <h6 className={styles.title}>{title}</h6>
      <div className={cx(styles.text)}>
        <span id="range-slider-input-one" className={cx(styles.text_range1)}>
          {`${minValue}${SliderLabelSymbols[title]}`}
        </span>
        <span id="range-slider-input-two" className={cx(styles.text_range2)}>
          {`${maxValue}${SliderLabelSymbols[title]}`}
        </span>
      </div>
      <div className={cx(styles.slider_container)}>
        <span className={cx(styles.slider_bg)} style={{ background: sliderColor }}></span>
        <input
          ref={firstSlider}
          tabIndex={0}
          className={cx(styles.input)}
          value={firstSliderValue}
          min={minRange}
          max={maxRange}
          type="range"
          name="input-range-1"
          onChange={dispatchChanged}
          aria-valuemin={minRange}
          aria-valuemax={maxRange}
          aria-valuenow={firstSliderValue}
          aria-labelledby="range-slider-input-one"
          data-testid="slider-1"
        />
        <input
          ref={secondSlider}
          className={cx(styles.input)}
          value={secondSliderValue}
          min={minRange}
          max={maxRange}
          type="range"
          name="input-range-2"
          onChange={dispatchChanged}
          aria-valuemin={minRange}
          aria-valuemax={maxRange}
          aria-valuenow={secondSliderValue}
          aria-labelledby="range-slider-input-two"
          data-testid="slider-2"
        />
      </div>
    </div>
  )
}

export default Slider
