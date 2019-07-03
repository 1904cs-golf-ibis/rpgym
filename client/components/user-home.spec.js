/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome nickname="Goku" memberSince="test" />)
  })

  it('renders the nick name in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, Goku!')
  })
})
