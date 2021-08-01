/* global describe beforeEach it */
import React from 'react'
import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(
      <UserHome nickname="Cody" memberSince="2015-10-21" lvl="42" />
    )
  })

  it('renders the nickname in an h1', () => {
    expect(userHome.find('h1').text()).to.be.equal('Cody')
  })
})
