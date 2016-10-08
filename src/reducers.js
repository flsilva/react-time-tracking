import { combineReducers } from 'redux'
import projects from './projects/Projects.reducers'

const app = combineReducers({
  projects
})

export default app
