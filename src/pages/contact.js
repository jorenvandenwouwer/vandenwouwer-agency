import React from 'react';
import { Link, useStaticQuery, graphql } from "gatsby";
import {RiMailSendFill, RiPhoneLine, RiUserLocationLine} from 'react-icons/ri';

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper , Image ,Artist, BottomEdgeDown , BottomEdgeUp } from "./pageStyles/pageStyles"
import {COLORS} from "../constants"

const Contact = () => {
    const {
        wpcontent: {
            page: {
                contactMeta: {
                    contactPageAddress,
                    conactPageCity,
                    contactPageDescription,
                    contacPageEmail,
                    contactPagePhone,
                    contactPagePostcode,
                    contactPageHeaderPicture
                }
            }
        }
    }  = useStaticQuery(graphql`
    query {
        wpcontent {
          page(id: "contact", idType: URI) {
            contactMeta {
              contactPageAddress
              conactPageCity
              contactPageDescription
              contacPageEmail
              contactPagePhone
              contactPagePostcode
              contactPageHeaderPicture {
                sourceUrl
                imageFile {
                    childImageSharp{
                        fluid(quality: 100) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
                altText
              }
            }
          }
        }
      }
      
    `)
    return (
        <Layout>
        <SEO title="Contact"/>
            <Wrapper descriptionColor={COLORS.PRIMARY}>
                <div className="banner">
                    <Image fluid={contactPageHeaderPicture.imageFile.childImageSharp.fluid}/>
                    <BottomEdgeDown color={COLORS.PRIMARY}/>
                </div>
                <div className="description">
                <h2> Contact us</h2>
                <p>{contactPageDescription}</p>
                <BottomEdgeUp color={COLORS.BLACK}/>
                </div>
                <div className="contact-info">
                    <div> 
                        <RiMailSendFill style={{heigth: '4rem', width: '4rem'}} />
                        <p> send us an email at {" "} <a target="_blank" href={`mailto:${contacPageEmail}`}/>{contacPageEmail}</p>
                    </div>
                    <div> 
                        <RiPhoneLine style={{heigth: '4rem', width: '4rem'}} />
                        <p> call us {contactPagePhone} </p>
                    </div>
                    <div> 
                        <RiUserLocationLine style={{heigth: '4rem', width: '4rem'}} />
                        <p> {contactPageAddress},{contactPagePostcode} {conactPageCity} </p>
                    </div>
                    
                </div>
            </Wrapper>
        </Layout>
    )
}
export default Contact;