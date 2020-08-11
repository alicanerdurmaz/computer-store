import React, { useReducer, useEffect } from 'react'

import cx from 'classnames'
import styles from './Slider.module.css'
interface Props {
  title: string
  minRange: number
  maxRange: number
}
interface SliderState {
  value1: number
  value2: number
  minValue: number
  maxValue: number
  maxRange: number
  minRange: number
  sliderColor: string
}
type Action = { type: 'input-range-1' | 'input-range-2'; payload: any }

const sliderReducer = (state: SliderState, action: Action): SliderState => {
  switch (action.type) {
    case 'input-range-1':
      const newRange1Value = action.payload.value

      let newMin1 = newRange1Value
      let newMax1 = state.value2

      if (newRange1Value > state.value2) {
        newMin1 = state.value2
        newMax1 = newRange1Value
      }

      return {
        ...state,
        minValue: newMin1,
        maxValue: newMax1,
        value1: newRange1Value,
        sliderColor: calculateSliderColor(newMin1, newMax1, state.minRange, state.maxRange),
      }

    case 'input-range-2':
      const newRange2Value = action.payload.value

      let newMin2 = state.value1
      let newMax2 = newRange2Value

      if (newRange2Value < state.value1) {
        newMin2 = newRange2Value
        newMax2 = state.value1
      }
      return {
        ...state,
        minValue: newMin2,
        maxValue: newMax2,
        value2: newRange2Value,
        sliderColor: calculateSliderColor(newMin2, newMax2, state.minRange, state.maxRange),
      }

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
  const [sliderState, dispatchSlider] = useReducer(sliderReducer, {
    value1: minRange,
    value2: maxRange,
    minValue: minRange,
    maxValue: maxRange,
    minRange: minRange,
    maxRange: maxRange,
    sliderColor: calculateSliderColor(minRange, maxRange, minRange, maxRange),
  })
  const { value1, value2, minValue, maxValue, sliderColor } = sliderState

  const dispatchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchSlider({
      type: e.target.name,
      payload: {
        value: e.target.value,
      },
    } as Action)
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
          tabIndex={0}
          className={cx(styles.input)}
          value={value1}
          min={minRange}
          max={maxRange}
          type="range"
          name="input-range-1"
          onChange={e => dispatchChanged(e)}
          aria-valuemin={minRange}
          aria-valuemax={maxRange}
          aria-valuenow={value1}
          aria-labelledby="range-slider-input-one"
          data-testid="slider-1"
        />
        <input
          className={cx(styles.input)}
          value={value2}
          min={minRange}
          max={maxRange}
          type="range"
          name="input-range-2"
          onChange={e => dispatchChanged(e)}
          aria-valuemin={minRange}
          aria-valuemax={maxRange}
          aria-valuenow={value2}
          aria-labelledby="range-slider-input-two"
          data-testid="slider-2"
        />
      </div>
    </div>
  )
}

export default Slider
