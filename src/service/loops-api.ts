const apiUrl =
  'http://loops-server-alb-1090889888.ap-northeast-2.elb.amazonaws.com'

// shipping: '0(通常配送) / 1(無料配送)',

// 0: plan
// 1: product
// 2: group

// const apiUrl = 'http://localhost:8080'
import {
  addDays,
  addMonths,
  setDate,
  endOfMonth,
  endOfDay,
  setDay,
  addMinutes,
} from 'date-fns'

export async function getCredentials(clientId: string, clientSecret: string) {
  if (!clientId || !clientSecret) {
    throw new Error('Client ID or Client Secret is not provided')
  }
  try {
    const response = await fetch(`${apiUrl}/api/v1/auth/basic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
      }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export async function createStripePaymentIntent(amount: number) {
  const token = localStorage.getItem('loops-token')

  try {
    const response = await fetch(
      `${apiUrl}/api/v1/merchant/create-payment-intent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
        }),
      }
    )

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export async function createLoopsSubscription(
  address: any,
  plan: any,
  email: string,
  customerId: string
) {
  const token = localStorage.getItem('loops-token')
  const merchant_id = localStorage.getItem('loops-store-id')

  // let firstName, lastName
  // if (address && address.name.indexOf(' ') !== -1) {
  //   [firstName, lastName] = address.name.split(' ')
  // } else {
  //   firstName = address.name
  //   lastName = ''
  // }

  const body = {
    id: '2c6e239a-f02b-d158-2833-c7f883bb5530',
    merchant_id: merchant_id.toString(),
    products_variant: [
      {
        product_type: 0,
        id: plan.key.toString(),
        num: 1,
        option: '商品ごとのメモを管理',
      },
    ],
    customer_information: {
      customer_id: customerId,
      address2: address.address.line2 || '',
      address1: address.address.line1 || '',
      city: address.address.city,
      pref: address.address.state,
      zipcode: address.address.postal_code,
      first_name: address.firstName,
      last_name: address.lastName,
      email: email,
      tel: address.phone,
    },
    shipping_information: {
      address2: address.address.line2 || '',
      address1: address.address.line1 || '',
      city: address.address.city,
      pref: address.address.state,
      zipcode: address.address.postal_code,
      first_name: address.firstName,
      last_name: address.lastName,
      tel: address.phone,
    },
    options: {
      shipping: 0,
      schedule_delivery_date: addDays(
        new Date(),
        plan.shipping_preparation_term
      ),
      schedule_payment_date: calculateSchedulePaymentDate(plan),
      complete_payment_date: new Date(),
      coupon: '',
      payment: 0,
      callback_url: 'https://localhost:4000',
    },
  }

  try {
    const response = await fetch(`${apiUrl}/api/v1/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    return data
  } catch (error) {
    throw new Error(error)
  }
}

function calculateSchedulePaymentDate(plan: any) {
  /**
   ** Production usage
   */
  // const firstPurchaseDate = new Date()
  // const secondPurchaseDate = addMonths(firstPurchaseDate, 1)
  // if (plan.second_fixed_payment === 'none') {
  //   return secondPurchaseDate
  // }
  // if (plan.second_fixed_payment === 'last') {
  //   return endOfMonth(secondPurchaseDate)
  // }
  // return setDate(secondPurchaseDate, Number(plan.second_fixed_payment))
  /**
   ** Testing usage
   */
  // add 15 minutes to the first purchase date for testing
  return new Date()
  // const firstPurchaseDate = new Date()
  // if (
  //   plan.second_fixed_payment === 'none' ||
  //   plan.second_fixed_payment === 'last'
  // ) {
  //   setTimeout(() => {
  //     fetch(`${apiUrl}/api/v1/schedule/runJobs`, {
  //       method: 'POST',
  //     })
  //   }, 300000)
  //   return firstPurchaseDate
  // }
  // return addDays(firstPurchaseDate, Number(plan.second_fixed_payment))
  /**
   ** Commented for phase one
   */
  // const interval = plan.interval
  // if (isAfter(setDate(secondPurchaseDate, secondFixPayment), addDays(firstPurchaseDate, interval))) {
  //   return setDate(secondPurchaseDate, secondFixPayment)
  // } else {
  //   return addMonths(setDate(secondPurchaseDate, secondFixPayment), 1)
  // }
}
