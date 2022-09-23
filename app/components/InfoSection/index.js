import React from 'react'
import ContactUsSection from "../ContactUsSection"
import AboutUsSection from "../AboutUsSection"

function Info() {
  return (
    <div className="flex mx-auto w-11/12">
      <ContactUsSection />
      <AboutUsSection />
    </div>
  )
}

export default Info