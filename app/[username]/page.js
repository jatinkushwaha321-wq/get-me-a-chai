import React from 'react'
import Paymentpage from '../../components/Paymentpage'
import { fetchuser } from '@/actions/useractions'
import { notFound } from 'next/navigation'

const Username = async ({ params }) => {
  const username = (await params).username
  // Fetch user from database to verify existence
  const u = await fetchuser(username)
  if (!u) {
    notFound()
  }

  return (<>
    <Paymentpage username={username} />
    </>
  )
}

export default Username

export async function generateMetadata({ params }) {
  return {
    title: `Support ${(await params).username} - Get Me a Chai`,
  }
}