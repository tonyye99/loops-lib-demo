export function createLinkAuthenticationElement(elements: any) {
  const linkAuthenticationElement = elements.create('linkAuthentication')
  linkAuthenticationElement.mount('#link-authentication-element')
  return linkAuthenticationElement
}

export function createPaymentElement(elements: any) {
  const paymentElement = elements.create('payment', {
    layout: 'tabs',
  })
  paymentElement.mount('#payment-element')
  return paymentElement
}

export function createAddressElement(elements: any) {
  const addressElement = elements.create('address', {
    mode: 'shipping',
    allowedCountries: ['JP'],
    fields: {
      phone: 'always',
    },
  })
  addressElement.mount('#address-element')
  return addressElement
}

export function removeIframes() {
  const iframes = document.querySelectorAll(
    'iframe[name^="__privateStripeController"]'
  )
  iframes.forEach((iframe) => {
    iframe.remove()
  })
}
