import { fetchData, fetchData2, fetchData3 } from '@/lib/util/promises'
import React from 'react'

export default async function page() {

    const loadFromCdns = async () => {
      const cdns = [
      Promise.resolve({name: "Rahul", age: 20}),
      Promise.reject({error: "Error"}),
      Promise.resolve({name: "Raj", age: 30}),
      ];
      try {
        const resp = await Promise.any(cdns)
        console.log(" first success resp ", resp)
  
      } catch (error) {
        console.log(" error ", error)
      }
    }
  
      loadFromCdns();

    return (
      <div>JavaScript Topics</div>
    )
  }