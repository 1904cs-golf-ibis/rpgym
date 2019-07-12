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
      <UserHome nickname="Cody" memberSince="test" lvl="1000" />
    )
  })

  it('renders the image in an h2', () => {
    expect(userHome.find('h2').text()).to.be.equal('Cody')
  })
})
