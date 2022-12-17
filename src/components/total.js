import PropTypes from 'prop-types'
import React, { Component } from 'react'

class total extends Component {
  static propTypes = {}

  render() {
    return (
      <div>total</div>
    )
  }
}

export default total

/*

let rate = {
  'USD': 0.80,
  'GBP'
}
usd usd-pd usd-aud usd-jpy usd-rub  pd-aud pd-jpy  pd-rub  aud-jpy aud-rub jpy-rub
1,   0.82, 1.49,   136.70, 64.88    1.48   136.06  64.60   136.79  64.91

2 arguments: previous and next
- usd

if user selects gbp and current currency is usd,
  converts usd to gbp


- gbp
if user selects aud and current currency is gbp,
  converts usd to aud
- aud
if user selects jpy and current currency is aud,
  converts usd to jpy
- jpy
if user selects rub and current currency is jpy,
  converts usd to rub
- rub
if user selects usd and current currency is rub,
  converts rub to usd 
*/ 