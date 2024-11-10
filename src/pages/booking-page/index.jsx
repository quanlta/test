import React from 'react'
import BookPage from '../booking'
import CoffeeShopsPage from '../shop'
import PodsPage from '../pod'
import SearchByName from '../searchShopByName'

function PODBooking() {
  return (
    <div>
        <BookPage/>
        <CoffeeShopsPage/>
        <PodsPage/>
        <SearchByName/>
    </div>
  )
}

export default PODBooking