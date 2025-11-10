'use client'
 
import { StyleProps } from '../../types/common'
import { Mail, MapPin, Phone } from 'lucide-react'
import ContactForm from '../contact/ContactForm'
 
export default function ContactSection({
  background = "bg-sable",
  textColor = "text-gray-900",
}: StyleProps) {

const contactItems = [
  { icon: Mail, title: "Email", content: "contact@escapavelo.fr" },
  { icon: Phone, title: "Téléphone", content: "+33 7 82 23 20 16" },
  { icon: MapPin, title: "Localisation", content: "Toulouse, France" }
]

  return (
 <div  className={`${background} relative py-20 bg-center pt-12 xs:pt-16 sm:pt-20 md:pt-24 pb-12 xs:pb-16 sm:pb-20 md:pb-24 scroll-my-28 z-10`}>
    <div className="max-w-7xl mx-auto px-4 relative z-20">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className={`${textColor} text-3xl font-bold mb-6`}>Restons en contact</h2>
          <p className={`${textColor} opacity-80 text-lg mb-8`}>
            Vous souhaitez en savoir plus, être partenaire ou pour toutes autres questions, n'hésitez pas à me contacter !
          </p>
          <div className="space-y-4">
            { 
              contactItems.map((item) => {
                const Icon = item.icon;
                return (<div key={item.title} className="flex items-center space-x-4">
                  <div className="bg-white/90 w-12 h-12 rounded-full flex items-center justify-center">
                     <Icon className="h-6 w-6 text-green-900" />
                  </div>
                  <div>
                    <h3 className={`${textColor} font-semibold`}>{ item.title }</h3>
                    <p className={`${textColor} opacity-80`}>{ item.content }</p>
                  </div>
                </div>);
              })
            }
          </div>
        </div>
        <div>
            <ContactForm></ContactForm>
        </div>
      </div>
    </div>
  </div>
  )
}