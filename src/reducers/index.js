import { combineReducers } from 'redux'
import { companies } from './companies-reducer'
import { humans } from './humans-reducer'

export default combineReducers({
  companies,
  humans
})