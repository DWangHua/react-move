/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
//
import Transition from '../../../lib/Transition'

class Story extends Component {
  constructor() {
    super()
    this.state = {
      items: makeItems()
    }
  }
  render() {
    const { items } = this.state
    return (
      <div>
        <p>
          The "Transition" component enables animating multiple elements, including enter and exit animations.
        </p>

        <br />
        <br />

        <button
          onClick={() =>
            this.setState({
              items: makeItems()
            })}
        >
          Randomize Data
        </button>

        <br />
        <br />

        <pre><code>{items.map(d => d.number).toString()}</code></pre>

        <Transition
          data={items}
          getKey={d => d.value}
          update={d => ({
            number: d.number,
            translate: 1,
            opacity: 1,
            color: 'black'
          })}
          enter={d => ({
            number: d.number,
            translate: 0,
            opacity: 0,
            color: 'blue'
          })}
          leave={d => ({
            number: d.number,
            translate: 2,
            opacity: 0,
            color: 'red'
          })}
        >
          {data => {
            return (
              <div style={{ height: 20 * 10 + 'px', position: 'relative' }}>
                {data.map(d => {
                  return (
                    <div
                      key={d.key}
                      style={{
                        fontWeight: 'bold',
                        position: 'absolute',
                        transform: `translate(${100 * d.state.translate}px, ${20 * d.key}px)`,
                        opacity: d.state.opacity,
                        color: d.state.color
                      }}
                    >
                      {d.key} - {Math.round(d.state.number * 100)}
                    </div>
                  )
                })}
              </div>
            )
          }}
        </Transition>
      </div>
    )
  }
}

const source = require('!raw!./Transition')
const CodeHighlight = require('./components/codeHighlight').default
export default () => (
  <div>
    <Story />
    <br />
    <br />

    <CodeHighlight>{() => source}</CodeHighlight>
  </div>
)

function makeItems() {
  return _.filter(
    _.map(_.range(11), d => ({
      value: d,
      number: Math.round(Math.random() * 100)
    })),
    (d, i) => i > Math.random() * 10
  )
}
