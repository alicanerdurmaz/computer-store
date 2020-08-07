import React, { useState } from 'react'
import {
  cleanup,
  render,
  getAllByAltText,
  fireEvent,
  waitForElement,
} from '@testing-library/react'

afterEach(cleanup)

import Slider from './Slider'

test('Slider component', async () => {
  const rangeMin = 1000
  const rangeMax = 4331
  let value1 = rangeMin
  let value2 = rangeMax

  const { getByTestId } = render(
    <Slider
      title="Price"
      rangeMin={rangeMin}
      rangeMax={rangeMax}
      value1={value1}
      value2={value2}
      value1_OnChange={e => {
        value1 = parseFloat(e.target.value)
      }}
      value2_OnChange={e => {
        value2 = parseFloat(e.target.value)
      }}
    ></Slider>,
  )
  const slider1 = getByTestId('slider-1') as HTMLInputElement
  const slider2 = getByTestId('slider-2') as HTMLInputElement

  const SliderHeight = 100
  const SliderWidth = 100

  slider1.getBoundingClientRect = jest.fn(() => {
    return {
      bottom: SliderHeight,
      height: SliderHeight,
      left: 0,
      right: SliderWidth,
      top: 0,
      width: SliderWidth,
      x: 0,
      y: 0,
    } as DOMRect
  })

  expect(parseFloat(slider1.value)).toBe(rangeMin)
  expect(parseFloat(slider2.value)).toBe(rangeMax)

  await fireEvent.mouseDown(slider1, {
    clientX: ((value1 - rangeMin) / (rangeMax - rangeMin)) * SliderWidth,
    clientY: SliderHeight,
  })

  console.log(slider1.value)
})
