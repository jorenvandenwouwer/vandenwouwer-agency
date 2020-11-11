import React from 'react';
import { Link, useStaticQuery, graphql } from "gatsby";


import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper , Image ,Artist, BottomEdgeDown , BottomEdgeUp} from "./pageStyles/pageStyles"
import {COLORS} from "../constants"

const ArtistPage = () => {
    const {
        wpcontent: {
            page: {
                artistsMeta:{
                    artistsPageDescription,
                    artistsPageHeaderPicture
                }
            },
            artists: {edges:artists},
        },
    } = useStaticQuery(graphql`
    query {
        wpcontent {
            page(id: "artists", idType: URI) {
                artistsMeta {
                    artistsPageDescription
                    artistsPageHeaderPicture {
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
            artists {
                edges {
                  node {
                    artist {
                      firstName
                      lastName
                      artistName
                      profile {
                        altText
                        sourceUrl
                        imageFile {
                          childImageSharp{
                            fluid(quality: 100, grayscale: true) {
                              ...GatsbyImageSharpFluid_withWebp
                            }
                          }
                        }
                      }
                    }
                    slug
                  }
                }
              }
        }
      }
    `)
    return (
        <Layout>
            <SEO title="artist"/>
            <Wrapper artistColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
                <div className="banner">
                    <Image fluid={artistsPageHeaderPicture.imageFile.childImageSharp.fluid}  alt={artistsPageHeaderPicture.altText}/>
                    <BottomEdgeDown color={COLORS.SECONDARY}/>
                </div>
                <div className="description">
                    <h2> we are van den wouwer agency</h2>
                    <p> {artistsPageDescription}</p>
                    <BottomEdgeUp color={COLORS.BLACK}/>
                </div>
                <div className="artists">
                    <h2> Our artist</h2>
                    <div className="artist-items">
                        {artists.map(({ node: {artist, slug}}) => (
                            <Artist to={`/${slug}`} key={slug}> 
                                <Image fluid={artist.profile.imageFile.childImageSharp.fluid} alt={artist.profile.altText}/>
                                <div className="artist-info">
                                    <p>
                                        {artist.artistName} {artist.lastName}
                                    </p>
                                    {artist.artistName && <p>{artist.artistName}</p>}
                                </div>
                            </Artist>
                        )
                            
                        )}
                    </div>
                </div>
            </Wrapper>
        </Layout>
    )
}
export default ArtistPage;