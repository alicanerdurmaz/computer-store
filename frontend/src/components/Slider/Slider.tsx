import React, { useState, useEffect } from 'react'

import cx from 'classnames'
import styles from './Slider.module.css'
interface Props {
  title: string
  rangeMin: number
  rangeMax: number
  value1: number
  value2: number
  value1_OnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value2_OnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const Slider = ({
  title,
  rangeMin,
  rangeMax,
  value1,
  value2,
  value1_OnChange,
  value2_OnChange,
}: Props) => {
  const [minMax, setMinMax] = useState([rangeMin, rangeMax])
  const [sliderColor, setSliderColor] = useState(calculateSliderColor())

  useEffect(() => {
    if (value1 < value2) {
      setMinMax([value1, value2])
    }
    if (value1 > value2) {
      setMinMax([value2, value1])
    }
  }, [value1, value2])

  useEffect(() => {
    setSliderColor(calculateSliderColor())
  }, [minMax, rangeMax, rangeMin])

  function calculateSliderColor() {
    let ratioInputMax = (100 * (minMax[1] - rangeMin)) / (rangeMax - rangeMin)
    let ratioInputMin = Math.abs(
      100 - (100 * (minMax[0] - rangeMax)) / (rangeMin - rangeMax),
    )

    const bgColor = '#f3f3f4'
    const rangeColor = '#1EA7FD'

    return `linear-gradient(to right, ${bgColor} 0%, ${bgColor} ${ratioInputMin}%, ${rangeColor} ${ratioInputMin}%, ${rangeColor} ${ratioInputMax}%, ${bgColor} ${ratioInputMax}%, ${bgColor} 100%)`
  }

  return (
    <div className={cx(styles.slider)}>
      <h6 className={styles.title}>{title}</h6>
      <div className={cx(styles.text)}>
        <span id="range-slider-input-one" className={cx(styles.text_range1)}>
          ${minMax[0]}
        </span>
        <span id="range-slider-input-two" className={cx(styles.text_range2)}>
          ${minMax[1]}
        </span>
      </div>
      <div className={cx(styles.slider_container)}>
        <span
          className={cx(styles.slider_bg)}
          style={{ background: sliderColor }}
        ></span>
        <input
          tabIndex={0}
          className={cx(styles.input)}
          value={value1}
          min={rangeMin}
          max={rangeMax}
          type="range"
          name="input-range-1"
          onChange={value1_OnChange}
          aria-valuemin={rangeMin}
          aria-valuemax={rangeMax}
          aria-valuenow={value1}
          aria-labelledby="range-slider-input-one"
          data-testid="slider-1"
        />
        <input
          className={cx(styles.input)}
          value={value2}
          min={rangeMin}
          max={rangeMax}
          type="range"
          name="input-range-2"
          onChange={value2_OnChange}
          aria-valuemin={rangeMin}
          aria-valuemax={rangeMax}
          aria-valuenow={value2}
          aria-labelledby="range-slider-input-two"
          data-testid="slider-2"
        />
      </div>
    </div>
  )
}

export default Slider
