import { loadStripe } from '@stripe/stripe-js'
import {
  createStripePaymentIntent,
  createLoopsSubscription,
} from '../service/loops-api'
import {
  createLinkAuthenticationElement,
  createPaymentElement,
  createAddressElement,
  removeIframes,
} from '../elements/stripe-elements'
import {
  showModal,
  hideModal,
  showButtonLoader,
  showLoader,
  hideLoader,
  showMessage,
} from '../elements/modal'

const singlePurchase = async (plan: any) => {
  if (!plan.price) {
    throw new Error('No price')
  }

  // if (!plan.return_url) {
  //   throw new Error('No return url')
  // }

  showModal()
  showLoader()

  let clientSecret = ''
  let customerId = ''
  try {
    const { clientSecret: secret, customer } = await createStripePaymentIntent(
      plan.price
    )
    clientSecret = secret
    customerId = customer
  } catch (error) {
    throw new Error(error)
  }

  if (!clientSecret) {
    throw new Error('No client secret')
  }

  const stripeAccountId = localStorage.getItem('loops-stripe-account-id')
  const stripe = await loadStripe(
    'pk_test_51IcNIEBin9HfPevgFeVBbBTZoGKs1nxLTXk8dwwbXAChVpM7fAj5iKnnCpi7WENU6CQf9L1wGNoIgToZxvwy62PI00agu56lbs',
    {
      stripeAccount: stripeAccountId,
    }
  )

  let emailAddress = ''
  let address = {}
  let isEmailValid = false
  let paymentValid = false
  let isAddressValid = false
  const elements = stripe.elements({
    appearance: {
      theme: 'stripe',
    },
    clientSecret,
  })

  const linkAuthenticationEl = createLinkAuthenticationElement(elements)
  linkAuthenticationEl.on('change', (event: any) => {
    if (event.error) {
      console.log(event.error)
    }
    if (event.complete) {
      emailAddress = event.value.email
      isEmailValid = true
    }
  })
  const paymentEl = createPaymentElement(elements)
  paymentEl.on('change', (event: any) => {
    if (event.error) {
      console.log(event.error)
    }
    if (event.complete) {
      paymentValid = true
    }
  })
  createAddressElement(elements)

  const cancelButtonEl = document.querySelector('#cancel')
  cancelButtonEl?.addEventListener('click', (e) => {
    e.preventDefault()
    removeIframes()
    hideModal()
  })

  hideLoader()

  const form = document.getElementById('payment-form')
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    showButtonLoader(true)

    if (!isEmailValid) {
      showMessage('Please enter a valid email address', true)
      showButtonLoader(false)
      return
    }

    if (!paymentValid) {
      showMessage('Please enter a valid payment method', true)
      showButtonLoader(false)
      return
    }

    const addressElement = elements.getElement('address') as any
    const { complete, value } = await addressElement.getValue()
    if (complete) {
      address = value
      isAddressValid = true
    }

    if (!isAddressValid) {
      showMessage('Please enter a valid address', true)
      showButtonLoader(false)
      return
    }

    try {
      const loopsResponse = await createLoopsSubscription(
        address,
        plan,
        emailAddress,
        customerId
      )

      if (loopsResponse?.status === 'success') {
        const response = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: '',
          },
          redirect: 'if_required',
        })
        if (response.error) {
          if (
            response.error?.type === 'card_error' ||
            response.error?.type === 'validation_error'
          ) {
            showMessage(response.error.message, true)
          } else {
            showMessage('An unexpected error occurred.', true)
          }
        }
        if (response.paymentIntent.status === 'succeeded') {
          showMessage('Payment successful!', false)
          setTimeout(() => {
            hideModal()
            removeIframes()
          }, 3000)
        }
      }
    } catch (error) {
      showMessage(error || 'An unexpected error occurred.', true)
    } finally {
      showButtonLoader(false)
    }
  })
}

export { singlePurchase }
