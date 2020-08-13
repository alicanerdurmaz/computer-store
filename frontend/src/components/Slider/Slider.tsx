import React, { useReducer, useRef } from 'react'

import cx from 'classnames'
import styles from './Slider.module.css'
import { useFilterContext } from '../../context/FilterContext/FilterContext'
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

const Slider = ({ title, minRange, maxRange }: Props) => {
  const { filterDispatch } = useFilterContext()

  const firstSlider = useRef<HTMLInputElement>(null)
  const secondSlider = useRef<HTMLInputElement>(null)

  const [sliderState, dispatchSlider] = useReducer(sliderReducer, {
    firstSliderValue: minRange,
    secondSliderValue: maxRange,
    minValue: minRange,
    maxValue: maxRange,
    minRange: minRange,
    maxRange: maxRange,
    sliderColor: calculateSliderColor(minRange, maxRange, minRange, maxRange),
  })
  const { firstSliderValue, secondSliderValue, minValue, maxValue, sliderColor } = sliderState

  const dispatchChanged = () => {
    if (firstSlider.current === null || secondSlider.current === null) {
      return
    }

    filterDispatch({
      type: 'add-min-max',
      payload: {
        category: title,
        value: `${sliderState.minValue},${sliderState.maxValue}`,
      },
    })

    dispatchSlider({
      type: 'changed',
      payload: {
        firstSliderValue: parseFloat(firstSlider.current.value),
        secondSliderValue: parseFloat(secondSlider.current.value),
      },
    })
  }

  return (
    <div className={cx(styles.slider)}>
      <h6 className={styles.title}>{title}</h6>
      <div className={cx(styles.text)}>
        <span id="range-slider-input-one" className={cx(styles.text_range1)}>
          ${minValue}
        </span>
        <span id="range-slider-input-two" className={cx(styles.text_range2)}>
          ${maxValue}
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
