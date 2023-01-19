export function createModal() {
  // style tag
  const css = `
      .loops-purchase-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.4);
      }

      .loops-purchase-modal-content {
        background-color: #fefefe;
        width: 50%;
        border-radius: 10px;
        max-height: 90vh;
        overflow-y: auto;
      }

      .title {
        font-size: 20px;
        font-weight: bold;
        padding: 20px;
      }

      form {
        min-width: 500px;
        align-self: center;
        box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
          0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
        border-radius: 7px;
        padding: 40px;
      }

      .hidden {
        display: none;
      }

      #payment-message {
        color: rgb(105, 115, 134);
        font-size: 16px;
        line-height: 20px;
        padding-top: 12px;
        text-align: center;
      }

      #link-authentication-element {
        margin-bottom: 24px;
      }

      #payment-element {
        margin-bottom: 24px;
      }

      #address-element {
        margin-bottom: 24px;
      }

      /* Buttons and links */
      #submit {
        background: #5469d4;
        font-family: Arial, sans-serif;
        color: #ffffff;
        border-radius: 4px;
        border: 0;
        padding: 12px 16px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        display: block;
        transition: all 0.2s ease;
        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
        width: 100%;
      }
      #submit:hover {
        filter: contrast(115%);
      }
      #submit:disabled {
        opacity: 0.5;
        cursor: default;
      }

      #cancel {
        background: white;
        font-family: Arial, sans-serif;
        border-radius: 4px;
        border: 0;
        padding: 12px 16px;
        font-size: 16px;
        font-weight: 600;
        margin-top: 10px;
        cursor: pointer;
        display: block;
        transition: all 0.2s ease;
        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
        width: 100%;
      }
      #cancel:hover {
        filter: contrast(115%);
      }
      #cancel:disabled {
        opacity: 0.5;
        cursor: default;
      }

      /* spinner/processing state, errors */
      .spinner,
      .spinner:before,
      .spinner:after {
        border-radius: 50%;
      }
      .spinner {
        color: #ffffff;
        font-size: 22px;
        text-indent: -99999px;
        margin: 0px auto;
        position: relative;
        width: 20px;
        height: 20px;
        box-shadow: inset 0 0 0 2px;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
      }
      .spinner:before,
      .spinner:after {
        position: absolute;
        content: "";
      }
      .spinner:before {
        width: 10.4px;
        height: 20.4px;
        background: #5469d4;
        border-radius: 20.4px 0 0 20.4px;
        top: -0.2px;
        left: -0.2px;
        -webkit-transform-origin: 10.4px 10.2px;
        transform-origin: 10.4px 10.2px;
        -webkit-animation: loading 2s infinite ease 1.5s;
        animation: loading 2s infinite ease 1.5s;
      }
      .spinner:after {
        width: 10.4px;
        height: 10.2px;
        background: #5469d4;
        border-radius: 0 10.2px 10.2px 0;
        top: -0.1px;
        left: 10.2px;
        -webkit-transform-origin: 0px 10.2px;
        transform-origin: 0px 10.2px;
        -webkit-animation: loading 2s infinite ease;
        animation: loading 2s infinite ease;
      }

      @-webkit-keyframes loading {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      @keyframes loading {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }

      @media only screen and (max-width: 600px) {
        form {
          width: 80vw;
          min-width: initial;
        }
      }
    `;
  if (!document.querySelector("style[data-loops]")) {
    const style = document.createElement("style");
    style.setAttribute("data-loops", "");
    style.innerHTML = css;
    document.head.appendChild(style);
  }
  // modal
  const modal = `
      <div class="loops-purchase-modal">
        <div class="loops-purchase-modal-content">
          <form id="payment-form">

            <div id="link-authentication-element"></div>

            <div id="payment-element"></div>

            <div id="address-element"></div>

            <div id="payment-message" class="hidden"></div>

            <button id="submit">
              <div class="spinner hidden" id="spinner"></div>
              <span id="button-text">Pay now</span>
            </button>

            <button id="cancel" type="button">
              <span id="button-text">Cancel</span>
            </button>

          </form>
        </div>
      </div>
    `;
  if (!document.querySelector(".loops-purchase-modal")) {
    const div = document.createElement("div");
    div.innerHTML = modal;
    document.body.appendChild(div);
  }
}

export function hideModal() {
  (
    document.querySelector(".loops-purchase-modal") as HTMLElement
  ).classList.add("hidden");
}

export function showModal() {
  (
    document.querySelector(".loops-purchase-modal") as HTMLElement
  ).classList.remove("hidden");
}
