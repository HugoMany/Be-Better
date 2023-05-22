import ConvertApi from 'convertapi-js'

let elSecretInput = document.getElementById('secretInput')
let elFileInput = document.getElementById('fileInput')
let elResult = document.getElementById('result')
let elSuccess = document.getElementById('success')
let elCost = elSuccess.content.querySelector('#cost')
let elResultLink = elSuccess.content.querySelector('#resultLink')

// On file input change, start conversion
elFileInput.addEventListener('change', () => {
  elResult.innerHTML = ''
  if (!elSecretInput.reportValidity()) return
  document.documentElement.style.cursor = 'wait'

  // Converting DOCX to PDF file
  let convertApi = ConvertApi.auth(elSecretInput.value)
  let params = convertApi.createParams()
  params.add('file', elFileInput.files?.item(0))
  convertApi
    .convert('docx', 'pdf', params)
    .then((result) => {
      // Showing link with the result file
      elResultLink.setAttribute('href', result.files[0].Url)
      elCost.innerText = result.duration.toString()
      elResultLink.innerText = result.files[0].Url
      elResult.appendChild(elSuccess.content.cloneNode(true))
    })
    .catch((err) => {
      elResult.innerText = JSON.stringify(err)
    })
    .finally(() => {
      document.documentElement.style.cursor = 'default'
    })
})


import ConvertApi from 'convertapi-js'
let convertApi = ConvertApi.auth('your-api-secret')
let params = convertApi.createParams()
params.add('File', elFileInput.files[0]);
let result = await convertApi.convert('pdf', 'png', params)
