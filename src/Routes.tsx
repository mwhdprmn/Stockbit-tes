import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DetailPage from './containers/DetailPage'
import HomePage from './containers/HomePage'

const Routes: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:id" exact component={DetailPage} />
      </Switch>
    </Router>
  )
}

export default Routes
